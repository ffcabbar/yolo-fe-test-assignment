import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Input } from './Input';

function TestInput() {
  const [value, setValue] = useState('');

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return <Input value={value} aria-label="test-input" onChange={handleChange} />;
}

const setup = () => {
  const utils = render(<TestInput />);
  const input = utils.getByLabelText('test-input');
  return {
    input,
    ...utils
  };
};

test('handles onChange', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: 'Yolo Group' } });
  expect((input as HTMLInputElement).value).toBe('Yolo Group');
});

test('renders input', () => {
  render(<Input />);
  const inputElement = screen.getByRole('searchbox');
  expect(inputElement).toBeInTheDocument();
});
