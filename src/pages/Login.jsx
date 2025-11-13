import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handle(e) {
    e.preventDefault()
    // simple mock check - replace with real API later
    if (email === 'admin@c2tc.com' && password === 'admin123') {
      localStorage.setItem('token', 'mock-jwt-token')
      navigate('/dashboard')
    } else {
      alert('Invalid credentials. Try admin@c2tc.com / admin123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handle} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Service - Login</h2>
        <label className="block mb-2"><div className="text-sm">Email</div><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" type="email" required /></label>
        <label className="block mb-4"><div className="text-sm">Password</div><input value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" type="password" required /></label>
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}