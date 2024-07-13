import { useDispatch, useSelector } from "react-redux"
import { handleVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
      return state.anecdotes.filter(a => {
        return a.content.includes(state.filter)
      })
    })

    const compareAnecdotes = (a1, a2) => a2.votes - a1.votes 
    const handleVoteButtonClick = (anecdote) => {
      dispatch(handleVote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    return (
        <div>
        {anecdotes
            .sort(compareAnecdotes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => handleVoteButtonClick(anecdote)}>vote</button>
                </div>
              </div>
        )}
        </div>
    )
}

export default AnecdoteList
