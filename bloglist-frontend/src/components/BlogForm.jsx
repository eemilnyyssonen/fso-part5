import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          title:
        <input
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          id='title-input'
        />
      </div>
      <div>
          author:
        <input
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          id='author-input'
        />
      </div>
      <div>
          url:
        <input
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          id='url-input'
        />
      </div>
      <button id='submit-button' type="submit">create</button>
    </form>
  )
}
export default BlogForm