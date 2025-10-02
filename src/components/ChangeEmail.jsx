import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { updateEmail } from './store/authSlice'

function ChangeEmail() {
  const [editEmail, setEmail] = useState('')

  const { loading, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const changeEmail = () => {
    if (editEmail) {
      dispatch(updateEmail(editEmail))
    }
  }

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
  }, [user])

  const isChanged = editEmail.trim() !== user.email

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Your Email
        </h2>

        <div className="flex flex-col gap-3">
          <label className="text-gray-600 font-medium">Enter New Email</label>
          <input
            type="email"
            disabled={loading}
            value={editEmail}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition text-gray-800 placeholder-gray-400 disabled:bg-gray-100"
            placeholder="Enter your email..."
          />
        </div>

        <div className="mt-6 flex justify-end">
          {loading ? (
            <Button className="px-6 py-2 rounded-xl bg-gray-400 text-white cursor-not-allowed">
              Saving...
            </Button>
          ) : (
            isChanged && (
              <Button
                onClick={changeEmail}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ChangeEmail
