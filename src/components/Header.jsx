import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){ 
  const navigate = useNavigate()
  function logout(){ localStorage.removeItem('token'); navigate('/') }
  return (
    <header className="bg-white shadow-sm mb-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link to="/dashboard" className="text-xl font-semibold text-indigo-600">Student Service</Link>
        <div className="space-x-2">
          <Link to="/students/new" className="px-3 py-1 bg-indigo-600 text-white rounded">Add Student</Link>
          <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
        </div>
      </div>
    </header>
  )
}