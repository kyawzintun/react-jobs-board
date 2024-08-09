import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import JobListing from './JobListing';
import { mockJobs } from '../__mocks__/mockJobData';

const mockJob = mockJobs[0];

describe('JobListing', () => {
  it('renders job details correctly with short description', () => {
    render(
      <Router>
        <JobListing job={mockJob} />
      </Router>
    );

    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.type)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Exciting Frontend Developer role. This is a long description to test the Show More and Sho.../
      )
    ).toBeInTheDocument();
    expect(screen.getByText(`${mockJob.salary} / Year`)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show More' })
    ).toBeInTheDocument();
  });

  it('toggles full description on "Show More"/"Show Less" button click', () => {
    render(
      <Router>
        <JobListing job={mockJob} />
      </Router>
    );

    const toggleButton = screen.getByRole('button', { name: 'Show More' });
    fireEvent.click(toggleButton);

    expect(
      screen.getByText(
        /Exciting Frontend Developer role. This is a long description to test the Show More and Show Less functionality/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show Less' })
    ).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(
      screen.getByText(
        /Exciting Frontend Developer role. This is a long description to test the Show More and Sho.../
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show More' })
    ).toBeInTheDocument();
  });

  it('has correct link to job details', () => {
    render(
      <Router>
        <JobListing job={mockJob} />
      </Router>
    );

    const readMoreLink = screen.getByRole('link');
    const expectedLink = `/jobs/${mockJob.id}`;
    expect(readMoreLink).toHaveAttribute('href', expectedLink);
  });
});
