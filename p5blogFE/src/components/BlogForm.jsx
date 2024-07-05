import { useState } from "react"

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()

        const newBlog = {
            title,
            author,
            url,
        }
        createBlog(newBlog)

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input 
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='write title here'
          />
        </div>
        <div>
          author:
          <input 
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
          url:
          <input 
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder='write url here'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
    )
}

export default BlogForm
