import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Let's GTA",
  description: "Let's GTA는 GTA 커뮤니티입니다.",
};

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

const shrikhand = localFont({
  src: '/fonts/Shrikhand-Regular.ttf',
  variable: '--font-shrikhand',
  display: 'swap',
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className={`${pretendard.variable} ${shrikhand.variable}`}>
      {/* 구글 서치 콘솔 */}
      <head>
        <meta
          name="google-site-verification"
          content="GqzxGzD59xxs5C13bEJoeKGk1NM6VKH35OXjOkx20b0"
        />
      </head>

      <body className={`antialiased ${pretendard.className}`}>
        {children}
        {/* vercel SpeedInsights */}
        <SpeedInsights />
      </body>
    </html>
  );
};
export default RootLayout;
