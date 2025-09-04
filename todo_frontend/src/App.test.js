import { render, screen } from '@testing-library/react';
import App from './rn/App';

test('renders header title', () => {
  render(<App />);
  const header = screen.getByText(/My Todos/i);
  expect(header).toBeInTheDocument();
});
