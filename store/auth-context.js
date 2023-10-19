import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useState, useReducer } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { },
  tasks: [],
  addTask: ({ description, date }) => { },
  settasks: (tasks) => { },
  deleteTask: (id) => { },
  updateTask: (id, { description, date }) => { },
});

function tasksReducer(state, action) {
  
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      console.log('hello',action);
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableTaskIndex = state.findIndex(
        (task) => task.id === action.payload.id
      );
      const updatableTask = state[updatableTaskIndex];
      const updatedItem = { ...updatableTask, ...action.payload.data };
      const updatedtasks = [...state];
      updatedtasks[updatableTaskIndex] = updatedItem;
      return updatedtasks;
    case 'DELETE':
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }



  const [tasksState, dispatch] = useReducer(tasksReducer, []);

  function addTask(taskData) {
    dispatch({ type: 'ADD', payload: taskData });
  }

  function settasks(tasks) {
    dispatch({ type: 'SET', payload: tasks });
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateTask(id, taskData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: taskData } });
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    tasks: tasksState,
    settasks: settasks,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
