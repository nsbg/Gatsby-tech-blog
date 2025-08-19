import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import Bio from "../components/bio";
import { graphql } from "gatsby";

const CategoryPost = ({ data, location, pageContext }) => {
  const { category } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.nodes;

  // 카테고리 목록, 메인에서 All Posts 포함
  const categories = ["All Posts", "Insight", "PS", "Paper"];

  return (
    <Layout location={location} title={siteTitle}>
      {/* 상단 제목 */}
      <h1 className="blog-main-title">{category || "All posts"}</h1>

      <ol style={{ listStyle: "none" }}>
        {posts.map(post => {
          // 이미지, 타이틀, 설명 등
          const title = post.frontmatter.title || post.fields.slug;
          const description = post.frontmatter.description;
          const thumbnail = post.frontmatter.thumbnail; // 이미지 path
          
          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug} className="preview-card">
                <div className="preview-thumb-wrapper">
                  {thumbnail ? (
                    <img src={thumbnail} alt={title} className="preview-thumb" />
                  ) : (
                    <div className="preview-thumb preview-thumb--placeholder"></div>
                  )}
                </div>
                <div className="preview-text">
                  <h2 className="preview-title">{title}</h2>
                  <div className="preview-desc">
                    {description || <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default CategoryPost;

export const pageQuery = graphql`
  query($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
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