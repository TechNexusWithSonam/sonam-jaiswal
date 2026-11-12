import type { EngineeringPractice, SkillCategory, TechCategory } from '@/types'

// Single source of truth for the Skills section (and the About section's toolkit).
// No ratings or percentages — `core: true` is the only expertise label.
// Notes are grounded in real work from experience.ts / projects.ts.
export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'frontend',
    summary: 'Responsive, component-driven interfaces, storefronts and admin dashboards.',
    techs: [
      { name: 'React.js', logo: 'react', core: true, note: 'Primary UI library behind QRBell, QRBell Store and admin dashboards.' },
      { name: 'JavaScript ES6+', logo: 'javascript', note: 'Modern language features, modules and async flows across the stack.' },
      { name: 'Redux Toolkit', logo: 'redux', note: 'Predictable global state for complex, data-heavy screens.' },
      { name: 'Tailwind CSS', logo: 'tailwind', note: 'Utility-first styling for consistent, responsive layouts.' },
      { name: 'Next.js', logo: 'nextjs', note: 'Server-rendered React applications, including this portfolio.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'backend',
    summary: 'Scalable server logic and REST APIs for production web products.',
    techs: [
      { name: 'Node.js', logo: 'nodejs', core: true, note: 'Runtime for APIs and real-time servers across recent products.' },
      { name: 'Express.js', logo: 'express', core: true, note: 'REST APIs with middleware for auth, validation and RBAC.' },
      { name: 'Fastify', logo: 'fastify', core: true, note: 'High-throughput APIs — powers the QRBell Store backend.' },
      { name: 'PHP', logo: 'php', note: 'Server-side foundation for enterprise and healthcare systems.' },
      { name: 'Laravel', logo: 'laravel', note: 'MVC framework behind the KGMU Hospital Management System.' },
      { name: 'CodeIgniter', logo: 'codeigniter', note: 'Lightweight PHP framework used on hospital system modules.' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & ORM',
    icon: 'database',
    summary: 'Relational and document data modelling, queries and caching.',
    techs: [
      { name: 'PostgreSQL', logo: 'postgresql', core: true, note: 'Primary relational store for QRBell and QRBell Store.' },
      { name: 'MySQL', logo: 'mysql', note: 'Relational data for the hospital system and PHP applications.' },
      { name: 'MongoDB', logo: 'mongodb', note: 'Document storage for flexible, fast-changing data.' },
      { name: 'Prisma', logo: 'prisma', note: 'Type-safe schema, migrations and queries on Node.js.' },
      { name: 'Redis', logo: 'redis', note: 'In-memory caching to keep high-traffic pages fast.' },
    ],
  },
  {
    id: 'realtime',
    title: 'Real-time & Integrations',
    icon: 'realtime',
    summary: 'Live communication and third-party services wired into products.',
    techs: [
      { name: 'Socket.IO', logo: 'socketio', note: 'Live messaging, presence and call signalling.' },
      { name: 'WebRTC', logo: 'webrtc', note: 'Peer-to-peer video and audio streaming in QRBell.' },
      { name: 'Agora', logo: 'agora', note: 'Stable calls on weak or restricted networks.' },
      { name: 'Firebase', logo: 'firebase', note: 'Push notifications delivered straight to phones.' },
      { name: 'Google Maps API', logo: 'googlemaps', note: 'Location services and map-based features.' },
      { name: 'Payment Gateways', logo: 'payments', note: 'Secure checkout and payment flows for e-commerce.' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: 'devops',
    summary: 'Shipping and running applications reliably in production.',
    techs: [
      { name: 'Git', logo: 'git', note: 'Version control and collaborative branching workflows.' },
      { name: 'Docker', logo: 'docker', note: 'Containerised services that run the same everywhere.' },
      { name: 'AWS EC2', logo: 'ec2', note: 'Cloud servers hosting application backends.' },
      { name: 'AWS S3', logo: 's3', note: 'Object storage for uploads and media files.' },
      { name: 'Nginx', logo: 'nginx', note: 'Reverse proxy and static delivery in front of Node apps.' },
      { name: 'CI/CD', logo: 'cicd', note: 'Automated build, test and deploy pipelines.' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing & Tools',
    icon: 'testing',
    summary: 'Confidence that critical flows keep working after every change.',
    techs: [
      { name: 'Vitest', logo: 'vitest', note: 'Fast unit tests for business logic and APIs.' },
      { name: 'Playwright', logo: 'playwright', note: 'End-to-end tests for critical flows like checkout.' },
      { name: 'Postman', logo: 'postman', note: 'Designing, testing and documenting REST APIs.' },
    ],
  },
]

export const engineeringPractices: EngineeringPractice[] = [
  { name: 'RESTful APIs', icon: 'api', note: 'Clean, resource-oriented endpoints — 100+ delivered at Samadhan Group.' },
  { name: 'JWT Authentication', icon: 'jwt', note: 'Stateless, token-based authentication for secure sessions.' },
  { name: 'RBAC', icon: 'rbac', note: 'Role-based permissions for admin panels and multi-role systems.' },
  { name: 'Workflow Automation', icon: 'workflow', note: 'Automating multi-step business and clinical processes.' },
  { name: 'Caching', icon: 'cache', note: 'Redis caching to cut latency and database load.' },
  { name: 'Performance Tuning', icon: 'performance', note: 'Optimising queries, payloads and rendering for speed.' },
]

/** Core expertise, in display order. */
export const coreStack = techCategories.flatMap((c) => c.techs).filter((t) => t.core)

/** Compact view used by the About section's toolkit. */
export const skillCategories: SkillCategory[] = techCategories.map((c) => ({
  category: c.title,
  skills: c.techs.map(({ name }) => ({ name })),
}))
