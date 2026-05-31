import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Pagination from "../components/Pagination.js";

describe("Pagination", () => {
    it("changes to last value", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={0} min={0} max={5} />);

        await user.click(screen.getByTestId("chevron-max-right"));

        expect(setter).toHaveBeenCalledWith(5);
    });

    it("changes to first value", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={1} min={0} max={5} />);

        await user.click(screen.getByTestId("chevron-max-left"));

        expect(setter).toHaveBeenCalledWith(0);
    });

    it("doesnt call function to change to last value when already last", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={5} min={1} max={5} />);

        await user.click(screen.getByTestId("chevron-right"));
        await user.click(screen.getByTestId("chevron-max-right"));

        expect(setter).not.toBeCalled();
    });
    it("doesnt call function to change to first value when already first", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={1} min={1} max={5} />);

        await user.click(screen.getByTestId("chevron-left"));
        await user.click(screen.getByTestId("chevron-max-left"));

        expect(setter).not.toBeCalled();
    });

    it("uses scroll to on right chevron", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={1} min={1} max={5} />);
        window.scrollTo = vi.fn();
        await user.click(screen.getByTestId("chevron-right"));
        expect(window.scrollTo).toBeCalledWith(0, 0);
    });

    it("doesnt use scroll to on left chevron", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={1} min={1} max={5} />);
        window.scrollTo = vi.fn();
        await user.click(screen.getByTestId("chevron-left"));
        expect(window.scrollTo).not.toBeCalledWith(0, 0);
    });

    it("uses scroll to on left chevron", async () => {
        const setter = vi.fn();
        const user = userEvent.setup();
        render(<Pagination setter={setter} value={2} min={1} max={5} />);
        window.scrollTo = vi.fn();
        await user.click(screen.getByTestId("chevron-left"));
        expect(window.scrollTo).toBeCalledTimes(1);
    });
});
