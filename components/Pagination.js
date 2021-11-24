import Link from 'next/link';

export default function Pagination({ currentPage, numPages }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) {
    return <></>;
  }

  return (
    <div className='mt-6'>
      <ul className='flex pl-0 list-none my-2'>
        {!isFirstPage && (
          <Link href={prevPage} passHref>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              Previous
            </li>
          </Link>
        )}

        {/* create pagination links from page indexes by adding one to each */}
        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`} passHref key={i + 1}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLastPage && (
          <Link href={nextPage} passHref>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
