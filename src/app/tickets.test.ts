import { describe, expect, it } from "vitest";

import { filterTickets, tickets } from "./tickets";

describe("filterTickets", () => {
  it("filters by status", () => {
    const result = filterTickets(tickets, "", "Waiting");

    expect(result).toHaveLength(2);
    expect(result.every((ticket) => ticket.status === "Waiting")).toBe(true);
  });

  it("searches ticket titles, customers, and ids", () => {
    expect(filterTickets(tickets, "archived", "All")).toHaveLength(1);
    expect(filterTickets(tickets, "Priya", "All")).toHaveLength(1);
    expect(filterTickets(tickets, "1839", "All")).toHaveLength(1);
  });
});
