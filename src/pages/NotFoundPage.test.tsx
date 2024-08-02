import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('renders NotFoundPage component with 404 message and go back link', () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('This page does not exist')).toBeInTheDocument();

    // Check if the "Go Back" link is rendered and leads to the home page
    const goBackLink = screen.getByRole('link', { name: 'Go Back' });
    expect(goBackLink).toBeInTheDocument();
    expect(goBackLink).toHaveAttribute('href', '/');
  });
});
