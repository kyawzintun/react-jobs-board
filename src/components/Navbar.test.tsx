import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  // Helper function to render Navbar within Router context
  const renderNavbar = () =>
    render(
      <Router>
        <Navbar />
      </Router>
    );

  it('renders the logo and the site title', () => {
    renderNavbar();
    expect(screen.getByAltText('React Jobs')).toBeInTheDocument();
    expect(screen.getByText('React Jobs')).toBeInTheDocument();
  });

  it('renders navigation links with correct text', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Jobs')).toBeInTheDocument();
    expect(screen.getByText('Add Job')).toBeInTheDocument();
  });

  it('navigation links point to the correct paths', () => {
    renderNavbar();
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Jobs').closest('a')).toHaveAttribute(
      'href',
      '/jobs'
    );
    expect(screen.getByText('Add Job').closest('a')).toHaveAttribute(
      'href',
      '/add-job'
    );
  });
});
