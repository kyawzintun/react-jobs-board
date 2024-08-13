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

  test('does not delete job when user cancels confirmation', async () => {
    const deleteJobMock = jest.fn();
    window.confirm = jest.fn(() => false);

    render(
      <MemoryRouter initialEntries={['/jobs/1']}>
        <Routes>
          <Route
            path="/jobs/:id"
            element={<JobPage deleteJob={deleteJobMock} />}
          />
        </Routes>
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole('button', { name: /delete job/i });
    userEvent.click(deleteButton);

    expect(deleteJobMock).not.toHaveBeenCalled();
  });
});
