import { createSlice } from "@reduxjs/toolkit";


const chatSlice = new createSlice({
    name: 'chat',
    initialState: {
        messageInput: '',
        chat: [],
        messageBody: {},
        editMessageMode: false,
    },
    reducers: {
        setMessageInput(state, action) {
            const { payload } = action;

            state.messageInput = payload;
        },
        setChat(state, action) {
            const { payload } = action;

            state.chat = payload
        },
        setEditMessageMode(state, action) {
            const { payload } = action;

            state.editMessageMode = payload
        },
        setMessageBody(state, action) {
            const { payload } = action;

            state.messageBody = payload
        },
        setMessage(state, action) {
            const { payload } = action

            state.messageBody.message = payload
        }
    }
})

export const { setMessageInput, setChat, setEditMessageMode, setMessageBody, setMessage } = chatSlice.actions;

export default chatSlice.reducer