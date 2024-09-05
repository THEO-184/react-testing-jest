import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

describe("RepositoriesSummary", () => {
	it("should display repository information", () => {
		const repository = {
			stargazers_count: 24,
			open_issues: 5,
			forks: 30,
			language: "Javascript",
		};
		render(<RepositoriesSummary repository={repository} />);

		Object.keys(repository).forEach((key) => {
			const value = repository[key];
			expect(screen.getByText(new RegExp(value))).toBeInTheDocument();
		});
	});
});
