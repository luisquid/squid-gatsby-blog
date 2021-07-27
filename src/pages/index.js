import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from 'gatsby'

import Layout from "../components/layout"
import Seo from "../components/seo"


const IndexPage = ({data}) =>{
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      {posts.map((node,key) => <Link to={node.node.frontmatter.slug}><h3 key= {key}>{node.node.frontmatter.title}</h3></Link>)}
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={["AUTO", "WEBP", "AVIF"]}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  )
} 

export default IndexPage

export const contentQuery = graphql`
query getAllContent {allMarkdownRemark {
  edges {
    node {
      frontmatter{
        title
        slug
        date
      }
    }
  }
}
}
`