import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import renderer from 'react-test-renderer';

test('renders button', () => {
  render(<Button children="Yolo Group" />);
  const buttonElement = screen.getByText(/Yolo Group/i);
  expect(buttonElement).toBeInTheDocument();
});

test('handles onClick', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick} children="Yolo Group" />);
  const buttonElement = screen.getByText('Yolo Group');
  fireEvent.click(buttonElement);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('matches snapshot', () => {
  const tree = renderer.create(<Button children="Yolo Group" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('matches snapshot correctly when there are no props', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});
