import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { signOut } from '../redux/user/userSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut= async()=>{
        try{
            const res = await fetch("/api/auth/signout", {
                method: "POST", // Ensure it's a POST request for better security
            });
            dispatch(signOut())
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="w-full fixed flex justify-center items-center top-0 lex p-5 px-0 sm:px-20">
    <div className='flex justify-between p-3 px-5 sm:px-8 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] rounded-full  border-2'>
      <p onClick={()=>navigate('/')}  className=' text-base font-medium  cursor-pointer'>Home</p>
      <p onClick={()=>navigate('/profile')}  className=' text-base font-medium  cursor-pointer' >Profile</p>
      <p onClick={handleSignOut}  className=' text-base font-medium  cursor-pointer'>Sign out</p>
    </div>
     </div>
  )
}

export default Header