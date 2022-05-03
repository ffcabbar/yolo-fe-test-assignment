import { render, screen } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/react-testing';
import { GET_COIN_PRICE_QUERY } from './graphql/Queries';

const mocks = [
  {
    request: {
      query: GET_COIN_PRICE_QUERY,
      variables: { code: 'BNB' }
    },
    result: {
      data: {
        markets: [
          {
            id: 'binance_bnb_eur',
            baseSymbol: 'BNB',
            ticker: {
              lastPrice: '414.90000000',
              __typename: 'Ticker'
            },
            __typename: 'Market'
          }
        ]
      }
    }
  },
  {
    request: {
      query: GET_COIN_PRICE_QUERY,
      variables: { code: 'asd' }
    },
    error: new Error('Something went wrong')
  }
];

const setup = () => {
  render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );
};

describe('test apps entry point', () => {
  it('runs the mocked query', () => {
    setup();
    const titleElement = screen.getByText(/Now you can track all your cryptos here!/i);
    expect(titleElement).toBeInTheDocument();
  });
});
