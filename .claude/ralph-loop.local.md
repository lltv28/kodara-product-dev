---
active: true
iteration: 1
max_iterations: 30
completion_promise: "COMPLETE"
started_at: "2026-02-20T02:57:05Z"
---

You are building new AI chat response components for a business/finance AI app mockup located at C:\Users\lucas\OneDrive\Documents\claude-code\mockups-v2

FIRST: Read the entire project. Read every file. Read DESIGN_SYSTEM.md thoroughly. Read every existing component, page, layout, and style file. Understand the full design system (colors, typography, spacing, border radius, shadows, component patterns) before writing a single line of code. You must match the existing design language exactly.

IMPORTANT — REPLACE DR. PRIYA PATEL: The current demo uses a placeholder persona named "Dr. Priya Patel" throughout the app. Replace ALL references to Dr. Priya Patel, Priya Patel, Priya, and Dr. Patel with a small business owner persona and context. The new demo should feel like a founder or CEO of a growing service-based business (somewhere in the 500K-5M revenue range) is using this AI as their operational command center. Update the chat messages, user name, conversation history, sidebar, user profile area, and any other Priya Patel references so the entire experience is consistent with the business/finance AI use case. Pick a believable name and role (e.g., the owner of a growing digital agency or professional services firm) and apply it everywhere the old persona currently appears. Search the entire codebase for "Priya", "Patel", and "Dr." references tied to this persona to make sure nothing is missed.

OBJECTIVE: Build 4 new chat response component types that appear as AI responses inside the existing chat interface. These are NOT separate pages or modals. They sit in the chat flow just like a text response would, but richer. They are rich components rendered inline within the chat conversation, sent as responses from the AI back to the user. The overall theme of this demo: one AI that connects to all your business tools, keeps everything organized, lets you talk to your data naturally, and proactively catches things before they become problems.

---

COMPONENT 1: Project Management Hub (Live Multi-Platform Connection)

This component appears when the user asks the AI to pull in their tasks, projects, or team workload. It should feel like the AI is connecting to multiple project management platforms simultaneously and synthesizing everything into one unified view.

Build these sub-elements:
- A multi-service connection sequence. This is critical for the demo feel. Show it connecting to each platform one at a time:
  - "Connecting to Monday.com..." with the Monday logo/icon and a pulsing indicator, then a checkmark when connected
  - "Connecting to ClickUp..." same pattern
  - "Connecting to Asana..." same pattern
  - Each connection should resolve sequentially with a slight stagger (timed animations), so it feels like real API handshakes happening
  - Once all three are connected, show a unified status bar: "3 platforms synced" with small logos for each, plus a "Last synced: just now" timestamp
- The main unified dashboard card rendered inside the chat:
  - A "Cross-Platform Summary" header
  - Stats row at the top: Total Active Projects (e.g., 14), Tasks Due This Week (e.g., 23), Overdue Items (e.g., 5 — highlighted in a warning color from the design system), Team Members Active (e.g., 8)
  - A compact project list showing the top 5 highest-priority items pulled from across all three platforms:
    - Each row shows: project/task name, source platform (small pill badge: "Monday" / "ClickUp" / "Asana" with subtle brand-appropriate colors), assignee, due date, status pill (On Track / At Risk / Overdue)
    - "At Risk" and "Overdue" items should visually stand out using design system warning/error colors
  - A "Team Workload" mini visualization: a simple horizontal bar chart or dot chart showing how tasks are distributed across team members, so the business owner can see who is overloaded vs underutilized
- An AI insight paragraph at the bottom:
  - Written naturally: something like "You have 5 overdue items across Monday and Asana, 3 of which are assigned to Jamie. It looks like she may be overloaded this week. I would suggest reassigning the Asana tasks for the Henderson project to Marcus, who currently has capacity. Also, the Q1 Website Redesign in ClickUp has not had any activity in 9 days and may need attention."
- Use realistic mock data: project names like "Henderson Consulting Onboarding", "Q1 Website Redesign", "Monthly Retainer - Apex Properties", "Tax Prep Document Collection", "New Client Proposal - Meridian Group"

COMPONENT 2: Financial Overview (Accounting Data Pull)

This component appears when the user asks about their finances, cash flow, revenue, expenses, or anything money-related. It should feel like the AI is pulling live data from their accounting software.

Build these sub-elements:
- A connection sequence similar to Component 1 but for accounting platforms:
  - "Connecting to QuickBooks..." with a QB-style icon and pulsing indicator, then checkmark
  - "Syncing transactions from the last 30 days..." with a count-up animation (e.g., "Processing 247 transactions...")
  - A "Live" badge once connected, similar to the marketing demo
- The main financial dashboard card rendered inside the chat:
  - A top-level summary row: Revenue (MTD), Expenses (MTD), Net Profit (MTD), Cash on Hand — each in its own mini card with the number prominently displayed and a small trend arrow (up/down) with percentage change vs last month
  - A revenue vs expenses mini chart: a simple dual-line or dual-bar chart showing the last 6 months trend, making it immediately obvious whether the business is growing and healthy
  - An "Accounts Receivable Aging" section: a compact breakdown showing:
    - Current: amount
    - 1-30 days: amount
    - 31-60 days: amount
    - 60+ days: amount (highlighted in warning/error color)
    - Total Outstanding: amount
  - A "Recent Large Transactions" list: 4-5 notable transactions with date, description, amount, and category — things like "Stripe Payout - March Revenue", "AWS Monthly - Infrastructure", "Payroll - Biweekly", "Office Lease - Q1"
- An AI insight paragraph at the bottom:
  - Written naturally: something like "Your revenue is up 12% month-over-month, but expenses grew 18% driven primarily by the new contractor costs. You have $14,200 in receivables over 60 days past due, mostly from Apex Properties ($8,400) and Meridian Group ($5,800). I would recommend sending follow-up invoices today. Your current cash runway at this burn rate is approximately 4.2 months."
- Use realistic mock data with believable numbers for a business doing roughly $150-250K/month in revenue

COMPONENT 3: Unified Data Chat (Ask Anything About Your Business)

This component demonstrates the "chat with your data" concept. It appears when the user asks a natural language question that requires pulling from multiple sources. The key differentiator here is showing that the AI can cross-reference data from project management AND accounting to answer questions no single tool could answer alone.

Build these sub-elements:
- A "thinking" state that shows which data sources are being queried:
  - "Analyzing your question..."
  - Then a list of sources being consulted, each appearing one at a time:
    - "Querying QuickBooks for revenue by client..." with a checkmark when done
    - "Querying Monday.com for project hours..." with a checkmark when done
    - "Querying ClickUp for deliverable status..." with a checkmark when done
    - "Cross-referencing data..." with a checkmark when done
  - This sequence should make it visually obvious that the AI is pulling from multiple places and synthesizing
- The main answer rendered as a rich, structured response:
  - For the demo, use this example question (shown as the user message above): "Which clients are most profitable this quarter and are any of them at risk of churning?"
  - The AI response should include:
    - A "Client Profitability Breakdown" table or card grid showing top 5 clients:
      - Client name, quarterly revenue, estimated hours spent (from PM tools), effective hourly rate (calculated by dividing revenue by hours), profit margin, status indicator
      - The key insight here is that the AI combined financial data with project management hours to calculate something neither tool shows on its own
    - A "Churn Risk Flags" section:
      - 2-3 clients flagged with warning indicators
      - Each flag shows the client name, the signal detected, and the source: e.g., "Apex Properties - 3 support tickets unresolved for 14+ days (ClickUp) and last invoice 47 days past due (QuickBooks)" or "Meridian Group - Project scope reduced by 40% last month (Monday) and they requested a contract review (email)"
    - A clear, actionable recommendation paragraph: "Henderson Consulting is your highest-margin client at $285/hr effective rate. Apex Properties shows two churn signals and represents $8,400/mo in recurring revenue. I would prioritize a check-in call with them this week. I can draft the agenda and create the follow-up tasks if you want."
- Action buttons at the bottom:
  - "Schedule Check-in with Apex Properties" (primary)
  - "Draft Client Report" (secondary)
  - "Show Full Profitability Report" (ghost)

COMPONENT 4: Accountability Watchdog (Proactive Alerts and Catch-All)

This is the "catches things that fall through the cracks" component. Unlike the others, this one is NOT triggered by a user question. It appears proactively, as if the AI noticed something on its own and is flagging it. This is the most important component for showing the unique value of having an AI that watches everything.

Build these sub-elements:
- A distinctive visual treatment that differentiates this from a normal AI response. It should feel like an alert or notification, but still live within the chat. Consider:
  - A subtle accent border or background tint using a design system accent color
  - An icon or badge at the top: something like a shield, radar, or eye icon with "Watchdog Alert" or "I noticed something" label
  - A timestamp: "Flagged 2 hours ago" to reinforce that the AI is always monitoring
- The main alert content, showing 3-4 different types of things the AI caught:
  - ALERT 1 — Missed Follow-up:
    - "The proposal for Meridian Group was sent 7 days ago with no response. The typical close window for proposals this size is 5 business days. This is at risk of going cold."
    - Source tags: "Gmail" + "Monday.com"
    - Suggested action button: "Send Follow-up Email"
  - ALERT 2 — Financial Anomaly:
    - "There is a duplicate charge of $2,340 from your payment processor on March 12th and March 13th. This looks unintentional based on your transaction history."
    - Source tag: "QuickBooks"
    - Suggested action button: "Review Transaction"
  - ALERT 3 — Deadline Risk:
    - "The Henderson Consulting deliverables are due Friday, but 3 of 7 tasks are still in progress and the assigned team member has been out sick for 2 days. At the current pace, this will likely miss the deadline."
    - Source tags: "Asana" + "ClickUp"
    - Suggested action button: "Reassign Tasks"
  - ALERT 4 — Compliance/Admin:
    - "Your quarterly estimated tax payment is due in 12 days. Based on your current revenue, the estimated amount is $18,400. Last quarter you were late by 3 days and incurred a $220 penalty."
    - Source tag: "QuickBooks" + "Calendar"
    - Suggested action button: "Schedule Payment"
  - Each alert should have a severity indicator: a colored dot or border (red for urgent, yellow for needs attention, blue for informational) using design system colors
- A summary footer:
  - "4 items need your attention. 2 are urgent."
  - "Dismiss All" and "Add to Today's Tasks" action buttons
- The overall vibe should feel like having a hyper-competent assistant who reviewed everything overnight and is briefing you in the morning

---

CRITICAL DESIGN REQUIREMENTS:
1. Read DESIGN_SYSTEM.md before touching any code. Every color, font, spacing value, border-radius, shadow, and component pattern must come from that file.
2. These components render INSIDE the existing chat interface as AI response messages. They are not separate pages or modals. They sit in the chat flow just like a text response would, but richer.
3. Match the existing chat bubble styling, spacing, and layout patterns already in the project.
4. All interactive states (hover, active, selected, loading) must be polished and match the design system.
5. Use realistic, believable mock data throughout. Client names, financial figures, project names, team member names — everything should look like it came from a real small business.
6. The multi-platform connection sequences are critical for believability. Showing the AI connecting to Monday, then ClickUp, then Asana (or QuickBooks, etc.) one at a time with staggered animations is what makes this feel real vs just a static mockup.
7. Responsiveness: these components must look good within the chat container width. No overflow, no broken layouts.
8. Replace ALL Dr. Priya Patel references throughout the entire app with the new business owner persona. This includes the chat history, user profile, sidebar, and any hardcoded names or contexts. Search the entire codebase for "Priya", "Patel", and any "Dr." references tied to this persona to make sure nothing is missed.
9. The Accountability Watchdog (Component 4) should feel visually distinct from normal AI responses. It is proactive, not reactive. The user did not ask for this info — the AI surfaced it on its own. Make that obvious through design.
10. Platform logos/icons: use simple styled text pills or unicode/svg icons to represent Monday, ClickUp, Asana, QuickBooks, etc. Do not use actual brand logos. Style them with subtle, neutral colors that suggest the brand without violating any trademark.

---

SELF-CHECK LOOP — Run this after every iteration:

1. DESIGN SYSTEM ACCURACY (score 1-10):
   - Re-read DESIGN_SYSTEM.md
   - Compare every color, font, spacing, radius, shadow in your components against it
   - Check that no arbitrary/hardcoded values crept in
   - Verify component patterns match established patterns
   - If below 10: identify every deviation and fix them

2. DEMO BELIEVABILITY (score 1-10):
   - Open the app in the browser
   - Look at the chat with these components rendered
   - Does it look like a real, working product that a business owner would pay for?
   - Are the connection/syncing animations convincing?
   - Is the mock data realistic? Do the financial numbers make sense for a business this size? Do the project names sound like real client work?
   - Does the Accountability Watchdog feel genuinely useful and proactive, like something that would make a business owner say "how did I run my business without this"?
   - Would a potential customer watching a demo video believe this is a working product?
   - If below 10: identify what breaks the illusion and fix it

3. DR. PRIYA PATEL REPLACEMENT CHECK:
   - Run a grep/search across the entire codebase for "Priya", "Patel", and "Dr. P" (case-insensitive)
   - If any references to the old persona remain, replace them immediately
   - Verify the new persona name and role appear consistently everywhere
   - Make sure no leftover medical/healthcare context from the old persona bleeds through

4. INTEGRATION CHECK:
   - Do the new components match the visual weight and style of existing chat elements?
   - Is there visual consistency between all 4 new component types?
   - Does the Watchdog component feel distinct but still part of the same product?
   - Do they feel like they belong in the same product?

Only output <promise>COMPLETE</promise> when BOTH design accuracy and demo believability scores are genuinely 10/10 and you can justify why. All Dr. Priya Patel references must also be fully replaced.

If any score is below 10, describe what is wrong, fix it, and re-check.
