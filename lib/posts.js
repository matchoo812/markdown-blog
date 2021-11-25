import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { sortByDate } from '@/utils/index';

const files = fs.readdirSync(path.join('posts'));

export function getPosts() {
  const posts = files.map((file) => {
    const slug = file.replace('.md', '');
    const mdWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');
    // use a colon to rename data being destructured out of function
    const { data: frontmatter } = matter(mdWithMeta);

    return { slug, frontmatter };
  });

  return posts.sort(sortByDate);
}
