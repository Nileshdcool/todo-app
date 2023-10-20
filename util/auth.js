import axios from 'axios';

const API_KEY = 'AIzaSyC55kFZdFgHbm7W1wQYck3Qpcuf0dcqopk';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  
  const authDetails = {
    token: response.data.idToken,
    localId: response.data.localId
  }
  return authDetails;
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}