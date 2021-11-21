import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { sortByDate } from '../utils';

export default function HomePage({ posts }) {
  // console.log(posts);

  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5'>Latest Posts</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          View All Posts
        </a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
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

  return {
    // return only first six posts
    props: { posts: posts.slice(0, 6) },
  };
}
