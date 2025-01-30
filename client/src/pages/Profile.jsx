import React, { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateUserStart, updateUserSuccess, updateUserFailure,
         deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice'


function Profile() {
    const fileRef = useRef(null)
    const [image, setImage]= useState(undefined)
    const {currentUser, loading, error} =useSelector(state => state.user)
    const [formData, setFormData]= useState({})
    const [updateSuccess, setUpdateSuccess]=useState(false)
    
    const dispatch=useDispatch()
    

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
            console.log(uploadedImageURL.url, "handleUpload")
            return uploadedImageURL.url;
        
    }

    // 
    const handleChange =(e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }


    // update profile
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            dispatch(updateUserStart())

            let updatedFormData = { ...formData }; // Copy existing form data

            // update profile-image(storing in cloudinary)
            if (image) {
                const profileUrl = await handleFileUpload(image);
                console.log(profileUrl);
                if (profileUrl) {
                    updatedFormData.profilePicture = profileUrl; // Directly update the formData copy
                    setImage(null)
                   
                }
            }
            console.log(updatedFormData)

            const res = await fetch(`/api/user/update/${currentUser._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData)
            });
            const data = await res.json();
            if(data.success){            //there is no success feild if the data successfully updated, there is if it fails
                console.log(data)
                console.log("updated")
                dispatch(updateUserFailure(data.error));
                return
            }
            console.log(data)
            dispatch(updateUserSuccess(data))
            console.log("updated")
            setUpdateSuccess(true);
        }catch(error){
            console.log(error)
        }
    }

    const handleDeleteAccount= async()=>{
        try{
            dispatch(deleteUserStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if(!data.success) {
                dispatch(deleteUserFailure(data.error))
                return;
            }
            dispatch(deleteUserSuccess())
        }catch(error){
            console.log(error)
            dispatch(deleteUserFailure(error || "Something went wrong"));
        }
    }

    
  return (
    <>
    <Header/>
    <div className="p-3 max-w-lg mx-auto sm:w-[450px] h-full sm:h-[450px]">
  <h1 className="text-3xl font-semibold text-center mt-5 my-7">Profile</h1>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
      type="file"
      ref={fileRef}
      hidden
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
    
    <img
      src={image ? URL.createObjectURL(image) : currentUser.profilePicture || 'https://t4.ftcdn.net/jpg/05/69/90/73/360_F_569907313_fl7W3gX7YIVw2r05B4Ij1c21ix4xRUqD.jpg'}
      alt="profile"
      className="h-34 w-34 self-center cursor-pointer rounded-full object-cover mt-2"
      onClick={() => fileRef.current.click()}
    />
    
    <input
      defaultValue={currentUser.username}
      type="text"
      id="username"
      placeholder="Username"
      className="bg-slate-100 rounded-lg p-3"
      onChange={handleChange}
    />
    <input
      defaultValue={currentUser.email}
      type="email"
      id="email"
      placeholder="Email"
      className="bg-slate-100 rounded-lg p-3"
      onChange={handleChange}
    />
    <input
      type="password"
      id="password"
      placeholder="Password"
      className="bg-slate-100 rounded-lg p-3"
      onChange={handleChange}
    />
    
    <button
      disabled={loading}
      className="bg-black text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-60"
    >
      {loading ? 'Loading....' : 'Update'}
    </button>
  </form>
  
  <div className="flex justify-center mt-5">
    <span
      onClick={handleDeleteAccount}
      className="text-red-700 cursor-pointer hover:underline"
    >
      Delete Account
    </span>
  </div>
  
  <p className="text-red-700 mt-5">
    {error && 'Something went wrong!'}
  </p>
  
  <p className="text-green-700 mt-5">
    {updateSuccess && 'Profile updated Successfully'}
  </p>
</div>

    </>
    
  )
}

export default Profile