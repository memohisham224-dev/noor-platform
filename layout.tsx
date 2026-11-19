import config from '../client-config.json';

export const metadata = {
  title: config.seo.title,
  description: config.seo.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body style={{margin:0, fontFamily:'Tahoma, Arial'}}>{children}</body>
    </html>
  );
}
