import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import JobsPage from './JobsPage';

describe('JobsPage', () => {
  test('renders HomePage component', () => {
    render(
      <Router>
        <JobsPage />
      </Router>
    );
    expect(screen.getByText(/All Jobs/i)).toBeInTheDocument();
  });
});
