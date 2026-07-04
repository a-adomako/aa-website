// Projects data - the single source of truth for the Projects tab (index.html)
// and the per-project detail pages (project.html?p=<slug>).
// To log new progress on a project, append { date: "...", note: "..." } to its `updates` array.
window.PROJECTS = [
            {
                slug: "pantheon-platform",
                name: "Pantheon Platform",
                year: "2026",
                tagline: "A full-stack data platform that tracks outbound campaign performance across every channel.",
                detail: "A marketing data warehouse and API built on a bronze/gold architecture: raw webhook and scrape data lands in append-only tables, idempotent normalizers reshape it into a clean model, and a read API serves it. It treats outbound as experiments — ICP by Offer by Message by Channel, measured on reply rate — so campaigns can be killed or scaled on evidence rather than gut feel.",
                highlights: [
                    "FastAPI + SQLAlchemy + Postgres (Supabase), deployed on Render",
                    "Bronze/gold pattern: append-only raw layer to idempotent normalizers to clean tables",
                    "Live webhook ingestion, normalized every 5 minutes via cron",
                    "Windowed dedup + sentiment-merge logic to absorb duplicate reply events",
                    "Unifies cold email, LinkedIn and 620 Upwork proposals into one funnel"
                ],
                tags: ["Python", "FastAPI", "Supabase", "Data Pipeline"],
                link: { label: "View", url: "" },
                updates: [
                    { date: "May 2026", note: "Added a manual-outbound pull so replies I send from the inbox are captured in the funnel alongside automated sends — closing the last visibility gap in the reply data." }
                ]
            },
            {
                slug: "salesforce-lead-capture",
                name: "Salesforce Lead Capture Extension",
                year: "2026",
                tagline: "A Chrome extension that reads CRM screens with AI and files the data automatically.",
                detail: "A Chrome extension that captures a CRM record on screen, sends the screenshot to Claude vision (via a forced tool-call for schema-guaranteed JSON), and writes the result to Google Sheets through a webhook. First built in about 30 minutes for one client, then evolved into a paid product for another — a queue runner that chains through a list of records on its own: opening each, auto-assigning it, capturing ~15 fields across lazy-loaded sections, and logging a contact note, with human-like throttling between actions.",
                highlights: [
                    "Claude vision + forced tool-call for clean, structured extraction",
                    "Queue runner chains through records unattended: open, capture, assign, next",
                    "MV3 service worker with a chrome.alarms throttle that survives worker death",
                    "Multi-screenshot capture triggers lazy-loaded Salesforce sections",
                    "First build shipped in ~30 min; later productized for a paying client"
                ],
                tags: ["Chrome Extension", "Claude Vision", "Automation"],
                link: { label: "View", url: "" },
                updates: [
                    { date: "June 2026", note: "v2.6 shipped — the queue runner now logs a contact-attempt note on every record it captures, on top of assigning and extracting." }
                ]
            },
            {
                slug: "operations-metrics-dashboard",
                name: "Operations Metrics Dashboard",
                year: "2026",
                tagline: "A live dashboard tracking capacity, revenue, margin and churn across the business.",
                detail: "A live HTML operations dashboard fed by a multi-table database. It surfaces the numbers leadership actually steers by — capacity, revenue, profitability and churn — and was architected so the same data plumbing scales to every client rather than being rebuilt each time.",
                highlights: [
                    "Revenue per client and per team member, plus total revenue and LTV",
                    "Capacity / utilization colour-coded green at capacity",
                    "Gross margin computed from time-tracking hours via CloudCoach",
                    "Churn-event tracking to separate true churn from project endings",
                    "Multi-table backend designed to scale to all clients"
                ],
                tags: ["HTML", "Dashboard", "Data"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "email-enrichment-pipeline",
                name: "Email Enrichment Pipeline",
                year: "2026",
                tagline: "A self-feeding profiles database that finds contact emails through a scraping waterfall.",
                detail: "A profiles database fed passively by scraping, with a cost-ordered enrichment waterfall that only escalates to paid sources when the cheaper ones come up empty. Built to cut reliance on expensive third-party email databases while growing an owned data asset over time.",
                highlights: [
                    "Four-step waterfall: scrape → site-from-link scrape → secondary scraper → paid DB last",
                    "Replaced paid email-database subscriptions",
                    "Profiles database grows passively from every run",
                    "Reached ~90% complete and in active use"
                ],
                tags: ["Python", "Web Scraping", "Database"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "matrixify-csv-cleaner",
                name: "Matrixify CSV Cleaner",
                year: "2026",
                tagline: "A Claude skill that pre-cleans bulk Shopify order files so imports stop failing.",
                detail: "A custom Claude skill that fixes the validation errors which silently break Shopify bulk-order imports, then logs every order it processes so duplicate shipments get caught before they go out. It turned a fragile, error-prone upload into a repeatable one.",
                highlights: [
                    "Auto-fixes missing cities, country codes and malformed addresses",
                    "Logs every order name to flag duplicate shipments",
                    "Cleared a real 91-done / 37-failed / 12-warning batch to zero errors",
                    "Rolled out across multiple Shopify clients"
                ],
                tags: ["Claude Skill", "Shopify", "Data Cleaning"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "content-tracking-system",
                name: "Content Tracking System",
                year: "2026",
                tagline: "Automated ingest that files creator content to the right place, untouched by humans.",
                detail: "An end-to-end ingest pipeline that takes raw content files dropped from several platforms and gets them to the right folder automatically — identifying the creator, reconciling inconsistent handle formats, and matching against a master list with no manual sorting.",
                highlights: [
                    "Extracts and normalizes the creator handle from each filename",
                    "Matches against a master list and routes to the correct folder",
                    "Consolidates content from several platforms into one place",
                    "Runs unattended on a scheduled overnight automation"
                ],
                tags: ["Automation", "Google Sheets"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "capacity-tracking-system",
                name: "Capacity Tracking System",
                year: "2026",
                tagline: "A weekly variance engine comparing projected vs. actual hours across teams.",
                detail: "A Claude Code-built workflow that pulls time-tracking data and turns it into a weekly read on who is over or under capacity, with a triage step that hides the variances already accounted for so review time goes only to the ones that need a human.",
                highlights: [
                    "Computes projected-vs-actual hours per person and per campaign",
                    "Flags over- and under-capacity every week",
                    "'Explained vs. not-yet-explained' triage to focus attention",
                    "Cut weekly review time toward a 5-hour target",
                    "Runs across multiple team pods"
                ],
                tags: ["Claude Code", "Operations"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "instagram-scraper",
                name: "Instagram Scraper",
                year: "2026",
                tagline: "A custom Python scraper that pushes results straight to a database.",
                detail: "A purpose-built Python scraper that replaced a slow, unreliable third-party tool. Instead of batching results that took an hour-plus to assemble, it writes straight to a database — faster, more dependable, and fully under my control.",
                highlights: [
                    "Replaced scraping that projected 60+ minutes for 4,000 records",
                    "Writes results directly to a database",
                    "More reliable than the third-party tool it replaced",
                    "Feeds the broader enrichment pipeline"
                ],
                tags: ["Python", "Web Scraping"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "client-reporting-deck-generator",
                name: "Client Reporting Deck Generator",
                year: "2026",
                tagline: "A Claude skill that produces on-brand client reporting decks.",
                detail: "A Claude skill that assembles branded client reporting decks from source data, collapsing a manual design-and-formatting task into a single command and keeping every deck consistent with the house style.",
                highlights: [
                    "Generates branded decks from source data",
                    "Turns a manual design task into one command",
                    "Keeps reporting consistent across clients",
                    "Built as a reusable, installable Claude skill"
                ],
                tags: ["Claude Skill", "Reporting"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "daily-news-briefing",
                name: "Daily News Briefing",
                year: "2026",
                tagline: "A morning digest that pulls world, business and regional news to my inbox.",
                detail: "A Python app that gathers the day's world, business and regional news, formats it into a clean briefing, and delivers it where it gets read — my inbox each morning and a team Slack channel on a schedule.",
                highlights: [
                    "Aggregates world, business and regional health/news",
                    "Emails a clean briefing every morning",
                    "Auto-posts to a team Slack channel on a schedule"
                ],
                tags: ["Python", "Automation"],
                link: { label: "View", url: "" },
                updates: []
            },
            {
                slug: "cold-email-engine",
                name: "Cold Email Engine",
                year: "2026",
                tagline: "A 7-stage pipeline that scrapes, verifies and AI-personalizes cold outreach at scale.",
                detail: "An end-to-end outbound pipeline for my own consultancy. It scrapes leads to a niche spec, verifies deliverability, casualizes names, and writes a one-sentence personalized icebreaker for each prospect with Claude — then uploads only the leads worth sending to, pushes campaigns to the sending tool as drafts, and seeds them into the platform database so every reply links back automatically.",
                highlights: [
                    "Scrape, verify, casualize, personalize, upload, seed, measure",
                    "Claude Haiku casualizes names; Sonnet writes compliment-frame icebreakers",
                    "Skips low-signal leads rather than sending a generic opener",
                    "Recovers usable leads from 'I have left the firm' auto-replies",
                    "~$0.003 per lead; campaigns auto-link back to the data platform"
                ],
                tags: ["Python", "Claude API", "Web Scraping"],
                link: { label: "View", url: "" },
                updates: [
                    { date: "May 2026", note: "Added forwarding-contact extraction — recovers fresh leads from 'X has left the firm' auto-replies at zero scraping cost." }
                ]
            },
            {
                slug: "ai-dispatch-system",
                name: "AI Dispatch System",
                year: "2026",
                tagline: "End-to-end ops automation for a field-services company, from inbound call to payment.",
                detail: "A full operations system for a roll-off dumpster-rental company running ~300 active rentals with no human dispatcher in the loop. A voice-AI receptionist books jobs around the clock, GPS geofencing advances each job through the pipeline, a route optimizer plans and texts drivers their daily runs, and tiered invoicing fires automatically off job completion.",
                highlights: [
                    "Retell voice-AI receptionist books delivery / turn / pickup jobs 24/7",
                    "Samsara GPS geofencing as the single source of truth for field events",
                    "Daily route optimizer (Google Maps) texts each driver their run",
                    "Automated tiered invoicing + payment reminders via Make.com + GHL",
                    "Built to ~95%; paused when the client cancelled on external blockers"
                ],
                tags: ["Voice AI", "Make.com", "GHL", "Automation"],
                link: { label: "View", url: "" },
                updates: []
            }
        ];
