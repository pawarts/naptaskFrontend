import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user_id: '',
        login: ''
    },
    reducers: {
        addUserID(state, action) {
            console.log(action.payload)
            state.user_id = action.payload.user_id;
            console.log(state.user_id)
            state.login = action.payload.login;
        },
        exitUser(state, action) {
            state.user_id = '';
            state.login = '';
        }
    }
})

export const { addUserID, exitUser } = authSlice.actions;

export default authSlice.reducer