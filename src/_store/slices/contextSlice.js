import { createSlice } from "@reduxjs/toolkit";

const contextSlice = createSlice({
    name: 'context',
    initialState: {
        viewContext: false
    },
    reducers: {
        setContextMenu(state, action) {
            state.viewContext = action.payload
        }
    }
})

export const { setContextMenu } = contextSlice.actions

export default contextSlice.reducer