import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

// below message is for handling both login and signup flow and validating the credentials
async function authenticate(mode, email, password) {
  const url = `${process.env.EXPO_PUBLIC_AUTH_URL}${mode}?key=${API_KEY}`;

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