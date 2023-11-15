import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('loggedBlogsappUser'))
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemoveButton = { display: user.username === blog.user.username ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    updateBlog({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const removeBlog = () => {
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> <br/>
        <a href={blog.url}>{blog.url}</a>
        <br/>
        likes {blog.likes} <button onClick={addLike}>like</button><br/>
        {blog.user.name}<br/>
        <button style={showRemoveButton} onClick={removeBlog}>remove</button><br/>
      </div>
    </div>
  )
}

export default Blog