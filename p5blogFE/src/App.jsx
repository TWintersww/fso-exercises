import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  
  const [notifMsg, setNotifMsg] = useState('')

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem('userInSession')
    if (currentUserJSON) {
      const currentUserJS = JSON.parse(currentUserJSON)
      blogService.setToken(currentUserJS.token)
      setUser(currentUserJS)
    }
  }, [])

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisible()

    const returnedBlog = await blogService.addBlog(newBlog)
    setBlogs(blogs.concat(returnedBlog))

    setNotifMsg(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setNotifMsg('')
    }, 2000)
    // console.log(returnedBlog)
  }
  const updateBlog = async (blogId, newBlog) => {
    const response = await blogService.putBlog(blogId, newBlog)

    const updatedBlogsFromGet = await blogService.getAll()
    setBlogs(updatedBlogsFromGet)
  }
  const deleteBlog = async (blogId) => {
    await blogService.deleteBlog(blogId)

    const updatedBlogsFromGet = await blogService.getAll()
    setBlogs(updatedBlogsFromGet)
  }
  
  const handleLogout = (event) => {
    window.localStorage.removeItem('userInSession')
    setUser(null)
    // console.log('logout')
  }

  const blogCompare = (b1, b2) => {
    return b2.likes - b1.likes
  }
  const blogsComponent = () => {
    const blogsSorted = [...blogs].sort(blogCompare)

    return (
    <div>
      {blogsSorted.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          handleBlogUpdate={updateBlog} 
          handleBlogDelete={deleteBlog}
          loggedInUsername={user.username}
        />
      )}
    </div>
  )}

  const addNewBlogComponent = () => (
    <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <Notification notifMsg={notifMsg}/>
      {user === null 
        ? <LoginForm setUser={setUser} setNotifMsg={setNotifMsg}/>
        : (
          <div>
            <h2>blogs</h2>
            <div>
              {user.username} is logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            {addNewBlogComponent()}
            {blogsComponent()}
          </div>
        )
      }
    </div>
  )
}

export default App
