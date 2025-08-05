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
      {/* 전체 가로 레이아웃: 본문 + 사이드바 */}
      <div style={{ display: "flex", alignItems: "flex-start", margin: '0 auto', padding: '20px' }}>
        
        {/* 본문 영역 */}
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
          style={{ flex: 1, minWidth: 0, maxWidth: '800px'}}
        >
          <header>
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <hr />
          <footer>
            <Bio />
          </footer>
        </article>

        {/* 오른쪽 목차 사이드바 */}
        <aside
          style={{
            width: '300px',
            marginLeft: '40px'
          }}
        >
          <nav
            className="blog-post-toc"
            style={{
              position: 'sticky',
              top: '2rem',           // 헤더 높이 고려해서 조정
              background: '#fffbe2', // 배경 노란색으로 강조 가능
              borderRadius: '12px',  // 둥근 모서리,
              flexShrink: 0, // 사이드바 고정
              boxShadow: '0 1px 8px #dcc',
              padding: '18px 18px',
              width: '300px',
            }}
          >
            <h3>Table of Contents</h3>
            <ul>
              {h1Headings.map((heading, idx) => (
                <li key={idx}>
                  <a href={`#${slugify(heading.value)}`}>{heading.value}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      {/* 이전/다음 글 네비게이션 */}
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
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
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

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