import type { Experience } from '@/types'

// Newest first. `slug` links a project to its /projects/[slug] page — only set it where one exists.
export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full Stack Developer',
    company: 'Aspirantive Technologies',
    period: 'Dec 2025 – Present',
    location: 'Remote',
    current: true,
    projectsLabel: 'Products',
    projects: [
      { name: 'QRBell', slug: 'qrbell' },
      { name: 'QRBell Store', slug: 'qrbell-store' },
      { name: 'Glamee', slug: 'glamee' },
    ],
    description: [
      'Developing production applications with React.js, Node.js, Express.js, Fastify, PostgreSQL, MongoDB, Prisma and Redis.',
      'Building scalable REST APIs with authentication, RBAC and payment integrations.',
      'Implementing real-time video/audio, messaging and location features using WebRTC, Socket.IO, Agora and Firebase.',
      'Delivering complete e-commerce workflows — products, cart, checkout, orders and payments.',
      'Writing unit and end-to-end tests with Vitest and Playwright.',
    ],
    techGroups: [
      { category: 'Frontend', items: ['React.js'] },
      { category: 'Backend', items: ['Node.js', 'Express.js', 'Fastify'] },
      { category: 'Data', items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis'] },
      { category: 'Real-time', items: ['WebRTC', 'Socket.IO', 'Agora', 'Firebase'] },
      { category: 'Testing', items: ['Vitest', 'Playwright'] },
    ],
  },
  {
    id: 'exp-2',
    role: 'Full Stack Developer',
    company: 'Samadhan Group',
    period: 'Mar 2023 – Dec 2025',
    location: 'Lucknow, India',
    projectsLabel: 'Projects',
    projects: [
      { name: 'Biz Consultancy' },
      { name: 'IID' },
      { name: 'Udyami EDP' },
      { name: 'Hunar India' },
    ],
    description: [
      'Led development of enterprise applications.',
      'Designed a scalable backend architecture and delivered 100+ REST APIs.',
      'Implemented authentication, RBAC and workflow automation.',
      'Integrated WebRTC, Socket.IO, AWS S3, Firebase, Google Maps and payment gateways.',
      'Improved reliability and performance using Docker, Nginx, caching and CI/CD.',
    ],
    techGroups: [
      { category: 'Backend', items: ['Node.js', 'REST APIs', 'RBAC'] },
      { category: 'Real-time', items: ['WebRTC', 'Socket.IO'] },
      { category: 'Integrations', items: ['AWS S3', 'Firebase', 'Google Maps', 'Payment Gateways'] },
      { category: 'DevOps', items: ['Docker', 'Nginx', 'Caching', 'CI/CD'] },
    ],
  },
  {
    id: 'exp-3',
    role: 'Web Developer',
    company: 'Neodigitech Innovations',
    period: 'Mar 2022 – Jan 2023',
    location: 'Lucknow, India',
    projectsLabel: 'Project',
    projects: [{ name: 'Hospital Management System – KGMU', slug: 'kgmu-hospital-management-system' }],
    description: [
      'Developed healthcare applications using Core PHP, Laravel, CodeIgniter and MySQL.',
      'Built Patient, OPD/IPD, Doctor, Laboratory, Radiology, Pharmacy and Admin modules.',
      'Implemented RBAC and workflow automation.',
    ],
    techGroups: [
      { category: 'Backend', items: ['Core PHP', 'Laravel', 'CodeIgniter'] },
      { category: 'Data', items: ['MySQL'] },
      { category: 'Frontend', items: ['JavaScript'] },
    ],
  },
]
