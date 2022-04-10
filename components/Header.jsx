import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '../services'


// href={`/category/${category.slug}`}

const Header = () => {
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        getCategories()
        .then((newCategories) => setCategories(newCategories))
    }, [])
    
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
                <Link href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white transition duration-700 text-center hover:text-pink-400'>
                         GraphCMS
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                    {categories.map((category)=>(
                        <Link key={category.slug} href='/'>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-300 hover:text-pink-400'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
            </div>
        </div>
    </div>
  )
}

export default Header