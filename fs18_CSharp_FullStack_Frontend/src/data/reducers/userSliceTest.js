import usersReducer, { createUser, loginUser, logoutUser, fetchUserDetails } from './UserSlice';

describe('User Slice Reducer', () => {
    const initialState = {
        currentUser: null,
        loading: false,
        error: null,
    };

    it('should handle createUser.pending', () => {
        const action = { type: createUser.pending.type };
        const state = usersReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('should handle createUser.fulfilled', () => {
        const action = { type: createUser.fulfilled.type, payload: { id: 1, name: 'John Doe' } };
        const state = usersReducer(initialState, action);
        expect(state.loading).toBe(false);
    });

    it('should handle createUser.rejected', () => {
        const action = { type: createUser.rejected.type, payload: 'Error creating user' };
        const state = usersReducer(initialState, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe('Error creating user');
    });

    // Similarly, you can write tests for loginUser, logoutUser, and fetchUserDetails
});
