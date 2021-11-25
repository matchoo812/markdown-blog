import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import CategoryList from '@/components/CategoryList';
import { getPosts } from '@/lib/posts';

export default function CategoryPage({ posts, singleCategory, categories }) {
  // console.log(posts);

  return (
    <Layout>
      <div className='flex justify-between'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5'>Posts in {singleCategory}</h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </div>
        </div>
        <div className='w-1/4'>
          <CategoryList categories={categories} />
        </div>
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

  // get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );
  const singleCategory = categoryPosts[0].frontmatter.category;

  return {
    props: { posts: categoryPosts, categories: uniqueCategories, singleCategory },
  };
}
