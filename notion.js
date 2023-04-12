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

 console.log("Retrieved blog posts:", blogPosts); // Add this line to debug
 return blogPosts;
}


module.exports = {
  getBlogPosts,
};
