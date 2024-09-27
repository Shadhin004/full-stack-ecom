import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '../config';
import { CreateUserDto, UserDetailedDto } from '../types/user';
import { enqueueSnackbar } from 'notistack';
import { ALERT_SEVERITY } from '../config';
import { RootState } from '../store';

// Interface for user state
interface UserState {
    currentUser: UserDetailedDto | null;
    loading: boolean;
    error: any;
}

// Initial state
const initialState: UserState = {
    currentUser: null,
    loading: false,
    error: null,
};

export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData: CreateUserDto, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/v1/Users/profile`, userData);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);


// Login user
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseUrl}/Auth/login`, loginData);
            localStorage.setItem('authToken', response.data.token);

            await dispatch(fetchUserDetails());

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);



// Fetch user details
export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async (_, { getState, rejectWithValue }) => {
        const state: RootState = getState() as RootState;
        const authToken = localStorage.getItem("authToken") || '';
        try {
            const response = await axios.get(`${baseUrl}/v1/Users/profile`, {
                headers: {
                    Authorization: "Bearer " + authToken,
                },
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(error)
            localStorage.removeItem("authToken")
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(
                `${baseUrl}/Auth/logout`, 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            localStorage.removeItem('authToken');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);


// Slice
const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle pending state
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Handle fulfilled state
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.users.push(action.payload);
                alert('User created successfully');
            })
            // Handle rejected state
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(`Error creating user: ${state.error}`);
                enqueueSnackbar(`Error while creating users : ${state.error?.title}`, {
                    variant: ALERT_SEVERITY.error,
                });
            });

        // Login user
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('authToken', action.payload.token);
                enqueueSnackbar(`Login successfull`, {
                    variant: ALERT_SEVERITY.success,
                });
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(`Error logging in user: ${state.error}`);
                enqueueSnackbar(`Login error: ${state.error?.title}`, {
                    variant: ALERT_SEVERITY.error,
                });
            });

        // Logout user
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.removeItem('authToken');
                enqueueSnackbar(`Logout successfull`, {
                    variant: ALERT_SEVERITY.success,
                });
                window.location.replace('/login')
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(`Error logging in user: ${state.error}`);
                enqueueSnackbar(`Logout error: ${state.error?.title}`, {
                    variant: ALERT_SEVERITY.error,
                });
            });

        // Handle fetch user details
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; // Set user details
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
