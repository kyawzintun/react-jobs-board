import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import JobListing from './JobListing';

const mockJob = {
  id: '1',
  title: 'Senior React Developer',
  type: 'Full-Time',
  description:
    'Exciting Frontend Developer role. This is a long description to test the Show More and Show Less functionality',
  location: 'Boston, MA',
  salary: '$70K - $100K',
  company: {
    name: 'NewTek Solutions',
    description:
      'NewTek Solutions is a leading technology company specializing in web development and digital solutions. We pride ourselves on delivering high-quality products and services to our clients while fostering a collaborative and innovative work environment.',
    contactEmail: 'contact@teksolutions.com',
    contactPhone: '555-555-5555',
  },
};

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
