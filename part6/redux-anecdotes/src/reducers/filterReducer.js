import { createSlice, current } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        createFilter(state, action) {
            console.log(state)
            return action.payload
        }
    }
})

export default filterSlice.reducer
export const { createFilter } = filterSlice.actions
