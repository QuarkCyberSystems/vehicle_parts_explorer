import axios from 'axios';

const apiClient = axios.create({
  // Now we just use the relative path /api/v1
  baseURL: 'https://parts.quarkcs.com/api/v1',
  auth: {
    username: 'erpnextdev',
    password: 'We!c@me!2345'
  },
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;
