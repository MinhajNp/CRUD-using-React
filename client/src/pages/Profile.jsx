import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'


function Profile() {
    const fileRef = useRef(null)
    const [image, setImage]= useState(undefined)
    const {currentUser} =useSelector(state => state.user)
    

    const handleFileUpload = async (file) => {
        if(!file) return

        const data = new FormData()
        data.append('file', file)
        data.append("upload_preset", "olx-clone-images")
        data.append("cloud_name", "doncxzjmz")

        const res = await fetch("https://api.cloudinary.com/v1_1/doncxzjmz/image/upload",{
            method:"POST",
            body: data
        })
            const uploadedImageURL = await res.json()
            console.log(uploadedImageURL.url)
        
    }
  return (
    <>
    <Header/>
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl font-semibold text-center mt-25
        my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" ref={fileRef} hidden accept='image/*' 
            onChange={(e)=> setImage(e.target.files[0])}/>
            <img src={image ? URL.createObjectURL(image) : currentUser.profilePicture } alt="profile"
             className='h-34 w-34 self-center cursor-pointer rounded-full object-cover mt-2'
             onClick={()=> fileRef.current.click()}/>
             <input defaultValue={currentUser.username} type="text" id='username' placeholder='Username'
              className='bg-slate-100 rounded-lg p-3' />
             <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email'
              className='bg-slate-100 rounded-lg p-3' />
              <input  type="password" id='password' placeholder='Password'
              className='bg-slate-100 rounded-lg p-3' />
              <button className=' bg-black text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-60'>Update</button>
        </form>
        <div className='flex justify-cente mt-5'>
            <span className='text-red-700 cursor-pointer'>Delete Account</span>
        </div>
    </div>
    </>
    
  )
}

export default Profile