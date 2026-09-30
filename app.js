const icons = {
  home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-7h6v7"/>',
  ask: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
  incident: '<path d="M12 3 3 20h18L12 3z"/><path d="M12 9v5M12 17h.01"/>',
  timeline: '<path d="M4 6h16M4 12h10M4 18h16"/><circle cx="7" cy="6" r="2"/><circle cx="17" cy="12" r="2"/>',
  deflection: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M16 6h4v4"/>',
  changes: '<path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4z"/><path d="m9 12 2 2 4-4"/>',
  knowledge: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z"/><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h8"/>',
  roi: '<path d="M4 19V5M4 19h17"/><rect x="7" y="11" width="3" height="5" rx="1"/><rect x="13" y="8" width="3" height="8" rx="1"/><rect x="19" y="4" width="2" height="12" rx="1"/>',
  architecture: '<rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="11" width="18" height="4" rx="1"/><rect x="3" y="17" width="18" height="4" rx="1"/>',
  governance: '<path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4z"/><path d="m9 12 2 2 4-4"/>',
  walkthrough: '<path d="m8 5 11 7-11 7z"/>',
};
const navItems = [
  { route: "/", label: "Overview", icon: "home" },
  { route: "/ask", label: "Ask senior admin", icon: "ask" },
  { route: "/executive-demo", label: "Executive demo", icon: "walkthrough" },
  { route: "/scenarios", label: "Guided scenarios", icon: "walkthrough" },
  { route: "/incident", label: "Incident workbench", icon: "incident" },
  { route: "/timeline", label: "Troubleshooting notes", icon: "timeline" },
  { route: "/deflection", label: "Service desk insights", icon: "deflection" },
  { route: "/changes", label: "Change planner", icon: "changes" },
  { route: "/knowledge", label: "Knowledge library", icon: "knowledge" },
  { route: "/governance", label: "Copilot guardrails", icon: "governance" },
  { route: "/architecture", label: "Microsoft stack", icon: "architecture" },
  { route: "/roi", label: "Executive value", icon: "roi" },
];

const scenarios = [
  {
    id: "signin", category: "Identity & access", icon: "◎", title: "Help a user who can't sign in",
    summary: "Check identity, sign-in logs, MFA, and Conditional Access in a safe order.",
    situation: "A user reports repeated sign-in failures after changing phones. Other employees can access the same app.",
    steps: [
      ["Confirm who and what is affected", "Ask for the user's exact UPN, affected app, error text, device, network, and when it started. Check whether another user can sign in to separate a user-specific issue from an outage.", 'Get-MgUser -UserId "jordan@contoso.com" | Select-Object DisplayName, UserPrincipalName, AccountEnabled'],
      ["Review the sign-in attempt", "Use the Entra sign-in logs for the affected user and app. Note the failure reason, correlation ID, device state, and Conditional Access result. Do not reset credentials just because sign-in failed.", 'Get-MgAuditLogSignIn -Filter "userPrincipalName eq \'jordan@contoso.com\'" -Top 10'],
      ["Check MFA registration and methods", "If the failure points to an outdated authenticator, verify the user's registered methods using your approved admin portal. Follow your identity-verification policy before changing or removing any method.", "Entra admin center → Users → jordan@contoso.com → Authentication methods"],
      ["Recommend the least disruptive fix", "If identity is verified and policy permits, guide the user through registering the new device. A helpdesk admin should perform a temporary-access-pass reset only through the approved process.", "No command to run — follow your organization's verified identity reset procedure."],
      ["Confirm recovery and document", "Have the user retry the affected app, verify a successful sign-in, record the resolution, and check whether the same failure is affecting more users.", "Record: user · app · failure code · approved change · sign-in confirmation"],
    ],
  },
  {
    id: "onboard", category: "Identity & access", icon: "＋", title: "Onboard a new employee",
    summary: "Walk through identity, licensing, access, device readiness, and the handoff checklist.",
    situation: "A new employee starts Monday. Their manager requested email, Teams, a managed laptop, and access to two business applications.",
    steps: [
      ["Verify the approved request", "Confirm the manager, start date, worker type, department, location, and approved access package. Resolve any unclear or privileged access before provisioning.", "Check the approved HR / ITSM onboarding request. Do not infer permissions from another user's account."],
      ["Check for an existing identity", "Search for a matching account before creating one. Verify the UPN and naming conventions against your tenant standards.", 'Get-MgUser -Filter "mail eq \'casey@contoso.com\'" | Select-Object DisplayName, UserPrincipalName, AccountEnabled'],
      ["Prepare the access checklist", "Map the request to approved groups, licenses, and app roles. Use role-based groups and least privilege; confirm any paid license assignment with the owner.", "Checklist: Entra ID · M365 license · Teams · approved app groups · manager validation"],
      ["Confirm device readiness", "Check that the laptop is assigned, enrolled in Intune, compliant, encrypted, and scheduled for delivery. Escalate any compliance or enrollment exception.", "Intune admin center → Devices → search by serial number → check compliance and primary user"],
      ["Review before completion", "A designated admin applies approved changes. Confirm first sign-in, MFA setup, required apps, and manager handoff. Record what was granted and who approved it.", "No changes are made by Copilot. Complete the approved onboarding ticket and verification."],
    ],
  },
  {
    id: "device", category: "Endpoints", icon: "▣", title: "Troubleshoot a slow or noncompliant laptop",
    summary: "Gather symptoms first, inspect device health, then select a reversible next step.",
    situation: "A remote employee says their laptop is slow and the company VPN disconnects. They have a customer meeting in an hour.",
    steps: [
      ["Triage the impact", "Confirm the device name, last reboot, network, error message, business impact, and whether the issue began after an update. Ask if other users are affected.", "Ask first: Is the user blocked from work, or is performance degraded? Is VPN affected on another network?"],
      ["Check device health", "Review the Intune device record for last check-in, compliance, storage, encryption, and pending actions. Compare with endpoint protection and update status.", "Intune admin center → Devices → Windows → select device → Device compliance"],
      ["Separate local from network issues", "Compare VPN status on a known-good network, check the VPN service health dashboard, and review the endpoint's recent connection or client errors.", "Gather diagnostic output using your approved endpoint tools; don't ask the user to disable security controls."],
      ["Choose a safe next step", "Start with a user-safe reboot or approved VPN-client repair only when unsaved work is protected. If compliance or protection is unhealthy, escalate to endpoint security.", "Do not disable Defender, encryption, Conditional Access, or device compliance to work around the symptom."],
      ["Verify and close the loop", "Recheck device compliance and VPN stability, confirm the user's meeting access, and document any escalation or follow-up action.", "Close only after the user confirms the service is restored."],
    ],
  },
  {
    id: "mailbox", category: "Microsoft 365", icon: "✉", title: "Grant shared mailbox access",
    summary: "Verify the request, identify the right permission, and validate access without over-granting.",
    situation: "A team lead asks for a colleague to access the Finance shared mailbox before month-end reporting.",
    steps: [
      ["Validate the business request", "Confirm the mailbox address, named user, business reason, duration, and mailbox owner approval. Treat finance and HR mailboxes as sensitive.", "Check the approved request and required data-owner approval before proceeding."],
      ["Inspect existing access", "Review current Full Access, Send As, and Send on Behalf assignments. The permissions are distinct; confirm exactly what the user needs.", "Exchange admin center → Recipients → Mailboxes → shared mailbox → Delegation"],
      ["Recommend least privilege", "Use the minimum permission that meets the task: reading/managing messages differs from sending as the mailbox. Apply your organization's approval and separation-of-duties rules.", "Do not grant both Full Access and Send As by default."],
      ["Apply through approved workflow", "An Exchange admin makes the approved change using the admin center or a reviewed command in the organization's change process.", "Exchange admin center → Recipients → Mailboxes → Delegation → apply only the approved permission"],
      ["Verify and review expiry", "Confirm the permission appears as expected, ask the user to test, document the approver, and set a review or removal date if access is temporary.", "The example command is illustrative and is never run by this demo."],
    ],
  },
  {
    id: "teams", category: "Microsoft 365", icon: "▤", title: "Fix a Teams meeting or audio issue",
    summary: "Scope the symptom, check service health, and work through quick client-side checks.",
    situation: "One employee cannot hear others in Teams meetings; their colleagues on the same call are unaffected.",
    steps: [
      ["Scope the symptom", "Confirm whether the issue affects all meetings, one device, and one audio accessory. Ask the user to check mute, selected speaker, and headset connection.", "Ask whether Teams web has the same symptom. Avoid assuming this is a tenant-wide outage."],
      ["Check Microsoft 365 service health", "Review the Teams service health dashboard and any advisories for meetings, media, or calling before changing local settings.", "Microsoft 365 admin center → Health → Service health → Microsoft Teams"],
      ["Check client and device settings", "Confirm the correct speaker is selected, test the device in Teams settings, and compare with a known-good headset. Check the Teams client version and OS audio output.", "Teams → Settings → Devices → Make a test call"],
      ["Try a reversible fix", "Restart Teams, reconnect the headset, or test Teams web. Save work before clearing client cache, and follow current Microsoft support guidance.", "Don't delete profiles or alter tenant-wide meeting policies for a single-user device issue."],
      ["Verify and record", "Place a test call, confirm the user can hear and be heard, and capture the device/client version if escalation is needed.", "If multiple users are affected, link the issue to service-health status and escalate."],
    ],
  },
  {
    id: "access", category: "Identity & access", icon: "⌑", title: "Review an application access request",
    summary: "Check ownership, approval, role scope, and group-based provisioning before granting access.",
    situation: "A user requests access to a business application and says a teammate already has the role they need.",
    steps: [
      ["Confirm app and business need", "Identify the exact app, environment, role, business justification, requested duration, and the user's manager or data owner.", "Do not copy another user's access as a shortcut."],
      ["Check the request and app owner", "Verify the request is approved and identify whether the app uses Entra groups, an enterprise app assignment, or an app-specific role.", "Entra admin center → Enterprise applications → select app → Users and groups"],
      ["Compare role scope", "Review the minimum available role and whether the requested data or action is sensitive. Escalate admin or privileged roles for security approval.", "Prefer an approved role group over direct assignment where your policy supports it."],
      ["Plan a reversible change", "Document the target group/role, owner approval, expected effect, and rollback. Make the change only through your approved access workflow.", "Review plan → confirm approver → then a named admin applies the access change."],
      ["Verify and set review date", "Ask the user to sign in, confirm only the approved capability is available, and record an access-review or expiry date.", "No role or group membership is changed by this demo."],
    ],
  },
];
const state = { route: "/", scenarioId: "signin", scenarioStep: 0, demoTile: "purpose", chat: [], toastTimer: null };

function svgIcon(name) { return `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.home}</svg>`; }
function navMarkup() {
  return navItems.map(item => `<a class="nav-link" href="#${item.route}" data-route="${item.route}"><span class="nav-icon">${svgIcon(item.icon)}</span><span>${item.label}</span></a>`).join("");
}
function panel(title, body, opts = {}) {
  return `<section class="panel ${opts.className || ""}"><header class="panel-header"><div class="panel-title">${opts.live ? '<span class="tiny-live"></span>' : ""}${title}</div>${opts.action || ""}</header>${body}</section>`;
}
function pageHeading(title, subtitle, opts = {}) {
  return `<div class="page-heading"><div><div class="eyebrow">${opts.eyebrow || '<span class="live-dot"></span> OPERATIONS OVERVIEW'}</div><h1>${title}</h1><p class="heading-subtitle">${subtitle}</p></div><div class="heading-actions">${opts.actions || '<span class="refresh-label">Last updated just now</span>'}</div></div>`;
}
function stat(label, value, foot, cls = "") {
  return `<div class="stat-box"><div class="stat-box-label">${label}</div><div class="stat-box-value ${cls}">${value}</div><div class="stat-box-foot ${cls === "good" ? "good" : ""}">${foot}</div></div>`;
}
function badge(text, variant = "") { return `<span class="status-badge ${variant}">${text}</span>`; }
function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => el.classList.remove("visible"), 2800);
}
function metric(label, value, foot, symbol, cls = "", trend = "") {
  return `<article class="metric-card ${cls}"><div class="metric-top">${label}<span class="metric-symbol">${symbol}</span></div><div class="metric-value">${value}</div><div class="metric-foot">${trend ? `<strong class="${cls === "alert" || cls === "warn" ? "trend-warn" : "trend-up"}">${trend}</strong>` : ""}${foot}</div></article>`;
}
function impact(label, value, symbol, color, trend) {
  return `<div class="impact-card"><div class="impact-icon ${color}">${symbol}</div><div><div class="impact-number">${value}</div><div class="impact-label">${label}</div></div><span class="impact-trend">${trend}</span></div>`;
}
function lineChart() {
  const vals = [32, 47, 112, 139, 91, 62, 43, 36];
  const baseY = 128, chartHeight = 108, max = 150;
  const points = vals.map((v, i) => `${38 + i * 112},${baseY - v / max * chartHeight}`).join(" ");
  const area = `38,${baseY} ${points} 822,${baseY}`;
  return `<div class="chart-wrap"><div class="chart-summary"><strong>4,910</strong><span>↑ 42% vs. baseline</span><div class="chart-legend"><span><i class="legend-dot"></i>Requests today</span><span><i class="legend-dot muted"></i>Typical day</span></div></div><svg class="volume-chart" viewBox="0 0 850 158" preserveAspectRatio="none" role="img" aria-label="Support requests rose sharply at 8 AM and returned toward the typical baseline"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#5279e9" stop-opacity=".17"/><stop offset="100%" stop-color="#5279e9" stop-opacity="0"/></linearGradient></defs><line class="chart-gridline" x1="30" y1="22" x2="825" y2="22"/><line class="chart-gridline" x1="30" y1="56" x2="825" y2="56"/><line class="chart-gridline" x1="30" y1="91" x2="825" y2="91"/><line class="chart-gridline" x1="30" y1="128" x2="825" y2="128"/><polygon class="chart-area" points="${area}"/><polyline class="chart-line-secondary" points="38,107 150,106 262,104 374,102 486,101 598,104 710,104 822,102"/><polyline class="chart-line" points="${points}"/>${vals.map((v, i) => `<circle class="chart-point" cx="${38 + i * 112}" cy="${baseY - v / max * chartHeight}" r="3"/>`).join("")}<text class="chart-axis" x="38" y="148" text-anchor="middle">7:00</text><text class="chart-axis" x="150" y="148" text-anchor="middle">7:30</text><text class="chart-axis" x="262" y="148" text-anchor="middle">8:00</text><text class="chart-axis" x="374" y="148" text-anchor="middle">8:30</text><text class="chart-axis" x="486" y="148" text-anchor="middle">9:00</text><text class="chart-axis" x="598" y="148" text-anchor="middle">9:30</text><text class="chart-axis" x="710" y="148" text-anchor="middle">10:00</text><text class="chart-axis" x="822" y="148" text-anchor="middle">10:30</text></svg></div>`;
}
const activities = [
  ["9:12 AM", "Sign-in issue", "MFA registration check suggested", "done"],
  ["9:04 AM", "New starter request", "manager approval still needed", "approved"],
  ["8:47 AM", "VPN connection", "device health check recommended", "done"],
  ["8:35 AM", "Change review", "mailbox access request awaits owner", ""],
];
function activityMarkup() {
  return activities.map(([time, who, what, cls]) => `<div class="activity-item"><span class="activity-time">${time}</span><span class="activity-node ${cls}"></span><div class="activity-copy"><strong>${who}</strong> ${what}</div></div>`).join("");
}
function dashboard() {
  const actions = `<button class="button" data-action="refresh">${svgIcon("timeline")} Refresh</button><a class="button button-primary" href="#/executive-demo">Start executive demo <span>›</span></a>`;
  const quickLinks = scenarios.slice(0, 4).map(scenarioCard).join("");
  const priorityPanel = panel("Needs your attention", `<div class="activity-list">${activityMarkup()}</div>`, {action: '<a class="text-link" href="#/scenarios">View admin scenarios <span>›</span></a>'});
  return `${pageHeading("Good morning, Morgan", "A practical second set of eyes for everyday IT administration. Get a safe, step-by-step recommendation, understand why it matters, and decide what to do.", {eyebrow: '<span class="live-dot"></span> YOUR IT ADMIN COPILOT', actions})}
    <div class="copilot-banner"><div class="copilot-banner-icon">✦</div><div class="copilot-banner-copy"><strong>Think it through with a senior admin.</strong><span>Describe a user issue, request, or change. Get clarifying questions, checks in order, and a plain-English explanation — you review and perform every action.</span></div><a href="#/executive-demo" class="button button-primary">Take the executive tour <span>›</span></a></div>
    <div class="metrics-grid admin-metrics">${metric("Requests awaiting review","8","3 need owner approval","◷","warn","3 today")}${metric("Sign-in issues reported","4","2 users affected this morning","◎","alert","Review")}${metric("Devices needing attention","12","Compliance or check-in overdue","▣","warn","12 devices")}${metric("Changes scheduled today","6","1 potential service overlap","◇","", "Review")}</div>
    <div class="section-heading"><div><h2>Walk through a common admin task</h2><p>Practical scenarios with safe checks, explanations, and a human-reviewed next step.</p></div><a class="text-link" href="#/scenarios">All scenarios <span>›</span></a></div>
    <div class="scenario-grid">${quickLinks}</div>
    <div class="content-grid section-space"><div class="stack">${panel("A ticket spike worth a closer look", `<div class="panel-pad"><div class="ticket-insight"><div><div class="impact-number">+42%</div><div class="impact-label">application-access requests vs. baseline</div></div><div class="insight-copy">Several users report sign-in failures after an identity-policy change. Start with sign-in logs and change history before resetting credentials or changing policy.</div></div><div class="incident-bottom"><span class="queue-warning">22 apps may be affected · demo data</span><a class="text-link" href="#/incident">Open troubleshooting guide <span>›</span></a></div></div>`) }${panel("Admin workload snapshot", lineChart(), {action: '<span class="panel-note">Illustrative requests · today</span>'})}</div><div class="stack">${priorityPanel}<div class="callout"><span class="callout-icon">ⓘ</span><div><strong>Guidance only — nothing runs for you</strong>This demo doesn't connect to your tenant or execute commands. Verify recommendations against your policies, permissions, and change process.</div></div></div></div>`;
}

function scenarioCard(scenario) {
  return `<a class="scenario-card" href="#/scenario?scenario=${scenario.id}"><div class="scenario-icon">${scenario.icon}</div><div class="scenario-copy"><span>${scenario.category}</span><strong>${scenario.title}</strong><small>${scenario.summary}</small></div><span class="scenario-arrow">›</span></a>`;
}
function scenariosPage() {
  const cards = scenarios.map(scenarioCard).join("");
  return `${pageHeading("Guided scenarios for everyday IT admin", "Learn a safe troubleshooting sequence, understand why each check matters, and decide what to do next. No tenant access or autonomous actions.", {eyebrow:"PRACTICAL ADMIN PLAYBOOKS"})}<div class="copilot-banner"><div class="copilot-banner-icon">✦</div><div class="copilot-banner-copy"><strong>Built to teach the reasoning, not just list commands.</strong><span>Each walkthrough separates diagnosis from remediation, calls out approval points, and ends with verification and documentation.</span></div><a class="button button-primary" href="#/ask">Ask a question <span>›</span></a></div><div class="section-heading"><div><h2>Choose a scenario</h2><p>Examples use fictional users and illustrative data.</p></div>${badge(`${scenarios.length} PLAYBOOKS`,"blue")}</div><div class="scenario-grid">${cards}</div><div class="callout warning section-space"><span class="callout-icon">ⓘ</span><div><strong>Admin remains in control</strong>Recommendations are examples, not tenant-aware instructions. Verify permissions, policies, and approvals. Commands shown in this demo are read-only illustrations; no command is run or copied automatically.</div></div>`;
}
function scenarioPage() {
  const scenario = scenarios.find(item => item.id === state.scenarioId) || scenarios[0];
  const index = Math.max(0, Math.min(state.scenarioStep, scenario.steps.length - 1));
  const step = scenario.steps[index];
  return `${pageHeading(scenario.title, scenario.situation, {eyebrow:`${scenario.icon} ${scenario.category.toUpperCase()}`, actions:'<a class="button" href="#/scenarios">← All scenarios</a>'})}<div class="page-grid-2"><div class="panel"><div class="panel-header"><div class="panel-title">A safe troubleshooting sequence</div>${badge(`STEP ${index+1} OF ${scenario.steps.length}`,"blue")}</div><div class="panel-pad"><div class="walkthrough-step"><div class="step-number">${String(index+1).padStart(2,"0")}</div><div><h2>${step[0]}</h2><p>${step[1]}</p></div></div><div class="walkthrough-progress">${scenario.steps.map((_,i)=>`<span class="${i<=index?"done":""}"></span>`).join("")}</div><div class="scenario-check"><span class="eyebrow">SUGGESTED CHECK · EXAMPLE ONLY</span><pre>${escapeHtml(step[2])}</pre><p>Illustrative guidance only. Confirm tenant, permissions, syntax, and change policy before using any admin tool.</p></div><div class="walkthrough-controls"><button class="button" data-action="scenario-prev" ${index===0?"disabled":""}>← Back</button><span>${index+1} of ${scenario.steps.length} checks</span><button class="button button-primary" data-action="scenario-next">${index===scenario.steps.length-1?"Finish walkthrough":"Next check →"}</button></div></div></div><div class="stack"><div class="panel"><div class="panel-header"><div class="panel-title">Why this step matters</div><span class="panel-note">SENIOR ADMIN TIP</span></div><div class="panel-pad"><p style="color:#647287;font-size:10px;line-height:1.8">Start with evidence and scope. A symptom that looks like an account problem can be caused by MFA registration, a service health issue, device state, or a recent change. Checking in order avoids unnecessary resets and broad changes.</p><div class="callout"><span class="callout-icon">✦</span><div><strong>Ask before you act</strong>Confirm the user, impact, exact error, and authorization. If the evidence is ambiguous, gather more context or escalate rather than guessing.</div></div></div></div><div class="panel"><div class="panel-header"><div class="panel-title">Keep the work safe</div>${badge("REVIEW REQUIRED","medium")}</div><div class="panel-pad"><ul class="list-clean"><li class="list-row"><span class="list-row-icon">1</span><div class="list-row-copy"><strong>Diagnosis comes first</strong><span>Read-only checks; don't reset or disable security controls prematurely.</span></div></li><li class="list-row"><span class="list-row-icon">2</span><div class="list-row-copy"><strong>Follow your access policy</strong><span>Use an authorized admin account and required approvals.</span></div></li><li class="list-row"><span class="list-row-icon">3</span><div class="list-row-copy"><strong>Verify and document</strong><span>Confirm the outcome with the user and record the change.</span></div></li></ul></div></div></div></div>`;
}
function incidentPage() {
  state.scenarioId = "signin";
  return scenarioPage();
}
const timelineEvents = [
  ["7:42 AM","First sign-in issue reported","A user reports they cannot access an internal app after changing phones.",""],
  ["7:48 AM","Issue scoped","Admin confirms the affected user, app, error code, and device before taking action.","amber"],
  ["7:52 AM","Other users checked","A second user can access the same app, pointing toward a user-specific issue.",""],
  ["8:03 AM","Sign-in logs reviewed","The admin checks failure reason, correlation ID, device state, and policy results.",""],
  ["8:07 AM","MFA registration checked","The error indicates the user's old authenticator registration may be stale.",""],
  ["8:11 AM","Identity verified","Helpdesk follows the organization's identity-verification procedure.","amber"],
  ["8:14 AM","Approved recovery chosen","An authorized admin selects the least-disruptive, policy-approved next step.","green"],
  ["8:22 AM","User retries sign-in","The user tests the affected application after updating their authentication method.","green"],
  ["8:35 AM","Access confirmed","The admin verifies a successful sign-in and checks whether anyone else is affected.","green"],
  ["9:05 AM","Resolution documented","The ticket captures the symptom, evidence checked, approved action, and result.",""],
  ["9:20 AM","Follow-up considered","The team checks whether the MFA setup guide needs clarification.",""],
];
function timelinePage() {
  return `${pageHeading("A careful sign-in investigation", "An illustrative, timestamped walkthrough showing how an admin can scope a report, review evidence, choose a safe fix, and verify recovery.", {eyebrow:"IDENTITY TROUBLESHOOTING", actions: '<a class="button" href="#/scenario?scenario=signin">Open sign-in scenario</a>'})}<div class="page-grid-2"><div class="panel"><div class="panel-header"><div class="panel-title">Example troubleshooting timeline</div>${badge("ILLUSTRATIVE","blue")}</div><div class="panel-pad"><div class="timeline">${timelineEvents.map(([time,title,desc,color])=>`<div class="timeline-row"><span class="timeline-time">${time}</span><span class="timeline-marker ${color}"></span><div class="timeline-content"><strong>${title}</strong><span>${desc}</span></div></div>`).join("")}</div></div></div><div class="stack"><div class="panel"><div class="panel-header"><div class="panel-title">Reasoning summary</div>${badge("EXAMPLE","success")}</div><div class="panel-pad"><div class="eyebrow">WORKING HYPOTHESIS</div><p style="font-size:11px;color:#495970;line-height:1.7">A phone change may have left an outdated MFA registration. The admin confirms this against sign-in logs and the user's registered methods before recommending recovery.</p><div class="callout success"><span class="callout-icon">✓</span><div><strong>Safe next step</strong>Verify identity, follow the approved MFA recovery process, then have the user retry and confirm access.</div></div></div></div><div class="panel"><div class="panel-header"><div class="panel-title">Good troubleshooting habits</div></div><div class="panel-pad"><div class="prompt-grid">${["Scope one user vs. many","Capture the exact error","Read sign-in logs first","Avoid premature resets"].map(x=>`<span class="prompt-chip">${x}</span>`).join("")}</div><div class="callout warning"><span class="callout-icon">ⓘ</span><div>Illustrative demo sequence. Confirm current tenant policy and approved identity-verification procedures.</div></div></div></div></div></div>`;
}
const categories = [
  ["Password and MFA issues","8,200","52%","14 min","$1.4M","4.5"],
  ["Teams audio/video issues","6,400","41%","18 min","$820K","4.2"],
  ["Application access requests","5,900","29%","21 min","$690K","4.1"],
  ["Device refresh questions","3,800","35%","12 min","$430K","4.4"],
  ["VPN and network connectivity","3,450","33%","19 min","$395K","4.0"],
  ["Software installation","2,980","44%","16 min","$360K","4.3"],
  ["Outlook and email issues","2,740","38%","15 min","$310K","4.2"],
  ["SharePoint permissions","2,110","27%","22 min","$255K","3.9"],
  ["Laptop performance","1,890","24%","25 min","$215K","3.8"],
  ["Mobile device enrollment","1,620","46%","17 min","$205K","4.4"],
];
function deflectionPage() {
  const rows = categories.map(row=>`<tr><td>${row[0]}</td><td>${row[1]}</td><td><span class="progress-track"><span style="width:${row[2]}"></span></span> &nbsp;${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>★ ${row[5]} / 5</td></tr>`).join("");
  const candidates=["MFA method reset with device compliance check","Teams call quality diagnostics and guided fix","Software installation via approved catalog","Mobile device enrollment walkthrough","Ticket status lookup and proactive updates","Application access request routing"];
  return `${pageHeading("Give the service desk a useful first answer", "Use recurring-request patterns to find where clearer runbooks and junior-admin checklists can reduce repeat troubleshooting.", {eyebrow:"SERVICE DESK INSIGHTS"})}<div class="page-grid-4">${stat("Common requests tracked","18,640","Illustrative monthly sample")}${stat("Self-service guide coverage","37%","Current example baseline","good")}${stat("Admin time in repeat tasks","4,820 hrs","Estimated monthly effort")}${stat("Potential capacity recovered","$5.1M","Illustrative annual model","good")}</div><div class="section-heading"><div><h2>Frequent support topics</h2><p>Use these patterns to improve guidance; admins stay responsible for resolving each request.</p></div>${badge("TOP 10 CATEGORIES","blue")}</div>${panel("Request patterns and guidance opportunities",`<div class="table-wrap"><table class="data-table"><thead><tr><th>Category</th><th>Monthly volume</th><th>Guide coverage</th><th>Avg. admin time</th><th>Potential savings</th><th>Satisfaction</th></tr></thead><tbody>${rows}</tbody></table></div>`)}<div class="section-heading"><div><h2>Good candidates for clearer playbooks</h2><p>Document a safe first response and an escalation path before automating anything.</p></div></div><div class="page-grid-3">${candidates.map((x,i)=>`<div class="panel panel-pad"><div class="list-row-icon">${i+1}</div><div class="list-row-copy"><strong>${x}</strong><span>${i<3?"Draft a verified, user-friendly checklist":"Add a clear escalation and approval path"}</span></div></div>`).join("")}</div>`;
}
const changes = [
  ["Conditional access policy update CHG0048112","High","Entra ID · 22 legacy apps","Retail · Field Ops · Customer Care","INC0092441","Validated","Emergency CAB","Roll back now; re-scope policy to modern auth apps only."],
  ["CRM upgrade CHG0048203","High","Customer Care CRM · Billing API","Customer Care · Sales","INC0091877","Partial","Pending CAB","Split release; add read-only canary for 200 support staff."],
  ["Firewall rule change CHG0048255","Medium","Core network · Store WAN","Retail stores","None","Validated","Approved","Proceed in maintenance window; conflicts with VPN maintenance."],
  ["Endpoint management policy CHG0048119","Medium","Intune · Defender","Corporate laptops","INC0092447","Validated","Approved","Stagger with identity changes to avoid compounded impact."],
  ["ServiceNow workflow update CHG0048301","Low","ITSM routing","Service desk","None","Validated","Approved","Safe to automate; low blast radius."],
  ["VPN gateway maintenance CHG0048318","Medium","Remote access","Field Operations","INC0092210","Validated","Approved","Conflicts with firewall change; move to 02:00 window."],
  ["Data warehouse patch CHG0048344","Low","Media analytics","Media · Finance","None","Validated","Approved","Proceed; historical success rate 98%."],
  ["Teams governance setting CHG0048362","Low","Microsoft Teams","All employees","None","Not required","Pending CAB","Notify collaboration champions before enabling."],
];
function changesPage() {
  const rows=changes.map(r=>`<tr><td>${r[0]}</td><td>${badge(r[1],r[1].toLowerCase())}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td><td style="white-space:normal;min-width:210px">${r[7]}</td></tr>`).join("");
  return `${pageHeading("Review the blast radius before a change", "Use this planning view to compare impact, dependencies, rollback readiness, and approval status. Treat every recommendation as a review prompt.", {eyebrow:"CHANGE PLANNER"})}<div class="page-grid-4">${stat("Upcoming changes (7 days)","34","6 require CAB review")}${stat("High-risk changes","2","1 in emergency review","warn")}${stat("Changes linked to incidents","4","Past 7 days")}${stat("Rollback readiness","92%","Validated rollback plans","good")}</div><div class="section-heading"><div><h2>Change review queue</h2><p>Risk level, blast radius, related incidents, and suggested review questions.</p></div>${badge("34 UPCOMING","blue")}</div>${panel("Planned and recent changes",`<div class="table-wrap"><table class="data-table"><thead><tr><th>Change</th><th>Risk</th><th>Affected services</th><th>Employee groups</th><th>Related incidents</th><th>Rollback</th><th>Approval</th><th>Copilot review note</th></tr></thead><tbody>${rows}</tbody></table></div>`)}<div class="section-heading"><div><h2>Potential conflicts to check</h2><p>Confirm dependencies and maintenance windows with service owners.</p></div></div><div class="page-grid-3">${["CHG0048112 conditional access update overlaps CHG0048119 endpoint policy update","CHG0048255 firewall rule change overlaps CHG0048318 VPN gateway maintenance","CHG0048203 CRM upgrade shares the billing API dependency with the data warehouse patch"].map(x=>`<div class="callout warning"><span class="callout-icon">⚠</span><div>${x}</div></div>`).join("")}</div>`;
}
const kbArticles=[["Reset MFA method for corporate devices","9,120 uses this quarter","4.6 / 5"],["Teams call quality troubleshooting","6,480 uses this quarter","4.2 / 5"],["Request application access via portal","5,240 uses this quarter","4.0 / 5"],["VPN client reinstall for field laptops","3,910 uses this quarter","4.1 / 5"]];
function knowledgePage() {
  const gaps=[["Conditional access app failures","418 tickets with no matching article","Missing"],["Device refresh VPN steps","Last updated 14 months ago","Outdated"],["Teams audio troubleshooting","3 near-identical articles","Duplicate"],["Legacy Office install guide","Helpfulness score 2.1 / 5","Retire"],["ServiceNow macro for access issues","Could deflect ~1,900 tickets/yr","Missing"]];
  return `${pageHeading("A clearer answer for the next admin", "Keep support notes current, find recurring gaps, and turn proven fixes into clear runbooks that help junior admins troubleshoot consistently.", {eyebrow:"ADMIN KNOWLEDGE LIBRARY"})}<div class="page-grid-4">${stat("Requests without a matching guide","1,340","Illustrative last-30-day sample","warn")}${stat("Draft guides for review","86","Owner approval required","good")}${stat("Articles flagged for review","42","Stale or low-helpfulness","warn")}${stat("Knowledge reuse rate","64%","+19 points year over year","good")}</div><div class="section-heading"><div><h2>Useful admin references</h2><p>High-reuse articles and the support topics they help resolve.</p></div></div><div class="page-grid-2"><div class="panel"><div class="panel-header"><div class="panel-title">Most used help articles</div><span class="panel-note">THIS QUARTER</span></div><div class="panel-pad"><ul class="list-clean">${kbArticles.map((r,i)=>`<li class="list-row"><span class="list-row-icon">${i+1}</span><div class="list-row-copy"><strong>${r[0]}</strong><span>${r[1]}</span></div><span class="row-meta">★ ${r[2]}</span></li>`).join("")}</ul></div></div><div class="panel"><div class="panel-header"><div class="panel-title">Gaps to close</div>${badge("5 NEED REVIEW","medium")}</div><div class="panel-pad"><ul class="list-clean">${gaps.map(r=>`<li class="list-row"><span class="list-row-icon">${r[2]==="Missing"?"＋":"!"}</span><div class="list-row-copy"><strong>${r[0]}</strong><span>${r[1]}</span></div>${badge(r[2],r[2]==="Missing"?"medium":"blue")}</li>`).join("")}</ul></div></div></div><div class="section-heading"><div><h2>Suggested documentation work</h2><p>Review and verify a draft before publishing it to your support team.</p></div></div><div class="page-grid-3">${["Write a guide for conditional-access app failures","Update device refresh and VPN troubleshooting steps","Consolidate duplicate Teams audio troubleshooting guides","Review the outdated Office installation guide","Add an access-issue checklist to the service desk runbook"].map(x=>`<div class="panel panel-pad"><div class="list-row-icon">✦</div><div class="list-row-copy"><strong>${x}</strong><span>Suggested documentation task · Admin review required</span></div></div>`).join("")}</div>`;
}
function roiPage() {
  const bars=[["Request guide coverage","37%",76],["Requests with unclear owner","12%",34],["Change reviews with rollback","92%",92],["Knowledge reuse","64%",64],["Devices checked on schedule","88%",88],["Access reviews completed","79%",79]];
  return `${pageHeading("A practical view of admin service health", "Illustrative measures for helpdesk workload, knowledge quality, device hygiene, and change readiness. Use them to decide where better runbooks or training would help.", {eyebrow:"ADMIN SERVICE INSIGHTS"})}<div class="page-grid-4">${stat("Estimated annual capacity","$11.8M","Illustrative cost-to-serve model","good")}${stat("Repeat tasks documented","52,000 hrs","Estimated annual admin time","good")}${stat("Guide coverage","37%","Across top support categories")}${stat("Change readiness","92%","Changes with rollback plans","good")}</div><div class="page-grid-2 section-space"><div class="panel"><div class="panel-header"><div class="panel-title">Operational hygiene indicators</div><span class="panel-note">ILLUSTRATIVE DEMO</span></div><div class="panel-pad"><div class="mini-bars">${bars.map(([name,value,n])=>`<div class="mini-bar-row"><span>${name}</span><div class="mini-bar-track"><span style="width:${n}%"></span></div><strong>${value}</strong></div>`).join("")}</div></div></div><div class="panel"><div class="panel-header"><div class="panel-title">Recommended team improvements</div>${badge("ADMIN-LED","blue")}</div><div class="panel-pad"><ul class="list-clean">${["Document safe first checks for repeat MFA and access issues","Review the least-privilege groups used for new starters","Set a clear service-owner and rollback checklist for changes","Keep device and Teams troubleshooting guides current"].map((x,i)=>`<li class="list-row"><span class="list-row-icon">${i+1}</span><div class="list-row-copy"><strong>${x}</strong><span>Suggested team practice · Review with the appropriate owner</span></div></li>`).join("")}</ul></div></div></div><div class="callout"><span class="callout-icon">ⓘ</span><div><strong>Sample figures, not live tenant reporting</strong>No integrations are connected in this demo. Validate any workload or savings estimate against your actual service desk data before using it for planning.</div></div>`;
}
const architectureLayers=[
  ["01","Experience layer","Microsoft Teams · Microsoft 365 Copilot · Copilot Studio · React IT portal · Power BI executive dashboard"],
  ["02","Copilot guidance layer","Azure OpenAI · Microsoft 365 Copilot · Retrieval and grounding · Admin-reviewed recommendations"],
  ["03","IT operations data","ServiceNow · Azure Monitor · Log Analytics · Microsoft 365 health · Defender XDR · CMDB · Change records"],
  ["04","Knowledge and grounding","Azure AI Search · Microsoft Graph connectors · ServiceNow KB · SharePoint · Teams · Runbooks · SOPs"],
  ["05","Admin-initiated actions","ServiceNow and Microsoft Graph APIs · Approved workflows · Change control · Human review · Audit logs"],
  ["06","Copilot guardrails","Microsoft Entra ID · Least privilege · Tenant data boundaries · Human review · Audit trails · Admin approval"],
  ["07","Admin insights","Power BI · Microsoft Fabric · Service health · Repeat-request patterns · Change and endpoint reporting"],
];
function architecturePage() {
  return `${pageHeading("A Microsoft-aligned IT admin copilot", "A reference design for a senior-admin assistant grounded in approved Microsoft 365 and endpoint documentation, with administrators in control of every tenant action.", {eyebrow:"MICROSOFT STACK"})}<div class="callout"><span class="callout-icon">⌘</span><div><strong>Assistance, not autonomous administration</strong>The copilot explains evidence and suggests next steps. It does not change accounts, policies, devices, mailboxes, or tenant configuration on its own.</div></div><div class="stack section-space">${architectureLayers.map(([num,title,desc])=>`<div class="panel" style="display:flex;align-items:center;gap:15px;padding:14px 17px"><div class="step-number">${num}</div><div style="min-width:150px;max-width:190px"><div class="eyebrow" style="margin:0 0 4px">ARCHITECTURE LAYER</div><strong style="color:#34435a;font-size:11px">${title}</strong></div><div style="height:27px;width:1px;background:#e9edf2"></div><p style="margin:0;color:#758296;font-size:10px;line-height:1.7">${desc}</p></div>`).join("")}</div>`;
}
function governancePage() {
  const rules=[
    ["No tenant connection in this demo","Responses use illustrative examples only; user, device, mailbox, and policy data are not queried."],
    ["No autonomous actions","The copilot cannot reset passwords, change group membership, edit policies, send messages, or run commands."],
    ["Least privilege","Use the minimum approved role. Do not share credentials or elevate access to make troubleshooting easier."],
    ["Explain before recommending","Each proposed step should include the evidence to check, why it matters, and the expected outcome."],
    ["Admin verifies and approves","Follow identity checks, change control, data-owner approvals, and escalation procedures before making a tenant change."],
    ["Verify and document","Confirm the result with the user and record the evidence, approver, action, and rollback or follow-up plan."],
  ];
  return `${pageHeading("The admin stays in control", "Clear boundaries for a useful copilot: explain the issue, recommend safe checks, and leave all tenant decisions and changes to an authorized administrator.", {eyebrow:"COPILOT GUARDRAILS"})}<div class="page-grid-4">${stat("Tenant access","None","Disconnected demo")}${stat("Actions executed","0","Recommendations only","good")}${stat("Commands run","0","No shell or PowerShell access","good")}${stat("Approval model","Admin-led","You decide what happens","good")}</div><div class="section-heading"><div><h2>Safety principles</h2><p>These boundaries apply to every guided scenario and sample response.</p></div>${badge("GUIDANCE ONLY","success")}</div><div class="page-grid-2">${rules.map(([title,description])=>`<div class="callout success"><span class="callout-icon">✓</span><div><strong>${title}</strong>${description}</div></div>`).join("")}</div><div class="section-heading"><div><h2>Before using a suggested command</h2><p>Demo commands are illustrative and may need adjustment for your environment.</p></div></div><div class="panel panel-pad"><ul class="list-clean"><li class="list-row"><span class="list-row-icon">1</span><div class="list-row-copy"><strong>Confirm the cmdlet and module are current</strong><span>Microsoft modules, parameters, and role requirements change over time.</span></div></li><li class="list-row"><span class="list-row-icon">2</span><div class="list-row-copy"><strong>Use an authorized account and verify scope</strong><span>Check tenant, target user/device, RBAC role, and the intended effect.</span></div></li><li class="list-row"><span class="list-row-icon">3</span><div class="list-row-copy"><strong>Get required approval for any write action</strong><span>Review the change, rollback, and communication plan before an admin applies it.</span></div></li></ul></div>`;
}
const executiveDemoTiles = [
  {
    id: "purpose", kind: "THE PURPOSE", icon: "✦", title: "Give every admin a senior-admin second opinion",
    summary: "Turn day-to-day uncertainty into a calmer, more consistent next step.",
    heading: "A practical copilot for the moments you don't see in the runbook",
    body: "Junior administrators often know what the user reported, but not which signal to trust or which check to do first. IT Admin Copilot helps connect the symptom to a safe troubleshooting sequence, explains the reasoning in plain language, and helps the admin decide when to fix or escalate.",
    points: ["Shorten the time from “I don't know where to start” to a useful first check.", "Make senior-admin troubleshooting habits easier to share across the helpdesk.", "Help users get consistent, understandable support without replacing the administrator."],
    takeaway: "The value is better-informed admins—not unattended IT.",
    action: "Ask the copilot a question", href: "/ask",
  },
  {
    id: "how", kind: "HOW IT WORKS", icon: "⌕", title: "Understand the problem before suggesting a fix",
    summary: "Clarify, scope, check evidence, explain, then leave the decision to the admin.",
    heading: "A simple, reviewable guidance loop",
    body: "The copilot starts with the context the admin supplies. It helps narrow the scope, lays out checks from least disruptive to more involved, describes what each result means, and calls out verification, approval, and escalation points.",
    points: ["Ask: who is affected, what changed, what error appears, and what has been checked?", "Reason: distinguish user, device, service-health, access-policy, and change causes.", "Guide: show the admin what to inspect, why it matters, and how to verify recovery."],
    takeaway: "The administrator—not an autonomous agent—uses their authorized tools and applies any approved change.",
    action: "See an example conversation", href: "/ask",
  },
  {
    id: "signin", kind: "TRY IN THE DEMO", icon: "◎", title: "Troubleshoot sign-in after a phone change",
    summary: "See how to check sign-in evidence before touching credentials or access policy.",
    heading: "Start with a familiar identity support request",
    body: "A user changed phones and can no longer complete MFA. Walk through the scope, sign-in failure details, MFA registration, approved recovery, and final confirmation—without weakening security controls.",
    points: ["Separate a single-user issue from a wider app or service-health problem.", "Use sign-in failure reason and Conditional Access results to guide the next check.", "Verify the user's identity before using the organization's approved MFA recovery process."],
    takeaway: "The demo shows a sequence of checks. It cannot see the tenant or reset a user's account.",
    action: "Open the sign-in walkthrough", href: "/scenario?scenario=signin",
  },
  {
    id: "onboard", kind: "TRY IN THE DEMO", icon: "＋", title: "Prepare a new employee's first day",
    summary: "See how least-privilege thinking improves onboarding and access reviews.",
    heading: "Make onboarding complete without copying someone's permissions",
    body: "A manager requests email, Teams, a laptop, and two business apps for a new starter. Use the playbook to verify the approved request, check for an existing identity, map approved access, and validate device readiness.",
    points: ["Start with the manager-approved request and confirmed start-date details.", "Prefer approved role groups; don't clone another employee's access.", "Confirm first sign-in, device compliance, and user handoff before closing the request."],
    takeaway: "Provisioning remains a human-operated step in the existing approval workflow.",
    action: "Open the onboarding walkthrough", href: "/scenario?scenario=onboard",
  },
  {
    id: "change", kind: "TRY IN THE DEMO", icon: "◇", title: "Review an access change before it ships",
    summary: "Use a second set of eyes to spot approvals, blast radius, and rollback gaps.",
    heading: "Ask the questions a careful change reviewer asks",
    body: "Before granting business-app access or changing a policy, check the request, owner, scope, affected users, approval, dependencies, and rollback. The copilot helps structure the review; it never applies the change.",
    points: ["Distinguish Full Access, Send As, and other permissions rather than over-granting.", "Look for service dependencies, overlap, and a verified rollback plan.", "Have an authorized admin apply and verify the approved change through existing controls."],
    takeaway: "This is a review aid, not a change-execution or approval system.",
    action: "Try an access-request walkthrough", href: "/scenario?scenario=access",
  },
  {
    id: "value", kind: "THE VALUE", icon: "✓", title: "Build confidence while keeping control",
    summary: "Demonstrate practical help, clear guardrails, and a safe human handoff.",
    heading: "A useful assistant knows when to stop",
    body: "A strong demonstration is not about the copilot making changes. It is about showing that an admin can understand the reasoning, see what evidence is missing, choose an appropriate next step, and know when to pause for an owner or senior engineer.",
    points: ["Recommendations are examples and must be checked against tenant policy and current product guidance.", "The admin verifies identity, permissions, approval, impact, and rollback before a change.", "The admin confirms the user's outcome and documents the evidence and resolution."],
    takeaway: "Demo boundary: no tenant connection, no commands run, and no autonomous action.",
    action: "Review the copilot guardrails", href: "/governance",
  },
];
function walkthroughPage() {
  const selected = executiveDemoTiles.find(tile => tile.id === state.demoTile) || executiveDemoTiles[0];
  const tiles = executiveDemoTiles.map((tile, index) => `<button class="demo-tile ${selected.id === tile.id ? "selected" : ""}" type="button" data-demo-tile="${tile.id}" aria-pressed="${selected.id === tile.id}"><span class="demo-tile-icon">${tile.icon}</span><span class="demo-tile-copy"><span>${String(index + 1).padStart(2, "0")} · ${tile.kind}</span><strong>${tile.title}</strong><small>${tile.summary}</small></span><span class="scenario-arrow">›</span></button>`).join("");
  const points = selected.points.map((point, index) => `<li><span>${index + 1}</span>${point}</li>`).join("");
  return `${pageHeading("A better day for IT admins starts with better guidance", "A clickable executive tour of the problem this copilot solves, how it guides an admin, and what to try in a realistic day-to-day support demo.", {eyebrow:'<span class="live-dot"></span> EXECUTIVE DEMO WALKTHROUGH', actions:'<a class="button" href="#/">← Back to overview</a>'})}
    <div class="copilot-banner demo-opening"><div class="copilot-banner-icon">✦</div><div class="copilot-banner-copy"><strong>Senior-admin intelligence. Junior-admin friendly.</strong><span>Not an autonomous agent: the copilot helps you reason through the work. You choose what to check, what to change, and when to escalate.</span></div><a href="#/ask" class="button button-primary">Try asking a question <span>›</span></a></div>
    <div class="section-heading"><div><h2>Choose a tile to explore the demo</h2><p>Start with the purpose, see the human-led workflow, then open a real interactive example.</p></div>${badge("6 QUICK STOPS","blue")}</div>
    <div class="executive-demo-layout"><div class="demo-tile-grid" role="group" aria-label="Executive demo walkthrough sections">${tiles}</div><section class="panel demo-detail" aria-live="polite"><div class="panel-header"><div class="panel-title"><span class="tiny-live"></span>${selected.kind}</div><span class="panel-note">${selected.icon} IT ADMIN COPILOT</span></div><div class="panel-pad"><div class="demo-detail-heading"><span class="demo-detail-kicker">WHY IT MATTERS</span><h2>${selected.heading}</h2><p>${selected.body}</p></div><ul class="demo-takeaways">${points}</ul><div class="demo-takeaway">${selected.takeaway}</div><div class="demo-detail-actions"><a class="button button-primary" href="#${selected.href}">${selected.action} <span>›</span></a>${selected.id !== "purpose" ? '<button class="button" type="button" data-action="demo-prev">Previous tile</button>' : ""}<button class="button" type="button" data-action="demo-next">${selected.id === "value" ? "Back to purpose" : "Next tile"} <span>→</span></button></div></div></section></div>
    <div class="demo-promise"><span>ⓘ</span><div><strong>Keep the demo honest.</strong> All metrics and situations are illustrative. This experience has no tenant connection, does not run commands, and does not autonomously change accounts, devices, mailboxes, or policies.</div></div>`;
}
const prompts=["A user changed phones and can't complete MFA. What should I check first?","How should I onboard a new employee with app access?","A laptop is slow and VPN keeps disconnecting. Where do I start?","What permission does someone need for a shared mailbox?","One user can't hear audio in Teams meetings. What should I check?","How do I review an app access request safely?"];
function copilotAnswer(question) {
  const q=question.toLowerCase();
  if(q.includes("onboard")||q.includes("new employee")||q.includes("starter")) return "Start with the approved HR/ITSM request: confirm manager, start date, worker type, department, and required apps. Check for an existing identity before creating one, map access to approved role groups, verify license approval and device readiness, then have an authorized admin provision and test access. Do not copy another user's permissions. Open the new-employee scenario for a guided checklist.";
  if(q.includes("laptop")||q.includes("device")||q.includes("vpn")||q.includes("slow")) return "First scope the impact: device, exact symptom, when it began, and whether other users are affected. Check Intune last check-in and compliance, then review VPN service health and client errors. Start with reversible checks; do not disable Defender, encryption, or Conditional Access. Open the endpoint scenario for a step-by-step walkthrough.";
  if(q.includes("mailbox")||q.includes("send as")) return "Verify the mailbox owner approved the named user, business reason, and duration. Check current Full Access, Send As, and Send on Behalf separately; they're different permissions. Recommend only the minimum permission, use your approved Exchange workflow, and set a review date. This demo does not grant access.";
  if(q.includes("teams")||q.includes("audio")||q.includes("meeting")) return "Check whether one user or the whole meeting is affected, confirm the speaker/microphone in Teams device settings, and review Microsoft 365 service health before changing policy. Compare with Teams web or a known-good headset, then test-call and document the result. Avoid changing tenant-wide meeting policies for one device.";
  if(q.includes("access")||q.includes("role")||q.includes("application")) return "Confirm the exact app, business reason, role, duration, manager or app-owner approval, and environment. Inspect the existing Entra assignment and use the least-privilege approved group. Have an authorized admin apply changes through your access workflow, then verify the user's effective access and record an expiry or review date.";
  if(q.includes("change")||q.includes("risk")) return "Before a change, identify the owner, affected users and services, dependencies, maintenance window, approval, monitoring, and rollback. Compare recent incidents and overlapping work, then ask the service owners to validate assumptions. I can help prepare the review; I won't apply the change.";
  if(q.includes("knowledge")||q.includes("article")) return "Start from a verified resolution and write the symptoms, safe checks, expected results, approved remediation, verification, and escalation path. Remove tenant-specific secrets and have the technical owner review the guide before publishing.";
  if(q.includes("sign")||q.includes("mfa")||q.includes("phone")||q.includes("account")) return "Confirm the exact user, app, device, error, and start time. Compare another user's access, then review the Entra sign-in failure reason, correlation ID, device state, and Conditional Access result. If MFA registration is the issue, verify identity and follow your approved recovery process. Avoid premature password resets or weakening policy.";
  return "I can help reason through identity and MFA, onboarding, device/VPN, Teams, mailbox permissions, access requests, or change reviews. Tell me the exact symptom, affected user or scope, error message, and what you've already checked. I'll suggest a safe sequence for you to review; I don't connect to your tenant or make changes.";
}
function askPage() {
  const messages=state.chat.length ? state.chat.map(m=>`<div class="chat-message user"><strong>You</strong>${escapeHtml(m.q)}</div><div class="chat-message"><strong>Senior admin guidance · Demo response</strong>${m.a}</div>`).join("") : `<div class="chat-message"><strong>Your senior IT admin copilot</strong>Tell me what's happening, who is affected, the exact error, and what you've already checked. I'll help you work through a safe troubleshooting sequence and explain why each step matters. I don't access your tenant or perform actions.</div>`;
  return `${pageHeading("Ask a senior IT admin", "Get help thinking through everyday Microsoft 365, identity, endpoint, and service-desk work. Share what you know and I'll suggest what to check next.", {eyebrow:"YOUR IT ADMIN COPILOT"})}<div class="page-grid-2"><div class="panel"><div class="panel-header"><div class="panel-title">Try an admin question</div>${badge("ILLUSTRATIVE DEMO","blue")}</div><div class="panel-pad"><div class="prompt-grid">${prompts.map(p=>`<button class="prompt-chip" data-prompt="${escapeHtml(p)}">${p}</button>`).join("")}</div><div class="callout"><span class="callout-icon">✦</span><div><strong>Explain the situation; you choose the action</strong>Good context: affected user/device, exact symptom or error, when it started, business impact, and what you've already checked.</div></div></div></div><div class="panel"><div class="panel-header"><div class="panel-title">Admin conversation</div><span class="panel-note">DEMO RESPONSES · NO TENANT CONNECTION</span></div><div class="chat-box" id="chat-messages">${messages}</div><form class="chat-form" id="chat-form"><input name="question" placeholder="Describe the issue or request…" aria-label="Ask your senior IT admin copilot" required><button class="button button-primary" type="submit">Get guidance ↗</button></form></div></div><div class="section-heading"><div><h2>Browse practical walkthroughs</h2><p>Step-by-step guidance for common identity, endpoint, and Microsoft 365 requests.</p></div><a class="text-link" href="#/scenarios">All scenarios <span>›</span></a></div><div class="scenario-grid">${scenarios.slice(0,3).map(scenarioCard).join("")}</div>`;
}
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function render() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const [route, query = ""] = hash.split("?");
  const params = new URLSearchParams(query);
  if (route === "/scenario") {
    const requestedScenario = params.get("scenario");
    if (requestedScenario && scenarios.some(item => item.id === requestedScenario) && state.scenarioId !== requestedScenario) {
      state.scenarioId = requestedScenario;
      state.scenarioStep = 0;
    }
  }
  if (route === "/executive-demo") {
    const requestedTile = params.get("tile");
    if (requestedTile && executiveDemoTiles.some(tile => tile.id === requestedTile)) state.demoTile = requestedTile;
  }
  state.route = route;
  const pages = {
    "/": dashboard, "/incident": incidentPage, "/scenario": scenarioPage, "/scenarios": scenariosPage, "/timeline": timelinePage,
    "/deflection": deflectionPage, "/changes": changesPage, "/knowledge": knowledgePage,
    "/roi": roiPage, "/architecture": architecturePage, "/governance": governancePage,
    "/walkthrough": walkthroughPage, "/executive-demo": walkthroughPage, "/ask": askPage,
  };
  const nav = route === "/scenario" ? navItems.find(item => item.route === "/scenarios") : navItems.find(item => item.route === route);
  const currentNav = nav || navItems[0];
  document.getElementById("breadcrumb-current").textContent = currentNav.label;
  document.querySelectorAll(".nav-link").forEach(link => {
    const active = link.dataset.route === route || (route === "/scenario" && link.dataset.route === "/scenarios");
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.getElementById("app-content").innerHTML = (pages[route] || dashboard)();
  document.title = `${currentNav.label.replace(/\b\w/g, c => c.toUpperCase())} · IT Admin Copilot`;
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo(0, 0);
}
function handleAction(action) {
  if (action === "refresh") { render(); toast("Overview refreshed · illustrative demo data."); }
  if (action === "demo-next" || action === "demo-prev") {
    const currentIndex = executiveDemoTiles.findIndex(tile => tile.id === state.demoTile);
    const offset = action === "demo-next" ? 1 : -1;
    const nextIndex = (currentIndex + offset + executiveDemoTiles.length) % executiveDemoTiles.length;
    state.demoTile = executiveDemoTiles[nextIndex].id;
    location.hash = `#/executive-demo?tile=${state.demoTile}`;
    render();
  }
  if (action === "scenario-next") {
    const scenario = scenarios.find(item => item.id === state.scenarioId) || scenarios[0];
    if (state.scenarioStep >= scenario.steps.length - 1) {
      state.scenarioStep = 0;
      location.hash = "#/scenarios";
      toast("Walkthrough complete · no tenant changes were made.");
    } else {
      state.scenarioStep += 1;
      render();
    }
  }
  if (action === "scenario-prev") { state.scenarioStep = Math.max(0, state.scenarioStep - 1); render(); }
  if (action === "briefing") toast("Executive briefing prepared · demo data only.");
}
document.getElementById("primary-nav").innerHTML = navMarkup();
const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} mode`);
  themeToggle.setAttribute("title", `Switch to ${dark ? "light" : "dark"} mode`);
  themeToggle.innerHTML = dark
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 15.4A8.5 8.5 0 0 1 8.6 3.7 8.5 8.5 0 1 0 20.3 15.4Z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>';
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#111827" : "#0e1b2e");
}
const savedTheme = localStorage.getItem("it-admin-copilot-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");
themeToggle.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("it-admin-copilot-theme", theme);
  setTheme(theme);
});
document.addEventListener("click", event => {
  const action = event.target.closest("[data-action]");
  if (action) { handleAction(action.dataset.action); return; }
  const demoTile = event.target.closest("[data-demo-tile]");
  if (demoTile) {
    state.demoTile = demoTile.dataset.demoTile;
    location.hash = `#/executive-demo?tile=${state.demoTile}`;
    render();
    return;
  }
  const chip = event.target.closest("[data-prompt]");
  if (chip) {
    const input = document.querySelector('#chat-form input[name="question"]');
    if (input) { input.value = chip.dataset.prompt; input.focus(); }
    return;
  }
  if (!event.target.closest("#sidebar") && !event.target.closest("#menu-toggle")) document.getElementById("sidebar").classList.remove("open");
});
document.getElementById("menu-toggle").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.addEventListener("submit", event => {
  if (event.target.id !== "chat-form") return;
  event.preventDefault();
  const form = event.target;
  const question = new FormData(form).get("question").trim();
  if (!question) return;
  state.chat.push({q: question, a: copilotAnswer(question)});
  render();
});
window.addEventListener("hashchange", render);
render();
