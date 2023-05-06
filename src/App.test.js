import { render, screen } from '@testing-library/react';
import App from './App';

test('renders route maker header', () => {
  render(<App />);
  const linkElement = screen.getByText(/route maker/i);
  expect(linkElement).toBeInTheDocument();
});
