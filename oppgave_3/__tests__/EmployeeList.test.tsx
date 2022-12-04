import EmployeeList from '../components/EmployeeList';
import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '../utils/test-utils';


it('should render the component onto the screen', () => {
  render(<EmployeeList />);
  expect(screen.getByTestId('employees-test')).toBeInTheDocument();
});