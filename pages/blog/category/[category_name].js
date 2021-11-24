import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { sortByDate } from '@/utils/index';
import { getPosts } from '@/lib/posts';

export default function CategoryPage({ posts, categoryOriginal }) {
  // console.log(posts);

  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5'>{`Posts in ${categoryOriginal}`}</h1>

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
  const categories = files.map((file) => {
    const mdWithMeta = fs.readFileSync(path.join('posts', file), 'utf-8');

    const { data: frontmatter } = matter(mdWithMeta);

    return frontmatter.category;
  });

  const paths = categories.map((category) => ({
    params: { category_name: category.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  // console.log(category_name);
  const files = fs.readdirSync(path.join('posts'));
  const posts = getPosts();

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );
  const category_original = categoryPosts[0].frontmatter.category;

  return {
    props: { posts: categoryPosts, categoryOriginal: category_original },
  };
}
