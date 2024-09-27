import configureMockStore from 'redux-mock-store'; // Mock store for Redux
import thunk from 'redux-thunk'; // Middleware for handling async actions
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createUser, loginUser, fetchUserDetails, logoutUser } from './UserSlice';
import { baseUrl } from '../config';

const mockStore = configureMockStore([thunk]); // Applying thunk middleware

describe('User Slice Async Actions', () => {
    let mockAxios;
    let store;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = mockStore({
            user: {
                currentUser: null,
                loading: false,
                error: null,
            }
        });
    });

    afterEach(() => {
        mockAxios.reset();
    });

    describe('createUser thunk', () => {
        it('dispatches fulfilled when creating a user successfully', async () => {
            const mockUserData = { name: 'John Doe' };
            const mockResponse = { id: 1, ...mockUserData };

            mockAxios.onPost(`${baseUrl}/v1/Users/profile`).reply(200, mockResponse);

            await store.dispatch(createUser(mockUserData));

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/createUser/pending');
            expect(actions[1].type).toBe('user/createUser/fulfilled');
        });

        it('dispatches rejected when creating a user fails', async () => {
            mockAxios.onPost(`${baseUrl}/v1/Users/profile`).reply(500, { error: 'Failed to create user' });

            await store.dispatch(createUser({ name: 'John Doe' }));

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/createUser/pending');
            expect(actions[1].type).toBe('user/createUser/rejected');
            expect(actions[1].payload).toEqual({ error: 'Failed to create user' });
        });
    });

    describe('loginUser thunk', () => {
        it('dispatches fulfilled when logging in successfully', async () => {
            const loginData = { email: 'test@test.com', password: 'password' };
            const mockResponse = { token: 'some-token' };

            mockAxios.onPost(`${baseUrl}/Auth/login`).reply(200, mockResponse);

            await store.dispatch(loginUser(loginData));

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/loginUser/pending');
            expect(actions[1].type).toBe('user/loginUser/fulfilled');
            expect(localStorage.getItem('authToken')).toBe('some-token');
        });

        it('dispatches rejected when login fails', async () => {
            mockAxios.onPost(`${baseUrl}/Auth/login`).reply(500, { error: 'Login failed' });

            await store.dispatch(loginUser({ email: 'test@test.com', password: 'password' }));

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/loginUser/pending');
            expect(actions[1].type).toBe('user/loginUser/rejected');
        });
    });

    describe('fetchUserDetails thunk', () => {
        it('dispatches fulfilled when fetching user details successfully', async () => {
            const mockResponse = { id: 1, name: 'John Doe' };
            localStorage.setItem('authToken', 'some-token');

            mockAxios.onGet(`${baseUrl}/v1/Users/profile`).reply(200, mockResponse);

            await store.dispatch(fetchUserDetails());

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/fetchUserDetails/pending');
            expect(actions[1].type).toBe('user/fetchUserDetails/fulfilled');
        });

        it('dispatches rejected when fetching user details fails', async () => {
            localStorage.setItem('authToken', 'some-token');

            mockAxios.onGet(`${baseUrl}/v1/Users/profile`).reply(500, { error: 'Failed to fetch details' });

            await store.dispatch(fetchUserDetails());

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/fetchUserDetails/pending');
            expect(actions[1].type).toBe('user/fetchUserDetails/rejected');
        });
    });

    describe('logoutUser thunk', () => {
        it('dispatches fulfilled when logging out successfully', async () => {
            const mockResponse = { message: 'Logged out successfully' };
            localStorage.setItem('authToken', 'some-token');

            mockAxios.onPost(`${baseUrl}/Auth/logout`).reply(200, mockResponse);

            await store.dispatch(logoutUser());

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/logoutUser/pending');
            expect(actions[1].type).toBe('user/logoutUser/fulfilled');
            expect(localStorage.getItem('authToken')).toBeNull();
        });

        it('dispatches rejected when logging out fails', async () => {
            localStorage.setItem('authToken', 'some-token');

            mockAxios.onPost(`${baseUrl}/Auth/logout`).reply(500, { error: 'Logout failed' });

            await store.dispatch(logoutUser());

            const actions = store.getActions();
            expect(actions[0].type).toBe('user/logoutUser/pending');
            expect(actions[1].type).toBe('user/logoutUser/rejected');
        });
    });
});
