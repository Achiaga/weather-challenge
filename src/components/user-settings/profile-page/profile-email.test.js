import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import ProfileEmail from './profile-email';

const renderComponent = (props) => {
	return render(<ProfileEmail {...props} />);
};

const initialProps = {
	email: 'user@email.com',
};

const EMAIL_ID = 'email-id';
const EMAIL_VALUE_ID = 'email-value-id';

const getButtonId = (ID, conditionIndex = 0) => {
	return screen.getAllByTestId(ID)[conditionIndex];
};

describe('Profile Email', () => {
	it('should the email label', () => {
		renderComponent(initialProps);
		const emailLabel = getButtonId(EMAIL_ID);
		expect(emailLabel).toBeInTheDocument();
	});
	it('should render the value of the email', () => {
		renderComponent(initialProps);
		const emailValue = getButtonId(EMAIL_VALUE_ID);
		expect(emailValue).toBeInTheDocument();
		const { getByText } = within(emailValue);
		const emailValueText = getByText('user@email.com');
		expect(emailValueText).toBeInTheDocument();
	});
});
