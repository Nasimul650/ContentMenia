import React from 'react'
import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
      <div className='absolute left-0 right-0 -top-9'>
       <Image unoptimized className='align-middle rounded-full' src={author.photo.url} alt={author.name} height="60px" width="60px" />
      </div>
       <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
       <p className='text-white text-lg'>{author.description}</p>
    </div>
  )
}

export default Author