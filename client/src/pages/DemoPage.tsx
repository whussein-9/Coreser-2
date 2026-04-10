import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Home, Globe, Search, AlertTriangle, Shield, Puzzle, Zap,
  LayoutDashboard, Server, Activity, Box, Chrome, FileText,
  Download, ClipboardList, ChevronLeft, ChevronRight, Bell,
  Moon, Sun, ChevronDown, Filter, ArrowUpRight, ArrowDownRight,
  CheckCircle, XCircle, Clock, RefreshCw, Settings, User,
  LogOut, ExternalLink, TrendingUp, Lock, Eye, Wifi, Database,
  Cpu, AlertCircle, MoreHorizontal, X, Menu,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

type PageKey =
  | "home" | "connections" | "global-search" | "threats" | "posture"
  | "integrations" | "extend" | "dashboards" | "services" | "activity"
  | "objects" | "browser-extension" | "action-policies" | "reporting"
  | "downloads" | "audit-log";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const threatData = [
  { id: 1, name: "OAuth Token Hijack Attempt", severity: "Critical", source: "GitHub OAuth App", status: "Active", time: "2m ago", affected: "42 users" },
  { id: 2, name: "Excessive Permission Scope", severity: "High", source: "Slack Integration", status: "Investigating", time: "18m ago", affected: "8 apps" },
  { id: 3, name: "Shadow IT App Detected", severity: "High", source: "Browser Extension", status: "Active", time: "34m ago", affected: "3 services" },
  { id: 4, name: "Inactive Admin Account", severity: "Medium", source: "Google Workspace", status: "Resolved", time: "2h ago", affected: "1 user" },
  { id: 5, name: "Unmanaged Service Account", severity: "Medium", source: "AWS IAM", status: "Investigating", time: "3h ago", affected: "12 apps" },
  { id: 6, name: "Data Exfiltration Pattern", severity: "Critical", source: "Salesforce", status: "Active", time: "5h ago", affected: "19 records" },
  { id: 7, name: "MFA Bypass Attempt", severity: "High", source: "Okta IDP", status: "Resolved", time: "8h ago", affected: "1 user" },
  { id: 8, name: "API Key Exposed in Repo", severity: "Critical", source: "GitHub", status: "Active", time: "12h ago", affected: "3 keys" },
];

const integrationApps = [
  { name: "Google Workspace", category: "Productivity", status: "Connected", risk: "Low", users: 1420, icon: "G", color: "#4285F4" },
  { name: "Slack", category: "Collaboration", status: "Connected", risk: "Medium", users: 1105, icon: "S", color: "#E01E5A" },
  { name: "GitHub", category: "DevOps", status: "At Risk", risk: "High", users: 320, icon: "GH", color: "#24292E" },
  { name: "Salesforce", category: "CRM", status: "Connected", risk: "Low", users: 210, icon: "SF", color: "#00A1E0" },
  { name: "Zoom", category: "Communication", status: "Connected", risk: "Low", users: 1380, icon: "Z", color: "#2D8CFF" },
  { name: "Jira", category: "Project Mgmt", status: "At Risk", risk: "Medium", users: 415, icon: "J", color: "#0052CC" },
  { name: "Dropbox", category: "Storage", status: "Connected", risk: "Low", users: 560, icon: "D", color: "#0061FF" },
  { name: "HubSpot", category: "Marketing", status: "Connected", risk: "Low", users: 145, icon: "H", color: "#FF7A59" },
  { name: "Notion", category: "Productivity", status: "At Risk", risk: "High", users: 890, icon: "N", color: "#000000" },
  { name: "Figma", category: "Design", status: "Connected", risk: "Low", users: 78, icon: "F", color: "#F24E1E" },
  { name: "Stripe", category: "Payments", status: "Connected", risk: "Low", users: 25, icon: "ST", color: "#6772E5" },
  { name: "Okta", category: "Identity", status: "Connected", risk: "Low", users: 1420, icon: "O", color: "#007DC1" },
];

const activityTimeline = [
  { time: "09:42 AM", event: "Admin login from new IP", type: "alert", user: "sarah.k@corp.com", ip: "185.23.1.44" },
  { time: "09:38 AM", event: "New OAuth app authorized", type: "info", user: "mike.d@corp.com", app: "Calendly" },
  { time: "09:15 AM", event: "Policy rule triggered", type: "warning", user: "System", policy: "Excessive Scopes" },
  { time: "08:55 AM", event: "Service account created", type: "info", user: "devops@corp.com", account: "svc-deploy-prod" },
  { time: "08:30 AM", event: "MFA disabled for user", type: "alert", user: "john.p@corp.com", reason: "Device lost" },
  { time: "08:10 AM", event: "Data export performed", type: "warning", user: "analytics@corp.com", size: "2.4 GB" },
  { time: "07:55 AM", event: "New IDP tenant connected", type: "info", user: "admin@corp.com", tenant: "corp-azure-us" },
  { time: "07:30 AM", event: "Posture score updated", type: "info", user: "System", score: "42% → 44%" },
];

const barChartData = [
  { month: "Oct", critical: 12, high: 28, medium: 45 },
  { month: "Nov", critical: 18, high: 35, medium: 52 },
  { month: "Dec", critical: 8, high: 22, medium: 38 },
  { month: "Jan", critical: 22, high: 41, medium: 60 },
  { month: "Feb", critical: 15, high: 30, medium: 48 },
  { month: "Mar", critical: 28, high: 45, medium: 70 },
];

const lineChartData = [
  { day: "Mon", score: 38 }, { day: "Tue", score: 40 }, { day: "Wed", score: 37 },
  { day: "Thu", score: 42 }, { day: "Fri", score: 39 }, { day: "Sat", score: 43 }, { day: "Sun", score: 42 },
];

const pieData = [
  { name: "Federated", value: 85, color: "#3B82F6" },
  { name: "Unfederated", value: 60, color: "#F59E0B" },
  { name: "Inactive", value: 1000, color: "#6B7280" },
  { name: "At Risk", value: 514, color: "#EF4444" },
];

const complianceData = [
  { name: "NIST CSF", score: 68, color: "#3B82F6" },
  { name: "ISO 27001", score: 54, color: "#8B5CF6" },
  { name: "SOX", score: 0, color: "#EF4444" },
  { name: "COBIT", score: 0, color: "#F59E0B" },
  { name: "CIS Controls", score: 72, color: "#10B981" },
];

const servicesData = [
  { name: "Okta IDP", type: "Identity Provider", status: "Active", health: "Healthy", apps: 312, lastSync: "2m ago" },
  { name: "Google Workspace", type: "Productivity Suite", status: "Active", health: "Healthy", apps: 48, lastSync: "5m ago" },
  { name: "AWS IAM", type: "Cloud IAM", status: "Active", health: "Warning", apps: 124, lastSync: "12m ago" },
  { name: "Azure AD", type: "Identity Provider", status: "Active", health: "Healthy", apps: 201, lastSync: "8m ago" },
  { name: "Salesforce", type: "CRM Platform", status: "Active", health: "Healthy", apps: 15, lastSync: "3m ago" },
  { name: "GitHub Enterprise", type: "DevOps", status: "Inactive", health: "Critical", apps: 89, lastSync: "2h ago" },
];

// ─── Nav Items ───────────────────────────────────────────────────────────────

const navItems: { key: PageKey; label: string; icon: any; badge?: number }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "connections", label: "Connections", icon: Wifi },
  { key: "global-search", label: "Global Search", icon: Search },
  { key: "threats", label: "Threats", icon: AlertTriangle, badge: 35 },
  { key: "posture", label: "Posture", icon: Shield },
  { key: "integrations", label: "Integrations", icon: Puzzle },
  { key: "extend", label: "Extend", icon: Zap },
  { key: "dashboards", label: "Dashboards", icon: LayoutDashboard },
  { key: "services", label: "Services", icon: Server },
  { key: "activity", label: "Activity", icon: Activity },
  { key: "objects", label: "Objects", icon: Box },
  { key: "browser-extension", label: "Browser Extension", icon: Chrome },
  { key: "action-policies", label: "Action Policies", icon: FileText },
  { key: "reporting", label: "Reporting", icon: ClipboardList },
  { key: "downloads", label: "Downloads", icon: Download },
  { key: "audit-log", label: "Audit Log", icon: Database },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    Low: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[level] ?? "bg-gray-100 text-gray-700"}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    Investigating: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    Resolved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    Connected: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    "At Risk": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    Healthy: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
    Warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
    Critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    Inactive: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function MetricCard({ title, value, sub, trend, icon: Icon, color = "blue" }: {
  title: string; value: string; sub?: string; trend?: { dir: "up" | "down"; pct: string }; icon: any; color?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    yellow: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend.dir === "up" ? "text-red-500" : "text-green-500"}`}>
            {trend.dir === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {trend.pct}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{title}</p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function HomePage({ dark }: { dark: boolean }) {
  const [alertCount, setAlertCount] = useState(35);
  useEffect(() => {
    const t = setInterval(() => {
      setAlertCount((n) => (Math.random() > 0.7 ? n + 1 : n));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated: just now · Monitoring 5,700+ connected applications</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="IDP Tenants in Use" value="1" sub="6 capable" icon={Lock} color="blue" />
        <MetricCard title="Unfederated Apps" value="60" sub="Discovered" icon={Globe} color="yellow" trend={{ dir: "up", pct: "+12%" }} />
        <MetricCard title="3rd Party Apps" value="5.7k" sub="Connected" icon={Puzzle} color="purple" />
        <MetricCard title="Active Alerts" value={String(alertCount)} sub="Last 30 days" icon={AlertTriangle} color="red" trend={{ dir: "up", pct: "+8%" }} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Federated Apps" value="85" icon={CheckCircle} color="green" />
        <MetricCard title="Bypassing IDP" value="0" icon={Shield} color="green" />
        <MetricCard title="Inactive Apps" value="1k" icon={Clock} color="gray" />
        <MetricCard title="Critical / High Risk" value="514" icon={AlertCircle} color="red" trend={{ dir: "up", pct: "+3%" }} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Threat Trends (6 Months)</h3>
            <span className="text-xs text-gray-400">By severity</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#F3F4F6"} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} />
              <YAxis tick={{ fontSize: 11, fill: dark ? "#9CA3AF" : "#6B7280" }} />
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="critical" name="Critical" fill="#EF4444" radius={[3, 3, 0, 0]} />
              <Bar dataKey="high" name="High" fill="#F97316" radius={[3, 3, 0, 0]} />
              <Bar dataKey="medium" name="Medium" fill="#F59E0B" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">App Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v: any, n: any) => [v.toLocaleString(), n]} contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{d.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Operationalization</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Onboarded Services", value: "20", sub: "57 to onboard", color: "blue" },
              { label: "Standards", value: "17", sub: "42% posture score", color: "purple" },
              { label: "Policies Applied", value: "21", sub: "4 integration · 8 threat", color: "green" },
              { label: "Active Alerts", value: String(alertCount), sub: "35 high priority", color: "red" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-0.5">{item.label}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Posture Score Trend</h3>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">42%</span>
            <span className="text-sm text-red-500 flex items-center gap-1 mb-1"><ArrowDownRight size={14} /> Below target (70%)</span>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#F3F4F6"} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: dark ? "#9CA3AF" : "#6B7280" }} />
              <YAxis domain={[30, 60]} tick={{ fontSize: 10, fill: dark ? "#9CA3AF" : "#6B7280" }} />
              <Tooltip contentStyle={{ background: dark ? "#1F2937" : "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ThreatsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Critical", "High", "Medium"];
  const filtered = filter === "All" ? threatData : threatData.filter((t) => t.severity === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Threats</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time threat detection across all connected systems</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Critical", value: 8, color: "red" },
          { label: "High", value: 14, color: "orange" },
          { label: "Medium", value: 13, color: "yellow" },
          { label: "Resolved", value: 2, color: "green" },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm text-center">
            <p className={`text-2xl font-bold ${s.color === "red" ? "text-red-600" : s.color === "orange" ? "text-orange-600" : s.color === "yellow" ? "text-yellow-600" : "text-green-600"}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Filter:</span>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {["Threat Name", "Severity", "Source", "Affected", "Status", "Time", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{t.name}</td>
                  <td className="px-4 py-3"><SeverityBadge level={t.severity} /></td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t.source}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{t.affected}</td>
                  <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{t.time}</td>
                  <td className="px-4 py-3">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><MoreHorizontal size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PosturePage({ dark }: { dark: boolean }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Posture</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Compliance frameworks and security score tracking</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm flex flex-col items-center justify-center">
          <div className="relative w-36 h-36">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="50" fill="none" stroke={dark ? "#374151" : "#F3F4F6"} strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke="#3B82F6" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 50 * 0.42} ${2 * Math.PI * 50}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">42%</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Posture</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mt-4">Overall Security Score</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">Target: 70% · Gap: 28 points</p>
          <div className="w-full mt-5 space-y-2">
            {[{ label: "Identity", pct: 65 }, { label: "Data", pct: 38 }, { label: "Endpoints", pct: 22 }].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Compliance Frameworks</h3>
          <div className="space-y-4">
            {complianceData.map((c) => (
              <div key={c.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{c.score}%</span>
                    {c.score === 0 && <span className="text-xs text-red-500 font-medium">Not started</span>}
                    {c.score > 0 && c.score < 50 && <span className="text-xs text-yellow-500 font-medium">At risk</span>}
                    {c.score >= 50 && <span className="text-xs text-green-500 font-medium">On track</span>}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${c.score}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800/40">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">SOX & COBIT compliance not started</p>
                <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-0.5">These frameworks are required for enterprise audit readiness. Configure policies to begin tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Remediation Actions</h3>
        <div className="space-y-3">
          {[
            { action: "Enable MFA for all service accounts", impact: "High", effort: "Low", points: "+8%" },
            { action: "Remove excessive OAuth scopes from 14 apps", impact: "High", effort: "Medium", points: "+6%" },
            { action: "Federate 15 shadow IT apps to Okta", impact: "Medium", effort: "High", points: "+4%" },
            { action: "Archive 1,000 inactive app tokens", impact: "Medium", effort: "Low", points: "+3%" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-bold">{i + 1}</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">{item.action}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <SeverityBadge level={item.impact} />
                <span className="text-xs font-bold text-green-600 dark:text-green-400">{item.points}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationsPage() {
  const [search, setSearch] = useState("");
  const filtered = integrationApps.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">5,700+ connected applications across your organization</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          + Add Integration
        </button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search apps..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((app) => (
          <div key={app.name} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: app.color }}>{app.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{app.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{app.category}</p>
                </div>
              </div>
              <StatusBadge status={app.status} />
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3">
              <span>{app.users.toLocaleString()} users</span>
              <SeverityBadge level={app.risk} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time audit trail of all security events</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm divide-y divide-gray-50 dark:divide-gray-700/50">
        {activityTimeline.map((ev, i) => (
          <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <div className={`mt-0.5 p-1.5 rounded-full shrink-0 ${ev.type === "alert" ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400" : ev.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400" : "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"}`}>
              {ev.type === "alert" ? <AlertTriangle size={12} /> : ev.type === "warning" ? <AlertCircle size={12} /> : <Activity size={12} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{ev.event}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{ev.user}</p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">20 onboarded services · 57 awaiting onboarding</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40">
              {["Service", "Type", "Status", "Health", "Apps", "Last Sync"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {servicesData.map((s) => (
              <tr key={s.name} className="border-b border-gray-50 dark:border-gray-700/40 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{s.name}</td>
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{s.type}</td>
                <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                <td className="px-5 py-4"><StatusBadge status={s.health} /></td>
                <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{s.apps}</td>
                <td className="px-5 py-4 text-gray-400 text-xs">{s.lastSync}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GenericPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-12 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
          <Database size={24} className="text-blue-500" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 font-medium">No data to display yet</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Connect your systems to start seeing data here.</p>
        <button className="mt-5 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

// ─── Main Demo Page ─────────────────────────────────────────────────────────

export default function DemoPage() {
  const [page, setPage] = useState<PageKey>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setAlertCount((n) => Math.min(n + (Math.random() > 0.7 ? 1 : 0), 9));
    }, 5000);
    return () => clearInterval(t);
  }, []);

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
      case "home": return <HomePage dark={dark} />;
      case "threats": return <ThreatsPage />;
      case "posture": return <PosturePage dark={dark} />;
      case "integrations": return <IntegrationsPage />;
      case "activity": return <ActivityPage />;
      case "services": return <ServicesPage />;
      case "connections": return <GenericPage title="Connections" description="Manage all your connected identity providers and systems." />;
      case "global-search": return <GenericPage title="Global Search" description="Search across all users, apps, and events in your environment." />;
      case "extend": return <GenericPage title="Extend" description="Extend platform capabilities with custom integrations and APIs." />;
      case "dashboards": return <GenericPage title="Dashboards" description="Custom executive and operational dashboards." />;
      case "objects": return <GenericPage title="Objects" description="Browse all managed objects across connected services." />;
      case "browser-extension": return <GenericPage title="Browser Extension" description="Manage browser extension deployments and policy enforcement." />;
      case "action-policies": return <GenericPage title="Action Policies" description="Configure automated response policies for threats and events." />;
      case "reporting": return <GenericPage title="Reporting" description="Schedule and export compliance and security reports." />;
      case "downloads": return <GenericPage title="Downloads" description="Download agents, exportable reports, and configuration files." />;
      case "audit-log": return <GenericPage title="Audit Log" description="Full audit trail of all platform and user actions." />;
      default: return <HomePage dark={dark} />;
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 font-sans">

        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-56" : "w-14"} flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-200 overflow-hidden`}>
          <div className="flex items-center justify-between h-14 px-3 border-b border-gray-100 dark:border-gray-800">
            {sidebarOpen && (
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Shield size={14} className="text-white" />
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-sm truncate">Coreser</span>
              </div>
            )}
            <button onClick={() => setSidebarOpen((v) => !v)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors ml-auto">
              {sidebarOpen ? <ChevronLeft size={15} /> : <Menu size={15} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-2 px-1.5 space-y-0.5">
            {navItems.map(({ key, label, icon: Icon, badge }) => (
              <button key={key} onClick={() => setPage(key)}
                title={!sidebarOpen ? label : undefined}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors relative group ${page === key ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}`}>
                <Icon size={16} className="shrink-0" />
                {sidebarOpen && <span className="truncate">{label}</span>}
                {badge && sidebarOpen && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none font-semibold">{badge}</span>
                )}
                {badge && !sidebarOpen && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {sidebarOpen && (
            <div className="p-3 border-t border-gray-100 dark:border-gray-800">
              <Link href="/">
                <a className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <ExternalLink size={12} /> Exit Demo
                </a>
              </Link>
            </div>
          )}
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Top header */}
          <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 px-5">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full pl-8 pr-4 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setDark((v) => !v)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button onClick={() => setNotifOpen((v) => !v)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                  <Bell size={16} />
                  {alertCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[14px] h-[14px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none animate-pulse">
                      {alertCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-10 w-72 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
                      <button onClick={() => { setAlertCount(0); setNotifOpen(false); }} className="text-xs text-blue-600 hover:underline">Mark all read</button>
                    </div>
                    {[
                      { msg: "Critical threat detected in GitHub", time: "2m ago", type: "alert" },
                      { msg: "New shadow IT app discovered", time: "18m ago", type: "warning" },
                      { msg: "Posture score updated to 42%", time: "1h ago", type: "info" },
                    ].map((n, i) => (
                      <div key={i} className="px-4 py-3 border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer flex gap-3">
                        <div className={`mt-0.5 p-1 rounded-full shrink-0 ${n.type === "alert" ? "bg-red-100 dark:bg-red-900/40 text-red-600" : n.type === "warning" ? "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600" : "bg-blue-100 dark:bg-blue-900/40 text-blue-600"}`}>
                          {n.type === "alert" ? <AlertTriangle size={10} /> : n.type === "warning" ? <AlertCircle size={10} /> : <Activity size={10} />}
                        </div>
                        <div>
                          <p className="text-xs text-gray-800 dark:text-gray-200">{n.msg}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
                  {sidebarOpen && <ChevronDown size={12} className="text-gray-400" />}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">Jane Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Security Admin</p>
                    </div>
                    {[{ icon: User, label: "Profile" }, { icon: Settings, label: "Settings" }].map(({ icon: Icon, label }) => (
                      <button key={label} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <Icon size={14} className="text-gray-400" /> {label}
                      </button>
                    ))}
                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <Link href="/">
                        <a className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <LogOut size={14} /> Exit Demo
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}
