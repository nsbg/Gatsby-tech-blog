import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const categories = data.allMarkdownRemark.categoryList

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        {/* <Bio /> */}
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      {/* <nav>
        <ul>
          {categories.map(category => {
            const slugify = str => str.toLowerCase().replace(/\s+/g, '-');
            return (
              <li key={category}>
                <Link to={`/${slugify(category)}/`}>{category}</Link>
              </li>
            );
          })}
        </ul>
      </nav> */}
      <nav>
        <div className="category-row">
          <Link
            to="/"
            className="category-btn"
            activeClassName="category-btn--active"
          >
            All Posts
          </Link>
          {categories.map(category => {
            const slugify = str => str.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={category}
                to={`/${slugify(category)}/`}
                className="category-btn"
              >
                {category}
              </Link>
            );
          })}
        </div>
      </nav>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
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
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      categoryList: distinct(field: frontmatter___category)
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