import { MockedProvider } from '@apollo/react-testing';
import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyFetchCoin } from '../../hooks/useLazyFetchCoin';
import { Card } from './Card';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

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

  act(() => {
    result.current.getData();
  });

  return { result, waitForNextUpdate };
};

describe('Card component', () => {
  it('should renders', async () => {
    const { result, waitForNextUpdate } = getHookWrapper();
    await waitForNextUpdate();

    const { getData } = result.current;
    const { container } = render(<Card getData={getData} />);
    expect(container).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const { result, waitForNextUpdate } = getHookWrapper();
    await waitForNextUpdate();

    const { getData } = result.current;
    const tree = renderer.create(<Card getData={getData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
