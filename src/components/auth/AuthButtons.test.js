import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";

async function renderComponent() {
	render(
		<MemoryRouter>
			<AuthButtons />
		</MemoryRouter>
	);

	await screen.findAllByRole("link");
}

describe("when user is not signed in", () => {
	createServer([
		{
			method: "get",
			path: "/api/user",
			res: () => {
				return { user: null };
			},
		},
	]);
	it("should display signin and signup buttons", async () => {
		await renderComponent();
		const signInBtn = screen.getByRole("link", { name: /sign in/i });
		const signUpBtn = screen.getByRole("link", { name: /sign up/i });

		expect(signInBtn).toBeInTheDocument();
		expect(signInBtn).toHaveAttribute("href", "/signin");
		expect(signUpBtn).toBeInTheDocument();
		expect(signUpBtn).toHaveAttribute("href", "/signup");
	});

	it("should not display signout button", async () => {
		await renderComponent();
		const signOutBtn = screen.queryByRole("link", { name: /sign out/i });

		expect(signOutBtn).not.toBeInTheDocument();
	});
});

describe("when user is signed in", () => {
	createServer([
		{
			method: "get",
			path: "/api/user",
			res: () => {
				return { user: { id: 3, email: "example@mail.com" } };
			},
		},
	]);
	it("should not display signin and signup buttons", async () => {
		await renderComponent();
		const signInBtn = screen.queryByRole("link", { name: /sign in/i });
		const signUpBtn = screen.queryByRole("link", { name: /sign up/i });

		expect(signInBtn).not.toBeInTheDocument();
		expect(signUpBtn).not.toBeInTheDocument();
	});

	it("should display signout button", async () => {
		await renderComponent();
		const signOutBtn = screen.getByRole("link", { name: /sign out/i });

		expect(signOutBtn).toBeInTheDocument();
		expect(signOutBtn).toHaveAttribute("href", "/signout");
	});
});

const pause = () =>
	new Promise((resolve) => {
		setTimeout(resolve, 100);
	});
