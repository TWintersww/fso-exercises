import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotifMsg(state, action) {
            return action.payload
        },
        removeNotifMsg(state, action) {
            return ''
        }
    }
})

export const setNotification = (message, duration) => {
    return dispatch => {
        dispatch(setNotifMsg(message))
        setTimeout(() => dispatch(removeNotifMsg()), duration*1000)
    }
}

export default notificationSlice.reducer
export const { setNotifMsg, removeNotifMsg } = notificationSlice.actions
