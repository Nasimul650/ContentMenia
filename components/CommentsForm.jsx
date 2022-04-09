import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name')
    emailEl.current.value = window.localStorage.getItem('email')
  }, [])

  
  const handleCommentSubmission =() => {
    setError(false);
    // const { value: comment } = commentEl.current
    // const { value: name } = nameEl.current
    // const { value: email } = emailEl.currentname
    // const { checked: storeData } = storeDataEl.current

    const { name, email, comment, storeData } = formData;
    if(!comment || !name || !email){
        setError(true);
        return;
    }
    const commentObj = { name, email, comment, slug };

    if (storeData){
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }
    else{
      window.localStorage.removeItem('name', name)
      window.localStorage.removeItem('name', name)

    }
    submitComment(commentObj)
    .then((res)=>{
      setshowSuccessMessage(true)
      setTimeout(() => {
        setshowSuccessMessage(false)
      }, 3000);
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className=" grid grid-cols-1 gap-4 mb-4">
        <textarea 
        // value={formData.comment}
        ref={commentEl} 
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        placeholder="Comment"
        name="comment"
        />
      </div>
      <div className="lg:grid-cols-2 grid grid-cols-1 gap-4 mb-4">
        <input 
        // value={formData.name}
        type="text" 
        ref={nameEl}
        placeholder="Name"
        name="name"
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
  
        <input 
        // value={formData.email}
        type="email" 
        ref={emailEl}
        placeholder="Email"
        name="email"
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
        </div>
        <div className=" grid grid-cols-1 gap-4 mb-4">
            <div>
              <input 
              
              ref={storeDataEl} 
              type="checkbox" id="storeData" name="storeData" value="true" />
              <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save email</label>
            </div>
        </div>
        {error && <p className="text-xs text-red-500">All fields are required.</p>}
      <div className="mt-8">
        <button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-600 text-lg rounded-full text-white px-8 py-3" 
        type="button" 
        onClick={handleCommentSubmission}> 
        Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Successful</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
