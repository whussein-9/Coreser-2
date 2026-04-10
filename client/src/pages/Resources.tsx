import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  BookOpen, FileText, Users, Award, ArrowRight,
  CheckCircle, XCircle, Clock, ChevronRight, BarChart3
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const blogPosts = [
  {
    id: 1,
    category: "Threat Intelligence",
    title: "The 2025 Mid-Market Threat Report: What Changed and What Didn't",
    excerpt: "Ransomware remained the dominant threat, but the entry points evolved significantly. Here's what your team needs to know going into 2026.",
    readTime: "8 min read",
    date: "Apr 2, 2026",
    featured: true,
  },
  {
    id: 2,
    category: "Compliance",
    title: "SOC 2 Type II in 90 Days: A Practical Guide for SaaS Startups",
    excerpt: "Most teams think SOC 2 takes 12+ months. With the right tooling and a disciplined approach, 90 days is achievable.",
    readTime: "12 min read",
    date: "Mar 19, 2026",
    featured: true,
  },
  {
    id: 3,
    category: "Best Practices",
    title: "Zero Trust Architecture for Organizations Without a CISO",
    excerpt: "Zero trust isn't just an enterprise concept. Growing teams can implement it incrementally, starting with identity.",
    readTime: "6 min read",
    date: "Mar 5, 2026",
    featured: false,
  },
  {
    id: 4,
    category: "Case Study",
    title: "How a 200-Person Healthcare Group Passed HIPAA Audit on First Attempt",
    excerpt: "Prairie Health achieved full HIPAA compliance in 11 weeks using Coreser's Compliance Manager module.",
    readTime: "5 min read",
    date: "Feb 22, 2026",
    featured: false,
  },
  {
    id: 5,
    category: "CISA Framework",
    title: "Breaking Down the CISA Framework for Non-Security Executives",
    excerpt: "Five functions. Dozens of subcategories. One framework. Here's what your board actually needs to understand.",
    readTime: "10 min read",
    date: "Feb 10, 2026",
    featured: false,
  },
  {
    id: 6,
    category: "Threat Intelligence",
    title: "Supply Chain Attacks: How to Audit Your Vendor Security in 30 Minutes",
    excerpt: "Your vendors are your biggest blind spot. A practical checklist for rapid third-party security reviews.",
    readTime: "7 min read",
    date: "Jan 28, 2026",
    featured: false,
  },
];

const caseStudies = [
  {
    company: "Prairie Health Group",
    industry: "Healthcare",
    employees: "200+",
    result: "Passed HIPAA audit on first attempt",
    metric: "11 weeks",
    metricLabel: "to full compliance",
    quote:
      "Coreser's Compliance Manager made evidence collection completely automated. We just clicked 'generate report' and submitted to our auditor.",
    author: "CTO, Prairie Health Group",
    blogId: 4,
  },
  {
    company: "Meridian Payments",
    industry: "Fintech",
    employees: "85",
    result: "Closed 3 enterprise deals that required SOC 2",
    metric: "$2.4M",
    metricLabel: "in new ARR attributed to security posture",
    quote:
      "Before Coreser, enterprise buyers were killing deals over our security questionnaire responses. Now it's a competitive strength.",
    author: "CEO, Meridian Payments",
    blogId: 2,
  },
  {
    company: "Vantage Manufacturing",
    industry: "Manufacturing",
    employees: "650",
    result: "Zero ransomware incidents in 18 months",
    metric: "18 months",
    metricLabel: "incident-free after deployment",
    quote:
      "We were hit by ransomware twice in three years. Since deploying Coreser's endpoint protection and network monitoring, we haven't had a single incident.",
    author: "IT Director, Vantage Manufacturing",
    blogId: 1,
  },
];

const quizQuestions = [
  {
    question: "Do you have a written cybersecurity policy reviewed in the last 12 months?",
    options: ["Yes, reviewed and updated", "Yes, but outdated", "No written policy"],
    scores: [3, 1, 0],
  },
  {
    question: "How do you handle multi-factor authentication (MFA)?",
    options: ["MFA enforced for all users and systems", "MFA optional or partial", "No MFA in place"],
    scores: [3, 1, 0],
  },
  {
    question: "When did you last perform a vulnerability scan of your network?",
    options: ["Within the last 30 days", "Within the last 6 months", "Never or more than 6 months ago"],
    scores: [3, 1, 0],
  },
  {
    question: "Do employees receive annual cybersecurity awareness training?",
    options: ["Yes, plus phishing simulations", "Basic annual training only", "No formal training"],
    scores: [3, 1, 0],
  },
  {
    question: "Do you have a documented incident response plan?",
    options: ["Yes, tested in the last year", "Documented but untested", "No plan"],
    scores: [3, 1, 0],
  },
];

function SecurityQuiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const selectAnswer = (score: number) => {
    const next = [...answers, score];
    setAnswers(next);
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const total = answers.reduce((a, b) => a + b, 0);
  const max = quizQuestions.length * 3;
  const pct = Math.round((total / max) * 100);

  const getGrade = () => {
    if (pct >= 80) return { label: "Strong", color: "text-green-600", desc: "Your security posture is solid, but there's always room to improve." };
    if (pct >= 50) return { label: "Moderate Risk", color: "text-yellow-600", desc: "You have some protections in place, but significant gaps exist." };
    return { label: "High Risk", color: "text-destructive", desc: "Immediate action is needed. Your organization is significantly exposed." };
  };

  if (done) {
    const grade = getGrade();
    return (
      <div className="bg-white rounded-3xl p-10 border border-border/50 shadow-sm text-center">
        <div className="w-32 h-32 mx-auto mb-6 relative">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <motion.circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke={pct >= 80 ? "#22C55E" : pct >= 50 ? "#EAB308" : "#EF4444"}
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={2 * Math.PI * 50 * (1 - pct / 100)}
              strokeLinecap="round"
              initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - pct / 100) }}
              transition={{ duration: 1.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-display font-bold text-foreground">{pct}%</span>
          </div>
        </div>
        <h3 className={`text-2xl font-display font-bold mb-2 ${grade.color}`}>{grade.label}</h3>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm">{grade.desc}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/trial">
            <Button className="rounded-full px-8 py-5 bg-primary hover:bg-accent text-white" data-testid="button-quiz-cta">
              Start Free Trial <ArrowRight size={15} className="ml-2" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-full px-8 py-5"
            onClick={() => { setAnswers([]); setCurrent(0); setDone(false); }}
            data-testid="button-quiz-retake"
          >
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const q = quizQuestions[current];
  return (
    <div className="bg-white rounded-3xl p-10 border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          Question {current + 1} of {quizQuestions.length}
        </span>
        <div className="flex gap-1.5">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-colors ${i <= current ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
      <h3 className="text-xl font-display font-bold text-foreground mb-8">{q.question}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => selectAnswer(q.scores[i])}
            className="w-full text-left rounded-2xl border border-border/50 p-4 hover:border-primary hover:bg-primary/5 transition-all duration-150 text-sm font-medium text-foreground flex items-center justify-between group"
            data-testid={`button-quiz-option-${i}`}
          >
            {opt}
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Resources() {
  const [activeTab, setActiveTab] = useState<"blog" | "quiz" | "cases" | "survey">("blog");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Learn. Assess. Improve.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto">
              Free tools, insights, and case studies to help your organization build a stronger security posture — no strings attached.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-[60px] z-40 bg-background/90 backdrop-blur-md border-b border-border/40">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {[
              { id: "blog", label: "Blog", icon: BookOpen },
              { id: "quiz", label: "Security Quiz", icon: BarChart3 },
              { id: "cases", label: "Case Studies", icon: Award },
              { id: "survey", label: "Employee Survey", icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`tab-resources-${id}`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16 pb-32">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

          {/* Blog */}
          {activeTab === "blog" && (
            <motion.div id="blog" initial="hidden" animate="show" variants={stagger}>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {blogPosts.filter(p => p.featured).map((post) => (
                  <motion.article
                    key={post.id}
                    variants={fadeUp}
                    className="bg-white border border-border/50 rounded-3xl overflow-hidden hover:shadow-md transition-shadow group"
                    data-testid={`card-blog-${post.id}`}
                  >
                    <div className="bg-gradient-to-br from-secondary/40 to-primary/8 h-40" />
                    <div className="p-7">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <Link href={`/blog/${post.id}`}>
                        <h3 className="text-xl font-display font-bold text-foreground mt-4 mb-3 group-hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                          <span>{post.date}</span>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <button className="flex items-center gap-1 text-xs text-primary font-medium hover:gap-2 transition-all">
                            Read <ArrowRight size={12} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {blogPosts.filter(p => !p.featured).map((post) => (
                  <motion.article
                    key={post.id}
                    variants={fadeUp}
                    className="bg-white border border-border/50 rounded-2xl p-6 hover:shadow-md transition-shadow group"
                    data-testid={`card-blog-${post.id}`}
                  >
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <Link href={`/blog/${post.id}`}>
                      <h3 className="text-base font-display font-bold text-foreground mt-4 mb-3 group-hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <button className="flex items-center gap-1 text-xs text-primary font-medium">
                          Read <ArrowRight size={11} />
                        </button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Quiz */}
          {activeTab === "quiz" && (
            <motion.div id="quiz" initial="hidden" animate="show" variants={stagger} className="max-w-2xl mx-auto">
              <motion.div variants={fadeUp} className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                  5-Minute Security Quiz
                </h2>
                <p className="text-muted-foreground text-sm">
                  Answer 5 questions to get an instant snapshot of your organization's security posture. No email required.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <SecurityQuiz />
              </motion.div>
            </motion.div>
          )}

          {/* Case Studies */}
          {activeTab === "cases" && (
            <motion.div id="cases" initial="hidden" animate="show" variants={stagger}>
              <div className="grid md:grid-cols-3 gap-6">
                {caseStudies.map((study) => (
                  <motion.div
                    key={study.company}
                    variants={fadeUp}
                    className="bg-white border border-border/50 rounded-3xl p-8 hover:shadow-md transition-shadow flex flex-col"
                    data-testid={`card-casestudy-${study.company.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Award size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{study.company}</p>
                        <p className="text-xs text-muted-foreground">{study.industry} · {study.employees} employees</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="text-4xl font-display font-bold text-primary">{study.metric}</div>
                      <div className="text-sm text-muted-foreground">{study.metricLabel}</div>
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-3">{study.result}</p>
                    <blockquote className="text-sm text-muted-foreground italic leading-relaxed border-l-2 border-primary/25 pl-4 mb-5 flex-1">
                      "{study.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">— {study.author}</p>
                      <Link href={`/blog/${study.blogId}`}>
                        <button className="flex items-center gap-1 text-xs text-primary font-medium hover:gap-2 transition-all">
                          Full story <ArrowRight size={11} />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/trial">
                  <Button className="rounded-full px-8 py-5 bg-primary hover:bg-accent text-white" data-testid="button-cases-cta">
                    Start Your Free Trial <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Employee Survey */}
          {activeTab === "survey" && (
            <motion.div id="survey" initial="hidden" animate="show" variants={stagger} className="max-w-2xl mx-auto">
              <motion.div variants={fadeUp} className="text-center mb-10">
                <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                  Employee Security Culture Survey
                </h2>
                <p className="text-muted-foreground text-sm">
                  Use this survey to measure security awareness across your team and identify your highest-risk employees.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white rounded-3xl p-10 border border-border/50 shadow-sm">
                <div className="space-y-4">
                  {[
                    { q: "Do you use the same password for multiple work accounts?", risk: "High Risk", icon: XCircle, color: "text-destructive" },
                    { q: "Have you completed security training in the last 12 months?", risk: "Good", icon: CheckCircle, color: "text-green-600" },
                    { q: "Do you know what to do if you receive a suspicious email?", risk: "Good", icon: CheckCircle, color: "text-green-600" },
                    { q: "Have you ever clicked a link in an unexpected email at work?", risk: "Medium Risk", icon: XCircle, color: "text-yellow-600" },
                    { q: "Is your laptop disk encrypted?", risk: "Good", icon: CheckCircle, color: "text-green-600" },
                  ].map(({ q, risk, icon: Icon, color }) => (
                    <div key={q} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-muted/25 border border-border/30">
                      <p className="text-sm text-foreground leading-relaxed">{q}</p>
                      <div className={`flex items-center gap-1.5 shrink-0 text-xs font-semibold ${color}`}>
                        <Icon size={13} />
                        {risk}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-secondary/30 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <FileText size={19} className="text-primary" />
                    <h4 className="font-semibold text-foreground text-sm">Get the Full 25-Question Survey</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">
                    Send the complete survey to your entire team and receive a department-by-department risk report.
                  </p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="your@company.com"
                      className="flex-1 rounded-xl border border-border/60 bg-white px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      data-testid="input-survey-email"
                    />
                    <Button className="rounded-xl px-5 bg-primary hover:bg-accent text-white text-sm" data-testid="button-survey-submit">
                      Send Survey
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
