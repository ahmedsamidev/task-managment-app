
import { Providers } from "@/src/redux/provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NavBar } from "@/components/custom/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management App",
  description: "Organize and track your tasks efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-center" reverseOrder={false} />
          <NavBar />
          {children}
        </body>
      </html>
    </Providers>
  );
}
