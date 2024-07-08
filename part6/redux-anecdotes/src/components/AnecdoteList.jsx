import { useDispatch, useSelector } from "react-redux"
import { handleVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const compareAnecdotes = (a1, a2) => a2.votes - a1.votes 

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
                  <button onClick={() => dispatch(handleVote(anecdote.id))}>vote</button>
                </div>
              </div>
        )}
        </div>
    )
}

export default AnecdoteList
