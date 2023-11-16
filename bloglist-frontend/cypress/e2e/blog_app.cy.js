describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Admin',
      username: 'admin',
      password: 'pass'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('pass')
      cy.get('#login-button').click()

      cy.contains('Admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('word')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'pass' })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('blog created by cypress')
      cy.get('#author-input').type('cypress')
      cy.get('#url-input').type('www.cypress.io')
      cy.get('#submit-button').click()
      cy.contains('blog created by cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'blog created by cypress', author: 'cypress', url: 'www.cypress.io' })
        //cy.createBlog({ title: 'second blog', author: 'cypress', url: 'www.cypress.io' })
        //cy.createBlog({ title: 'third blog', author: 'cypress', url: 'www.cypress.io' })
      })
      
      it('users can like a blog', function() {
        cy.contains('blog created by cypress')
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('user who created the blog can remove', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('blog created by cypress').should('not.exist')

      })

    })
  })
})