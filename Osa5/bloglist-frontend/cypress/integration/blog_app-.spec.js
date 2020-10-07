describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('Login')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('blogs')
            cy.contains('mluukkai logged in')

        })

        it('login fails with wrong password', function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('Login')
        })



    })

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('minun blogi')
            cy.get('#author').type('minun author')
            cy.get('#url').type('minun url')
            cy.get('#submit').click()
            cy.contains('minun blogi')
            cy.contains('minun author')
            
            
        })

        it('A blog can be liked', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('minun blogi')
            cy.get('#author').type('minun author')
            cy.get('#url').type('minun url')
            cy.get('#submit').click()
            cy.get('#likeButton').click()
            
            
            
        })

        it('A blog can be removed', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('minun blogi')
            cy.get('#author').type('minun author')
            cy.get('#url').type('minun url')
            cy.get('#submit').click()
            cy.get('#removeButton').click()

            cy.get('html').should('not.contain', 'minun blogi')
            
            
            
        })
    })
})