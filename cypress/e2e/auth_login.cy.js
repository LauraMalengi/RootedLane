describe('Authentication - Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should find and test login functionality', () => {
    // Look for login elements
    cy.get('body').then(($body) => {
      const hasLoginForm = $body.find('input[type="email"], input[type="password"], form').length > 0;
      
      if (hasLoginForm) {
        cy.log('Login form found, testing...');
        
        // Try to fill and submit form
        cy.get('input[type="email"], input[name*="email"]').first().type('test@example.com');
        cy.get('input[type="password"], input[name*="password"]').first().type('password123');
        cy.get('button[type="submit"], form button').first().click();
        
        // Check for result
        cy.url().should('not.eq', 'http://localhost:5173/');
      } else {
        cy.log('No login form found on home page');
        
        // Try to find login link
        cy.get('a[href*="login"], a[href*="signin"], button:contains("Login"), button:contains("Sign In")')
          .first()
          .click();
          
        // Now try to find login form on new page
        cy.get('input[type="email"], input[type="password"]').should('exist');
        cy.get('input[type="email"]').first().type('test@example.com');
        cy.get('input[type="password"]').first().type('password123');
        cy.get('button[type="submit"]').first().click();
      }
    });
  });
});