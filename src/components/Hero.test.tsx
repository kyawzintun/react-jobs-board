import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

describe('Hero', () => {
  it('renders the main heading and paragraph', () => {
    // Render Hero component
    render(<Hero />);

    // Assertions to verify the main heading and paragraph text
    expect(
      screen.getByRole('heading', { name: /become a react dev/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/find the react job that fits your skills and needs/i)
    ).toBeInTheDocument();
  });
});
