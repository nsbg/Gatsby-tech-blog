import * as React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const h1Headings = post.headings.filter(heading => heading.depth === 1)

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="post-outer-wrapper">
        <div className="post-content-layout">
          {/* 본문 카드 */}
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            <header className="post-header">
              <h1 className="post-title" itemProp="headline">{post.frontmatter.title}</h1>
              <div className="post-meta">{post.frontmatter.date}</div>
            </header>
            <section
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
              itemProp="articleBody"
            />
            <footer>
              {/* 이전/다음 네비 */}
              <nav className="blog-post-nav">
                <ul style={{
                  display: `flex`, flexWrap: `wrap`, justifyContent: `space-between`,
                  listStyle: `none`, padding: 0,
                }}>
                  <li>
                    {previous && (
                      <Link to={previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li>
                    {next && (
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </footer>
          </article>
          {/* 
          <aside className="sidebar-toc">
            <nav className="blog-post-toc">
              <h4 className="toc-title">📌 Table of Contents</h4>
              <ul>
                {h1Headings.map((heading, idx) => (
                  <li key={idx}>
                    <a href={`#${heading.id}`}>
                      {heading.value}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          */}
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => (
  <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
  />
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      headings {
        depth
        value
        id
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`