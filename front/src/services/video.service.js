import axios from 'axios';

const videoService = {
  getAll: async () => {
    let res = await axios.get(`/api/videos`);
    return res.data || [];
  },
  add: async (data) => {
    let res = await axios.post(`/api/videos`, data)
    return res.data || {};
  },
  update: async (id, data) => {
    let res = await axios.put(`/api/videos`, { id, data })
    return res.data || {};
  },
  delete: async (id) => {
    let res = await axios.delete(`/api/videos/${id}`);
    return res.data || [];   
  },
  getById: async (id) => {
    let res = await axios.get(`/api/videos/${id}`);
    return res.data || [];
  },
  getAllCategoryId: async (id) => {
    let res = await axios.get(`/api/videos/category/${id}`);
    return res.data || [];
  },
}

export default videoService;