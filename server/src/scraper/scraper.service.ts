import { Injectable, BadRequestException } from '@nestjs/common';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { AppService } from 'src/app.service';

puppeteer.use(StealthPlugin());

@Injectable()
export class ScraperService {
  constructor(private appService: AppService) {}

  async scrapeLinkedInProfile(linkedInUrl: string) {
    // ✅ Validate LinkedIn URL with regex
    const linkedInPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedInPattern.test(linkedInUrl)) {
      throw new BadRequestException('Invalid LinkedIn URL.');
    }

    const browser = await puppeteer.launch({
      headless: false,  // ❗ Set to false for testing
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled',  // ✅ Hide automation flag
      ],
    });

    try {
      const page = await browser.newPage();

      // ✅ Rotate user agents to avoid detection
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
      );

      // ✅ Set navigation timeout
      page.setDefaultNavigationTimeout(60000);

      // ✅ Go to LinkedIn login page
      const loginStatus = await page.goto('https://www.linkedin.com/login', {
        waitUntil: 'networkidle2',
      });

      if (loginStatus?.status() !== 200) {
        console.log('Failed to load LinkedIn login page.');
        throw new BadRequestException('Failed to access LinkedIn.');
      }

      // ✅ Log in with credentials
      const username = this.appService.getLinkedInUsername();
      const password = this.appService.getLinkedInPassword();

      if (!username || !password) {
        throw new BadRequestException('Missing LinkedIn credentials.');
      }

      await page.type('#username', username, { delay: 100 });
      await page.type('#password', password, { delay: 100 });
      await Promise.all([
        page.click('[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
      ]);

      // ✅ Check login success
      const loggedInUrl = page.url();
      if (loggedInUrl.includes('login')) {
        console.log('Login failed.');
        await page.screenshot({ path: 'login-failed.png' });  // 📸 Screenshot for debugging
        throw new BadRequestException('LinkedIn login failed.');
      }

      // ✅ Go to the target profile
      const profileStatus = await page.goto(linkedInUrl, {
        waitUntil: 'domcontentloaded',
      });

      if (profileStatus?.status() !== 200) {
        console.log('Failed to load LinkedIn profile.');
        throw new BadRequestException('Failed to access LinkedIn profile.');
      }

      // ✅ Scrape profile information
      const profileData = await page.evaluate(() => {
        const name = document.querySelector('.text-heading-xlarge')?.textContent?.trim() || '';
        const title = document.querySelector('.text-body-medium')?.textContent?.trim() || '';
        const profilePhoto = (
          document.querySelector('.pv-top-card__photo') as HTMLImageElement
        )?.src || '';
        const location = document.querySelector('.text-body-small')?.textContent?.trim() || '';

        return { name, title, profilePhoto, location };
      });

      console.log('Profile Data:', profileData);  // ✅ Log for debugging

      if (!profileData.name) {
        console.log('Profile data not found.');
        await page.screenshot({ path: 'profile-not-found.png' });  // 📸 Screenshot for debugging
        throw new BadRequestException('Failed to scrape LinkedIn profile.');
      }

      return profileData;
    } catch (error) {
      console.error('Scraping error:', error);
      throw new BadRequestException('Failed to scrape profile.');
    } finally {
      await browser.close();
    }
  }
}

