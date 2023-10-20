import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  storeTask,
  fetchTasks,
  updateTask,
  deleteTask,
} from '../services/task'; // Import  functions

const mock = new MockAdapter(axios);
const BACKEND_URL = 'http://example.com'; // Replace with  mock URL

describe('Unit tests for Axios functions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('should store a task', async () => {
    const taskData = {
      token: 'yourToken',
      // other data here
    };
    const responseData = { name: 'taskId' };

    mock.onPost(`${BACKEND_URL}/tasks.json?auth=yourToken`).reply(200, responseData);

    const taskId = await storeTask(taskData);

    expect(taskId).toBe(responseData.name);
  });

  it('should fetch tasks', async () => {
    const token = 'yourToken';
    const userId = 'yourUserId';
    const responseData = {
      taskId1: { date: '2023-10-20', description: 'Task 1', status: 'Pending', userId },
      taskId2: { date: '2023-10-21', description: 'Task 2', status: 'Completed', userId },
      // Add more tasks here if needed
    };

    mock
      .onGet(`${BACKEND_URL}/tasks.json?auth=yourToken&orderBy="userId"&equalTo="yourUserId"`)
      .reply(200, responseData);

    const tasks = await fetchTasks(token, userId);

    expect(tasks).toEqual([
      {
        id: 'taskId1',
        date: new Date('2023-10-20'),
        description: 'Task 1',
        status: 'Pending',
        userId,
      },
      {
        id: 'taskId2',
        date: new Date('2023-10-21'),
        description: 'Task 2',
        status: 'Completed',
        userId,
      },
    ]);
  });

  it('should update a task', async () => {
    const taskId = 'taskIdToUpdate';
    const taskData = {
      token: 'yourToken',
      // other data here
    };

    mock.onPut(`${BACKEND_URL}/tasks/${taskId}.json?auth=yourToken`).reply(200);

    const response = await updateTask(taskId, taskData);

    expect(response.status).toBe(200);
  });

  it('should delete a task', async () => {
    const taskId = 'taskIdToDelete';
    const token = 'yourToken';

    mock.onDelete(`${BACKEND_URL}/tasks/${taskId}.json?auth=yourToken`).reply(200);

    const response = await deleteTask(taskId, token);

    expect(response.status).toBe(200);
  });
});
