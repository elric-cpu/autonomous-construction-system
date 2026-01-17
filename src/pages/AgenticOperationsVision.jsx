import React from 'react';
import { Link } from 'react-router-dom';
import {
  Blocks,
  ClipboardCheck,
  Cpu,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  LayoutDashboard,
  LineChart,
  Lock,
  MessageSquare,
  NotebookPen,
  Repeat,
  Server,
  ShieldCheck,
  Users,
  Workflow
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const guidingPrinciples = [
  {
    title: 'Deterministic Over “Smart”',
    description:
      'Every action is predictable, verifiable, replayable, and auditable. LLMs are tools, not authorities.',
    icon: ShieldCheck
  },
  {
    title: 'State Machines, Not Scripts',
    description:
      'Workflows are explicit, persistent, and recoverable with branching, retries, escalation, and terminal states.',
    icon: Workflow
  },
  {
    title: 'Every Action Is Logged',
    description:
      'Each step writes an event to job_events with inputs, outputs, timestamps, and actor identity.',
    icon: ClipboardCheck
  },
  {
    title: 'Local-First, Cloud-Optional',
    description:
      'Runs on local infrastructure with Ollama-first agents. Cloud models are optional orchestrators.',
    icon: HardDrive
  }
];

const systemStaff = [
  {
    title: 'Management & Coordination',
    roles: [
      'Project Manager',
      'Assistant Project Manager',
      'Construction Manager',
      'Construction Coordinator',
      'Pre-Construction Coordinator',
      'Project Coordinator',
      'VDC Coordinator'
    ]
  },
  {
    title: 'Design & Engineering',
    roles: [
      'VDC Manager',
      'VDC Engineer / Senior VDC Engineer',
      'Virtual Construction Technician',
      'Civil / Construction Engineer',
      'Architect',
      'Draftsman',
      'Healthcare Construction Plan Reviewer (Remote)'
    ]
  },
  {
    title: 'Administration & Support',
    roles: [
      'Office Manager',
      'Construction Administrator',
      'Project Assistant',
      'Permit Coordinator',
      'Construction Draw Coordinator',
      'Purchasing Agent/Coordinator',
      'Scheduler',
      'Estimator',
      'Accountant/Auditor',
      'Administrative Assistant'
    ]
  },
  {
    title: 'Specialized Roles',
    roles: ['Safety Manager/Director', 'MIS Manager', 'Marketing Manager']
  }
];

const architectureLayers = [
  {
    title: 'Supabase System of Record',
    description:
      'Postgres holds durable business truth, Auth handles identity and roles, Realtime powers UI updates, Storage retains documents, and pgvector supports retrieval.',
    icon: Database
  },
  {
    title: 'Redis Operational Acceleration',
    description:
      'Queues, rate limits, locks, ephemeral coordination state, and pub-sub—but never the source of truth.',
    icon: Server
  },
  {
    title: 'Agentic Workflow Orchestration',
    description:
      'LangGraph-style state machine execution with retries, escalation, and restart safety.',
    icon: GitBranch
  },
  {
    title: 'Local LLM Workforce',
    description:
      'Ollama-powered agents execute deterministic tasks while cloud models remain optional.',
    icon: Cpu
  }
];

const workflowSteps = [
  'Website lead intake (webhook)',
  'Lead qualification',
  'Scope drafting',
  'Scope review',
  'Baseline estimating from historical data',
  'Subcontractor selection and outreach',
  'Subcontractor estimate intake',
  'Proposal generation (customer-facing)',
  'E-sign webhook',
  'Dispatch notification',
  'Job costing and metrics',
  'Final invoicing and payment status'
];

const operationalGuarantees = [
  'Idempotent webhooks and restart-safe workflows',
  'Durable business objects stored only in Postgres',
  'No paid external service dependencies',
  'Secrets sourced solely from .env',
  'docker compose up -d --build succeeds with passing health checks',
  'Meaningful, runnable tests and visible failure recovery'
];

const nonGoals = [
  'Chatbot-style experiences',
  'SaaS platform ambitions',
  'No-code automation playgrounds',
  'Cloud-dependent AI services',
  'Experimental LLM demos'
];

const AgenticOperationsVision = () => {
  return (
    <>
      <SEO
        title="Agentic GC Operations Vision | Benson Home Solutions"
        description="Deterministic, auditable, agent-driven construction operations platform: local-first workflows, state machines, and Supabase-backed business truth."
        type="website"
      />

      <Breadcrumbs />

      <section className="bg-contractor-black text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89"
            alt="Blueprints and laptop for construction operations"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-maroon/80 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Blocks className="w-4 h-4" />
              Vision — Agentic GC Operations System
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              A deterministic, auditable, agent-driven construction office.
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Transform a residential / restoration general contracting business into a software-defined operation that replaces manual office labor with verifiable, replayable workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-maroon hover:bg-red-700 text-white font-semibold px-6 py-6">
                <Link to="/request-job">Start a Job Request</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-contractor-black font-semibold px-6 py-6"
              >
                <a href="#mvp-workflow">View MVP Workflow</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Purpose</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                Build a local-first, autonomous digital construction office that runs the entire operational lifecycle:
                lead → qualification → estimating → subcontractor coordination → job tracking → invoicing → metrics.
              </p>
              <p>
                Humans handle exceptions, high-risk decisions, and approvals. Agents execute structured decisions, data movement, and documentation.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-maroon text-white">
            <CardHeader>
              <CardTitle className="text-2xl">One-Sentence Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-base">
              Build a deterministic, auditable, agentic construction operations platform that replaces manual office work with a locally run, state-machine-driven digital staff.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <LayoutDashboard className="w-7 h-7 text-maroon" />
            <h2 className="text-3xl font-bold text-contractor-black">Design Philosophy</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {guidingPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <Card key={principle.title} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="bg-maroon/10 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-maroon" />
                      </div>
                      <CardTitle className="text-xl">{principle.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-700">{principle.description}</CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-8">
          <Database className="w-7 h-7 text-maroon" />
          <h2 className="text-3xl font-bold text-contractor-black">System Architecture</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {architectureLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <Card key={layer.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-maroon/10 p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-maroon" />
                    </div>
                    <CardTitle className="text-xl">{layer.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-700">{layer.description}</CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Lock className="w-5 h-5 text-maroon" />
                Source-of-Truth Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Durable business objects live in Postgres. Redis accelerates, but never owns, business truth.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Repeat className="w-5 h-5 text-maroon" />
                Degradation Rule
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              If Redis is down, workflows continue synchronously with clear health signals and actionable errors.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Globe className="w-5 h-5 text-maroon" />
                Local-First Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Runs on Ubuntu + Docker, favors Ollama-based local LLMs, and treats cloud models as optional.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-7 h-7 text-maroon" />
            <h2 className="text-3xl font-bold text-contractor-black">Agentic Digital Staff</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {systemStaff.map((group) => (
              <Card key={group.title} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    {group.roles.map((role) => (
                      <li key={role} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-maroon" />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="mvp-workflow" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 scroll-mt-24">
        <div className="flex items-center gap-3 mb-8">
          <NotebookPen className="w-7 h-7 text-maroon" />
          <h2 className="text-3xl font-bold text-contractor-black">MVP Workflow Definition</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Autonomous Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                {workflowSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Agent Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <MessageSquare className="w-5 h-5 text-maroon mt-0.5" />
                  Client communication via SMS/email, billing, and invoice delivery.
                </li>
                <li className="flex gap-2">
                  <LineChart className="w-5 h-5 text-maroon mt-0.5" />
                  Build scope and estimates from historical jobs, receipts, and reference guides.
                </li>
                <li className="flex gap-2">
                  <Server className="w-5 h-5 text-maroon mt-0.5" />
                  Add incoming bills from email to the dashboard for structured processing.
                </li>
                <li className="flex gap-2">
                  <Workflow className="w-5 h-5 text-maroon mt-0.5" />
                  Manage state transitions, retries, and human escalation paths.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-7 h-7 text-maroon" />
            <h2 className="text-3xl font-bold text-contractor-black">Operational Guarantees</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Guarantees</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {operationalGuarantees.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-maroon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Non-Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {nonGoals.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-7 h-7 text-maroon" />
          <h2 className="text-3xl font-bold text-contractor-black">End State Outcomes</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Staff Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              KPI-driven staff dashboard with active workflow visibility, document management, and job editing.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Subcontractor Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Active jobs, scheduling, job value, document submission, profit history, mapping, and on-the-way messaging.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Simulation & QA</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              Workflow simulators for client and subcontractor journeys, ensuring predictable, auditable outcomes.
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default AgenticOperationsVision;
