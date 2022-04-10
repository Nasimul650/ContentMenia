import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { getCategories } from '../services'

// href={`/category/${category.slug}`}

const Categories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
      getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, [])
  return (
    <div className="bg-white shadow-lg pb-12 rounded-lg p-8 mb-8">
        <h3 className='text-xl mb-8 font-semibold border-b pb-3'>
          Categories
        </h3>
        {categories.map((category) => (
          <Link passHref key={category.slug} href='/'>
            <span className='cursor-pointer block pb-3 mb-3  font-semibold transition hover:text-pink-600'>
                {category.name}
            </span>
          </Link>
        ))}
    </div>
  )
}

export default Categories