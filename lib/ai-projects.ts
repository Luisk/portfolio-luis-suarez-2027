/**
 * AI Systems in Practice.
 *
 * ACCURACY IS CRITICAL. Status and technical claims are derived only from
 * actual project materials. Where no materials were found, status is set to
 * "Exploration" and descriptions stay neutral. No model providers, versions,
 * integrations, metrics, or production claims are invented.
 *
 * Evidence used:
 *  - "Autonomous UX/UI Design Agent" maps to the local `Design Agent` project
 *    (sibling folder `../Design Agent`, package `design-agent@0.1.0`). Its
 *    README states which parts are real vs. stubbed; claims below follow it.
 *    Real: staged orchestration state machine, approval/feedback loop,
 *    validation, evidence provenance, permissions, Express API, web UI, Zod
 *    structured outputs, Mermaid review diagrams. Stubbed behind interfaces:
 *    the LLM calls and every tool adapter (Figma, prototype, code-gen, design
 *    library, testing). Provider: a provider-agnostic `LLMProvider` interface
 *    with ONE concrete implementation (OpenAI) plus a deterministic stub mode.
 *  - "Mila AI Business Advisor" and "AI Restaurant Growth Copilot": no code or
 *    documents were found in the workspace or sibling folders -> "Exploration".
 */

export type ProjectStatus =
  | 'Concept'
  | 'Functional Prototype'
  | 'In Development'
  | 'Implemented'
  | 'Exploration';

export interface AIProject {
  number: string;
  name: string;
  status: ProjectStatus;
  /** One-sentence purpose. */
  purpose: string;
  /** The product question driving the exploration. */
  question: string;
  /** Main AI capabilities / architecture concepts (neutral, non-asserting). */
  capabilities: string[];
  /**
   * Provider wording. Model-agnostic by default; only names a provider when it
   * is actually present in the project code.
   */
  providerNote: string;
  diagram: 'mila' | 'design-agent' | 'copilot';
}

export const aiProjects: AIProject[] = [
  {
    number: '01',
    name: 'Mila AI Business Advisor',
    status: 'Exploration',
    purpose:
      'An AI business advisor that reads a company’s context, goals, and capacity to surface its next best opportunity.',
    question:
      'How can AI help a business identify its next best opportunity based on its actual context and ability to execute?',
    capabilities: [
      'Company context ingestion',
      'Structured business interviews',
      'Business model analysis',
      'Acquire · Convert · Deliver · Retain · Expand framework',
      'AI-assisted opportunity identification',
      'Recommendation generation',
    ],
    providerNote: 'Model-agnostic · multi-provider by design',
    diagram: 'mila',
  },
  {
    number: '02',
    name: 'Autonomous UX/UI Design Agent',
    status: 'Functional Prototype',
    purpose:
      'A staged, human-in-the-loop agent that moves a brief through problem analysis to delivery, parking at an approval gate between each stage.',
    question:
      'How can AI agents support the transition from product requirements to structured, implementable design solutions?',
    capabilities: [
      'Staged agent orchestration',
      'Human-in-the-loop approval gates',
      'Structured outputs (Zod schemas)',
      'Mermaid review diagrams',
      'Tool-native adapters (Figma, code-gen — interfaced, stubbed)',
      'Evidence provenance & governance',
    ],
    // Verified from the codebase: provider-agnostic LLMProvider interface with a
    // single OpenAI implementation + a deterministic stub mode. Stated precisely.
    providerNote: 'Provider-agnostic interface · OpenAI wired · stub mode',
    diagram: 'design-agent',
  },
  {
    number: '03',
    name: 'AI Restaurant Growth Copilot',
    status: 'Exploration',
    purpose:
      'A conversational growth assistant exploring how to help restaurant owners spot opportunities and coordinate marketing actions.',
    question:
      'How can an AI assistant move beyond recommendations and help business owners execute meaningful growth actions?',
    capabilities: [
      'Conversational AI',
      'Business context',
      'Persistent memory',
      'External integrations',
      'Marketing workflow orchestration',
      'Human approval & oversight',
    ],
    providerNote: 'Model-agnostic · multi-provider by design',
    diagram: 'copilot',
  },
];
