import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { changeName } from './store/authSlice'

function ChangeName() {
 const [name, setName] = useState("")
  const { user, loading } = useSelector((state) => state.auth)
  const dispatch=useDispatch()

  const handleNameChange=()=>{

     if (name) {
        dispatch(changeName(name))
     }

  }

  

  useEffect(() => {
    if (user?.fullName) {
      setName(user.fullName)
    }
  }, [user])

  const ischnaged = name.trim() !== user.fullName

 


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Your Name
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-gray-600 font-medium">Enter New Name</label>
          <input
            type="text"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="mt-6 flex justify-end">
          {loading ? <Button>Saving</Button>:ischnaged && (
            <Button onClick={handleNameChange} className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChangeName
