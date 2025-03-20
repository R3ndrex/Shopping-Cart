import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageSlider from "../src/components/ImageSlider";
import userEvent from "@testing-library/user-event";
describe("ImageSlider", () => {
    it("goes to last image after clicking on first image left chevron", async () => {
        const user = userEvent.setup();
        render(
            <ImageSlider images={["image1", "image2", "image3"]} alt="test" />
        );

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image1");
        await user.click(screen.getByTestId("left-chevron"));
        expect(screen.getByRole("img").getAttribute("src")).toEqual("image3");
    });
    it("goes to first image after clicking on last image right chevron", async () => {
        const user = userEvent.setup();
        render(<ImageSlider images={["image1", "image2"]} alt="test" />);
        const rightChevron = screen.getByTestId("right-chevron");

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image1");
        await user.click(rightChevron);
        await user.click(rightChevron);
        expect(screen.getByRole("img").getAttribute("src")).toEqual("image1");
    });
});
