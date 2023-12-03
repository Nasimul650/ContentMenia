import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

// href={`/category/${category.slug}`}

const Header = () => {
  // const [categories, setCategories] = useState([])

  // useEffect(() => {
  //     getCategories()
  //     .then((newCategories) => setCategories(newCategories))
  // }, [])

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link passHref href="/">
            <span className="cursor-pointer font-bold text-4xl text-white transition duration-700 text-center hover:text-pink-400">
              ContentMenia
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {/* {categories.map((category)=>(
                    ))} */}
          <Link passHref href="/terms">
            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-300 hover:text-pink-400">
            Terms and Conditions
            </span>
          </Link>
          <Link passHref href="/privacy">
            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-300 hover:text-pink-400">
            Privacy Policy
            </span>
          </Link>
          <Link passHref href="/contact">
            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-300 hover:text-pink-400">
            Contact Us
            </span>
          </Link>
          <Link passHref href="/about">
            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-300 hover:text-pink-400">
            About Us
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
