import { render, screen, cleanup } from '@testing-library/react';
import SignInForm from '../MCCARTY/SignInForm';
import FormInput from '../MCCARTY/FormInput';

//// This test is used to ensure that the Sign-in form inside the
//// SignInForm.js component renders. It does not test the other states.
test('Should render SignIn component', () => {
    render(<SignInForm />);
    const SignInElement = screen.getByTestId('SIE');
    expect(SignInElement).toBeInTheDocument;
});
//// These tests are used to ensure that the email and password FormInput components render.
test('Should render email FormInput component', () => {
    render(<FormInput inpType="email" />);
    const formElement = screen.getByTestId('FIE-E');
    expect(formElement).toBeInTheDocument;
});
test('Should render password FormInput component', () => {
    render(<FormInput inpType="password" />);
    const formElement = screen.getByTestId('FIE-P');
    expect(formElement).toBeInTheDocument;
});
//// This test is used to ensure that the submit button renders.
test('Should render SignIn component', () => {
    render(<SignInForm />);
    const submitBtnElement = screen.getByTestId('SBE');
    expect(submitBtnElement).toBeInTheDocument;
});