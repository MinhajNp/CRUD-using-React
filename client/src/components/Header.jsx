import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
  return (
    <div className="w-full fixed flex justify-center items-center top-0 lex p-5 px-0 sm:px-20">
    <div className='flex justify-between p-3 px-5 sm:px-8 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] rounded-full  border-2'>
      <p onClick={()=>navigate('/')}  className=' text-base font-medium  cursor-pointer'>Home</p>
      <p onClick={()=>navigate('/profile')}  className=' text-base font-medium  cursor-pointer' >Profile</p>
      <p  className=' text-base font-medium  cursor-pointer'>Sign out</p>
    </div>
     </div>
  )
}

export default Header