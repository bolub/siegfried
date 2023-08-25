import { type NextSeoProps } from "next-seo";

// https://www.siegfried.dev/og-image.png

export const seoConfig = {
  title: "Siegfried",
  description:
    "Easily create personalized contracts and send them for quick and secure electronic signatures.",
  openGraph: {
    title: "Siegfried",
    description:
      "Easily create personalized contracts and send them for quick and secure electronic signatures.",
    url: "https://siegfried.dev",
    images: [
      {
        url: "https://www.siegfried.dev/og-image.png",
        width: 1200,
        height: 600,
      },
    ],
  },
} as NextSeoProps;
