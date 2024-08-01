import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import JobListings from './JobListings';

const mockJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    type: 'Full-Time',
    description:
      'We are seeking a talented Front-End Developer to join our team in Boston, MA.',
    location: 'Boston, MA',
    salary: '$70K - $100K',
    company: {
      name: 'NewTek Solutions',
      description:
        'NewTek Solutions is a leading technology company specializing in web development and digital solutions.',
      contactEmail: 'contact@teksolutions.com',
      contactPhone: '555-555-5555',
    },
  },
  {
    id: '2',
    title: 'Front-End Engineer (React & Redux)',
    type: 'Full-Time',
    location: 'Miami, FL',
    description: 'Join our team as a Front-End Developer in sunny Miami, FL.',
    salary: '$70K - $80K',
    company: {
      name: 'Veneer Solutions',
      description:
        'Veneer Solutions is a creative agency specializing in digital design and development.',
      contactEmail: 'contact@loremipsum.com',
      contactPhone: '555-555-5555',
    },
  },
];

const server = setupServer(
  http.get('/api/jobs', ({ params }) => {
    const { _limit: queryLimit } = params;
    if (queryLimit) {
      return HttpResponse.json(
        mockJobs.slice(0, parseInt(queryLimit as string))
      );
    }
    return HttpResponse.json(mockJobs);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('JobListings', () => {
  it('displays "Featured Jobs" heading when isHome is true', async () => {
    render(
      <Router>
        <JobListings isHome={true} />
      </Router>
    );
    expect(screen.getByText('Featured Jobs')).toBeInTheDocument();
  });

  it('displays "All Jobs" heading when isHome is false', async () => {
    render(
      <Router>
        <JobListings isHome={false} />
      </Router>
    );
    expect(screen.getByText('All Jobs')).toBeInTheDocument();
  });

  it('shows spinner while loading jobs', () => {
    render(
      <Router>
        <JobListings />
      </Router>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders JobListing components after fetching jobs', async () => {
    render(
      <Router>
        <JobListings />
      </Router>
    );
    await waitFor(() =>
      expect(screen.getAllByRole('job')).toHaveLength(mockJobs.length)
    );
  });

  it('sets jobs to an empty array on fetch error', async () => {
    // Mock the global fetch to throw an error
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject(new Error('Network error')));

    render(
      <Router>
        <JobListings />
      </Router>
    );

    // Wait for the fetchJobs to complete
    await waitFor(() => {
      expect(screen.getByText('NO JOBS FOUND')).toBeInTheDocument();
    });

    // Clean up mock to avoid affecting other tests
    jest.restoreAllMocks();
  });
});
