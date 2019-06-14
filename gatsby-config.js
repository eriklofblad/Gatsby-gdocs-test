require("dotenv").config()

console.log(process.env.G_CLIENT_SECRET)

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-google-docs`,
      options: {
        foldersIds: [`1sPXfIFGHEOVmJih_wdtGp12vaPxwPddw`],
        config: {
          api_key: process.env.G_API_KEY,
          client_id: process.env.G_CLIENT_ID,
          client_secret: process.env.G_CLIENT_SECRET,
        },
        fields: ["createdTime"], // https://developers.google.com/drive/api/v3/reference/files#resource
        fieldsMapper: { createdTime: "date", name: "title" }, // To rename fields
        fieldsDefault: { draft: false }, // To add default fields values
        convertImgToNode: false, // To convert images to remote node files
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
