const { Client } = require("@notionhq/client");
const databaseId = process.env.NOTION_DATABASE_ID;
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function getBlogPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const blogPosts = response.results.map((result) => {
    if (!result.properties.title || !result.properties.title.title || !result.properties.title.title[0]?.text?.content) {
      return null;
    }

    const title = result.properties.title.title[0].text.content;
    const id = result.id;

    return {
      id,
      title,
    };
  }).filter((post) => post !== null);

  return blogPosts;
}

async function getArticleDetails(pageId) {
  const response = await notion.pages.retrieve(pageId);

  const articleDetails = {
    id: response.id,
    title: response.properties.title.title[0].text.content,
    content: response.properties.content.rich_text[0].text.content,
    created_at: response.properties.created_at.date.start,
    updated_at: response.properties.updated_at.date.start,
    category: response.properties.category.select.name,
    tags: response.properties.tags.multi_select.map((tag) => tag.name),
  };

  return articleDetails;
}

module.exports = {
  getBlogPosts,
  getArticleDetails,
};
