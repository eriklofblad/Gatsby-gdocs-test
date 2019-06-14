/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

// You need to enable `gatsby-transformer-remark` to query `allMarkdownRemark`.
// If you don't use it, query `allGoogleDocs`
exports.createPages = async ({ graphql, actions }) =>
  graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    result.data.allMarkdownRemark.edges.forEach((post, index) => {
      actions.createPage({
        path: post.node.fields.slug,
        component: path.resolve(`./src/templates/template.jsx`),
        context: {
          slug: post.node.fields.slug,
        },
      })
    })
  })

exports.onCreateNode = ({ node, actions }) => {
  // You need to enable `gatsby-transformer-remark` to transform `GoogleDocs` type to `MarkdownRemark` type.
  if (node.internal.type === `MarkdownRemark`) {
    const customSlug = node.frontmatter.slug // If you add extra data `slug` with description field
    actions.createNodeField({
      name: `slug`,
      node,
      value: customSlug || node.frontmatter.path,
    })
  }
}
