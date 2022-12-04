import { describe, expect, it } from 'vitest';
import Navigation from '../components/Navigation';
import { render, screen, userEvent } from '../utils/test-utils';

describe('Sample Navigation vitest', () => {
// describe -> Used to group the test and used to describe what is currently being tested

    it('the title is visible', () => {
        // it or test -> Individual test which is run by Vitest. It can either pass or fail
        render(<Navigation />);
        expect(screen.getByText(/Lunsjkalender/i)).toBeInTheDocument();
        // expect -> is used to create assertions. In this context assertions are functions that can be called to assert a statement.
    });
    it('the title is visible', () => {
        // it or test -> Individual test which is run by Vitest. It can either pass or fail
        render(<Navigation />);
        expect(screen.getByText(/Ansatte/i)).toBeInTheDocument();
        // expect -> is used to create assertions. In this context assertions are functions that can be called to assert a statement.
    });
});