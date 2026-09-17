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

  it("filters conversations by status", () => {
    render(<Inbox />);

    fireEvent.click(screen.getByRole("button", { name: "Waiting" }));

    expect(screen.getByText("Invite email never arrived")).toBeInTheDocument();
    expect(screen.getByText("Clarify data retention policy")).toBeInTheDocument();
    expect(screen.queryByText("Update billing contact")).not.toBeInTheDocument();
  });

  it("marks overdue conversations with a badge", () => {
    render(<Inbox />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search conversations" }), {
      target: { value: "SAML metadata refresh" },
    });

    expect(screen.getByText("SAML metadata refresh")).toBeInTheDocument();
    expect(screen.getByText("Overdue")).toBeInTheDocument();
  });

  it("does not mark a resolved conversation overdue", () => {
    render(<Inbox />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search conversations" }), {
      target: { value: "Restore a deleted saved view" },
    });

    expect(screen.getByText("Restore a deleted saved view")).toBeInTheDocument();
    expect(screen.queryByText("Overdue")).not.toBeInTheDocument();
  });
});
