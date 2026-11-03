/**
 * AI Product Capabilities — a capability framework, not a resume skills grid.
 *
 * ACCURACY NOTE: these are capability areas and relevant terminology. They do
 * NOT assert that every technique has been used in production. Specific
 * implementation claims live only in `ai-projects.ts`, backed by actual project
 * materials (see the implementation report).
 */

export type DiagramKind = 'strategy' | 'agentic' | 'experience' | 'engineering';

export interface Capability {
  number: string;
  title: string;
  description: string;
  terms: string[];
  diagram: DiagramKind;
}

export const capabilities: Capability[] = [
  {
    number: '01',
    title: 'AI Product Strategy',
    description:
      'Identifying valuable AI opportunities and translating complex business problems into meaningful product experiences.',
    terms: [
      'AI opportunity discovery',
      'AI product strategy',
      'Use-case prioritization',
      'AI product requirements',
      'Human-centered AI',
      'Product experimentation',
    ],
    diagram: 'strategy',
  },
  {
    number: '02',
    title: 'Agentic Systems',
    description:
      'Designing intelligent workflows where AI agents can reason, access tools, coordinate tasks, and support users in achieving outcomes.',
    terms: [
      'AI agents',
      'Agentic workflows',
      'Tool calling',
      'Model orchestration',
      'Multi-step workflows',
      'Context management',
      'Memory',
      'Human-in-the-loop systems',
    ],
    diagram: 'agentic',
  },
  {
    number: '03',
    title: 'Human–AI Experience',
    description:
      'Creating interfaces that make intelligent systems understandable, controllable, and useful.',
    terms: [
      'Conversational UX',
      'Human–AI interaction',
      'Adaptive interfaces',
      'Context-aware experiences',
      'Trust and transparency',
      'AI feedback loops',
      'Explainability',
      'Error recovery',
    ],
    diagram: 'experience',
  },
  {
    number: '04',
    title: 'AI Engineering',
    description:
      'Moving beyond design concepts by building functional prototypes and integrating models, APIs, and frontend experiences.',
    terms: [
      'Large Language Models (LLMs)',
      'Foundation models',
      'Multiple model providers',
      'API integration',
      'Structured outputs',
      'Prompt engineering',
      'Retrieval-Augmented Generation (RAG)',
      'Frontend implementation',
      'AI prototyping',
      'Evaluation and testing',
    ],
    diagram: 'engineering',
  },
];
