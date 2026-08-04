export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap:
      "https://dat-fpt.vercel.app/sitemap.xml",
  };
}