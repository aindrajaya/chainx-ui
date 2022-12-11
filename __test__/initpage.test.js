import { render } from "@testing-library/react";
import AppPage from "../pages"

describe("Init page", () => {
  const ApplicationPage = render(<AppPage />)
  it("Should be the page object there", () => {
    expect(ApplicationPage).toEqual(expect.any(Object));
  })
})