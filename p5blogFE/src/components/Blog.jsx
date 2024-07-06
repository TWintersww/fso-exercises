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

  console.log(blog.user.username, loggedInUsername)

  return (showAll)
    ?
    (
      <div style={blogStyle} className='fullBlog'>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleShowAll}>hide</button>
        </div>
        <div className='urlDisplay'>{blog.url}</div>
        <div className='likesDisplay'>
          likes {blog.likes}
          <button onClick={updateBlog} data-testid='likebutton'>like</button>
        </div>
        <div>{blog.user.name}</div>
        {
          (blog.user.username === loggedInUsername)
            ?
            <button onClick={deleteBlog} data-testid='deletebutton'>delete</button>
            :
            <></>
        }
      </div>  
    )
    :
    (
      <div style={blogStyle} className='partialBlog'>
        {blog.title} {blog.author}
        <button onClick={toggleShowAll} data-testid='viewbutton'>view</button>
      </div>
    )
}

export default Blog
