import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createUser, login } from '../services/auth'; // Import your authentication functions

describe('Authentication Functions', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should create a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the POST request to the authentication endpoint
    mockAxios.onPost(process.env.EXPO_PUBLIC_AUTH_URL + 'signUp?key=' + process.env.EXPO_PUBLIC_API_KEY).reply(200, {
      idToken: 'fakeToken123',
      localId: 'fakeLocalId456',
    });

    const authDetails = await createUser(email, password);

    expect(authDetails).toEqual({
      token: 'fakeToken123',
      localId: 'fakeLocalId456',
    });
  });

  it('should log in a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    // Mock the POST request to the authentication endpoint
    mockAxios.onPost(process.env.EXPO_PUBLIC_AUTH_URL + 'signInWithPassword?key=' + process.env.EXPO_PUBLIC_API_KEY).reply(200, {
      idToken: 'fakeToken789',
      localId: 'fakeLocalId101',
    });

    const authDetails = await login(email, password);

    expect(authDetails).toEqual({
      token: 'fakeToken789',
      localId: 'fakeLocalId101',
    });
  });
});
