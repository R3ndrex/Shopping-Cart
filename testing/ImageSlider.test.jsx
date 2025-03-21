import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImageSlider from "../src/components/ImageSlider";
import userEvent from "@testing-library/user-event";

describe("ImageSlider", () => {
    it("render correct first image", () => {
        render(
            <ImageSlider images={["image1", "image2", "image3"]} alt="test" />
        );

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image1");
    });

    it("goes to next image after clicking on right chevron", async () => {
        const user = userEvent.setup();
        render(<ImageSlider images={["image1", "image2"]} alt="test" />);
        const rightChevron = screen.getByTestId("right-chevron");

        await user.click(rightChevron);

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image2");
    });

    it("goes to previous image after clicking on left chevron", async () => {
        const user = userEvent.setup();
        render(
            <ImageSlider images={["image1", "image2", "image3"]} alt="test" />
        );
        const leftChevron = screen.getByTestId("left-chevron");
        const rightChevron = screen.getByTestId("right-chevron");

        await user.click(rightChevron);
        await user.click(rightChevron);
        await user.click(leftChevron);
        await user.click(leftChevron);

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image1");
    });

    it("goes to last image after clicking on first image left chevron", async () => {
        const user = userEvent.setup();
        render(
            <ImageSlider images={["image1", "image2", "image3"]} alt="test" />
        );

        await user.click(screen.getByTestId("left-chevron"));

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image3");
    });

    it("goes to first image after clicking on last image right chevron", async () => {
        const user = userEvent.setup();
        render(<ImageSlider images={["image1", "image2"]} alt="test" />);
        const rightChevron = screen.getByTestId("right-chevron");

        await user.click(rightChevron);
        await user.click(rightChevron);

        expect(screen.getByRole("img").getAttribute("src")).toEqual("image1");
    });
});
