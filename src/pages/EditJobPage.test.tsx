import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import EditJobPage from './EditJobPage';
import { mockJobs } from '../__mocks__/mockJobData';

const mockJob = mockJobs[0];
const mockJob2 = mockJobs[1];

// Mock necessary hooks and dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: mockJob.id,
  }),
  useNavigate: () => jest.fn(),
  useLoaderData: () => mockJob,
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

const renderEditJobPage = (mockUpdateJobSubmit = jest.fn()) =>
  render(<EditJobPage updateJobSubmit={mockUpdateJobSubmit} />);

const getFormInputs = (container: HTMLElement) => {
  const jobType = container.querySelector('#type') as HTMLSelectElement;
  const jobTitle = container.querySelector('#title') as HTMLInputElement;
  const jobDescription = container.querySelector(
    '#description'
  ) as HTMLInputElement;
  const salary = container.querySelector('#salary') as HTMLSelectElement;
  const location = container.querySelector('#location') as HTMLInputElement;
  const companyName = container.querySelector(
    '#company_name'
  ) as HTMLInputElement;
  const companyDescription = container.querySelector(
    '#company_description'
  ) as HTMLInputElement;
  const contactEmail = container.querySelector(
    '#contact_email'
  ) as HTMLInputElement;
  const contactPhone = container.querySelector(
    '#contact_phone'
  ) as HTMLInputElement;

  return {
    jobType,
    jobTitle,
    jobDescription,
    salary,
    location,
    companyName,
    companyDescription,
    contactEmail,
    contactPhone,
  };
};

const simulateInputChangeAndVerify = (
  element: HTMLInputElement | HTMLSelectElement,
  value: string
) => {
  fireEvent.change(element, { target: { value } });
  expect(element.value).toBe(value);
};

describe('EditJobPage Component', () => {
  it('loads with the correct initial values', () => {
    renderEditJobPage();
    expect(screen.getByTestId('update_job_form_title')).toHaveTextContent(
      'Update Job'
    );
    expect(screen.getByLabelText(/Job Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Listing Name/i)).toBeInTheDocument();
    expect(screen.getByTestId('job_description')).toHaveTextContent(
      'Description'
    );
    expect(screen.getByLabelText(/Salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByTestId('company_info')).toHaveTextContent(
      'Company Info'
    );
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByTestId('company_description')).toHaveTextContent(
      'Company Description'
    );
    expect(screen.getByLabelText(/Contact Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Phone/i)).toBeInTheDocument();
    expect(screen.getByTestId('update_job_submit')).toHaveTextContent(
      'Update Job'
    );
  });

  it('updates input fields on change', () => {
    const { container } = renderEditJobPage();
    const {
      jobType,
      jobTitle,
      jobDescription,
      salary,
      location,
      companyName,
      companyDescription,
      contactEmail,
      contactPhone,
    } = getFormInputs(container);

    simulateInputChangeAndVerify(jobType, mockJob2.type);

    simulateInputChangeAndVerify(jobTitle, mockJob2.title);

    simulateInputChangeAndVerify(jobDescription, mockJob2.description);

    simulateInputChangeAndVerify(salary, mockJob2.salary);

    simulateInputChangeAndVerify(location, mockJob2.location);

    simulateInputChangeAndVerify(companyName, mockJob2.company.name);

    simulateInputChangeAndVerify(
      companyDescription,
      mockJob2.company.description
    );

    simulateInputChangeAndVerify(contactEmail, mockJob2.company.contactEmail);

    simulateInputChangeAndVerify(contactPhone, mockJob2.company.contactPhone);
  });

  it('calls updateJobSubmit with the updated job on form submit', async () => {
    const useNavigate = require('react-router-dom').useNavigate;
    const mockNavigate = useNavigate();
    mockNavigate.mockClear();

    const mockUpdateJobSubmit = jest.fn();
    const { container } = renderEditJobPage(mockUpdateJobSubmit);
    const {
      jobType,
      jobTitle,
      jobDescription,
      salary,
      location,
      companyName,
      companyDescription,
      contactEmail,
      contactPhone,
    } = getFormInputs(container);
    const submitButton = screen.getByRole('button', { name: /Update Job/i });

    fireEvent.change(jobType, { target: { value: mockJob.type } });
    fireEvent.change(jobTitle, { target: { value: mockJob.title } });
    fireEvent.change(jobDescription, {
      target: { value: mockJob.description },
    });
    fireEvent.change(salary, { target: { value: mockJob.salary } });
    fireEvent.change(location, { target: { value: mockJob.location } });
    fireEvent.change(companyName, { target: { value: mockJob.company.name } });
    fireEvent.change(companyDescription, {
      target: { value: mockJob.company.description },
    });
    fireEvent.change(contactEmail, {
      target: { value: mockJob.company.contactEmail },
    });
    fireEvent.change(contactPhone, {
      target: { value: mockJob.company.contactPhone },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateJobSubmit).toHaveBeenCalledWith(
        expect.objectContaining(mockJob)
      );

      expect(toast.success).toHaveBeenCalledWith('Job updated successfully');

      //   const expectedRedirectPath = `/jobs/${mockJob.id}`;
      //   expect(mockNavigate).toHaveBeenCalledWith('/jobs/1');
    });
  });
});
