const { createWriteStream } = require("fs");
const { SitemapStream } = require("sitemap");
const sitemap = new SitemapStream({ hostname: "https://web.ajeoba.com/" });

const writeStream = createWriteStream("./public/sitemap.xml");
sitemap.pipe(writeStream);

sitemap.write({ url: "/", changefreq: "daily", priority: 1 });
sitemap.write({ url: "/signin", changefreq: "weekly", priority: 1 });
sitemap.write({ url: "/signup-otp", changefreq: "weekly", priority: 1 });

sitemap.end();
