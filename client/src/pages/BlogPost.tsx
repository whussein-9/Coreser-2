import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const posts: Record<number, {
  category: string;
  title: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  body: React.ReactNode;
}> = {
  1: {
    category: "Threat Intelligence",
    title: "The 2025 Mid-Market Threat Report: What Changed and What Didn't",
    date: "Apr 2, 2026",
    readTime: "8 min read",
    author: "Coreser Research Team",
    role: "Threat Intelligence",
    body: (
      <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
        <p>
          Ransomware remained the dominant threat vector in 2025, responsible for 68% of all mid-market security incidents we tracked across our customer base. But what changed — and what changed dramatically — was how attackers are getting in.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The Entry Points Have Shifted</h2>
        <p>
          In 2023, phishing emails were the leading entry vector for mid-market attacks. By 2025, that distinction belongs to third-party software supply chain compromises. Attackers have recognized that it's far easier to compromise a small SaaS vendor that serves hundreds of mid-market companies than to breach each company individually.
        </p>
        <p>
          This shift requires a fundamentally different defensive posture. Traditional perimeter security — firewalls, endpoint protection alone — is insufficient. Organizations need continuous vendor risk monitoring and tighter controls over what third-party code can execute in their environment.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">What Stayed the Same</h2>
        <p>
          Despite all the sophistication, the most effective attacks still relied on the oldest techniques: credential theft and unpatched software. In 71% of successful breaches we analyzed, the initial compromise involved either a stolen password or a known vulnerability that had been unpatched for more than 30 days.
        </p>
        <p>
          The lesson isn't glamorous, but it's real: MFA enforcement and a disciplined patch cadence would have stopped most of these attacks before they started.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">What Your Team Should Do Now</h2>
        <p>
          First, audit your third-party vendors. Identify which vendors have privileged access to your systems, and assess their security posture. Second, enforce MFA without exceptions — including for service accounts and legacy systems. Third, implement continuous vulnerability scanning so that critical patches are deployed within 72 hours of release.
        </p>
        <p>
          The threat landscape is evolving quickly. But the fundamentals of good security hygiene remain the most reliable shield.
        </p>
      </div>
    ),
  },
  2: {
    category: "Compliance",
    title: "SOC 2 Type II in 90 Days: A Practical Guide for SaaS Startups",
    date: "Mar 19, 2026",
    readTime: "12 min read",
    author: "Coreser Compliance Team",
    role: "Compliance & Governance",
    body: (
      <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
        <p>
          Most SaaS founders hear "SOC 2" and assume they're looking at a year-long engagement, a dedicated hire, and a six-figure consulting bill. The reality in 2026 is very different — with the right tooling and a disciplined approach, Type II certification in 90 days is achievable.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">Why It Seems Harder Than It Is</h2>
        <p>
          SOC 2 has a reputation for complexity because most organizations approach it as a documentation exercise. They spend months writing policies, then scramble to gather evidence that those policies were actually followed. This is backwards. The most efficient path is to instrument your environment first — so evidence collection is automatic — and write policies to match what you're already doing.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The 90-Day Framework</h2>
        <p>
          <strong>Days 1–14: Scope and gap assessment.</strong> Define which systems and services are in scope. Run an automated gap assessment against SOC 2 Trust Service Criteria to understand where you currently stand. Most startups are closer to compliance than they think — especially on Security and Availability criteria.
        </p>
        <p>
          <strong>Days 15–45: Technical controls.</strong> Implement or verify the controls that generate the most audit evidence: access logs, change management records, vulnerability scan results, and backup verification reports. Automation is critical here — manual evidence collection will crush your team.
        </p>
        <p>
          <strong>Days 46–75: Policy and procedure documentation.</strong> Now write your policies — but write them to describe what you've already implemented, not an aspirational future state. Auditors look for evidence that policies are followed; the simplest way to ensure that is to document existing practice.
        </p>
        <p>
          <strong>Days 76–90: Audit preparation and fieldwork.</strong> Share your evidence package with your auditor. Most fieldwork takes 2–3 weeks. With well-organized, automated evidence, it goes faster.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The ROI Is Real</h2>
        <p>
          Beyond risk reduction, SOC 2 unlocks revenue. Enterprise procurement teams require it, and removing that friction from the sales cycle has measurable impact. One of our customers attributed three closed enterprise deals — worth $2.4M in ARR — directly to having SOC 2 in place.
        </p>
      </div>
    ),
  },
  3: {
    category: "Best Practices",
    title: "Zero Trust Architecture for Organizations Without a CISO",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    author: "Coreser Security Team",
    role: "Security Architecture",
    body: (
      <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
        <p>
          Zero trust has become one of the most overloaded terms in cybersecurity. Vendors use it to describe everything from next-gen firewalls to identity platforms. Stripped of the marketing, zero trust is a simple principle: never trust, always verify. Every access request — regardless of where it originates — should be authenticated, authorized, and continuously validated.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">Start With Identity, Not Network</h2>
        <p>
          Most mid-market organizations without a dedicated security team make the mistake of beginning their zero trust journey with network segmentation — a complex, expensive project. Identity is a better starting point. Every user, device, and service account in your environment is an identity, and controlling what each identity can access is the fastest path to meaningful risk reduction.
        </p>
        <p>
          Implement MFA universally. Enforce the principle of least privilege — users should only have access to the systems they need for their role. Review and revoke access quarterly. These three steps alone put you ahead of most mid-market organizations.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">Device Trust as a Second Layer</h2>
        <p>
          Once identity is under control, focus on device posture. A valid username and password from an unmanaged, unpatched device should not grant the same access as the same credentials from a corporate-managed, up-to-date laptop. Modern MDM and endpoint management tools make it practical to enforce device health checks as a condition of access.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The Incremental Path</h2>
        <p>
          Zero trust is not a destination — it's a direction. You don't need to achieve it all at once. Pick the highest-risk access points in your environment, apply stricter controls there, and expand gradually. Organizations that try to do everything at once usually end up doing nothing well.
        </p>
      </div>
    ),
  },
  4: {
    category: "Case Study",
    title: "How a 200-Person Healthcare Group Passed HIPAA Audit on First Attempt",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    author: "Coreser Customer Stories",
    role: "Healthcare Security",
    body: (
      <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
        <p>
          Prairie Health Group operates six clinics across the Midwest, managing protected health information for over 80,000 patients. Like many regional healthcare organizations, they faced a HIPAA compliance challenge that had been deferred for years: a patchwork of systems, inconsistent access controls, and almost no automated evidence collection.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The Problem</h2>
        <p>
          When Prairie Health's CTO joined in early 2025, her first task was to assess the organization's compliance posture ahead of a scheduled OIG audit. What she found was a familiar picture: policies existed on paper but weren't consistently enforced, access logs were scattered across systems, and producing an audit-ready evidence package would have required weeks of manual work from staff who were already stretched thin.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The Approach</h2>
        <p>
          Prairie Health deployed Coreser's Compliance Manager module in week one. Over the following six weeks, the platform automatically collected access logs, system configuration baselines, user access reviews, and training completion records — mapping each piece of evidence to specific HIPAA requirements.
        </p>
        <p>
          "The evidence collection was completely automated," the CTO told us. "We just clicked 'generate report' and submitted it to our auditor. What would have taken three people six weeks took us one afternoon."
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The Outcome</h2>
        <p>
          Prairie Health passed their HIPAA audit on the first attempt — eleven weeks after initial deployment. The auditor noted above-average documentation quality and praised the completeness of their access review records. Beyond the audit, Prairie Health now has continuous compliance monitoring, so future audits will require even less preparation.
        </p>
      </div>
    ),
  },
  5: {
    category: "CISA Framework",
    title: "Breaking Down the CISA Framework for Non-Security Executives",
    date: "Feb 10, 2026",
    readTime: "10 min read",
    author: "Coreser Advisory Team",
    role: "Executive Education",
    body: (
      <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
        <p>
          When the Cybersecurity and Infrastructure Security Agency published the CISA Cybersecurity Framework, they were trying to solve a communication problem as much as a technical one. Boards and executives needed a structured way to talk about security investment — not in terms of specific technologies, but in terms of organizational capability.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The Five Functions</h2>
        <p>
          The framework organizes security into five functions. Understanding each one gives you a vocabulary for having meaningful conversations about risk.
        </p>
        <p>
          <strong>Identify</strong> — Do you know what you're protecting? This means having a complete inventory of your systems, data, and the risks associated with each. You can't protect what you don't know exists.
        </p>
        <p>
          <strong>Protect</strong> — What controls do you have in place to prevent unauthorized access or damage? This includes access management, training, and data security practices.
        </p>
        <p>
          <strong>Detect</strong> — Can you identify when something goes wrong? Detection capabilities — monitoring, anomaly detection, and logging — determine how quickly you discover incidents.
        </p>
        <p>
          <strong>Respond</strong> — When an incident occurs, how do you react? This includes your incident response plan, communication protocols, and containment procedures.
        </p>
        <p>
          <strong>Recover</strong> — After an incident, how do you restore operations? Recovery planning ensures business continuity even when defenses fail.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">Why It Matters for Your Board</h2>
        <p>
          The five functions give boards a framework for asking better questions. Instead of asking "are we secure?" — an unanswerable question — boards can ask "what is our detection capability?" or "how long would recovery take if our primary data center went offline?" These are questions security teams can answer with specifics.
        </p>
      </div>
    ),
  },
  6: {
    category: "Threat Intelligence",
    title: "Supply Chain Attacks: How to Audit Your Vendor Security in 30 Minutes",
    date: "Jan 28, 2026",
    readTime: "7 min read",
    author: "Coreser Research Team",
    role: "Threat Intelligence",
    body: (
      <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
        <p>
          Your vendors are your biggest blind spot. When attackers compromise a software vendor used by hundreds of businesses, they gain leverage over every one of those businesses simultaneously. The 2025 spike in supply chain attacks reflects a simple calculus: it's more efficient to breach one vendor than hundreds of individual targets.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">The 30-Minute Vendor Audit</h2>
        <p>
          You don't need a formal vendor risk program to start reducing your exposure. For each of your critical vendors — the ones with access to your systems, data, or customer information — work through these questions.
        </p>
        <p>
          <strong>Does the vendor have SOC 2 Type II or ISO 27001 certification?</strong> These certifications indicate that an independent auditor has verified their security controls. Absence isn't disqualifying, but it's a flag that warrants a deeper conversation.
        </p>
        <p>
          <strong>What access does the vendor have to your systems?</strong> Map the permissions each vendor has. API keys, service accounts, and OAuth grants should be inventoried and reviewed quarterly. Revoke access you can no longer justify.
        </p>
        <p>
          <strong>What is the vendor's incident disclosure track record?</strong> Have they disclosed past security incidents promptly and transparently? Vendors with a history of delayed or opaque disclosures are higher risk partners.
        </p>
        <p>
          <strong>What happens if the vendor is compromised?</strong> For each critical vendor, think through the blast radius. If their service is breached or goes offline, what data is exposed and what operations are disrupted? Your answers drive your contingency planning.
        </p>
        <h2 className="text-2xl font-display font-semibold text-foreground mt-10 mb-4">Building This Into a Process</h2>
        <p>
          The 30-minute audit works for immediate triage, but the real protection comes from making vendor review a recurring process. Quarterly access reviews and annual security questionnaires — even simple ones — signal to your vendors that you take supply chain risk seriously. That signal alone tends to improve vendor behavior.
        </p>
      </div>
    ),
  },
};

export default function BlogPost() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id || "1", 10);
  const post = posts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-32 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Post not found</h1>
          <Link href="/resources">
            <Button variant="outline" className="rounded-full mt-4">Back to Resources</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-32">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <Link href="/resources">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10">
                <ArrowLeft size={14} />
                Back to Resources
              </button>
            </Link>

            <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mt-5 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-5 text-sm text-muted-foreground mb-12 pb-10 border-b border-border/50">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime}
              </span>
              <span className="text-foreground/60">{post.author}</span>
            </div>

            {post.body}

            <div className="mt-16 pt-10 border-t border-border/50">
              <p className="text-muted-foreground mb-5 text-sm">Ready to see Coreser in your environment?</p>
              <Link href="/#contact">
                <Button className="rounded-full px-8 py-5 bg-primary hover:bg-accent text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
