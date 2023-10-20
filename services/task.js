import axios from 'axios';
const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL;

// this is for storig data in firebase relatime database
export async function storeTask(taskData) {
  const {token} = taskData;
  const response = await axios.post(BACKEND_URL + '/tasks.json?auth='+token, taskData);
  const id = response.data.name;
  return id;
}

// this is for extracting all user-specific tasks from firebaseDB
export async function fetchTasks(token, userId) {
  // console.log('token',token);
  // console.log('userId',userId);
  // console.log(BACKEND_URL + '/tasks.json?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"');
  const response = await axios.get(BACKEND_URL + '/tasks.json?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"');
  const tasks = [];
  for (const key in response.data) {
    const taskObj = {
      id: key,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      status: response.data[key].status,
      userId: response.data[key].userId,
    };
    tasks.push(taskObj);
  }
  return tasks;
}

// this is for updating specific tasks
export function updateTask(id, taskData) {
  const {token} = taskData;
  return axios.put(BACKEND_URL + `/tasks/${id}.json?auth=`+token, taskData);
}

// this is for deleting specific tasks
export function deleteTask(id, token) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json?auth=`+token);
}