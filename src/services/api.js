import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8085' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default api

export const studentsAPI = {
  list: () => api.get('/students').then(r=>r.data),
  get: id => api.get(`/students/${id}`).then(r=>r.data),
  create: data => api.post('/students', data).then(r=>r.data),
  update: (id,data) => api.put(`/students/${id}`, data).then(r=>r.data),
  remove: id => api.delete(`/students/${id}`).then(r=>r.data)
}