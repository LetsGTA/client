/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://letsgta.net',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 1,
  exclude: [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
