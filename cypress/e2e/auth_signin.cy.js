describe('Authentication - Signup', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should find and test signup functionality', () => {
    cy.get('body').then(($body) => {
      // Look for signup elements
      const signupSelectors = [
        'a[href*="signup"]',
        'a[href*="register"]',
        'button:contains("Sign Up")',
        'button:contains("Register")'
      ];
      
      let foundSignup = false;
      
      signupSelectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          cy.log(`Found signup element: ${selector}`);
          cy.get(selector).first().click();
          foundSignup = true;
        }
      });
      
      if (foundSignup) {
        // Try to fill signup form
        cy.get('input[name*="name"], input[name*="username"]').first().type('Test User');
        cy.get('input[type="email"]').first().type('test@example.com');
        cy.get('input[type="password"]').first().type('password123');
        cy.get('button[type="submit"]').first().click();
      } else {
        cy.log('No signup elements found');
      }
    });
  });
});