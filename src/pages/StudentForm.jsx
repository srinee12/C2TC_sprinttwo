import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { studentsAPI } from '../services/api'

export default function StudentForm({ edit=false }){
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', department:'', cgpa:'', company_name:'', status:'Placed', year_of_study:'' })
  const [loading, setLoading] = useState(false)

  useEffect(()=>{ if(id && id!=='new'){ load() } },[id])

  async function load(){
    try{
      setLoading(true)
      const data = await studentsAPI.get(id)
      setForm({ name:data.name||'', email:data.email||'', department:data.department||'', cgpa:data.cgpa||'', company_name:data.company_name||'', status:data.status||'Placed', year_of_study:data.year_of_study||'' })
    }catch(e){ alert('Load failed: '+e.message) }finally{ setLoading(false) }
  }

  function onChange(e){ const { name, value } = e.target; setForm(f=>({ ...f, [name]: value })) }

  function validate(){
    if(!form.name.trim()) return 'Name required'
    if(!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email required'
    if(form.cgpa!=='' && (isNaN(Number(form.cgpa)) || Number(form.cgpa)<0 || Number(form.cgpa)>10)) return 'CGPA 0-10'
    if(form.year_of_study!=='' && (!Number.isInteger(Number(form.year_of_study)) || Number(form.year_of_study)<1 || Number(form.year_of_study)>4)) return 'Year 1-4'
    return null
  }

  async function submit(e){
    e.preventDefault()
    const v = validate(); if(v){ alert(v); return }
    try{
      setLoading(true)
      if(id && id!=='new') await studentsAPI.update(id, form)
      else await studentsAPI.create(form)
      navigate('/dashboard')
    }catch(e){ alert('Save failed: '+e.message) }finally{ setLoading(false) }
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-3">{id && id!=='new' ? 'Edit Student' : 'Add Student'}</h2>
        <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <label><div className="text-sm">Name</div><input name="name" value={form.name} onChange={onChange} className="w-full p-2 border rounded" required /></label>
            <label><div className="text-sm">Email</div><input name="email" value={form.email} onChange={onChange} className="w-full p-2 border rounded" required /></label>
            <label><div className="text-sm">Department</div><input name="department" value={form.department} onChange={onChange} className="w-full p-2 border rounded" /></label>
            <label><div className="text-sm">Company Name</div><input name="company_name" value={form.company_name} onChange={onChange} className="w-full p-2 border rounded" required /></label>
            <label><div className="text-sm">CGPA</div><input name="cgpa" value={form.cgpa} onChange={onChange} type="number" step="0.01" min="0" max="10" className="w-full p-2 border rounded" /></label>
            <label><div className="text-sm">Year of Study</div><input name="year_of_study" value={form.year_of_study} onChange={onChange} type="number" min="1" max="4" className="w-full p-2 border rounded" /></label>
          </div>
          <label><div className="text-sm">Status</div>
            <select name="status" value={form.status} onChange={onChange} className="w-full p-2 border rounded">
              <option>Placed</option>
              <option>Not Placed</option>
              <option>Internship</option>
            </select>
          </label>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? 'Saving…' : 'Save'}</button>
            <button type="button" onClick={()=>navigate('/dashboard')} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}