import NewEmployee from '../components/NewEmployee';
import { describe, expect, it } from 'vitest';
import { render, screen, userEvent, fireEvent } from '../utils/test-utils';

describe('Sample Navigation vitest', () => {

  it('should render the component onto the screen', () => {
    render(<NewEmployee />);
    expect(screen.getByTestId('add-word-input')).toBeInTheDocument();
  });

  it('should render the component onto the screen', () => {
    render(<NewEmployee />);
    expect(screen.getByTestId('rules-test')).toBeInTheDocument();
  });

  // test("Name will update correctly with value from input.", () => {
  //   render(<NewEmployee />);
  //   expect(screen.getByTestId<HTMLInputElement>('add-word-input').value).toBe("");
  //   userEvent.type(getUsernameInput(), "Per");
  //   expect(getUsernameInput().value).toBe("Per");
  // });

  // new-employee-button

  test("Input for name should be empty to begin with then change value to Per.", () => {
    render(<NewEmployee />);
    expect(screen.getByTestId<HTMLInputElement>('add-word-input').value).toBe("");
    userEvent.type(screen.getByTestId<HTMLInputElement>('add-word-input'), "Per");
    expect(screen.getByTestId<HTMLInputElement>('add-word-input').value).toBe("Per");
  });

  test('button', () => {
    render(<NewEmployee />)
    // const button = screen.getByText(/Legg til/i)
    fireEvent.click(screen.getByTestId('new-employee-button'))
      expect(screen.getByRole('submit', {value: /Legg til/i})).toBeInTheDocument();
      // expect(onsubmit).toHaveBeenCalled()
})

// test('button', () => {
//   render(<NewEmployee />)
//   // const button = screen.getByText(/Legg til/i)
//   fireEvent.submit(screen.getByTestId('new-form-test'))
//     // expect(function()).toBeInTheDocument();
//     expect(onsubmit).toHaveBeenCalled()
// })


})