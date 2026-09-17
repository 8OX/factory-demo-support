import { describe, expect, it } from "vitest";

import { filterTickets, isTicketOverdue, tickets } from "./tickets";

function ticketById(id: number) {
  const ticket = tickets.find((item) => item.id === id);

  if (!ticket) {
    throw new Error(`Missing fixture ticket #${id}`);
  }

  return ticket;
}

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

describe("isTicketOverdue", () => {
  it("flags a non-resolved ticket older than 48 hours", () => {
    expect(isTicketOverdue(ticketById(1837))).toBe(true);
  });

  it("uses a strict boundary at 48 hours", () => {
    const base = ticketById(1837);

    expect(isTicketOverdue({ ...base, ageHours: 48 })).toBe(false);
    expect(isTicketOverdue({ ...base, ageHours: 48.5 })).toBe(true);
  });

  it("never flags a resolved ticket even when it is very old", () => {
    expect(isTicketOverdue(ticketById(1832))).toBe(false);
  });
});
