const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function postData() {
  const files = fs.readdirSync(path.join('posts'));
  const posts = files.map((file) => {
    const slug = file.replace('.md', '');

    const mdWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');
    // use a colon to rename data being destructured out of function
    const { data: frontmatter } = matter(mdWithMeta);

    return { slug, frontmatter };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync('cache');
} catch (error) {
  fs.mkdirSync('cache');
}

fs.writeFile('cache/data.js', postData(), function (err) {
  if (err) return console.log(err);
  console.log('Posts Cached');
});
