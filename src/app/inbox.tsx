"use client";

import { useMemo, useState } from "react";

import {
  filterTickets,
  type StatusFilter,
  type Ticket,
  tickets,
} from "./tickets";

const statusFilters: StatusFilter[] = ["All", "Open", "Waiting", "Resolved"];

const statusStyles = {
  Open: "bg-blue-50 text-blue-700 ring-blue-600/10",
  Waiting: "bg-amber-50 text-amber-700 ring-amber-600/10",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
} as const;

const priorityDots = {
  High: "bg-rose-500",
  Medium: "bg-amber-400",
  Low: "bg-slate-300",
} as const;

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <article className="group grid min-w-[760px] grid-cols-[minmax(300px,1.7fr)_minmax(150px,0.85fr)_110px_120px_76px] items-center gap-4 border-t border-slate-100 px-5 py-4 transition-colors hover:bg-slate-50/70">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className={`size-1.5 shrink-0 rounded-full ${priorityDots[ticket.priority]}`} />
          <h2 className="truncate text-sm font-medium text-slate-900">{ticket.title}</h2>
          <span className="shrink-0 text-xs text-slate-400">#{ticket.id}</span>
        </div>
        <p className="mt-1 truncate pl-3.5 text-sm text-slate-500">{ticket.summary}</p>
      </div>

      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
          {ticket.customerInitials}
        </span>
        <span className="truncate text-sm text-slate-600">{ticket.customer}</span>
      </div>

      <div>
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-slate-800 text-[9px] font-semibold text-white">
          {ticket.assigneeInitials}
        </span>
        <span className="truncate text-sm text-slate-600">{ticket.assignee}</span>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="whitespace-nowrap text-xs text-slate-400">{ticket.updatedLabel}</span>
        <ChevronIcon />
      </div>
    </article>
  );
}

export function Inbox() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const visibleTickets = useMemo(
    () => filterTickets(tickets, query, status),
    [query, status],
  );

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-slate-950">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white">S</span>
            <span className="text-sm font-semibold tracking-tight">Support</span>
          </div>
          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-lg bg-slate-100 p-1 sm:flex">
            <span className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-slate-900 shadow-sm">Inbox</span>
            <span className="px-3 py-1.5 text-xs font-medium text-slate-500">Customers</span>
            <span className="px-3 py-1.5 text-xs font-medium text-slate-500">Reports</span>
          </nav>
          <div className="flex size-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">AM</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950">Inbox</h1>
            <p className="mt-2 text-sm text-slate-500">Keep every customer conversation moving.</p>
          </div>
          <label className="relative block w-full sm:w-72">
            <span className="sr-only">Search conversations</span>
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400"><SearchIcon /></span>
            <input
              className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search conversations"
              type="search"
              value={query}
            />
          </label>
        </div>

        <section aria-label="Inbox summary" className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <p className="text-sm text-slate-500">Open</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">12</p>
            <p className="mt-1 text-xs text-slate-400">3 need a reply</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <p className="text-sm text-slate-500">Waiting</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">4</p>
            <p className="mt-1 text-xs text-slate-400">Median wait 1 hr</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <p className="text-sm text-slate-500">Resolved</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">38</p>
            <p className="mt-1 text-xs text-slate-400">This week</p>
          </div>
        </section>

        <section aria-label="Conversations" className="mt-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
            <div className="flex items-center gap-1" role="group" aria-label="Filter by status">
              {statusFilters.map((filter) => (
                <button
                  aria-pressed={status === filter}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${status === filter ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"}`}
                  key={filter}
                  onClick={() => setStatus(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400">{visibleTickets.length} shown</span>
          </div>

          <div className="overflow-x-auto">
            <div className="grid min-w-[760px] grid-cols-[minmax(300px,1.7fr)_minmax(150px,0.85fr)_110px_120px_76px] gap-4 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
              <span>Conversation</span>
              <span>Customer</span>
              <span>Status</span>
              <span>Assignee</span>
              <span className="text-right">Updated</span>
            </div>
            {visibleTickets.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} />)}
          </div>
        </section>
      </main>
    </div>
  );
}
