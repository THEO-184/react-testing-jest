import "@testing-library/jest-dom";
import { mutate } from "swr";

global.beforeEach(() => {
	const original = jest.requireActual("swr/_internal");
	const originalIsVisible = original.defaultConfig.isVisible;
	original.defaultConfig.isVisible = () => {
		try {
			return originalIsVisible();
		} catch (e) {
			return true;
		}
	};
});

beforeEach(async () => {
	mutate(() => true, undefined, { revalidate: true });
});
