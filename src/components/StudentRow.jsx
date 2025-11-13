import React from 'react'
import { Link } from 'react-router-dom'

export default function StudentRow({ s, onDelete }) {
  return (
    <tr className="border-b">
      <td className="p-2">{s.id}</td>
      <td className="p-2">{s.name}</td>
      <td className="p-2">{s.email}</td>
      <td className="p-2">{s.department}</td>
      <td className="p-2">{s.cgpa}</td>
      <td className="p-2">{s.company_name}</td>
      <td className="p-2">{s.status}</td>
      <td className="p-2">{s.year_of_study}</td>
      <td className="p-2">
        <Link className="text-indigo-600 mr-2" to={`/students/${s.id}/edit`}>Edit</Link>
        <button className="text-red-600" onClick={()=>onDelete(s.id)}>Delete</button>
      </td>
    </tr>
  )
}