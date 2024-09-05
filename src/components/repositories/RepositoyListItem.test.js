import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

// 2: option 2 to fix act warning on FileIcon
// jest.mock("../tree/FileIcon", () => {
// 	return () => "File Icon Component";
// });

function renderComponent() {
	const repository = {
		full_name: "facebook/react",
		language: "Javascript",
		description: "A js library",
		owner: {
			login: "facebook",
		},
		name: "react",
		html_url: "https://github.com/facebook/react",
	};

	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repository} />
		</MemoryRouter>
	);

	return { repository };
}

describe("repository list item", () => {
	it("shows a link to the github homepage for this repository", async () => {
		const { repository } = renderComponent();
		// screen.debug();
		// 1: option 1 to fix act waning on FileIcon
		await screen.findByRole("img", { name: /javascript/i });
		const link = screen.getByRole("link", { name: /github repository/i });
		expect(link).toHaveAttribute("href", repository.html_url);
	});

	it("shows a fileicon with the appropriate icon", async () => {
		renderComponent();
		const icon = await screen.findByRole("img", { name: /javascript/i });
		expect(icon).toHaveClass("js-icon");
	});

	it("shows a link to the code editor page", async () => {
		const { repository } = renderComponent();
		await screen.findByRole("img", { name: /javascript/i });

		const link = await screen.findByRole("link", {
			name: new RegExp(repository.owner.login),
		});

		expect(link).toHaveAttribute(
			"href",
			`/repositories/${repository.full_name}`
		);
	});
});
