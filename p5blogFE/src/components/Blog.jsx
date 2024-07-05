import { useState } from "react"

const Blog = ({ blog, handleBlogUpdate, handleBlogDelete, loggedInUsername }) => {
  console.log(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }
  const updateBlog = () => {
    // console.log('updateBlog fired')
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    // console.log(newBlog)

    handleBlogUpdate(blog.id, newBlog)
  }
  const deleteBlog = () => {
    const goAhead = window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)

    if (goAhead) {
      handleBlogDelete(blog.id)
    }
  }

  return (showAll)
    ?
    (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowAll}>hide</button>
        </div>
        <div className='urlDisplay'>{blog.url}</div>
        <div className='likesDisplay'>
          likes {blog.likes}
          <button onClick={updateBlog}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {
          (blog.user.username === loggedInUsername)
            ?
            <button onClick={deleteBlog}>delete</button>
            :
            <></>
        }
      </div>  
    )
    :
    (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleShowAll}>view</button>
      </div>
    )
}

export default Blog
