import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyFetchCoin } from './useLazyFetchCoin';
import { GET_COIN_PRICE_QUERY } from '../graphql/Queries';

const TEST_VALUE = [
  {
    id: 'binance_bnb_eur',
    baseSymbol: 'BNB',
    ticker: {
      lastPrice: '414.90000000'
    }
  }
];

const QueryMock = [
  {
    request: {
      query: GET_COIN_PRICE_QUERY,
      variables: { code: 'BNB' }
    },
    result: {
      data: {
        markets: TEST_VALUE
      }
    }
  }
];

const QueryWrongCodeMock = [
  {
    request: {
      query: GET_COIN_PRICE_QUERY,
      variables: { code: 'asd' }
    },
    result: {
      data: {
        markets: []
      }
    }
  }
];

const getHookWrapper = (mocks?: any, code?: string) => {
  const wrapper = ({ children }: any) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
  const { result, waitForNextUpdate } = renderHook(() => useLazyFetchCoin(), {
    wrapper
  });

  const { coins, loading, error } = result.current;

  expect(typeof coins).toBe('object');
  expect(loading).toBeFalsy();
  expect(error).toBeUndefined();

  // call the lazy function
  act(() => {
    result.current.getData({
      variables: { code }
    });
  });

  return { result, waitForNextUpdate };
};

describe('useLazyFetchCoin custom hook', () => {
  it('should return an empty array when there is no request', async () => {
    const { result, waitForNextUpdate } = getHookWrapper();
    await waitForNextUpdate();
    const { coins } = result.current;
    expect(coins).toEqual([]);
  });

  it('should return an empty array when requesting a wrong code', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(QueryWrongCodeMock, 'asd');
    await waitForNextUpdate();

    const { coins, loading, error } = result.current;

    expect(loading).toBeFalsy();
    expect(error).toBeUndefined();
    expect(coins).toEqual([]);
  });

  it('should return an array of coins', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(QueryMock, 'BNB');
    await waitForNextUpdate();

    const { coins, loading, error } = result.current;

    expect(loading).toBeFalsy();
    expect(error).toBeUndefined();
    expect(coins[0]).toEqual(TEST_VALUE[0]);
  });
});
