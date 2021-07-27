import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { graphql } from "gatsby"

const BlogPost = ({data}) =>{
  console.log(data)
  const post = data.markdownRemark;
  return (
    <Layout>
      <Seo title="Home" />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML= {{__html: post.html}}/>
    </Layout>
  )
} 

export default BlogPost

export const query = graphql`
query BlogPost($slug: String!){
  markdownRemark(fields:{slug:{eq:$slug}}) {
  frontmatter {
    title
  }
  html
}
}`