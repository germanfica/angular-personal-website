const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');

// An array with your links
const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/projects/', changefreq: 'weekly', priority: 0.8 }
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://app.germanfica.com/' });

// Path to save the sitemap
const sitemapPath = path.join(__dirname, 'src/sitemap.xml');

// Generate sitemap and write to file
streamToPromise(Readable.from(links).pipe(stream)).then((data) => {
    fs.writeFileSync(sitemapPath, data.toString());
    console.log(`Sitemap saved at ${sitemapPath}`);
}).catch((err) => {
    console.error(`Failed to generate sitemap: ${err}`);
});
