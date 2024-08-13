import { render, screen } from '@testing-library/react';
import { createMemoryRouter } from 'react-router-dom';
import App from '@/src/App';

describe('App Component', () => {
  test('renders with custom router', () => {
    const mockRoutes = [
      {
        path: '/',
        element: <div>Home Page</div>,
      },
    ];
    const mockRouter = createMemoryRouter(mockRoutes, {
      initialEntries: ['/'],
    });

    render(<App router={mockRouter} />);
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });
});
