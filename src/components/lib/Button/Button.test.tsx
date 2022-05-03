import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

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
