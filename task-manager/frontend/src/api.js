import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getTasks    = ()         => API.get("/tasks");
export const createTask  = (data)     => API.post("/tasks", data);
export const updateTask  = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask  = (id)       => API.delete(`/tasks/${id}`);
