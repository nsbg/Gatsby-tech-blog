import Seo from "../components/seo";
import Bio from "../components/bio";
import { Link } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const CategoryPost = ({ data, location, pageContext }) => {
  const { category } = pageContext;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <nav>
        <div className="category-row">
          <Link to="/" className="category-btn">
            All Posts
          </Link>
          <span className="category-btn category-btn--active">
            {category}
          </span>
        </div>
      </nav>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug;
          const description = post.frontmatter.description;
          return (
            <li key={post.fields.slug}>
              <article className="blog-post">
                <header>
                  <h2>
                    <Link to={post.fields.slug}>{title}</Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  {description
                    ? <p>{description}</p>
                    : <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  }
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default CategoryPost;

// 쿼리에서 siteMetadata의 title도 함께 요청!
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
`;