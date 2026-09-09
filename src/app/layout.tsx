import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.digilabss.com"),
  title: "AI-Powered Social Media Marketing | DigiLabss",
  description:
    "AI-powered social media marketing for growing brands. DigiLabss combines content, Meta ads, conversion websites, automation, and reporting into one growth engine.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI-Powered Social Media Marketing | DigiLabss",
    description:
      "A premium DigiLabss landing experience for content, Meta ads, conversion web design, marketing automation, and measurable growth.",
    url: "/",
    siteName: "DigiLabss",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Social Media Marketing | DigiLabss",
    description:
      "Content, ads, websites, automation, and reporting built as one AI-powered growth engine.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="data-layer-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        {gtmId ? (
          <Script id="gtm-loader" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {children}
      </body>
    </html>
  );
}
