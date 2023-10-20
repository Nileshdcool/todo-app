import axios from 'axios';
const BACKEND_URL ='https://todo-app-cedca-default-rtdb.asia-southeast1.firebasedatabase.app';


export async function storeTask(taskData) {
  console.log(taskData);
  const {token} = taskData;
  const response = await axios.post(BACKEND_URL + '/tasks.json?auth='+token, taskData);
  const id = response.data.name;
  return id;
}

export async function fetchTasks(token, userId) {
  const response = await axios.get(BACKEND_URL + '/tasks.json?auth='+token);
  const tasks = [];
  for (const key in response.data) {
    const taskObj = {
      id: key,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    tasks.push(taskObj);
  }
  return tasks;
}

export function updateTask(id, taskData) {
  const {token} = taskData;
  return axios.put(BACKEND_URL + `/tasks/${id}.json?auth=`+token, taskData);
}

export function deleteTask(id, token) {
  return axios.delete(BACKEND_URL + `/tasks/${id}.json?auth=`+token);
}