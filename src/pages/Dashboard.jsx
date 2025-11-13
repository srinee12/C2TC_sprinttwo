import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { studentsAPI } from '../services/api'
import StudentRow from '../components/StudentRow'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [students, setStudents] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{ load() },[])

  async function load(){
    try{
      setLoading(true)
      const data = await studentsAPI.list()
      setStudents(Array.isArray(data)?data:[])
    }catch(e){
      alert('Failed to load: '+e.message)
    }finally{ setLoading(false) }
  }

  async function handleDelete(id){
    if(!confirm('Delete this student?')) return
    try{
      await studentsAPI.remove(id)
      setStudents(prev=>prev.filter(s=>s.id!==id))
    }catch(e){ alert('Delete failed: '+e.message) }
  }

  const filtered = students.filter(s => !q || (s.name && s.name.toLowerCase().includes(q.toLowerCase())))

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Students</h1>
          <div className="flex gap-2">
            <button onClick={()=>navigate('/students/new')} className="px-3 py-1 bg-green-600 text-white rounded">New</button>
          </div>
        </div>
        <div className="mb-3 flex gap-2">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name" className="flex-1 p-2 border rounded" />
          <button onClick={load} className="px-3 py-1 border rounded">Refresh</button>
        </div>
        {loading ? <div>Loading…</div> : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">ID</th><th className="p-2 text-left">Name</th><th className="p-2 text-left">Email</th><th className="p-2 text-left">Department</th><th className="p-2">CGPA</th><th className="p-2">Company</th><th className="p-2">Status</th><th className="p-2">Year</th><th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s=> <StudentRow key={s.id} s={s} onDelete={handleDelete} />)}
                {filtered.length===0 && <tr><td colSpan="9" className="p-4 text-center text-gray-500">No students found.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}