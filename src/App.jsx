import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import StudentForm from './pages/StudentForm.jsx'

function Private({ children }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Private><Dashboard /></Private>} />
      <Route path="/students/new" element={<Private><StudentForm /></Private>} />
      <Route path="/students/:id/edit" element={<Private><StudentForm edit /></Private>} />
    </Routes>
  )
}