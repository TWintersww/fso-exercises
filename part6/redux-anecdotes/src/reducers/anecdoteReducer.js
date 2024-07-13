import { createSlice, current } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    replaceAnecdote(state, action) {
      console.log(action)
      const newAnecdote = action.payload
      return state.map(a => {
        return (a.id === newAnecdote.id) ? newAnecdote : a
      })
    },
    appendAnecdote(state, action) {
      console.log(action)
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(allAnecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const handleVote = anecdote => {
  return async dispatch => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.modifyExisting(newAnecdote)
    dispatch(replaceAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
export const { replaceAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

