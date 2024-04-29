import { createSlice } from '@reduxjs/toolkit'

const foundUserSlice = createSlice({
    name: 'found_user',
    initialState: {
        selectedUser: [],
        some: []
    },
    reducers: {
        setSelectedUser(state, action) {
            state.selectedUser.push(action.payload);
        },
        deleteSelectedUser(state, action) {

            const deleteUser = state.selectedUser

            deleteUser.map(element => element.login)



            const deleteUserByIndex = deleteUser.indexOf(action.payload);

            state.selectedUser.splice(deleteUserByIndex, 1)
        },

    }
})

export const { setSelectedUser, deleteSelectedUser } = foundUserSlice.actions;

export default foundUserSlice.reducer