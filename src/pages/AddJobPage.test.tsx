import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddJobPage from './AddJobPage';
import { toast } from 'react-toastify';
import { mockJobs } from '../__mocks__/mockJobData';

const mockJob = mockJobs[0];

// Mocking external modules
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Helper function to render the component with all necessary props
const renderAddJobPage = (addJobSubmit = jest.fn()) =>
  render(<AddJobPage addJobSubmit={addJobSubmit} />);

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

describe('AddJobPage', () => {
  it('renders correctly', () => {
    renderAddJobPage();
    expect(screen.getByTestId('add_job_form_title')).toHaveTextContent(
      'Add Job'
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
    expect(screen.getByTestId('add_job_submit')).toHaveTextContent('Add Job');
  });

  it('updates input fields on change', () => {
    const { container } = renderAddJobPage();
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

    simulateInputChangeAndVerify(jobType, mockJob.type);

    simulateInputChangeAndVerify(jobTitle, mockJob.title);

    simulateInputChangeAndVerify(jobDescription, mockJob.description);

    simulateInputChangeAndVerify(salary, mockJob.salary);

    simulateInputChangeAndVerify(location, mockJob.location);

    simulateInputChangeAndVerify(companyName, mockJob.company.name);

    simulateInputChangeAndVerify(
      companyDescription,
      mockJob.company.description
    );

    simulateInputChangeAndVerify(contactEmail, mockJob.company.contactEmail);

    simulateInputChangeAndVerify(contactPhone, mockJob.company.contactPhone);
  });

  it('calls addJobSubmit with the correct job object on form submission', async () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(
      () => mockNavigate
    );
    const mockAddJobSubmit = jest.fn();
    const { container } = renderAddJobPage(mockAddJobSubmit);
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
    const submitButton = screen.getByRole('button', { name: /Add Job/i });

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
      expect(mockAddJobSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: mockJob.title,
          type: mockJob.type,
          description: mockJob.description,
          location: mockJob.location,
          salary: mockJob.salary,
          company: {
            name: mockJob.company.name,
            description: mockJob.company.description,
            contactEmail: mockJob.company.contactEmail,
            contactPhone: mockJob.company.contactPhone,
          },
        })
      );

      expect(toast.success).toHaveBeenCalledWith('Job added successfully');

      expect(mockNavigate).toHaveBeenCalledWith('/jobs');
    });
  });
});
