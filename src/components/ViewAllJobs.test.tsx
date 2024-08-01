import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewAllJobs from './ViewAllJobs';

describe('ViewAllJobs', () => {
  // Helper function to render ViewAllJobs within Router context
  const renderViewAllJobs = () =>
    render(
      <Router>
        <ViewAllJobs />
      </Router>
    );

  it('renders the "View All Jobs" link', () => {
    renderViewAllJobs();
    const linkElement = screen.getByText('View All Jobs');
    expect(linkElement).toBeInTheDocument();
  });

  it('"View All Jobs" link points to the correct path', () => {
    renderViewAllJobs();
    const linkElement = screen.getByText('View All Jobs');
    expect(linkElement.closest('a')).toHaveAttribute('href', '/jobs');
  });
});
