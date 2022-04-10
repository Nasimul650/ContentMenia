import React, { useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });
  // const commentEl = useRef();
  // const nameEl = useRef();
  // const emailEl = useRef();
  // const storeDataEl = useRef();

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e)=>{
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    }
    else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }

}

  
  const handlePostSubmission =() => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if(!comment || !name || !email){
        setError(true);
        return;
    }
    const commentObj = { name, email, comment, slug };

    if (storeData){
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
    }
    else{
      localStorage.removeItem('name')
      localStorage.removeItem('email')

    }
    submitComment(commentObj)
    .then((res)=>{

      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }))


      setshowSuccessMessage(true)
      setTimeout(() => {
        setshowSuccessMessage(false)
      }, 3000);
    }
  });
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className=" grid grid-cols-1 gap-4 mb-4">
        <textarea 
        onChange={onInputChange}
        // value={'formData.comment'}
        // ref={commentEl} 
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        placeholder="Comment"
        name="comment"
        />
      </div>
      <div className="lg:grid-cols-2 grid grid-cols-1 gap-4 mb-4">
        <input 
        onChange={onInputChange}
        // value={'formData.name'}
        type="text" 
        // ref={nameEl}
        placeholder="Name"
        name="name"
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
  
        <input 
        onChange={onInputChange}
        // value={'formData.email'}
        type="email" 
        // ref={emailEl}
        placeholder="Email"
        name="email"
        className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
        />
        </div>
        <div className=" grid grid-cols-1 gap-4 mb-4">
            <div>
              <input 
              onChange={onInputChange}
              // ref={storeDataEl} 
              type="checkbox" id="storeData" name="storeData" value="true" />
              <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save email</label>
            </div>
        </div>
        {error && <p className="text-xs text-red-500">error</p>}
      <div className="mt-8">
        <button className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-600 text-lg rounded-full text-white px-8 py-3" 
        type="button" 
        onClick={handlePostSubmission}
        > 
        Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted Successful</span>}
      </div>
    </div>
  );
};

export default CommentsForm;