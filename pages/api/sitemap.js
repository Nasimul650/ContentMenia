import { SitemapStream, streamToPromise } from "sitemap";

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://education-myweb.vercel.app`,
      cacheTime: 600000,
    });

    // List of posts
    const post_slugs = [
      "tree-plantations",
      "immortal-ekushe",
      "news-3"
    ];

    // Create each URL row
    post_slugs.forEach((post) => {
      smStream.write({
        url: `${post}`,
        changefreq: "daily",
        priority: 0.9,
      });
    });


    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};