import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import JobListings from './JobListings';
import { mockJobs } from '../__mocks__/mockJobData';

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
