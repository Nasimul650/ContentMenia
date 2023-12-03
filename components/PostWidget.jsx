import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
      if(slug){
        getSimilarPosts(categories, slug)
          .then((result) =>{ setRelatedPosts(result)});
      } else{
        getRecentPosts().then((result) =>{ setRelatedPosts(result)})
      }
  }, [slug])
  // console.log(relatedPosts)
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className='text-xl mb-8 font-semibold border-b pb-3'>
          {slug ? 'Related Posts' : "Recent Posts"}
        </h3>
        {relatedPosts.map((post) => (
          <div key={post.title} className="flex items-center w-full mb-4">
              <div className='w-16 flex-none'>
                  <Image src={post.featuredimage.url} className='align-middle rounded-full object-cover object-contain' height={100} width={100} alt={post.title} />
              </div>
              <div className='flex-grow ml-4'>
                <p className='text-gray-500 font-xs'>
                  {moment(post.createdAt).format('MMM DD, YYYY')}
                </p>
                <h1 className='font-semibold transition hover:text-pink-600'>
                <Link  href={`/post/${post.slug}`} key={post.title} >
                  {post.title}
                </Link>
                </h1>
              </div>
          </div>
        ))}
    </div>
  )
}

export default PostWidget