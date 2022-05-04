/* eslint-disable no-undef */
describe('Integration tests', () => {
  it('should render correctly', () => {
    cy.visit('/');
    cy.get('[data-testid=main]').should('exist');
    cy.get('[data-testid=header]').should('exist');
    cy.get('[data-testid=card]').should('exist');
    cy.get('[data-testid=footer]').should('exist');
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('not.exist');
  });

  it('input should reset after clicking the button', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('asd');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=search-box]').should('contain', '');
  });

  // CoinList

  it('coin list should render with the correct data', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('exist');

    cy.get('[data-testid=search-box]').type('eth');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_eth_eur]').should('exist');
  });

  it('coin list should render correctly when deleting a coin from the list', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('exist');

    cy.get('[data-testid=coin-list-delete-binance_btc_eur]').click();
    cy.get('[data-testid=coin-list-binance_eth_eur]').should('not.exist');
  });

  it('coin list should render correctly when adding multiple coins', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();

    cy.wait(5000);

    cy.get('[data-testid=search-box]').type('eth');
    cy.get('[data-testid=button]').click();

    cy.wait(5000);

    cy.get('[data-testid=search-box]').type('bnb');
    cy.get('[data-testid=button]').click();

    cy.wait(5000);

    cy.get('[data-testid=coin-list-container]').children().should('have.length', 3);
  });

  it('coin list should render correctly when deleting a coin and then adding the same coin', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('exist');

    cy.get('[data-testid=coin-list-delete-binance_btc_eur]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('not.exist');

    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('exist');
  });

  // Alerts

  it('alert should come out with the correct message when clicking the button without entering a code and then the coin list should not exist', () => {
    cy.visit('/');
    cy.get('[data-testid=button]').click();
    cy.get('#alert').should('exist');
    cy.get('#alert').should('exist').should('contain', 'Please enter a code !');
    cy.get('[data-testid=coin-list-container]').children().should('not.exist');
  });

  it('alert should come out with the correct message when entering a wrong code and then the coin list should not exist', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('asd');
    cy.get('[data-testid=button]').click();
    cy.get('#alert').should('exist');
    cy.get('#alert').should('exist').should('contain', 'Coin not found !');
    cy.get('[data-testid=coin-list-container]').children().should('not.exist');
  });

  it('alert should come out with the correct message when entering the same coin', () => {
    cy.visit('/');
    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('exist');

    cy.get('[data-testid=search-box]').type('btc');
    cy.get('[data-testid=button]').click();
    cy.get('[data-testid=coin-list-binance_btc_eur]').should('exist');
    cy.get('#alert').should('exist');
    cy.get('#alert').should('exist').should('contain', 'This coin already exists on your list !');
  });
});
