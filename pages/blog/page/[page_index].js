import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import Post from '../../../components/Post';
import { sortByDate } from '../../../utils';
import { POSTS_PER_PAGE } from '../../../config';

export default function BlogPage({ posts, numPages, currentPage }) {
  // console.log(posts);

  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5'>Blog</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1);
  const files = fs.readdirSync(path.join('posts'));
  const posts = files
    .map((file) => {
      const slug = file.replace('.md', '');
      const mdWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');

      // use a colon to rename data being destructured out of function
      const { data: frontmatter } = matter(mdWithMeta);

      return { slug, frontmatter };
    })
    .sort(sortByDate);

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const displayPosts = posts.slice(pageIndex * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return {
    props: { posts: displayPosts, numPages, currentPage: page },
  };
}
