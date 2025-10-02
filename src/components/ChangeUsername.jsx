import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { getCurrentUser, updateUsername } from './store/authSlice'

function ChangeUsername() {
  const [update, setUpdate] = useState('')
  const { user, loading } = useSelector((state) => state.auth)
  const dispatch=useDispatch()

  const changeUsername=()=>{
    console.log("update",update)
    
    if (update) {
      dispatch(updateUsername(update))
       .unwrap()
       .then(()=>{
         dispatch(getCurrentUser())
       })
    }
         

  }


  useEffect(() => {
    if (user?.username) {
      setUpdate(user.username)
    }
  }, [user])




  const isChanged=update.trim() !== user.username

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Your Username
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-gray-600 font-medium">Enter New Username</label>
          <input
            type="text"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition text-gray-800 placeholder-gray-400"
            placeholder="Enter username..."
            disabled={loading}
          />
        </div>


        <div className="mt-6 flex justify-end">


          { loading ? <Button>Saving</Button> : isChanged && (

            <Button onClick={changeUsername}  disabled={loading} >Save</Button>
            
          ) }

        </div>
      </div>
    </div>
  )
}

export default ChangeUsername
