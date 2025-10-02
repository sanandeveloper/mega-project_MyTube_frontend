import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

  const navigate=useNavigate()
  
    const dispatch=useDispatch()

    const logout=()=>{
      dispatch(logoutUser())
      navigate('/login')
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