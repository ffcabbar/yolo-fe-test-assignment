import { gql } from '@apollo/client';

export const GET_COIN_PRICE_QUERY = gql`
  query price($code: String!) {
    markets(
      filter: {
        baseSymbol: { _eq: $code }
        quoteSymbol: { _eq: "EUR" }
        marketStatus: { _eq: Active }
      }
    ) {
      id
      baseSymbol
      ticker {
        lastPrice
      }
    }
  }
`;
