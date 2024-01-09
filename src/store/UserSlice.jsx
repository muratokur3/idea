import { createSlice } from "@reduxjs/toolkit"

const initislState = [];

export const userSlice = createSlice({
    name: 'users',
    initialState: initislState,
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.filter(user => user.id !== action.payload)
        },
        updateUser: (state, action) => {
            state.map(user => {
                if (user.id === action.payload.id) {
                    user = action.payload
                }
            })
        }
    }
})

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;