const { createFilePath } = require("gatsby-source-filesystem")
const path = require('path')

exports.onCreateNode = ({node, getNode, actions}) =>{
    
    const {createNodeField} = actions

    if(node.internal.type === "MarkdownRemark"){
        
        const slug = createFilePath({node, getNode, basePath: `pages`})
    
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({graphql, actions}) =>{
    const {createPage} = actions
    return new Promise((resolve, reject) => {
        graphql(`
        {
            allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
          
        `).then(results =>{
            console.log(JSON.stringify(results, null, 4))
            const posts = results.data.allMarkdownRemark.edges
            posts.forEach(({node}) => {
                createPage({
                    path: node.fields.slug,
                    context: {
                        slug: node.fields.slug
                    },
                    component: path.resolve('./src/templates/blog-post.js')
                })
            });
            resolve()
        })
    })
}