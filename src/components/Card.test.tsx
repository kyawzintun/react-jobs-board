import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '@/src/components/Card.tsx';

describe('Card Component', () => {
  test('renders correctly with default props', () => {
    const { container } = render(<Card>Default Card</Card>);
    expect(container.firstChild).toHaveClass('bg-gray-100');
    expect(container.firstChild).toHaveClass('p-6');
    expect(container.firstChild).toHaveClass('rounded');
    expect(container.firstChild).toHaveClass('shadow-md');
    expect(container.firstChild).toHaveTextContent('Default Card');
  });

  test('renders correctly with custom bg prop', () => {
    const { container } = render(<Card bg="bg-red-500">Custom Card</Card>);
    expect(container.firstChild).toHaveClass('bg-red-500');
    expect(container.firstChild).toHaveClass('p-6');
    expect(container.firstChild).toHaveClass('rounded');
    expect(container.firstChild).toHaveClass('shadow-md');
    expect(container.firstChild).toHaveTextContent('Custom Card');
  });

  test('renders children correctly', () => {
    const { getByText } = render(<Card>Child Content</Card>);
    expect(getByText('Child Content')).toBeInTheDocument();
  });
});
