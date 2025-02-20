import { render, screen } from "@testing-library/react"; // Import screen
import AppPage from "../pages";

describe("Init page", () => {
    it("Should render the welcome message", () => {
        render(<AppPage />); // Render the component

        // Use screen.getByText to find the text
        const welcomeMessage = screen.getByText("Welcome to Next.js! from Component");

        // Assert that the element containing the text is present
        expect(welcomeMessage).toBeInTheDocument();

        // Optional: You can also assert on the specific element if needed
        // For example, if the welcome message is in an <h1> tag:
        // expect(welcomeMessage.closest('h1')).toBeInTheDocument();
    });

    it("Should be the page object there", () => {
        const { container } = render(<AppPage />); // Use container for more general checks
        expect(container).toBeInTheDocument(); // Check if the component is rendered
    });
});