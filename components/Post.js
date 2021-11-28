import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';

export default function Post({ post, compact }) {
  // console.log(post);
  const { author, author_image, category, cover_image, date, excerpt, title } =
    post.frontmatter;

  return (
    <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6'>
      {!compact && (
        <Image src={cover_image} height={420} width={600} alt='image' className='mb-4' />
      )}

      <div className='flex justify-between items-center'>
        <span className='font-light text-gray-600'>{date}</span>
        <CategoryLabel>{category}</CategoryLabel>
      </div>

      <div className='mt-2'>
        <Link href={`/blog/${post.slug}`}>
          <a className='text-2l text-gray-700 font-bold hover:underline'>{title}</a>
        </Link>
        <p className='mt-2 text-gray-600'>{excerpt}</p>
      </div>

      {!compact && (
        <div className='flex justify-between items-center mt-6'>
          <Link href={`/blog/${post.slug}`}>
            <a className='text-gray-900 hover:text-blue-600'>Read More</a>
          </Link>
          <div className='flex items-center'>
            <Image
              src={author_image}
              alt={author}
              width={40}
              height={40}
              className='w-10 h-10 object-cover rounded-full hidden sm:block'
            />

            <h3 className='ml-2 text-gray-700 font-bold'>{author}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
