import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : 'inline' }
  const showWhenVisible = { display: visible ? 'inline' : 'none' }
  const showRemoveButton = user.username === blog.user.username
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
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='blog' id={blog.title.replace(' ', '-')} style={blogStyle}>
      <div style={hideWhenVisible} className='defaultContent'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='showableContent'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> <br/>
        <a href={blog.url}>{blog.url}</a>
        <br/>
        likes {blog.likes} <button id='like-button' onClick={addLike}>like</button><br/>
        {blog.user.name}<br/>
        {showRemoveButton && <div><button onClick={removeBlog}>remove</button></div>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog