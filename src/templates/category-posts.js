import Seo from "../components/seo";
import Bio from "../components/bio";
import { Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
const CategoryPost = ({ data, location, pageContext }) => {
  const { category } = pageContext;
  const posts = data.allMarkdownRemark.nodes;
  // siteTitle은 필요시 상위에서 prop으로 전달하거나, 하드코딩 가능
  return (
    <Layout location={location} title={`Posts in ${category}`}>
      <Seo title={`Posts in ${category}`} />
      <Bio />
      <h3>{`Current: ${category}`}</h3>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;
          return (
            <li key={post.fields.slug}>
              <article className="blog-post">
                <header>
                  <h2>
                    <Link to={post.fields.slug}>{title}</Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
}

export default CategoryPost

export const pageQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
        }
      }
    }
  }
`