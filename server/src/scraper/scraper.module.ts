import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { AppService } from 'src/app.service';

@Module({ providers: [ScraperService, AppService], exports: [ScraperService] })
export class ScraperModule {}
