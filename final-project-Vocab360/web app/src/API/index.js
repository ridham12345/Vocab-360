import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});


export const signIn = (formData) => API.post('/signin', formData);
export const signUp = (formData) => API.post('/users', formData);
export const getDecksProgress = () => API.get('/userdecks');
export const getWords = (formData) => API.post('/userWordList', formData);
export const updateWords = (formData) => API.put('/userWordList',formData);
export const updateUserDetails = (formData) => API.put('/user/'+formData.get("id"), formData);
export const getallWords = () => API.get('/words');
export const getallUsers = () => API.get('/users');
export const deleteword = (id) => API.delete('/word/'+id);
export const addword = (formData) => API.post('/words', formData);
export const saveword = (formData) => API.put('/word/'+formData.id, formData);
export const deleteuser = (id) => API.delete('/user/'+id);
export const getProfileWords = (formData) => API.post('/userProfile', formData);