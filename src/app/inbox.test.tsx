import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Inbox } from "./inbox";

describe("Inbox", () => {
  it("searches conversations", () => {
    render(<Inbox />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search conversations" }), {
      target: { value: "Maya" },
    });

    expect(screen.getByText("Export includes archived conversations")).toBeInTheDocument();
    expect(screen.queryByText("Invite email never arrived")).not.toBeInTheDocument();
    expect(screen.getByText("1 shown")).toBeInTheDocument();
  });

  it("shows an empty state and clears filters", () => {
    render(<Inbox />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search conversations" }), {
      target: { value: "zzzzz" },
    });

    expect(screen.getByText("No conversations found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your search or filters.")).toBeInTheDocument();
    expect(screen.getByText("0 shown")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(screen.queryByText("No conversations found")).not.toBeInTheDocument();
    expect(screen.getByText("Export includes archived conversations")).toBeInTheDocument();
    expect(screen.getByText("Invite email never arrived")).toBeInTheDocument();
    expect(screen.getByText("6 shown")).toBeInTheDocument();
  });

  it("filters conversations by status", () => {
    render(<Inbox />);

    fireEvent.click(screen.getByRole("button", { name: "Waiting" }));

    expect(screen.getByText("Invite email never arrived")).toBeInTheDocument();
    expect(screen.getByText("Clarify data retention policy")).toBeInTheDocument();
    expect(screen.queryByText("Update billing contact")).not.toBeInTheDocument();
  });
});
