describe('Detailed App Discovery', () => {
  it('should log everything about the app', () => {
    cy.visit('/');
    
    // Log basic page info
    cy.log('=== BASIC PAGE INFO ===');
    cy.log('URL:', cy.state('window').location.href);
    cy.log('Title:', document.title);
    
    // Log all HTML content (first 1000 chars)
    cy.document().then((doc) => {
      cy.log('Full HTML:', doc.documentElement.outerHTML.substring(0, 1000));
    });
    
    // Log all elements with their classes and IDs
    cy.log('=== ALL ELEMENTS ===');
    cy.get('*').each(($el) => {
      const tag = $el[0].tagName.toLowerCase();
      const id = $el.attr('id');
      const className = $el.attr('class');
      const text = $el.text().trim().substring(0, 50);
      
      if (id || className) {
        cy.log(`${tag} - id:${id} class:${className} text:"${text}"`);
      }
    });
    
    // Log all interactive elements
    cy.log('=== INTERACTIVE ELEMENTS ===');
    cy.get('button, input, a, [onclick]').each(($el, index) => {
      const tag = $el[0].tagName;
      const text = $el.text().trim();
      const type = $el.attr('type');
      const href = $el.attr('href');
      
      cy.log(`${index}: ${tag} type:${type} href:${href} text:"${text}"`);
    });
  });
});