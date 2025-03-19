import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StorePage from "../src/components/StorePage";
import userEvent from "@testing-library/user-event";

describe("Store page", () => {
    it("renders loading", () => {
        render(<StorePage />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});
