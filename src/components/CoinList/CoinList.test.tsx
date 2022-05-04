import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyFetchCoin } from '../../hooks/useLazyFetchCoin';
import { GET_COIN_PRICE_QUERY } from '../../graphql/Queries';
import { CoinList } from './CoinList';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

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

const getHookWrapper = (mocks?: any, code?: string) => {
  const wrapper = ({ children }: any) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
  const { result, waitForNextUpdate } = renderHook(() => useLazyFetchCoin(), {
    wrapper
  });

  const { coins } = result.current;
  expect(typeof coins).toBe('object');

  // call the lazy function
  act(() => {
    result.current.getData({
      variables: { code }
    });
  });

  return { result, waitForNextUpdate };
};

describe('CoinList component', () => {
  it('should not render when there is no request', async () => {
    const { result, waitForNextUpdate } = getHookWrapper();
    await waitForNextUpdate();

    const { coins, setCoins, loading } = result.current;
    const { container } = render(<CoinList coins={coins} setCoins={setCoins} loading={loading} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('matches snapshot correctly when there is no request', async () => {
    const { result, waitForNextUpdate } = getHookWrapper();
    await waitForNextUpdate();

    const { coins, setCoins, loading } = result.current;
    const tree = renderer
      .create(<CoinList coins={coins} setCoins={setCoins} loading={loading} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should renders when there is a request', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(QueryMock, 'BNB');
    await waitForNextUpdate();

    const { coins, setCoins, loading } = result.current;
    const { container } = render(<CoinList coins={coins} setCoins={setCoins} loading={loading} />);
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot correctly when there is a request', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(QueryMock, 'BNB');
    await waitForNextUpdate();

    const { coins, setCoins, loading } = result.current;
    const tree = renderer
      .create(<CoinList coins={coins} setCoins={setCoins} loading={loading} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
