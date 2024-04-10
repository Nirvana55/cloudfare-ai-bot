import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Provider from "@/components/Provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Chat bot",
  description: "The next era of chat bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center'>
          <Provider>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
