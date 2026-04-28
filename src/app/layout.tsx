import type { Metadata } from "next";
import EmotionRegistry from "@/components/EmotionRegistry";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDGE Design System",
  description: "EDGE Design System Component Library & Style Guide",
  icons: {
    icon: "/assets/edge-ds-favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <EmotionRegistry>{children}</EmotionRegistry>
      </body>
    </html>
  );
}
