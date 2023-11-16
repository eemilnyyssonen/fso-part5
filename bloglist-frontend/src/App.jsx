import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null })

  const compareByLikes = (a,b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareByLikes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null } )
    }, 3000)
  }

  const deleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(addedBlog).sort(compareByLikes))
    notifyWith(`A new blog ${addedBlog.title} by ${addedBlog.author} added`)
  }

  const updateBlog = async (blogObject, id) => {
    const updatedBlog = await blogService.like(blogObject, id)
    console.log(updatedBlog)
    setBlogs(blogs
      .map(blog => blog.id.toString() === updatedBlog.id.toString() ? updatedBlog : blog)
      .sort(compareByLikes)
    )
    console.log(blogs)
  }

  const addUser = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      notifyWith('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel={'create new blog'} ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      {!user &&
        <div>
          <h2>log in to application</h2>
          <Notification info={info}/>
          <LoginForm addUser={addUser}/>
        </div>  }
      {user &&
        <div>
          <h2>blogs</h2>
          <Notification info={info}/>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
          )}

        </div>
      }

    </div>
  )
}

export default App