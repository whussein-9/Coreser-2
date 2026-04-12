import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home, Globe, Search, AlertTriangle, Shield, Puzzle, Zap,
  LayoutDashboard, Server, Activity, Box, Chrome, FileText,
  Download, Database, ChevronLeft, Bell, Moon, Sun,
  ChevronDown, Filter, ArrowUpRight, ArrowDownRight,
  CheckCircle, Clock, RefreshCw, Settings, User,
  LogOut, ExternalLink, Lock, Eye, Wifi, AlertCircle,
  MoreHorizontal, Menu, X, Plus, TrendingUp, TrendingDown,
  ClipboardList, Terminal, Link2, Package, BarChart2,
  BookOpen, Calendar, Layers, UserCheck, Cpu, ShieldAlert,
  ShieldCheck, Slash, Info, ChevronRight, Play,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type PageKey =
  | "home" | "connections" | "global-search" | "threats" | "posture"
  | "integrations" | "extend" | "dashboards" | "services" | "activity"
  | "objects" | "browser-extension" | "action-policies" | "reporting"
  | "downloads" | "audit-log";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const threatRows = [
  { id: 1, name: "OAuth Token Hijack Attempt", severity: "Critical", source: "GitHub OAuth App", status: "Active", time: "2m ago", affected: "42 users" },
  { id: 2, name: "Excessive Permission Scope", severity: "High", source: "Slack Integration", status: "Investigating", time: "18m ago", affected: "8 apps" },
  { id: 3, name: "Shadow IT App Detected", severity: "High", source: "Browser Extension", status: "Active", time: "34m ago", affected: "3 services" },
  { id: 4, name: "Inactive Admin Account", severity: "Medium", source: "Google Workspace", status: "Resolved", time: "2h ago", affected: "1 user" },
  { id: 5, name: "Unmanaged Service Account", severity: "Medium", source: "AWS IAM", status: "Investigating", time: "3h ago", affected: "12 apps" },
  { id: 6, name: "Data Exfiltration Pattern", severity: "Critical", source: "Salesforce", status: "Active", time: "5h ago", affected: "19 records" },
  { id: 7, name: "MFA Bypass Attempt", severity: "High", source: "Okta IDP", status: "Resolved", time: "8h ago", affected: "1 user" },
  { id: 8, name: "API Key Exposed in Repo", severity: "Critical", source: "GitHub", status: "Active", time: "12h ago", affected: "3 keys" },
  { id: 9, name: "Lateral Movement Detected", severity: "Critical", source: "Azure AD", status: "Investigating", time: "14h ago", affected: "6 accounts" },
  { id: 10, name: "Privilege Escalation", severity: "High", source: "AWS IAM", status: "Active", time: "16h ago", affected: "2 roles" },
];

const integrationApps = [
  { name: "Google Workspace", category: "Productivity", status: "Connected", risk: "Low", users: 1420, icon: "G", color: "#4285F4", perms: 12 },
  { name: "Slack", category: "Collaboration", status: "Connected", risk: "Medium", users: 1105, icon: "S", color: "#E01E5A", perms: 28 },
  { name: "GitHub", category: "DevOps", status: "At Risk", risk: "High", users: 320, icon: "GH", color: "#24292E", perms: 45 },
  { name: "Salesforce", category: "CRM", status: "Connected", risk: "Low", users: 210, icon: "SF", color: "#00A1E0", perms: 8 },
  { name: "Zoom", category: "Communication", status: "Connected", risk: "Low", users: 1380, icon: "Z", color: "#2D8CFF", perms: 6 },
  { name: "Jira", category: "Project Mgmt", status: "At Risk", risk: "Medium", users: 415, icon: "J", color: "#0052CC", perms: 22 },
  { name: "Dropbox", category: "Storage", status: "Connected", risk: "Low", users: 560, icon: "D", color: "#0061FF", perms: 9 },
  { name: "HubSpot", category: "Marketing", status: "Connected", risk: "Low", users: 145, icon: "H", color: "#FF7A59", perms: 14 },
  { name: "Notion", category: "Productivity", status: "At Risk", risk: "High", users: 890, icon: "N", color: "#000000", perms: 31 },
  { name: "Figma", category: "Design", status: "Connected", risk: "Low", users: 78, icon: "F", color: "#F24E1E", perms: 5 },
  { name: "Stripe", category: "Payments", status: "Connected", risk: "Low", users: 25, icon: "ST", color: "#6772E5", perms: 7 },
  { name: "Okta", category: "Identity", status: "Connected", risk: "Low", users: 1420, icon: "O", color: "#007DC1", perms: 3 },
];

const activityEvents = [
  { time: "09:42 AM", event: "Admin login from new IP address", type: "alert", user: "sarah.k@corp.com", detail: "IP: 185.23.1.44 · Brazil" },
  { time: "09:38 AM", event: "New OAuth app authorized", type: "info", user: "mike.d@corp.com", detail: "App: Calendly · 14 permissions" },
  { time: "09:15 AM", event: "Policy rule triggered", type: "warning", user: "System", detail: "Policy: Excessive Scopes · 3 apps affected" },
  { time: "08:55 AM", event: "Service account created", type: "info", user: "devops@corp.com", detail: "Account: svc-deploy-prod · AWS IAM" },
  { time: "08:30 AM", event: "MFA disabled for user", type: "alert", user: "john.p@corp.com", detail: "Reason: Device lost · Pending review" },
  { time: "08:10 AM", event: "Bulk data export performed", type: "warning", user: "analytics@corp.com", detail: "Size: 2.4 GB · Salesforce" },
  { time: "07:55 AM", event: "New IDP tenant connected", type: "info", user: "admin@corp.com", detail: "Tenant: corp-azure-us · 340 users" },
  { time: "07:30 AM", event: "Posture score updated", type: "info", user: "System", detail: "Score: 42% → 44% · +2 points" },
  { time: "07:12 AM", event: "Threat resolved manually", type: "info", user: "james.t@corp.com", detail: "Threat: MFA Bypass Attempt · GitHub" },
  { time: "06:48 AM", event: "App permissions modified", type: "warning", user: "dev-team@corp.com", detail: "App: Internal CI Tool · +12 perms" },
];

const barData = [
  { month: "Oct", critical: 12, high: 28, medium: 45 },
  { month: "Nov", critical: 18, high: 35, medium: 52 },
  { month: "Dec", critical: 8, high: 22, medium: 38 },
  { month: "Jan", critical: 22, high: 41, medium: 60 },
  { month: "Feb", critical: 15, high: 30, medium: 48 },
  { month: "Mar", critical: 28, high: 45, medium: 70 },
];

const postureHistory = [
  { day: "Mon", score: 38 }, { day: "Tue", score: 40 }, { day: "Wed", score: 37 },
  { day: "Thu", score: 42 }, { day: "Fri", score: 39 }, { day: "Sat", score: 43 }, { day: "Sun", score: 42 },
];

const appDistribution = [
  { name: "Federated", value: 85, color: "#3B82F6" },
  { name: "Unfederated", value: 60, color: "#F59E0B" },
  { name: "Inactive", value: 412, color: "#6B7280" },
  { name: "At Risk", value: 514, color: "#EF4444" },
];

const complianceFrameworks = [
  { name: "CIS Controls", score: 72, color: "#10B981", controls: 18, total: 25 },
  { name: "NIST CSF", score: 68, color: "#3B82F6", controls: 34, total: 50 },
  { name: "ISO 27001", score: 54, color: "#8B5CF6", controls: 60, total: 114 },
  { name: "SOX", score: 0, color: "#EF4444", controls: 0, total: 22 },
  { name: "COBIT", score: 0, color: "#F59E0B", controls: 0, total: 37 },
];

const servicesRows = [
  { name: "Okta IDP", type: "Identity Provider", status: "Active", health: "Healthy", apps: 312, users: 1420, lastSync: "2m ago" },
  { name: "Google Workspace", type: "Productivity Suite", status: "Active", health: "Healthy", apps: 48, users: 1420, lastSync: "5m ago" },
  { name: "AWS IAM", type: "Cloud IAM", status: "Active", health: "Warning", apps: 124, users: 145, lastSync: "12m ago" },
  { name: "Azure AD", type: "Identity Provider", status: "Active", health: "Healthy", apps: 201, users: 340, lastSync: "8m ago" },
  { name: "Salesforce", type: "CRM Platform", status: "Active", health: "Healthy", apps: 15, users: 210, lastSync: "3m ago" },
  { name: "GitHub Enterprise", type: "DevOps", status: "Inactive", health: "Critical", apps: 89, users: 320, lastSync: "2h ago" },
  { name: "Slack", type: "Collaboration", status: "Active", health: "Healthy", apps: 22, users: 1105, lastSync: "1m ago" },
  { name: "Zoom", type: "Communication", status: "Active", health: "Healthy", apps: 8, users: 1380, lastSync: "6m ago" },
];

const connectionRows = [
  { name: "Okta — Production", type: "SAML 2.0", region: "US-West-2", users: 1420, apps: 312, status: "Connected", sync: "Real-time" },
  { name: "Azure AD — Corporate", type: "OpenID Connect", region: "East US", users: 340, apps: 201, status: "Connected", sync: "5 min" },
  { name: "Google Workspace", type: "OAuth 2.0", region: "Global", users: 1420, apps: 48, status: "Connected", sync: "Real-time" },
  { name: "AWS IAM", type: "SCIM 2.0", region: "US-East-1", users: 145, apps: 124, status: "Warning", sync: "15 min" },
  { name: "Okta — Staging", type: "SAML 2.0", region: "US-East-1", users: 0, apps: 0, status: "Disconnected", sync: "—" },
];

const objectRows = [
  { id: "usr-001", name: "sarah.k@corp.com", type: "User", source: "Okta", risk: "High", apps: 42, lastActive: "2m ago" },
  { id: "usr-002", name: "mike.d@corp.com", type: "User", source: "Azure AD", risk: "Medium", apps: 28, lastActive: "18m ago" },
  { id: "usr-003", name: "john.p@corp.com", type: "User", source: "Okta", risk: "Critical", apps: 15, lastActive: "2h ago" },
  { id: "svc-001", name: "svc-deploy-prod", type: "Service Account", source: "AWS IAM", risk: "High", apps: 89, lastActive: "5m ago" },
  { id: "svc-002", name: "svc-analytics", type: "Service Account", source: "Salesforce", risk: "Medium", apps: 12, lastActive: "1h ago" },
  { id: "app-001", name: "Internal CI Tool", type: "Application", source: "GitHub", risk: "High", apps: 0, lastActive: "10m ago" },
  { id: "app-002", name: "Calendly OAuth", type: "Application", source: "Google", risk: "Low", apps: 0, lastActive: "38m ago" },
  { id: "grp-001", name: "Security Admins", type: "Group", source: "Okta", risk: "Low", apps: 0, lastActive: "3h ago" },
];

const auditRows = [
  { id: "AUD-8821", actor: "sarah.k@corp.com", action: "Policy modified", target: "Excessive Scope Policy", result: "Success", ip: "10.0.1.42", time: "09:44 AM" },
  { id: "AUD-8820", actor: "System", action: "Alert triggered", target: "Threat: GitHub OAuth", result: "Success", ip: "—", time: "09:42 AM" },
  { id: "AUD-8819", actor: "mike.d@corp.com", action: "App authorized", target: "Calendly (OAuth)", result: "Success", ip: "192.168.1.5", time: "09:38 AM" },
  { id: "AUD-8818", actor: "System", action: "Posture recalculated", target: "Global Score", result: "Success", ip: "—", time: "09:30 AM" },
  { id: "AUD-8817", actor: "admin@corp.com", action: "IDP tenant added", target: "Azure AD — Corporate", result: "Success", ip: "10.0.0.1", time: "08:55 AM" },
  { id: "AUD-8816", actor: "john.p@corp.com", action: "MFA disabled", target: "john.p@corp.com", result: "Success", ip: "Mobile", time: "08:30 AM" },
  { id: "AUD-8815", actor: "analytics@corp.com", action: "Data export", target: "Salesforce Reports", result: "Flagged", ip: "10.0.2.88", time: "08:10 AM" },
  { id: "AUD-8814", actor: "devops@corp.com", action: "Service acct created", target: "svc-deploy-prod", result: "Success", ip: "10.0.1.10", time: "07:55 AM" },
];

const actionPolicies = [
  { name: "Block Excessive OAuth Scopes", type: "Integration", trigger: "Scope count > 20", action: "Block + Alert", status: "Active", hits: 14 },
  { name: "Alert on Shadow IT", type: "Integration", trigger: "Unfederated app accessed", action: "Alert + Log", status: "Active", hits: 60 },
  { name: "MFA Enforcement", type: "Identity", trigger: "Login without MFA", action: "Block + Notify", status: "Active", hits: 0 },
  { name: "Data Export Threshold", type: "Threat", trigger: "Export > 1 GB", action: "Flag + Alert", status: "Active", hits: 2 },
  { name: "Inactive App Token Revoke", type: "Integration", trigger: "Token unused > 90d", action: "Revoke + Log", status: "Active", hits: 1000 },
  { name: "Privilege Escalation Block", type: "Threat", trigger: "Role elevation detected", action: "Block + Alert + Email", status: "Active", hits: 3 },
  { name: "New IDP Tenant Approval", type: "Identity", trigger: "New tenant connection", action: "Require Approval", status: "Draft", hits: 0 },
  { name: "SOX Compliance Gate", type: "Integration", trigger: "Finance app access", action: "Log + Report", status: "Paused", hits: 0 },
];

const reportTemplates = [
  { name: "Executive Security Summary", category: "Executive", last: "Apr 11, 2026", format: "PDF", scheduled: "Weekly" },
  { name: "Threat Intelligence Report", category: "Threats", last: "Apr 12, 2026", format: "PDF", scheduled: "Daily" },
  { name: "Compliance Gap Analysis", category: "Compliance", last: "Apr 1, 2026", format: "XLSX", scheduled: "Monthly" },
  { name: "App Inventory Export", category: "Inventory", last: "Apr 10, 2026", format: "CSV", scheduled: "Daily" },
  { name: "SOX Readiness Report", category: "Compliance", last: "—", format: "PDF", scheduled: "Not set" },
  { name: "User Access Review", category: "Identity", last: "Mar 31, 2026", format: "XLSX", scheduled: "Monthly" },
];

const downloadItems = [
  { name: "Coreser Agent — macOS (ARM)", version: "3.4.2", size: "42 MB", type: "Agent", released: "Apr 10, 2026" },
  { name: "Coreser Agent — macOS (Intel)", version: "3.4.2", size: "44 MB", type: "Agent", released: "Apr 10, 2026" },
  { name: "Coreser Agent — Windows x64", version: "3.4.2", size: "38 MB", type: "Agent", released: "Apr 10, 2026" },
  { name: "Coreser Agent — Linux (deb)", version: "3.4.1", size: "36 MB", type: "Agent", released: "Mar 28, 2026" },
  { name: "Browser Extension — Chrome", version: "2.1.0", size: "3.2 MB", type: "Extension", released: "Apr 5, 2026" },
  { name: "Browser Extension — Firefox", version: "2.1.0", size: "3.0 MB", type: "Extension", released: "Apr 5, 2026" },
  { name: "SCIM Provisioning Config", version: "1.0", size: "12 KB", type: "Config", released: "Jan 15, 2026" },
  { name: "API Reference (OpenAPI)", version: "v2", size: "890 KB", type: "Docs", released: "Apr 1, 2026" },
];

const extendItems = [
  { name: "Webhook Endpoints", desc: "Push real-time events to any HTTP endpoint", icon: Link2, status: "Available", used: true },
  { name: "REST API", desc: "Programmatic access to all platform data", icon: Terminal, status: "Available", used: true },
  { name: "SIEM Integration", desc: "Stream events to Splunk, Sentinel, or Elastic", icon: BarChart2, status: "Available", used: false },
  { name: "Custom SCIM Sync", desc: "Provision users from any SCIM-compliant source", icon: RefreshCw, status: "Available", used: false },
  { name: "Slack Alerting", desc: "Send threat and policy alerts to Slack channels", icon: Bell, status: "Available", used: true },
  { name: "Jira Ticketing", desc: "Auto-create Jira tickets from threat detections", icon: ClipboardList, status: "Beta", used: false },
  { name: "PagerDuty Escalation", desc: "Escalate critical threats to on-call responders", icon: AlertTriangle, status: "Available", used: false },
  { name: "Custom Dashboards API", desc: "Embed charts in internal BI tools via API", icon: LayoutDashboard, status: "Beta", used: false },
];

const browserExtData = {
  installed: 842,
  total: 1420,
  blocked: 14,
  flagged: 38,
  events: [
    { user: "sarah.k@corp.com", event: "Shadow IT app blocked", app: "Airtable", time: "09:41 AM" },
    { user: "dev-01@corp.com", event: "Unfederated login detected", app: "Notion Personal", time: "09:22 AM" },
    { user: "james.t@corp.com", event: "Sensitive data paste blocked", app: "ChatGPT", time: "08:57 AM" },
    { user: "kim.l@corp.com", event: "App flagged for review", app: "Loom", time: "08:33 AM" },
    { user: "alex.r@corp.com", event: "Policy override approved", app: "Figma Staging", time: "08:10 AM" },
  ],
};

const dashboardWidgets = [
  { title: "Apps by Risk Level", type: "pie" },
  { title: "Weekly Alert Volume", type: "bar" },
  { title: "Posture Trend (7d)", type: "line" },
  { title: "Top Risky Users", type: "table" },
];

const weeklyAlerts = [
  { day: "Mon", alerts: 18 }, { day: "Tue", alerts: 24 }, { day: "Wed", alerts: 15 },
  { day: "Thu", alerts: 32 }, { day: "Fri", alerts: 28 }, { day: "Sat", alerts: 8 }, { day: "Sun", alerts: 5 },
];

// ─── Nav Config ─────────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "Overview",
    items: [
      { key: "home" as PageKey, label: "Home", icon: Home },
      { key: "dashboards" as PageKey, label: "Dashboards", icon: LayoutDashboard },
    ],
  },
  {
    label: "Security",
    items: [
      { key: "threats" as PageKey, label: "Threats", icon: AlertTriangle, badge: 8 },
      { key: "posture" as PageKey, label: "Posture", icon: Shield },
      { key: "action-policies" as PageKey, label: "Action Policies", icon: FileText },
    ],
  },
  {
    label: "Identity & Access",
    items: [
      { key: "connections" as PageKey, label: "Connections", icon: Wifi },
      { key: "integrations" as PageKey, label: "Integrations", icon: Puzzle },
      { key: "objects" as PageKey, label: "Objects", icon: Box },
      { key: "services" as PageKey, label: "Services", icon: Server },
    ],
  },
  {
    label: "Discovery",
    items: [
      { key: "global-search" as PageKey, label: "Global Search", icon: Search },
      { key: "browser-extension" as PageKey, label: "Browser Extension", icon: Chrome },
    ],
  },
  {
    label: "Platform",
    items: [
      { key: "activity" as PageKey, label: "Activity", icon: Activity },
      { key: "audit-log" as PageKey, label: "Audit Log", icon: Database },
      { key: "reporting" as PageKey, label: "Reporting", icon: ClipboardList },
      { key: "extend" as PageKey, label: "Extend", icon: Zap },
      { key: "downloads" as PageKey, label: "Downloads", icon: Download },
    ],
  },
];

// ─── Shared Components ───────────────────────────────────────────────────────

function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[level] ?? "bg-gray-100 text-gray-600"}`}>{level}</span>;
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Investigating: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Resolved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Connected: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "At Risk": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Healthy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Inactive: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    Disconnected: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    Success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Flagged: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Draft: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    Paused: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Available: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Beta: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? "bg-gray-100 text-gray-600"}`}>{status}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ title, value, sub, trend, icon: Icon, color = "blue" }: {
  title: string; value: string | number; sub?: string;
  trend?: { dir: "up" | "down"; label: string; good?: boolean };
  icon: React.ElementType; color?: string;
}) {
  const bg: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    yellow: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    gray: "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  };
  const trendColor = trend ? (trend.good !== false ? (trend.dir === "down" ? "text-green-500" : "text-red-500") : (trend.dir === "up" ? "text-green-500" : "text-red-500")) : "";
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${bg[color]}`}><Icon size={17} /></div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
            {trend.dir === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {trend.label}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{title}</p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>}
    </Card>
  );
}

function PageHeader({ title, sub, action }: { title: string; sub: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sub}</p>
      </div>
      {action}
    </div>
  );
}

function TableWrap({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/40 border-b border-gray-100 dark:border-gray-700">
              {headers.map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </Card>
  );
}

function Tr({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <tr onClick={onClick} className={`border-b border-gray-50 dark:border-gray-700/40 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${onClick ? "cursor-pointer" : ""}`}>
      {children}
    </tr>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-gray-700 dark:text-gray-300 ${className}`}>{children}</td>;
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function HomePage({ dark, liveCount }: { dark: boolean; liveCount: number }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Overview"
        sub={`Last updated: just now · Monitoring 5,700+ connected applications`}
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <RefreshCw size={13} /> Refresh
          </button>
        }
      />

      {/* Primary metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="IDP Tenants" value="1" sub="6 capable · 1 active" icon={Lock} color="blue" />
        <StatCard title="Unfederated Apps" value="60" sub="Discovered this week" icon={Globe} color="yellow" trend={{ dir: "up", label: "+12%", good: false }} />
        <StatCard title="3rd Party Apps" value="5.7k" sub="Connected across all IDPs" icon={Puzzle} color="purple" />
        <StatCard title="Active Alerts" value={liveCount} sub="Last 30 days" icon={AlertTriangle} color="red" trend={{ dir: "up", label: "+8%" }} />
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Federated Apps" value="85" icon={CheckCircle} color="green" />
        <StatCard title="Bypassing IDP" value="0" icon={Shield} color="green" sub="All apps federated" />
        <StatCard title="Inactive Apps" value="1,000" icon={Clock} color="gray" sub="Tokens not used >90d" />
        <StatCard title="Critical / High Risk" value="514" icon={ShieldAlert} color="red" trend={{ dir: "up", label: "+3%" }} />
      </div>

      {/* Charts row */}
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Threat Volume (6 months)</h3>
            <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Critical</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />High</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />Medium</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#F3F4F6"} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} cursor={{ fill: dark ? "#374151" : "#F9FAFB" }} />
              <Bar dataKey="critical" name="Critical" stackId="a" fill="#EF4444" />
              <Bar dataKey="high" name="High" stackId="a" fill="#F97316" />
              <Bar dataKey="medium" name="Medium" stackId="a" fill="#F59E0B" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">App Distribution</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={appDistribution} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
                {appDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: any, n: any) => [Number(v).toLocaleString(), n]} contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-1">
            {appDistribution.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Posture + Operationalization */}
      <div className="grid xl:grid-cols-2 gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">Posture Score (7 days)</h3>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">42%</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <ArrowDownRight size={14} className="text-red-500" />
            <span className="text-xs text-red-500 font-medium">28 points below target (70%)</span>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <AreaChart data={postureHistory}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#F3F4F6"} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis domain={[30, 55]} tick={{ fontSize: 10, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fill="url(#scoreGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Operationalization</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Onboarded Services", value: "20", sub: "57 pending onboarding", color: "text-blue-600 dark:text-blue-400" },
              { label: "Standards Applied", value: "17", sub: "42% posture score", color: "text-purple-600 dark:text-purple-400" },
              { label: "Policies Active", value: "21", sub: "4 integration · 8 threat", color: "text-green-600 dark:text-green-400" },
              { label: "Alerts (30d)", value: String(liveCount), sub: "35 high priority alerts", color: "text-red-600 dark:text-red-400" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3.5">
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-0.5">{item.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent threats */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Threats</h3>
          <span className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">View all →</span>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700/40">
          {threatRows.slice(0, 4).map((t) => (
            <div key={t.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
              <SeverityBadge level={t.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{t.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.source} · {t.affected}</p>
              </div>
              <StatusPill status={t.status} />
              <span className="text-xs text-gray-400 whitespace-nowrap">{t.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ThreatsPage() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<number | null>(null);
  const filters = ["All", "Critical", "High", "Medium", "Resolved"];
  const filtered = filter === "All" ? threatRows
    : filter === "Resolved" ? threatRows.filter((t) => t.status === "Resolved")
    : threatRows.filter((t) => t.severity === filter);

  return (
    <div className="space-y-6">
      <PageHeader title="Threats" sub="Real-time threat detection across all connected systems"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <RefreshCw size={13} /> Refresh
          </button>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Critical Threats" value={threatRows.filter(t => t.severity === "Critical").length} icon={ShieldAlert} color="red" trend={{ dir: "up", label: "+2 today" }} />
        <StatCard title="High Severity" value={threatRows.filter(t => t.severity === "High").length} icon={AlertTriangle} color="orange" />
        <StatCard title="Investigating" value={threatRows.filter(t => t.status === "Investigating").length} icon={Eye} color="yellow" />
        <StatCard title="Resolved (7d)" value={threatRows.filter(t => t.status === "Resolved").length} icon={CheckCircle} color="green" />
      </div>

      <Card>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex-wrap">
          <Filter size={14} className="text-gray-400 shrink-0" />
          <span className="text-xs text-gray-500 dark:text-gray-400">Severity:</span>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700/40">
          {filtered.map((t) => (
            <>
              <div key={t.id} onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors cursor-pointer">
                <SeverityBadge level={t.severity} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.source} · {t.affected}</p>
                </div>
                <StatusPill status={t.status} />
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">{t.time}</span>
                <ChevronRight size={14} className={`text-gray-400 transition-transform shrink-0 ${expanded === t.id ? "rotate-90" : ""}`} />
              </div>
              {expanded === t.id && (
                <div className="px-4 py-4 bg-gray-50 dark:bg-gray-700/20 border-b border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                    <div><p className="text-gray-400 dark:text-gray-500 mb-1">Threat ID</p><p className="font-mono text-gray-900 dark:text-white">THR-{String(t.id).padStart(4, "0")}</p></div>
                    <div><p className="text-gray-400 dark:text-gray-500 mb-1">Affected</p><p className="text-gray-900 dark:text-white">{t.affected}</p></div>
                    <div><p className="text-gray-400 dark:text-gray-500 mb-1">Detected</p><p className="text-gray-900 dark:text-white">{t.time}</p></div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">Investigate</button>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors">Mark Resolved</button>
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Assign</button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PosturePage({ dark }: { dark: boolean }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Security Posture" sub="Compliance frameworks, controls coverage, and remediation tracking" />

      <div className="grid xl:grid-cols-3 gap-6">
        {/* Score gauge */}
        <Card className="p-6 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-2">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke={dark ? "#374151" : "#F3F4F6"} strokeWidth="10" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="#3B82F6" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 52 * 0.42} ${2 * Math.PI * 52}`} strokeLinecap="round" className="transition-all duration-700" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">42%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Posture</span>
            </div>
          </div>
          <p className="font-semibold text-gray-900 dark:text-white">Overall Security Score</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 70% · Gap: 28 pts</p>
          <div className="w-full mt-5 space-y-3">
            {[{ label: "Identity Security", pct: 65, color: "bg-blue-500" },
              { label: "Data Protection", pct: 38, color: "bg-purple-500" },
              { label: "Endpoint Coverage", pct: 22, color: "bg-orange-500" },
              { label: "App Governance", pct: 44, color: "bg-green-500" }].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance */}
        <Card className="xl:col-span-2 p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Compliance Frameworks</h3>
          <div className="space-y-5">
            {complianceFrameworks.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{c.name}</span>
                    {c.score === 0 && <span className="text-[10px] bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-medium">Not started</span>}
                    {c.score > 0 && c.score < 60 && <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded font-medium">At risk</span>}
                    {c.score >= 60 && <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded font-medium">On track</span>}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {c.controls}/{c.total} controls · <span className="font-semibold text-gray-900 dark:text-white">{c.score}%</span>
                  </div>
                </div>
                <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${c.score}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800/30 rounded-xl">
            <div className="flex items-start gap-2.5">
              <AlertTriangle size={15} className="text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">SOX &amp; COBIT compliance not started</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-0.5">Required for enterprise audit readiness. Configure integration and identity policies to begin tracking coverage.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Remediation */}
      <Card className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Remediation Actions</h3>
        <div className="space-y-2.5">
          {[
            { action: "Enable MFA for all 14 service accounts", impact: "High", effort: "Low", gain: "+8%" },
            { action: "Remove excessive OAuth scopes from 14 apps", impact: "High", effort: "Medium", gain: "+6%" },
            { action: "Federate 15 shadow IT apps to Okta IDP", impact: "Medium", effort: "High", gain: "+4%" },
            { action: "Archive 1,000 inactive app tokens", impact: "Medium", effort: "Low", gain: "+3%" },
            { action: "Complete SOX baseline configuration", impact: "High", effort: "High", gain: "+9%" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{item.action}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <SeverityBadge level={item.impact} />
                <span className="text-xs font-bold text-green-600 dark:text-green-400 w-10 text-right">{item.gain}</span>
                <button className="opacity-0 group-hover:opacity-100 text-xs bg-blue-600 text-white px-2 py-1 rounded-lg transition-all">Assign</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function IntegrationsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const cats = ["All", "Productivity", "Collaboration", "DevOps", "Identity", "CRM", "Storage"];
  const filtered = integrationApps.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || a.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Integrations" sub={`${integrationApps.length} apps connected · 5,700+ users covered`}
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={13} /> Add Integration
          </button>
        }
      />

      <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
        {[
          { label: "Total Connected", value: integrationApps.length, color: "text-blue-600" },
          { label: "At Risk", value: integrationApps.filter(a => a.status === "At Risk").length, color: "text-red-600" },
          { label: "High Risk", value: integrationApps.filter(a => a.risk === "High").length, color: "text-orange-600" },
          { label: "Medium Risk", value: integrationApps.filter(a => a.risk === "Medium").length, color: "text-yellow-600" },
          { label: "Low Risk", value: integrationApps.filter(a => a.risk === "Low").length, color: "text-green-600" },
          { label: "Avg Permissions", value: Math.round(integrationApps.reduce((a, b) => a + b.perms, 0) / integrationApps.length), color: "text-purple-600" },
        ].map((s) => (
          <Card key={s.label} className="p-3 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search apps..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-52" />
        </div>
        {cats.map((c) => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${catFilter === c ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((app) => (
          <Card key={app.name} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: app.color === "#000000" ? "#374151" : app.color }}>{app.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{app.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{app.category}</p>
                </div>
              </div>
              <StatusPill status={app.status} />
            </div>
            <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-50 dark:border-gray-700/50">
              <span className="text-gray-500 dark:text-gray-400">{app.users.toLocaleString()} users · {app.perms} perms</span>
              <SeverityBadge level={app.risk} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ActivityPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const filtered = typeFilter === "All" ? activityEvents
    : activityEvents.filter((e) => e.type === typeFilter.toLowerCase());

  return (
    <div className="space-y-6">
      <PageHeader title="Activity" sub="Real-time audit trail of all security events across your environment" />

      <div className="flex gap-2 flex-wrap">
        {["All", "Alert", "Warning", "Info"].map((f) => (
          <button key={f} onClick={() => setTypeFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${typeFilter === f ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50"}`}>
            {f}
          </button>
        ))}
      </div>

      <Card className="divide-y divide-gray-50 dark:divide-gray-700/40">
        {filtered.map((ev, i) => {
          const iconColor = ev.type === "alert" ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            : ev.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
          const Icon = ev.type === "alert" ? AlertTriangle : ev.type === "warning" ? AlertCircle : Info;
          return (
            <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
              <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${iconColor}`}><Icon size={12} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{ev.event}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ev.user}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{ev.detail}</p>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 mt-0.5">{ev.time}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Services" sub="20 onboarded services · 57 awaiting onboarding"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={13} /> Onboard Service
          </button>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Services" value="77" sub="20 onboarded" icon={Server} color="blue" />
        <StatCard title="Healthy" value={servicesRows.filter(s => s.health === "Healthy").length} icon={ShieldCheck} color="green" />
        <StatCard title="Warning" value={servicesRows.filter(s => s.health === "Warning").length} icon={AlertCircle} color="yellow" />
        <StatCard title="Critical" value={servicesRows.filter(s => s.health === "Critical").length} icon={ShieldAlert} color="red" />
      </div>

      <TableWrap headers={["Service", "Type", "Status", "Health", "Apps", "Users", "Last Sync", ""]}>
        {servicesRows.map((s) => (
          <Tr key={s.name}>
            <Td><span className="font-medium text-gray-900 dark:text-white">{s.name}</span></Td>
            <Td>{s.type}</Td>
            <Td><StatusPill status={s.status} /></Td>
            <Td><StatusPill status={s.health} /></Td>
            <Td>{s.apps}</Td>
            <Td>{s.users.toLocaleString()}</Td>
            <Td><span className="text-xs text-gray-400">{s.lastSync}</span></Td>
            <Td><button className="text-gray-400 hover:text-blue-600 transition-colors"><MoreHorizontal size={15} /></button></Td>
          </Tr>
        ))}
      </TableWrap>
    </div>
  );
}

function ConnectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Connections" sub="Identity providers and directory services connected to your environment"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={13} /> Connect IDP
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard title="IDP Tenants" value="1" sub="6 capable · 5 available" icon={Lock} color="blue" />
        <StatCard title="Total Users" value="1,420" sub="Across all directories" icon={User} color="purple" />
        <StatCard title="Sync Frequency" value="Real-time" sub="For active connections" icon={RefreshCw} color="green" />
      </div>

      <TableWrap headers={["Connection Name", "Protocol", "Region", "Users", "Apps", "Status", "Sync", ""]}>
        {connectionRows.map((c) => (
          <Tr key={c.name}>
            <Td><span className="font-medium text-gray-900 dark:text-white">{c.name}</span></Td>
            <Td><span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300">{c.type}</span></Td>
            <Td>{c.region}</Td>
            <Td>{c.users.toLocaleString()}</Td>
            <Td>{c.apps}</Td>
            <Td><StatusPill status={c.status} /></Td>
            <Td><span className="text-xs text-gray-500">{c.sync}</span></Td>
            <Td><button className="text-gray-400 hover:text-blue-600 transition-colors"><Settings size={14} /></button></Td>
          </Tr>
        ))}
      </TableWrap>

      <Card className="p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">IDP Capabilities</h3>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            { name: "Okta (Active)", status: "In use" },
            { name: "Azure AD", status: "Available" },
            { name: "Google Workspace", status: "Available" },
            { name: "Ping Identity", status: "Available" },
            { name: "Auth0", status: "Available" },
            { name: "OneLogin", status: "Available" },
          ].map((idp) => (
            <div key={idp.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg">
              <span className="text-sm text-gray-800 dark:text-gray-200">{idp.name}</span>
              <span className={`text-xs font-medium ${idp.status === "In use" ? "text-green-600" : "text-gray-400"}`}>{idp.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function GlobalSearchPage() {
  const [query, setQuery] = useState("");
  const results = query.length > 1 ? [
    ...objectRows.filter(o => o.name.toLowerCase().includes(query.toLowerCase())).map(o => ({ ...o, kind: o.type })),
    ...threatRows.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).map(t => ({ name: t.name, id: String(t.id), kind: "Threat", risk: t.severity, lastActive: t.time, source: t.source })),
  ] : [];

  return (
    <div className="space-y-6">
      <PageHeader title="Global Search" sub="Search across all users, apps, threats, events, and objects" />

      <Card className="p-5">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users, apps, threats, policies..."
            className="w-full pl-12 pr-4 py-3.5 text-sm border-2 border-blue-200 dark:border-blue-900/50 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition" />
        </div>
        {query.length > 1 && (
          <div className="mt-3">
            {results.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">No results for "{query}"</p>
            ) : (
              <div className="space-y-1 max-h-72 overflow-y-auto">
                {results.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors cursor-pointer">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-medium shrink-0">{r.kind}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white flex-1">{r.name}</span>
                    <SeverityBadge level={r.risk ?? "Low"} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {query.length === 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[["Users", "1,420 indexed"], ["Applications", "5,700+ indexed"], ["Threats", "35 active"]].map(([label, sub]) => (
              <div key={label} className="p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function ObjectsPage() {
  const [typeFilter, setTypeFilter] = useState("All");
  const types = ["All", "User", "Service Account", "Application", "Group"];
  const filtered = typeFilter === "All" ? objectRows : objectRows.filter((o) => o.type === typeFilter);

  return (
    <div className="space-y-6">
      <PageHeader title="Objects" sub="All managed identities, accounts, applications, and groups" />

      <div className="flex gap-2 flex-wrap">
        {types.map((t) => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${typeFilter === t ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50"}`}>
            {t}
          </button>
        ))}
      </div>

      <TableWrap headers={["ID", "Name", "Type", "Source", "Risk", "Apps", "Last Active", ""]}>
        {filtered.map((o) => (
          <Tr key={o.id}>
            <Td><span className="font-mono text-xs text-gray-400">{o.id}</span></Td>
            <Td><span className="font-medium text-gray-900 dark:text-white">{o.name}</span></Td>
            <Td><span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{o.type}</span></Td>
            <Td>{o.source}</Td>
            <Td><SeverityBadge level={o.risk} /></Td>
            <Td>{o.apps > 0 ? o.apps : "—"}</Td>
            <Td><span className="text-xs text-gray-400">{o.lastActive}</span></Td>
            <Td><button className="text-gray-400 hover:text-blue-600 transition-colors"><Eye size={14} /></button></Td>
          </Tr>
        ))}
      </TableWrap>
    </div>
  );
}

function BrowserExtensionPage() {
  const pct = Math.round((browserExtData.installed / browserExtData.total) * 100);
  return (
    <div className="space-y-6">
      <PageHeader title="Browser Extension" sub="Policy enforcement and shadow IT discovery via browser agents"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Download size={13} /> Deploy Extension
          </button>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Extension Installed" value={`${browserExtData.installed}`} sub={`of ${browserExtData.total} users (${pct}%)`} icon={Chrome} color="blue" />
        <StatCard title="Apps Blocked" value={browserExtData.blocked} sub="This month" icon={Slash} color="red" />
        <StatCard title="Apps Flagged" value={browserExtData.flagged} sub="Awaiting review" icon={AlertCircle} color="yellow" />
        <StatCard title="Coverage" value={`${pct}%`} sub="Target: 100%" icon={UserCheck} color="green" />
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Deployment Coverage</h3>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{pct}%</span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{browserExtData.installed} of {browserExtData.total} users · {browserExtData.total - browserExtData.installed} pending deployment</p>
      </Card>

      <Card>
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Events</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700/40">
          {browserExtData.events.map((ev, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">{ev.user[0].toUpperCase()}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{ev.event}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{ev.user} · {ev.app}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{ev.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ActionPoliciesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Action Policies" sub="Automated response rules for threats, identity events, and app governance"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={13} /> New Policy
          </button>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Active Policies" value={actionPolicies.filter(p => p.status === "Active").length} icon={ShieldCheck} color="green" />
        <StatCard title="Draft Policies" value={actionPolicies.filter(p => p.status === "Draft").length} icon={FileText} color="gray" />
        <StatCard title="Total Policy Hits" value={actionPolicies.reduce((a, b) => a + b.hits, 0).toLocaleString()} icon={Activity} color="blue" sub="All time" />
        <StatCard title="Paused" value={actionPolicies.filter(p => p.status === "Paused").length} icon={Clock} color="yellow" />
      </div>

      <TableWrap headers={["Policy Name", "Type", "Trigger", "Action", "Status", "Hits", ""]}>
        {actionPolicies.map((p) => (
          <Tr key={p.name}>
            <Td><span className="font-medium text-gray-900 dark:text-white">{p.name}</span></Td>
            <Td><span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-1.5 py-0.5 rounded font-medium">{p.type}</span></Td>
            <Td><span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{p.trigger}</span></Td>
            <Td>{p.action}</Td>
            <Td><StatusPill status={p.status} /></Td>
            <Td><span className="font-semibold text-gray-900 dark:text-white">{p.hits.toLocaleString()}</span></Td>
            <Td>
              <div className="flex gap-1.5">
                <button className="text-gray-400 hover:text-blue-600 transition-colors"><Settings size={14} /></button>
                <button className="text-gray-400 hover:text-red-500 transition-colors"><X size={14} /></button>
              </div>
            </Td>
          </Tr>
        ))}
      </TableWrap>
    </div>
  );
}

function ReportingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reporting" sub="Schedule, export, and manage compliance and security reports"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={13} /> New Report
          </button>
        }
      />

      <TableWrap headers={["Report Name", "Category", "Last Generated", "Format", "Schedule", ""]}>
        {reportTemplates.map((r) => (
          <Tr key={r.name}>
            <Td><span className="font-medium text-gray-900 dark:text-white">{r.name}</span></Td>
            <Td><span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{r.category}</span></Td>
            <Td><span className="text-xs text-gray-500">{r.last}</span></Td>
            <Td><span className="font-mono text-xs text-gray-600 dark:text-gray-400">{r.format}</span></Td>
            <Td><span className="text-xs text-gray-500">{r.scheduled}</span></Td>
            <Td>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 text-xs text-blue-600 hover:underline"><Play size={11} /> Run</button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:underline"><Download size={11} /> Export</button>
              </div>
            </Td>
          </Tr>
        ))}
      </TableWrap>
    </div>
  );
}

function DownloadsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Downloads" sub="Agents, browser extensions, configuration files, and documentation" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["Agent", "Extension", "Config", "Docs"].map((type) => {
          const count = downloadItems.filter(d => d.type === type).length;
          const icons: Record<string, React.ElementType> = { Agent: Cpu, Extension: Chrome, Config: Settings, Docs: BookOpen };
          const Icon = icons[type];
          return (
            <Card key={type} className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className="text-blue-500" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{type}s</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">available</p>
            </Card>
          );
        })}
      </div>

      <div className="space-y-3">
        {["Agent", "Extension", "Config", "Docs"].map((type) => {
          const items = downloadItems.filter(d => d.type === type);
          if (!items.length) return null;
          return (
            <Card key={type} className="overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{type}s</h3>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-700/40">
                {items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">v{item.version} · {item.size} · Released {item.released}</p>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                      <Download size={12} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function AuditLogPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Audit Log" sub="Immutable record of all platform actions and user events"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download size={13} /> Export
          </button>
        }
      />

      <TableWrap headers={["Audit ID", "Actor", "Action", "Target", "Result", "IP Address", "Time", ""]}>
        {auditRows.map((a) => (
          <Tr key={a.id}>
            <Td><span className="font-mono text-xs text-gray-400">{a.id}</span></Td>
            <Td><span className="font-medium text-gray-900 dark:text-white text-xs">{a.actor}</span></Td>
            <Td>{a.action}</Td>
            <Td><span className="text-xs text-gray-500 dark:text-gray-400">{a.target}</span></Td>
            <Td><StatusPill status={a.result} /></Td>
            <Td><span className="font-mono text-xs text-gray-500">{a.ip}</span></Td>
            <Td><span className="text-xs text-gray-400">{a.time}</span></Td>
            <Td><button className="text-gray-400 hover:text-blue-600 transition-colors"><Eye size={14} /></button></Td>
          </Tr>
        ))}
      </TableWrap>
    </div>
  );
}

function ExtendPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Extend" sub="Integrate Coreser with your existing tools via APIs, webhooks, and native connectors" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {extendItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.name} className={`p-5 hover:shadow-md transition-all cursor-pointer ${item.used ? "ring-1 ring-blue-200 dark:ring-blue-900/50" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                  <Icon size={16} />
                </div>
                <div className="flex items-center gap-1.5">
                  <StatusPill status={item.status} />
                  {item.used && <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded font-medium">Active</span>}
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
              <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                {item.used ? "Configure →" : "Enable →"}
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function DashboardsPage({ dark }: { dark: boolean }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboards" sub="Custom executive and operational views"
        action={
          <button className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Plus size={13} /> New Dashboard
          </button>
        }
      />

      <div className="grid xl:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Apps by Risk Level</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={appDistribution} cx="50%" cy="50%" outerRadius={75} paddingAngle={3} dataKey="value">
                {appDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Alert Volume</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyAlerts} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#F3F4F6"} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="alerts" name="Alerts" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Posture Trend (7 days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={postureHistory}>
              <defs>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#F3F4F6"} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis domain={[30, 55]} tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} fill="url(#grad2)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Risky Users</h3>
          <div className="space-y-2.5">
            {objectRows.filter(o => o.type === "User" || o.type === "Service Account").map((u, i) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold shrink-0">{u.name[0].toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{u.name}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{u.source}</p>
                </div>
                <SeverityBadge level={u.risk} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Main Demo Shell ─────────────────────────────────────────────────────────

export default function DemoPage() {
  const [, setLocation] = useLocation();
  const [page, setPage] = useState<PageKey>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [liveAlerts, setLiveAlerts] = useState(35);
  const [searchVal, setSearchVal] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Simulate live alert count
  useEffect(() => {
    const t = setInterval(() => {
      setLiveAlerts((n) => Math.random() > 0.75 ? n + 1 : n);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage dark={dark} liveCount={liveAlerts} />;
      case "connections": return <ConnectionsPage />;
      case "global-search": return <GlobalSearchPage />;
      case "threats": return <ThreatsPage />;
      case "posture": return <PosturePage dark={dark} />;
      case "integrations": return <IntegrationsPage />;
      case "extend": return <ExtendPage />;
      case "dashboards": return <DashboardsPage dark={dark} />;
      case "services": return <ServicesPage />;
      case "activity": return <ActivityPage />;
      case "objects": return <ObjectsPage />;
      case "browser-extension": return <BrowserExtensionPage />;
      case "action-policies": return <ActionPoliciesPage />;
      case "reporting": return <ReportingPage />;
      case "downloads": return <DownloadsPage />;
      case "audit-log": return <AuditLogPage />;
      default: return <HomePage dark={dark} liveCount={liveAlerts} />;
    }
  };

  const currentItem = navGroups.flatMap(g => g.items).find(i => i.key === page);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 font-sans text-sm">

        {/* ── Sidebar ── */}
        <aside
          className={`${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-200 overflow-hidden`}
          style={{ minWidth: sidebarOpen ? "14rem" : "3.5rem" }}
        >
          {/* Logo */}
          <div className="flex items-center h-14 px-3 border-b border-gray-100 dark:border-gray-800 gap-2">
            {sidebarOpen && (
              <>
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Shield size={14} className="text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white truncate">Coreser</span>
              </>
            )}
            <button onClick={() => setSidebarOpen((v) => !v)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors ml-auto shrink-0">
              {sidebarOpen ? <ChevronLeft size={15} /> : <Menu size={15} />}
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-2 px-1.5 space-y-4">
            {navGroups.map((group) => (
              <div key={group.label}>
                {sidebarOpen && (
                  <p className="px-2.5 mb-1 text-[10px] font-semibold text-gray-400 dark:text-gray-600 uppercase tracking-wider">{group.label}</p>
                )}
                <div className="space-y-0.5">
                  {group.items.map(({ key, label, icon: Icon, badge }) => (
                    <button key={key} onClick={() => setPage(key)} title={!sidebarOpen ? label : undefined}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors relative ${page === key ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}`}>
                      <Icon size={15} className="shrink-0" />
                      {sidebarOpen && <span className="truncate text-[13px]">{label}</span>}
                      {badge !== undefined && sidebarOpen && (
                        <span className="ml-auto bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1">{badge}</span>
                      )}
                      {badge !== undefined && !sidebarOpen && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Exit demo */}
          {sidebarOpen && (
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors w-full">
                <ExternalLink size={12} /> Exit Demo
              </button>
            </div>
          )}
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Header */}
          <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 px-5 shrink-0">
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Shield size={12} className="text-blue-500" />
              <ChevronRight size={12} />
              <span className="text-gray-900 dark:text-white font-medium">{currentItem?.label ?? "Home"}</span>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-xs ml-2">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Quick search..."
                className="w-full pl-8 pr-4 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition" />
            </div>

            <div className="ml-auto flex items-center gap-1">
              {/* Dark mode */}
              <button onClick={() => setDark((v) => !v)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                {dark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Bell */}
              <div className="relative" ref={notifRef}>
                <button onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                  <Bell size={15} />
                  <span className="absolute top-1 right-1 min-w-[14px] h-[14px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse px-0.5">
                    {liveAlerts > 9 ? "9+" : liveAlerts}
                  </span>
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-11 w-76 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 overflow-hidden" style={{ width: 300 }}>
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
                      <button onClick={() => setNotifOpen(false)} className="text-xs text-blue-600 hover:underline">Dismiss all</button>
                    </div>
                    {[
                      { msg: "Critical: OAuth Token Hijack Attempt on GitHub", time: "2m ago", type: "alert" },
                      { msg: "Shadow IT app detected via Browser Extension", time: "34m ago", type: "warning" },
                      { msg: "Data Exfiltration Pattern flagged in Salesforce", time: "5h ago", type: "alert" },
                      { msg: "Posture score updated: 42% (target 70%)", time: "7h ago", type: "info" },
                    ].map((n, i) => {
                      const Icon = n.type === "alert" ? AlertTriangle : n.type === "warning" ? AlertCircle : Info;
                      const color = n.type === "alert" ? "bg-red-100 dark:bg-red-900/30 text-red-600" : n.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600";
                      return (
                        <div key={i} className="px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer flex gap-3">
                          <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${color}`}><Icon size={11} /></div>
                          <div className="min-w-0">
                            <p className="text-xs text-gray-800 dark:text-gray-200 leading-snug">{n.msg}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
                  className="flex items-center gap-2 pl-2 pr-1.5 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">JD</div>
                  <ChevronDown size={12} className="text-gray-400" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-11 w-48 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">Jane Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Security Administrator</p>
                    </div>
                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <User size={13} className="text-gray-400" /> Profile
                    </button>
                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <Settings size={13} className="text-gray-400" /> Settings
                    </button>
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <button onClick={() => setLocation("/")}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut size={13} /> Exit Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}
