context('Baton App', () => {

   Cypress.on('uncaught:exception', (err, runnable) => {
      return false
   })

   beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.visit('https://baton.hellobaton-stage.com/login')
   })

   describe('Go to the app link and login', () => {

      let username = 'qa-tester-vendor-lead-3@sink.sendgrid.net';
      let password = 'qatesterpassword';
      let usernameField = '#email';
      let passwordField = '#password';
      let loginButton = '[data-cy=setup-login-button]';
      let avatarButton = '[data-cy=avatar-nav-drawer-button]';
      let logoutButton = '[data-cy=avatar-nav-drawer-menu-logout-item]';

      it('Verify that the User is able to Login with valid credentials', () => {
         cy.get(usernameField).type(username)
         cy.get(passwordField).type(password)
         cy.get(passwordField).should('have.attr', 'type').and('eq', 'password') // Verify that the password field masked
         cy.get(loginButton).click()
         cy.url().should('include', 'app/projects')
         cy.get(avatarButton).click()
         cy.get(logoutButton).click()
      })

      it('Verify that the User is not able to Login with valid username and invalid password', () => {
         cy.get(usernameField).type(username)
         cy.get(passwordField).type('incorrectpassword')
         cy.get(loginButton).click()
         cy.contains('Oops! You entered an invalid user ID or password.').should('be.visible')
      })

      it('Navigate to a project, and create a milestone', () => {
         cy.get(usernameField).type(username)
         cy.get(passwordField).type(password)
         cy.get(loginButton).click()
         cy.get('[data-cy=project-list-item-55]').click()
         cy.get('[data-cy=milestone-task-list-add-task-123]').click()
         cy.get('#title').clear().type('Milestone created by Tester')
         cy.get('#description').type('Test 123')
         cy.get('[data-cy=project-task-form-submit]').click()
         cy.contains('Milestone created by Tester', { timeout: 10000 }).should('be.visible')
         cy.contains('Milestone created by Tester').click()
         cy.get('[data-cy=project-task-overflow-menu]').click()
         cy.get('[data-cy=project-task-delete]').click()
         cy.get('[data-cy=warning-modal-delete]').click()
         cy.get(avatarButton).click()
         cy.get(logoutButton).click()
      })
   })

})