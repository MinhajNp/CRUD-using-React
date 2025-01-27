import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate()
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
        <form className='flex flex-col gap-4'>
            <input type="text" placeholder='Username'
            id='username'className='bg-slate-100 p-3 rounded-lg' />
              <input type="email" placeholder='email'
            id='email'className='bg-slate-100 p-3 rounded-lg' />
              <input type="password" placeholder='password'
            id='password'className='bg-slate-100 p-3 rounded-lg' />
            <button className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-80' >Sign up</button>

        </form>
        <div className='flex gap-2 mt-5 justify-center items-center'>
            <p>Have an account?</p>
            <span onClick={()=> navigate('/sign-in')} className='text-blue-500 cursor-pointer'>Sign in</span>
        </div>
    </div>
  )
}

export default SignUp