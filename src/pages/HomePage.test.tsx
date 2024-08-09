import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders HomePage component', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText(/Become a React Dev/i)).toBeInTheDocument();
    expect(screen.getByText(/For Developers/i)).toBeInTheDocument();
    expect(screen.getByText(/For Employers/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Jobs/i)).toBeInTheDocument();
    expect(screen.getByText(/View All Jobs/i)).toBeInTheDocument();
  });
});
