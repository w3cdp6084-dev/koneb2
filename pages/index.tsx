import { getBlogPosts } from "../notion";
import Link from 'next/link';

function ArticleList({ articles }) {
  return (
    <div>
      {articles.map((article) => (
        <Link key={article.id} href="/article/[id]" as={`/article/${article.id}`}>
          <div>
            <h2>{article.title}</h2>
            <p>{article.tags ? article.tags.join(', ') : ''}</p>

          </div>
        </Link>
      ))}
    </div>
  );
}


export async function getStaticProps() {
  const blogPosts = await getBlogPosts();
  return {
    props: {
      articles: blogPosts
    },
    revalidate: 60
  };
}

export default ArticleList;
