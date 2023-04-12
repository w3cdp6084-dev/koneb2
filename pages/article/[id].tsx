import { useRouter } from 'next/router';
import { getBlogPosts, getArticleDetails } from '../../notion-utils';

function Article({ articleDetails }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{articleDetails.title}</h1>
      <p>{articleDetails.content}</p>
      <p>Created at: {articleDetails.created_at}</p>
      <p>Updated at: {articleDetails.updated_at}</p>
      <p>Category: {articleDetails.category}</p>
      <p>Tags: {articleDetails.tags.join(', ')}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const articles = await getBlogPosts();
  const paths = articles.map((article) => ({
    params: { id: article.id },
  }));

  console.log("paths in getStaticPaths:", paths);

  return {
    paths,
    fallback: true,
  };
}


export async function getStaticProps({ params }) {
  const articleDetails = await getArticleDetails(params.id);
  return {
    props: {
      articleDetails,
    },
  };
}



export default Article;
