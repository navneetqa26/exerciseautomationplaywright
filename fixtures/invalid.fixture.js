import { test as base } from '@playwright/test';

export const test = base.extend({
	invalidCredentials: async ({}, use) => {
		await use({ email: 'invalid_user@example.com', password: 'WrongPass!23' });
	}
});

export { expect } from '@playwright/test';
