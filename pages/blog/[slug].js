import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import sanitize from 'sanitize-html';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import CategoryLabel from '../../components/CategoryLabel';

export default function SinglePostPage({ content, frontmatter, slug }) {
  const { author, author_image, category, cover_image, date, excerpt, title } =
    frontmatter;

  return (
    <Layout title={title}>
      <Link href={`/blog`}>
        <a className='ml-2'>Go Back</a>
      </Link>
      <div className='w-full max-h-full px-10 py-2 bg-white rounded-lg shadow-md mt-6'>
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-5xl mb-5'>{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>

        <div className='relative max-h-full max-w-full'>
          <Image
            src={cover_image}
            alt={title}
            className='absolute w-10/12 rounded top-0'
            width='100%'
            height='70%'
            objectFit='contain'
            layout='responsive'
          />

          <div className='flex justify-between items-center bg-gray-100 p-3 my-6'>
            <div className='flex justify-between items-center'>
              <div className='relative ml-2 w-11 h-11 object-cover hidden sm:block'>
                <Image
                  src={author_image}
                  alt={author}
                  className='absolute rounded-full'
                  width='100%'
                  height='100%'
                />
              </div>
              <h4 className='ml-2'>{author}</h4>
            </div>
            <div className='mr-4'>{date}</div>
          </div>
        </div>
        <div className='blog-text mt-2'>
          {/* allow innerHTML to be set from posts */}
          <div dangerouslySetInnerHTML={{ __html: sanitize(marked(content)) }}></div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((file) => ({
    params: {
      slug: file.replace('.md', ''),
    },
  }));
  // console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

// destructure slug param from getStaticPaths
export async function getStaticProps({ params: { slug } }) {
  const mdWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(mdWithMeta);
  // console.log(content, frontmatter);

  return {
    props: {
      content,
      frontmatter,
      slug,
    },
  };
}
