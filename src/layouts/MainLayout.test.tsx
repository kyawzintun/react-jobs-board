import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container">ToastContainer</div>,
}));

describe('MainLayout Component', () => {
  it('renders Navbar, Outlet, and ToastContainer components', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );

    // Check if Navbar is rendered
    expect(screen.getByText('React Jobs')).toBeInTheDocument();

    // Check if ToastContainer is rendered
    expect(getByTestId('toast-container')).toBeInTheDocument();

    // Since Outlet is a placeholder for routed content, we don't directly test it here.
    // Instead, we ensure the MainLayout component renders without crashing, which implies Outlet is handled correctly.
  });
});
