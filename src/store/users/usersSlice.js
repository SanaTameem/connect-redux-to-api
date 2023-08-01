import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    // console.log(data.results);
    return data.results;
  } catch (error) {
    // console.error('Error in catch block ',error);
    return (rejectWithValue.payload('Failed to fetch the users.'));
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  // reducers:{

  // },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsers.pending, (state) => {
          state.isLoading = true;
        },
      )
      .addCase(
        fetchUsers.fulfilled, (state, action) => {
          state.isLoading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { fetchUsers };
export default userSlice;
