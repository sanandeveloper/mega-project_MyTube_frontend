import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

  const navigate=useNavigate()
  const {loading}=useSelector((state)=>state.auth)
  
    const dispatch=useDispatch()

    const logout=()=>{
      dispatch(logoutUser())
      .unwrap()
      .then(()=>{
         navigate('/login')
      })
     
    }
  
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-30 z-50">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  return (
    <div>
        
        <div onClick={logout}>
            <button >Logout</button>
        </div>
    </div>
  )
}

export default LogoutBtn