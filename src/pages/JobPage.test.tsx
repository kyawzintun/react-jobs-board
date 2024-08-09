import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import JobPage from './JobPage';
import { toast } from 'react-toastify';
import { mockJobs } from '../__mocks__/mockJobData';

const mockJob = mockJobs[0];

// Mocking necessary hooks and modules
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => mockJob,
  useNavigate: () => jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('JobPage', () => {
  beforeEach(() => {
    window.confirm = jest.fn(() => true); // Mock confirmation dialog to always return true
  });

  test('renders job details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/jobs/1']}>
        <Routes>
          <Route path="/jobs/:id" element={<JobPage deleteJob={jest.fn()} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.type)).toBeInTheDocument();
    expect(screen.getByText(mockJob.description)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company.name)).toBeInTheDocument();
  });

  test('navigates back to job listings', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/jobs/1']}>
        <Routes>
          <Route path="/jobs/:id" element={<JobPage deleteJob={jest.fn()} />} />
          <Route path="/jobs" element={<div>Job Listings</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByText(/Back to Job Listings/i));
    expect(screen.getByText('Job Listings')).toBeInTheDocument();
  });

  test('deletes a job and shows success toast', async () => {
    const deleteJobMock = jest.fn();
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/jobs/1']}>
        <Routes>
          <Route
            path="/jobs/:id"
            element={<JobPage deleteJob={deleteJobMock} />}
          />
          <Route path="/jobs" element={<div>Job Listings</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByText(/Delete Job/i));
    expect(window.confirm).toBeCalledWith(
      'Are you sure you want to delete this job?'
    );
    expect(deleteJobMock).toHaveBeenCalledWith('1');
    expect(toast.success).toHaveBeenCalledWith('Job deleted successfully');
  });
});

// TO DO
// describe('jobLoader', () => {
//   beforeEach(() => {
//     fetchMock.resetMocks();
//   });

//   it('fetches job details successfully', async () => {
//     fetchMock.mockResponseOnce(JSON.stringify(mockJob));

//     const params = { id: '1' }; // Simulating route params
//     const result = await jobLoader({ params }); // Type assertion for simplicity

//     expect(fetchMock).toHaveBeenCalledWith('/api/jobs/1');
//     expect(result).toEqual(mockJob);
//   });

//   it('handles fetch error', async () => {
//     fetchMock.mockReject(new Error('API is down'));

//     const params = { id: 'unknown' }; // Simulating route params for a failed request
//     await expect(jobLoader({ params } as any)).rejects.toThrow('API is down');

//     expect(fetchMock).toHaveBeenCalledWith('/api/jobs/unknown');
//   });
// });
