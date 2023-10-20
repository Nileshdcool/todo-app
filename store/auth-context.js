import AsyncStorage from '@react-native-async-storage/async-storage';

import { createContext, useState, useReducer } from 'react';

export const AuthContext = createContext({

  // auth variables & functions
  token: '',
  userId: '',
  isAuthenticated: false,
  authenticate: (token,localId) => { },
  logout: () => { },

  // tasks variable and functions
  tasks: [],
  addTask: ({ description, date }) => { },
  settasks: (tasks) => { },
  deleteTask: (id) => { },
  updateTask: (id, { description, date}) => { },
});

// this is for updating context api state as and when required
function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
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

// context api provider for managing complete state of the application
function AuthContextProvider({ children }) {
  // state variables
  const [authToken, setAuthToken] = useState();
  const [localId, setLocalId] = useState();
  const [tasksState, dispatch] = useReducer(tasksReducer, []);

  function authenticate(token,localId) {
    setAuthToken(token);
    //TODO: might not be needed, but need to check if setting multiple state variable is causing any delay for loading it for the first time
    setTimeout(() => {
      setLocalId(localId);
    }, 10000);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('localId', localId);
  }

  function logout() {
    setAuthToken(null);
    setLocalId(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('localId');
  }

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
    // auth state variables
    token: authToken,
    userId: localId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    // tasks state variables
    tasks: tasksState,
    settasks: settasks,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
