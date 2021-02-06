import axios from 'axios';

const categoryService = {
  getAll: async () => {
    let res = await axios.get(`/api/categories`);
    return res.data || [];
  },
  add: async (data) => {
    let res = await axios.post(`/api/categories`, data)
    return res.data || {};
  },
  update: async (id, data) => {
    let res = await axios.put(`/api/categories/`, { id, data })
    return res.data || {};
  },
  delete: async (id) => {
    let res = await axios.delete(`/api/categories/${id}`);
    return res.data || [];   
  },
  getById: async (id) => {
    let res = await axios.get(`/api/categories/${id}`);
    return res.data || [];
  },
  getAllByParentId: async (id) => {
    let res = await axios.get(`/api/categories/parent/${id}`);
    return res.data || [];
  },
}

export default categoryService;