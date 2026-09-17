export type TicketStatus = "Open" | "Waiting" | "Resolved";
export type TicketPriority = "High" | "Medium" | "Low";
export type StatusFilter = "All" | TicketStatus;

export interface Ticket {
  id: number;
  title: string;
  summary: string;
  customer: string;
  customerInitials: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
  assigneeInitials: string;
  updatedLabel: string;
  ageHours: number;
}

export const tickets: Ticket[] = [
  {
    id: 1842,
    title: "Export includes archived conversations",
    summary: "The CSV is missing messages from conversations archived last month.",
    customer: "Maya Chen",
    customerInitials: "MC",
    status: "Open",
    priority: "High",
    assignee: "Nora Kim",
    assigneeInitials: "NK",
    updatedLabel: "12 min",
    ageHours: 3,
  },
  {
    id: 1841,
    title: "Invite email never arrived",
    summary: "Two new teammates are still waiting for their workspace invitations.",
    customer: "Jon Bell",
    customerInitials: "JB",
    status: "Waiting",
    priority: "Medium",
    assignee: "Alex Morgan",
    assigneeInitials: "AM",
    updatedLabel: "38 min",
    ageHours: 8,
  },
  {
    id: 1839,
    title: "Update billing contact",
    summary: "Our finance lead changed and needs to receive future invoices.",
    customer: "Elena Park",
    customerInitials: "EP",
    status: "Open",
    priority: "Low",
    assignee: "Sam Rivera",
    assigneeInitials: "SR",
    updatedLabel: "1 hr",
    ageHours: 27,
  },
  {
    id: 1837,
    title: "SAML metadata refresh",
    summary: "The identity provider certificate rotates at the end of the week.",
    customer: "Owen Wright",
    customerInitials: "OW",
    status: "Open",
    priority: "High",
    assignee: "Nora Kim",
    assigneeInitials: "NK",
    updatedLabel: "3 hr",
    ageHours: 53,
  },
  {
    id: 1835,
    title: "Clarify data retention policy",
    summary: "Legal needs confirmation before the annual security review.",
    customer: "Priya Shah",
    customerInitials: "PS",
    status: "Waiting",
    priority: "Medium",
    assignee: "Alex Morgan",
    assigneeInitials: "AM",
    updatedLabel: "Yesterday",
    ageHours: 71,
  },
  {
    id: 1832,
    title: "Restore a deleted saved view",
    summary: "The shared renewal view was removed by mistake on Monday.",
    customer: "Theo Martin",
    customerInitials: "TM",
    status: "Resolved",
    priority: "Low",
    assignee: "Sam Rivera",
    assigneeInitials: "SR",
    updatedLabel: "Monday",
    ageHours: 96,
  },
];

export function filterTickets(
  items: Ticket[],
  query: string,
  status: StatusFilter,
) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  return items.filter((ticket) => {
    const matchesStatus = status === "All" || ticket.status === status;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      ticket.title.toLocaleLowerCase().includes(normalizedQuery) ||
      ticket.customer.toLocaleLowerCase().includes(normalizedQuery) ||
      String(ticket.id).includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}
