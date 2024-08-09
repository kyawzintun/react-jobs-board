import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeCards from './HomeCards';

describe('HomeCards', () => {
  it('renders the developer and employer sections correctly', () => {
    // Render HomeCards component within Router since it contains Link components
    render(
      <Router>
        <HomeCards />
      </Router>
    );

    // Assertions for the "For Developers" section
    expect(
      screen.getByRole('heading', { name: /for developers/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/browse our react jobs and start your career today/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /browse jobs/i })).toHaveAttribute(
      'href',
      '/jobs'
    );

    // Assertions for the "For Employers" section
    expect(
      screen.getByRole('heading', { name: /for employers/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /list your job to find the perfect developer for the role/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /add job/i })).toHaveAttribute(
      'href',
      '/add-job'
    );
  });
});
