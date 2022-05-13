describe('Page and elements load', () => {
  it('finds logo in the header', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="logo"]').should('be.visible');
    expect(true).to.equal(true);
  });

  it('finds the form on the page', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="form"]').should('be.visible');
  });
});

describe('Form submission errors', () => {
  it('displays asterisks on missing fields', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="submit-form-button"]').click();
    cy.get('[data-test="asterisk-error"]').should('be.visible');
  });

  it('displays an error message to the user', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="submit-form-button"]').click();
    cy.get('[data-test="missing-fields-error"]').should('be.visible');
  });
});

describe('Successful form submission', () => {
  it('successfully submits a form without variants', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="form-product-title"]').type(
      'Nike Air Jordan 1 Retro High OG',
    );
    cy.get('[data-test="form-product-type"]').type('Sneakers');
    cy.get('[data-test="form-product-target-market"]').type(
      'basketball, streetwear',
    );
    cy.get('[data-test="submit-form-button"]').click();
  });

  it('successfully submits a form with variants', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="form-product-title"]').type(
      'Nike Air Jordan 1 Retro High OG',
    );
    cy.get('[data-test="form-product-type"]').type('Sneakers');
    cy.get('[data-test="form-product-has-variants"]').check();
    cy.get('[data-test="form-product-avail-vars"]').type('Sizes, colors');
    cy.get('[data-test="form-product-target-market"]').type(
      'basketball, streetwear',
    );
    cy.get('[data-test="submit-form-button"]').click();
  });

  it('successfully submits a form with a custom AI engine', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="form-product-title"]').type(
      'Nike Air Jordan 1 Retro High OG',
    );
    cy.get('[data-test="form-product-type"]').type('Sneakers');
    cy.get('[data-test="form-product-target-market"]').type(
      'basketball, streetwear',
    );
    cy.get('[data-test="form-product-ai-engine"]').select('text-davinci-001');
    cy.get('[data-test="submit-form-button"]').click();
  });

  it('displays the ai output below the form', () => {
    cy.visit('localhost:3000');
    cy.get('[data-test="form-product-title"]').type('Double Double');
    cy.get('[data-test="form-product-type"]').type('Coffee');
    cy.get('[data-test="form-product-target-market"]').type('Coffee, donuts');
    cy.get('[data-test="submit-form-button"]').click();
    cy.clock(1000);
    cy.get('[data-test="double-double"]').should('be.visible');
  });
});
