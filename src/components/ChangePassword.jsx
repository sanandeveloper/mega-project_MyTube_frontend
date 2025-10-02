import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changePassword } from './store/authSlice'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    const dispatch=useDispatch()
    const navigate=useNavigate()

     const[form,setForm]=useState({
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",

     })

     const  handleChange=(e)=>{


         const {name,value}=e.target

         setForm((prev)=>({
            ...prev,
            [name]:value
     }))
     }

     const isChanged= form.newPassword==form.confirmPassword

     const updatePassword=()=>{

        if (isChanged) {
            dispatch(changePassword(form))
            .unwrap()
        }
      

        
     }



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Change Password
        </h2>

        <div className="flex flex-col gap-4">
          <label className="text-gray-600 font-medium">Current Password</label>
          <input
            type="password"
            name='oldPassword'
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition text-gray-800 placeholder-gray-400"
          />

          <label className="text-gray-600 font-medium">New Password</label>
          <input
            type="password"
            name='newPassword'
            placeholder="Enter new password"
             value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition text-gray-800 placeholder-gray-400"
          />

          <label className="text-gray-600 font-medium">Confirm New Password</label>
          <input
            type="password"
            name='confirmPassword'
            placeholder="Re-enter new password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition text-gray-800 placeholder-gray-400"
          />
        </div>

        <div className="mt-6 flex justify-end">
         { isChanged && <button
          onClick={updatePassword}
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>}
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
