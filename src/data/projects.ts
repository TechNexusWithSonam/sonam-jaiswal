import type { Project } from '@/types'

/**
 * Project + case-study content.
 *
 * Sources: resume (public/resume.pdf), src/data/experience.ts and previously published project copy.
 * Rules for editing:
 *  - Only state features, technologies and outcomes that are verified. No invented metrics.
 *  - `outcomes` = delivered scope, not marketing claims.
 *  - Visuals marked `visual` are illustrative mockups. To use real screenshots, drop files into
 *    `public/images/projects/<slug>/` and set `image` (cover) or a gallery item's `src`.
 *  - Optional sections (features, problem, challenges, gallery, …) simply don't render when omitted.
 */
export const projects: Project[] = [
  {
    id: 'proj-1',
    slug: 'qrbell',
    title: 'QRBell',
    description:
      'A real-time communication platform built around QR codes — scan a code to reach its owner by video, voice, or message.',
    highlights: [
      'Audio & video calling with WebRTC and Agora',
      'QR activation and QR-driven workflows',
      'Push notifications via Firebase / APNs',
    ],
    tech: ['React.js', 'Node.js', 'WebRTC', 'Socket.IO', 'Agora', 'Firebase', 'PostgreSQL'],
    featured: true,
    visual: 'qrbell-call',
    details: {
      tagline: 'Scan a QR code, connect instantly — by video, voice, or message.',
      category: 'Real-time Communication',
      status: 'production',
      company: 'Aspirantive Technologies',
      period: 'Dec 2025 – Present',
      role: 'Full Stack Developer',
      audience: ['Homeowners & residents', 'Businesses & front desks', 'Visitors & delivery staff'],
      inSimpleWords:
        'Think of QRBell as a smart doorbell that lives inside a QR code. Someone scans the code with their phone camera and can immediately call, video-chat, or message the right person — without exchanging phone numbers.',
      overview: [
        'QRBell turns a printed QR code into a live communication point. Place it on a door, desk, vehicle, or counter, and anyone who scans it can reach the owner in real time.',
        'Behind that simple experience is a real-time system: QR codes are activated and linked to an owner, scans are routed to the right person, the owner is alerted with a push notification, and both sides join an audio or video call — with location services adding context to each interaction.',
      ],
      problem:
        'Reaching someone at a door, desk, or parked vehicle usually means sharing a personal phone number or waiting around. Traditional doorbells and intercoms are fixed to one place and don’t help when the owner is away.',
      solution:
        'A QR code anyone can scan that opens a real-time line to the owner — wherever they are. Owners stay reachable without exposing personal contact details.',
      features: [
        {
          icon: 'qr',
          title: 'QR activation',
          simple: 'A new QR code is activated and linked to its owner before it goes live, so every scan reaches the right person.',
          technical:
            'Each code maps to a unique identifier that the backend resolves to an owner account; activation binds the code to that account.',
        },
        {
          icon: 'workflow',
          title: 'QR-driven workflows',
          simple: 'Each QR code knows who it belongs to and what should happen when it’s scanned — call, message, or something else.',
          technical:
            'Scans are resolved server-side and routed to the owner’s configured workflow, stored in PostgreSQL.',
        },
        {
          icon: 'video',
          title: 'Audio & video calling',
          simple: 'Talk face-to-face or by voice with whoever scanned your code, like a normal call.',
          technical:
            'Real-time media using WebRTC with Agora; call signaling is exchanged over Socket.IO.',
        },
        {
          icon: 'bell',
          title: 'Push notifications',
          simple: 'The owner’s phone alerts them the moment someone scans their code — even if the app is closed.',
          technical:
            'Backend events trigger push notifications through Firebase Cloud Messaging and Apple Push Notification service (APNs).',
        },
        {
          icon: 'message',
          title: 'Real-time messaging',
          simple: 'Prefer to type? Messages arrive instantly, without refreshing the page.',
          technical: 'Bi-directional, event-based messaging over Socket.IO.',
        },
        {
          icon: 'map',
          title: 'Location services',
          simple: 'Location adds context to a scan, keeping each interaction relevant.',
          technical: 'Location data is integrated into the scan and call workflow on the backend.',
        },
      ],
      contributions: [
        'Developing QRBell’s real-time features as a Full Stack Developer — audio/video calling, messaging, and notifications.',
        'Integrating WebRTC and Agora for media, with Socket.IO for real-time events and call signaling.',
        'Implementing push notifications with Firebase and APNs so owners are alerted outside the app.',
        'Building QR activation and QR-driven workflows, and integrating location services.',
        'Building RESTful APIs with authentication and role-based access control (RBAC) in Node.js.',
        'Working across the React.js frontend and Node.js backend of a production application.',
      ],
      architecture: {
        summary:
          'A React.js client talks to a Node.js backend over REST for data and over Socket.IO for anything real-time. Media runs through WebRTC/Agora, and notifications go out through Firebase and APNs.',
        tiers: [
          {
            label: 'Clients',
            icon: 'smartphone',
            nodes: [
              { name: 'Visitor', detail: 'Scans the QR code' },
              { name: 'Owner', detail: 'Receives calls & alerts' },
              { name: 'React.js', detail: 'User interface' },
            ],
          },
          {
            label: 'Real-time layer',
            icon: 'zap',
            nodes: [
              { name: 'Socket.IO', detail: 'Events, messaging, signaling' },
              { name: 'WebRTC', detail: 'Audio & video media' },
            ],
          },
          {
            label: 'Backend',
            icon: 'server',
            nodes: [
              { name: 'Node.js REST APIs', detail: 'Auth & RBAC' },
              { name: 'QR service', detail: 'Activation & routing' },
              { name: 'Location services' },
            ],
          },
          {
            label: 'Data',
            icon: 'database',
            nodes: [{ name: 'PostgreSQL', detail: 'Users, QR codes, workflows' }],
          },
        ],
        links: ['WebSocket + media', 'Events', 'Queries'],
        external: {
          label: 'Integrations',
          link: 'APIs / SDKs',
          nodes: [
            { name: 'Agora', detail: 'Calling infrastructure' },
            { name: 'Firebase', detail: 'Push notifications' },
            { name: 'APNs', detail: 'iOS notifications' },
          ],
        },
        notes: [
          { layer: 'Frontend', icon: 'monitor', body: 'React.js screens for scanning, calling, and messaging.' },
          {
            layer: 'Backend & APIs',
            icon: 'server',
            body: 'Node.js REST APIs with authentication and role-based access. They resolve scans, activate codes, and run workflows.',
          },
          {
            layer: 'Real-time',
            icon: 'zap',
            body: 'Socket.IO keeps a live connection open for messages and call setup; WebRTC and Agora carry the audio and video.',
          },
          { layer: 'Database', icon: 'database', body: 'PostgreSQL stores users, QR codes, and workflow configuration.' },
          {
            layer: 'Integrations',
            icon: 'plug',
            body: 'Agora for calling, Firebase and APNs for push notifications, and location services in the scan flow.',
          },
        ],
        flow: {
          title: 'From scan to call',
          steps: [
            { title: 'Scan', description: 'A visitor scans the activated QR code.' },
            { title: 'Resolve', description: 'The backend identifies the owner and their workflow.' },
            { title: 'Notify', description: 'Firebase / APNs alerts the owner’s device.' },
            { title: 'Signal', description: 'Socket.IO exchanges the call setup between both sides.' },
            { title: 'Connect', description: 'Audio or video flows over WebRTC / Agora.' },
          ],
        },
      },
      techGroups: [
        {
          layer: 'Frontend',
          icon: 'monitor',
          items: [{ name: 'React.js', purpose: 'Interactive screens for visitors and owners.' }],
        },
        {
          layer: 'Real-time & media',
          icon: 'zap',
          items: [
            { name: 'WebRTC', purpose: 'Audio and video between devices.' },
            { name: 'Agora', purpose: 'Calling infrastructure for reliable media.' },
            { name: 'Socket.IO', purpose: 'Live events, messaging, and call signaling.' },
          ],
        },
        {
          layer: 'Backend',
          icon: 'server',
          items: [{ name: 'Node.js', purpose: 'Server logic and REST APIs.' }],
        },
        {
          layer: 'Notifications',
          icon: 'bell',
          items: [
            { name: 'Firebase', purpose: 'Push notifications.' },
            { name: 'APNs', purpose: 'Push notifications on Apple devices.' },
          ],
        },
        {
          layer: 'Database',
          icon: 'database',
          items: [{ name: 'PostgreSQL', purpose: 'Users, QR codes, and workflows.' }],
        },
      ],
      challenges: [
        {
          challenge: 'Calls need to connect reliably across different networks and devices.',
          approach: 'Used Agora alongside WebRTC for media, with Socket.IO handling signaling between the two sides.',
        },
        {
          challenge: 'Owners must be alerted even when the app isn’t open.',
          approach: 'Triggered Firebase / APNs push notifications from backend events instead of relying on an open socket.',
        },
        {
          challenge: 'A scan must reach exactly the right person, without exposing their contact details.',
          approach: 'Resolved every QR code to its owner on the server, behind authenticated APIs with role-based access.',
        },
      ],
      outcomes: [
        'Real-time audio/video calling, messaging, and notification features built for a production application.',
        'QR activation and QR-driven workflows connecting each scan to the right owner.',
        'Push notifications delivered through both Firebase and APNs.',
        'Location services integrated into the communication workflow.',
      ],
      gallery: [
        { visual: 'qrbell-activate', title: 'QR activation', caption: 'Linking a new QR code to its owner.' },
        { visual: 'qrbell-scan', title: 'Scan to connect', caption: 'The visitor’s view after scanning a code.' },
        { visual: 'qrbell-notify', title: 'Owner alert', caption: 'A push notification reaches the owner’s phone.' },
        { visual: 'qrbell-call', title: 'Live call', caption: 'An audio/video session between visitor and owner.' },
      ],
      glossary: [
        { term: 'WebRTC', meaning: 'Technology that lets browsers and apps send audio and video to each other in real time.' },
        { term: 'Socket.IO', meaning: 'Keeps a live connection open so data arrives instantly instead of on page refresh.' },
        { term: 'Signaling', meaning: 'The short “handshake” messages two devices exchange before a call can start.' },
        { term: 'APNs', meaning: 'Apple Push Notification service — how alerts reach iPhones.' },
        { term: 'RBAC', meaning: 'Role-based access control — each user only sees and does what their role allows.' },
      ],
    },
  },
  {
    id: 'proj-2',
    slug: 'qrbell-store',
    title: 'QRBell Store',
    description:
      'A full-stack e-commerce platform with a customer storefront and an admin panel, covering the full journey from catalog to payment.',
    highlights: [
      'Product, cart, checkout, order & payment workflows',
      'Admin panel for catalog, orders, and customers',
      'Vitest + Playwright tests, Docker, CI/CD',
    ],
    tech: ['React.js', 'Node.js', 'Fastify', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    featured: true,
    visual: 'store-catalog',
    details: {
      tagline: 'A complete online store — from browsing to checkout to order management.',
      category: 'E-commerce',
      status: 'production',
      company: 'Aspirantive Technologies',
      period: 'Dec 2025 – Present',
      role: 'Full Stack Developer',
      audience: ['Shoppers', 'Store administrators', 'Operations teams'],
      inSimpleWords:
        'QRBell Store is an online shop for QRBell products. Customers browse, add items to a cart, and pay online. Behind the scenes, the store team manages products, orders, and customers from their own admin panel.',
      overview: [
        'QRBell Store covers the full shopping journey: product catalog, cart, checkout, payment, and orders — in one platform.',
        'Store administrators get a dedicated admin panel to manage the catalog and process orders. Critical flows are covered by automated unit and end-to-end tests, and the application is containerised with Docker and released through CI/CD.',
      ],
      problem:
        'Selling online takes much more than a product page. Carts, payments, stock, and orders all have to stay in sync — and a bug at checkout means lost sales.',
      solution:
        'A tested e-commerce platform where the customer storefront and admin tools share one backend, with caching for frequently read data and automated tests guarding the most important journeys.',
      features: [
        {
          icon: 'package',
          title: 'Product & catalog management',
          simple: 'Browse products with clear details, prices, and availability; admins keep the catalog up to date.',
          technical: 'Catalog modeled with Prisma over PostgreSQL and served by Fastify REST endpoints; frequently read data cached in Redis.',
        },
        {
          icon: 'cart',
          title: 'Cart & checkout',
          simple: 'Add items, review the cart, and check out in a few steps.',
          technical: 'Server-validated cart, with price and stock re-checked at checkout instead of trusting the browser.',
        },
        {
          icon: 'card',
          title: 'Payments',
          simple: 'Pay online through a payment provider.',
          technical: 'Payment gateway integration, with payment status verified server-side before an order is confirmed.',
        },
        {
          icon: 'clock',
          title: 'Order management',
          simple: 'Orders move through clear stages that both customers and staff can follow.',
          technical: 'Order lifecycle modeled as explicit status transitions behind authenticated APIs.',
        },
        {
          icon: 'dashboard',
          title: 'Admin panel',
          simple: 'Store staff manage products, orders, and customers from one dashboard.',
          technical: 'Separate admin interface with role-based access control on admin endpoints.',
        },
        {
          icon: 'test',
          title: 'Automated testing',
          simple: 'Automated checks run before updates ship, so checkout keeps working.',
          technical: 'Unit tests with Vitest and end-to-end browser tests with Playwright, run in the CI/CD pipeline.',
        },
      ],
      contributions: [
        'Developing product, cart, checkout, order, payment, customer, and admin workflows end to end.',
        'Building REST APIs on Node.js and Fastify, with Prisma as the data layer over PostgreSQL.',
        'Integrating payments, with authentication and role-based access control for admin features.',
        'Using Redis to cache frequently read data.',
        'Writing unit tests with Vitest and end-to-end tests with Playwright.',
        'Working with Docker and CI/CD for consistent builds and releases.',
      ],
      architecture: {
        summary:
          'Two React.js front ends — the storefront and the admin panel — share one Fastify API on Node.js. Prisma handles data access to PostgreSQL, and Redis caches frequently read data. Docker and a CI/CD pipeline handle builds, tests, and releases.',
        tiers: [
          {
            label: 'Clients',
            icon: 'monitor',
            nodes: [
              { name: 'Storefront', detail: 'React.js · customers' },
              { name: 'Admin panel', detail: 'React.js · staff' },
            ],
          },
          {
            label: 'API',
            icon: 'server',
            nodes: [
              { name: 'Fastify on Node.js', detail: 'REST APIs' },
              { name: 'Auth & RBAC' },
              { name: 'Catalog · Cart · Orders · Payments' },
            ],
          },
          {
            label: 'Data access',
            icon: 'layers',
            nodes: [
              { name: 'Prisma ORM', detail: 'Typed queries' },
              { name: 'Redis', detail: 'Cache' },
            ],
          },
          {
            label: 'Storage',
            icon: 'database',
            nodes: [{ name: 'PostgreSQL', detail: 'Products, customers, orders' }],
          },
        ],
        links: ['HTTPS / REST', 'Queries & cache', 'SQL'],
        external: {
          label: 'Delivery & services',
          link: 'Integrations',
          nodes: [
            { name: 'Payment gateway', detail: 'Online payments' },
            { name: 'Docker', detail: 'Containerisation' },
            { name: 'CI/CD', detail: 'Test & release' },
          ],
        },
        notes: [
          { layer: 'Frontend', icon: 'monitor', body: 'React.js storefront for shoppers and a separate admin panel for staff.' },
          {
            layer: 'Backend & APIs',
            icon: 'server',
            body: 'Fastify on Node.js serves REST APIs for catalog, cart, checkout, orders, payments, and customers, with authentication and RBAC.',
          },
          {
            layer: 'Database & caching',
            icon: 'database',
            body: 'Prisma provides typed access to PostgreSQL; Redis keeps frequently read data in memory.',
          },
          { layer: 'Integrations', icon: 'plug', body: 'A payment gateway, with payment status verified on the server.' },
          {
            layer: 'Testing & infrastructure',
            icon: 'container',
            body: 'Vitest unit tests and Playwright end-to-end tests run in CI/CD; Docker keeps every environment consistent.',
          },
        ],
        flow: {
          title: 'From browsing to order',
          steps: [
            { title: 'Browse', description: 'The shopper explores the catalog.' },
            { title: 'Add to cart', description: 'Items are kept in a server-validated cart.' },
            { title: 'Checkout', description: 'Prices and stock are re-checked.' },
            { title: 'Pay', description: 'Payment is completed and verified.' },
            { title: 'Fulfil', description: 'Admins process the order in the panel.' },
          ],
        },
      },
      techGroups: [
        {
          layer: 'Frontend',
          icon: 'monitor',
          items: [{ name: 'React.js', purpose: 'Storefront and admin panel.' }],
        },
        {
          layer: 'Backend',
          icon: 'server',
          items: [
            { name: 'Node.js', purpose: 'Server runtime.' },
            { name: 'Fastify', purpose: 'REST API framework.' },
            { name: 'Prisma', purpose: 'Typed data access layer.' },
          ],
        },
        {
          layer: 'Data',
          icon: 'database',
          items: [
            { name: 'PostgreSQL', purpose: 'Products, customers, and orders.' },
            { name: 'Redis', purpose: 'Caching frequently read data.' },
          ],
        },
        {
          layer: 'Testing',
          icon: 'test',
          items: [
            { name: 'Vitest', purpose: 'Unit tests.' },
            { name: 'Playwright', purpose: 'End-to-end browser tests.' },
          ],
        },
        {
          layer: 'DevOps',
          icon: 'container',
          items: [
            { name: 'Docker', purpose: 'Consistent, containerised environments.' },
            { name: 'CI/CD', purpose: 'Automated test and release pipeline.' },
          ],
        },
      ],
      challenges: [
        {
          challenge: 'Keeping prices and stock correct between cart and payment.',
          approach: 'Re-validated cart contents on the server at checkout rather than trusting the browser.',
        },
        {
          challenge: 'Confirming orders only for payments that actually succeeded.',
          approach: 'Verified payment status on the server before moving an order forward.',
        },
        {
          challenge: 'Shipping new features without breaking checkout.',
          approach: 'Covered critical journeys with Playwright end-to-end tests and Vitest unit tests in the CI/CD pipeline.',
        },
      ],
      outcomes: [
        'Product, cart, checkout, order, payment, customer, and admin workflows delivered on one platform.',
        'Critical journeys covered by Vitest unit tests and Playwright end-to-end tests.',
        'Containerised with Docker and released through a CI/CD pipeline.',
      ],
      gallery: [
        { visual: 'store-catalog', title: 'Product catalog', caption: 'Browsing products in the storefront.' },
        { visual: 'store-checkout', title: 'Cart & checkout', caption: 'Reviewing the cart and moving through checkout.' },
        { visual: 'store-admin', title: 'Admin panel', caption: 'Staff manage orders and their status.' },
      ],
      glossary: [
        { term: 'API', meaning: 'A set of rules that lets the website and the server talk to each other.' },
        { term: 'ORM (Prisma)', meaning: 'A tool that lets code work with the database safely, without hand-writing SQL.' },
        { term: 'Caching (Redis)', meaning: 'Keeping a ready-made copy of data in memory so it loads faster.' },
        { term: 'End-to-end test', meaning: 'An automated check that uses the app like a real customer would.' },
        { term: 'CI/CD', meaning: 'An automated pipeline that tests and releases new versions of the app.' },
      ],
    },
  },
  {
    id: 'proj-3',
    slug: 'kgmu-hospital-management-system',
    title: 'Hospital Management System (KGMU)',
    description:
      'A hospital management system for King George’s Medical University, connecting patient, clinical, diagnostic, pharmacy, and admin workflows.',
    highlights: [
      'Patient, OPD/IPD, Doctor, Appointment & Pharmacy modules',
      'Laboratory and Radiology workflows',
      'Admin module with role-based access control',
    ],
    tech: ['PHP', 'Laravel', 'CodeIgniter', 'MySQL', 'JavaScript', 'Ajax'],
    featured: true,
    visual: 'hms-dashboard',
    details: {
      tagline: 'One connected system for patients, doctors, diagnostics, pharmacy, and administration.',
      category: 'Healthcare',
      status: 'delivered',
      company: 'Neodigitech Innovations',
      period: 'Mar 2022 – Jan 2023',
      role: 'Web Developer',
      audience: ['Doctors & clinical staff', 'Lab & radiology staff', 'Pharmacists', 'Hospital administrators'],
      inSimpleWords:
        'This system brings a large hospital’s departments onto one digital platform. From registration to appointments, tests, prescriptions, and admissions, each department works from the same patient record.',
      overview: [
        'Built for King George’s Medical University (KGMU), the system digitises day-to-day hospital operations across departments.',
        'Each department — Patient, OPD/IPD, Doctor, Appointment, Laboratory, Radiology, and Pharmacy — has its own module, connected to a shared patient record. An Admin module controls who can access what, so staff only see the parts relevant to their role.',
      ],
      problem:
        'In a busy hospital, patient information can end up spread across separate departmental files and registers, leading to repeated paperwork and slow hand-offs between departments.',
      solution:
        'A web-based system where each patient has one digital record that follows them through every department, with automated workflows replacing manual hand-offs and role-based access protecting sensitive data.',
      features: [
        {
          icon: 'users',
          title: 'Patient module',
          simple: 'Register a patient once and their details are available to every department.',
          technical: 'A central patient record in MySQL referenced by every module, avoiding duplicate records.',
        },
        {
          icon: 'calendar',
          title: 'Appointments',
          simple: 'Patients are scheduled to see the right doctor.',
          technical: 'Appointment records linked to the patient and doctor modules.',
        },
        {
          icon: 'stethoscope',
          title: 'OPD & Doctor modules',
          simple: 'Doctors view patient history, record consultations, and write prescriptions digitally.',
          technical: 'Consultation records linked to patient and doctor, with prescriptions flowing to the pharmacy module.',
        },
        {
          icon: 'bed',
          title: 'IPD (admissions)',
          simple: 'Track admitted patients from admission through discharge.',
          technical: 'Admission–discharge lifecycle with treatment records per stay.',
        },
        {
          icon: 'flask',
          title: 'Laboratory & Radiology',
          simple: 'Test requests reach the lab and radiology, and results go back to the doctor.',
          technical: 'Request–result workflow between the doctor and diagnostic modules, replacing manual report hand-offs.',
        },
        {
          icon: 'pill',
          title: 'Pharmacy',
          simple: 'Pharmacists see prescriptions as they’re written and dispense medicines.',
          technical: 'Prescription queue fed by the doctor module.',
        },
        {
          icon: 'shield',
          title: 'Admin & access control',
          simple: 'Each staff member only sees what their job requires, keeping patient data private.',
          technical: 'Role-based access control (RBAC) enforced across modules, managed from the Admin module.',
        },
      ],
      contributions: [
        'Developed Hospital Management System applications for KGMU with Core PHP, Laravel, CodeIgniter, JavaScript, Ajax, and MySQL.',
        'Built the Patient, OPD/IPD, Doctor, Appointment, Laboratory, Radiology, Pharmacy, and Admin modules.',
        'Implemented REST APIs, role-based access control, and workflow automation across modules.',
        'Worked on database optimization for the MySQL data layer.',
        'Collaborated across the SDLC — delivering features, resolving production issues, and supporting deployments.',
        'Maintained reusable and secure code across the application.',
      ],
      architecture: {
        summary:
          'A browser-based application built on PHP (Core PHP, Laravel, and CodeIgniter) following an MVC structure. Department modules share one MySQL database, so every module reads from the same patient record, and access is controlled by role.',
        tiers: [
          {
            label: 'Users',
            icon: 'users',
            nodes: [
              { name: 'Front desk' },
              { name: 'Doctors' },
              { name: 'Lab & Radiology' },
              { name: 'Pharmacy' },
              { name: 'Administrators' },
            ],
          },
          {
            label: 'Web interface',
            icon: 'monitor',
            nodes: [{ name: 'JavaScript & Ajax', detail: 'Dynamic forms and screens' }],
          },
          {
            label: 'Application modules',
            icon: 'layers',
            nodes: [
              { name: 'Patient' },
              { name: 'OPD / IPD' },
              { name: 'Doctor' },
              { name: 'Appointment' },
              { name: 'Laboratory' },
              { name: 'Radiology' },
              { name: 'Pharmacy' },
              { name: 'Admin · RBAC' },
            ],
          },
          {
            label: 'Data',
            icon: 'database',
            nodes: [{ name: 'MySQL', detail: 'Shared patient record' }],
          },
        ],
        links: ['Role-based login', 'REST / Ajax', 'SQL'],
        notes: [
          { layer: 'Frontend', icon: 'monitor', body: 'JavaScript and Ajax make forms and screens update without full page reloads.' },
          {
            layer: 'Backend',
            icon: 'server',
            body: 'Core PHP, Laravel, and CodeIgniter power the department modules, using an MVC structure.',
          },
          {
            layer: 'APIs',
            icon: 'plug',
            body: 'REST APIs connect the modules, so a doctor’s request reaches the lab or pharmacy directly.',
          },
          { layer: 'Database', icon: 'database', body: 'One MySQL database holds the shared patient record, optimised for daily hospital workloads.' },
          {
            layer: 'Security',
            icon: 'shield',
            body: 'Role-based access control means each role — doctor, lab, pharmacy, admin — only reaches its own modules.',
          },
        ],
        flow: {
          title: 'A patient’s journey',
          steps: [
            { title: 'Register', description: 'The patient is registered once.' },
            { title: 'Appointment', description: 'A visit is scheduled with a doctor.' },
            { title: 'Consult', description: 'The doctor records findings in OPD.' },
            { title: 'Diagnose', description: 'Lab & radiology receive requests and return results.' },
            { title: 'Treat', description: 'Pharmacy dispenses; IPD tracks admissions.' },
          ],
        },
      },
      techGroups: [
        {
          layer: 'Frontend',
          icon: 'monitor',
          items: [
            { name: 'JavaScript', purpose: 'Interactive forms and dashboards.' },
            { name: 'Ajax', purpose: 'Updates screens without full reloads.' },
          ],
        },
        {
          layer: 'Backend',
          icon: 'server',
          items: [
            { name: 'Core PHP', purpose: 'Core application logic.' },
            { name: 'Laravel', purpose: 'Structured framework for modules.' },
            { name: 'CodeIgniter', purpose: 'Lightweight framework for parts of the system.' },
          ],
        },
        {
          layer: 'Database',
          icon: 'database',
          items: [{ name: 'MySQL', purpose: 'Patient records, diagnostics, and pharmacy data.' }],
        },
        {
          layer: 'Architecture',
          icon: 'shield',
          items: [
            { name: 'REST APIs', purpose: 'Communication between modules.' },
            { name: 'RBAC', purpose: 'Role-based access to modules and data.' },
          ],
        },
      ],
      challenges: [
        {
          challenge: 'Many departments with very different daily workflows.',
          approach: 'Built each department as its own module, all sharing one central patient record.',
        },
        {
          challenge: 'Sensitive medical data accessed by many different staff.',
          approach: 'Applied role-based access control so each role only reaches what it needs.',
        },
        {
          challenge: 'Keeping a shared database responsive for daily hospital use.',
          approach: 'Worked on database optimization for the MySQL layer.',
        },
      ],
      outcomes: [
        'Eight modules delivered: Patient, OPD/IPD, Doctor, Appointment, Laboratory, Radiology, Pharmacy, and Admin.',
        'Role-based access control and workflow automation across clinical and administrative modules.',
        'Supported deployments and resolved production issues across the SDLC.',
      ],
      gallery: [
        { visual: 'hms-dashboard', title: 'Patient record', caption: 'One shared patient record across departments.' },
        { visual: 'hms-diagnostics', title: 'Diagnostics workflow', caption: 'A test request moving from doctor to lab and back.' },
        { visual: 'hms-access', title: 'Role-based access', caption: 'Illustrative view of how roles map to modules.' },
      ],
      glossary: [
        { term: 'OPD', meaning: 'Outpatient Department — patients who visit and go home the same day.' },
        { term: 'IPD', meaning: 'Inpatient Department — patients admitted to stay in the hospital.' },
        { term: 'Module', meaning: 'A self-contained part of the system built for one department or task.' },
        { term: 'MVC', meaning: 'Model–View–Controller — a way of separating data, screens, and logic in code.' },
        { term: 'RBAC', meaning: 'Role-based access control — each user only sees what their role allows.' },
      ],
    },
  },
  {
    id: 'proj-4',
    slug: 'glamee',
    title: 'Glamee',
    description: 'A production web application built with React.js and Node.js.',
    tech: ['React.js', 'Node.js'],
    visual: 'glamee-stack',
    details: {
      tagline: 'A production web application built with React.js and Node.js.',
      category: 'Web Application',
      status: 'production',
      company: 'Aspirantive Technologies',
      period: 'Dec 2025 – Present',
      role: 'Full Stack Developer',
      overview: [
        'Glamee is one of the production applications I work on at Aspirantive Technologies, alongside QRBell and QRBell Store.',
        'It is built with React.js on the frontend and Node.js on the backend.',
      ],
      contributions: [
        'Working on Glamee as a Full Stack Developer at Aspirantive Technologies.',
        'Developing across the React.js frontend and the Node.js backend.',
      ],
      architecture: {
        summary: 'A React.js frontend served to the browser, backed by a Node.js server.',
        tiers: [
          { label: 'Frontend', icon: 'monitor', nodes: [{ name: 'React.js', detail: 'User interface' }] },
          { label: 'Backend', icon: 'server', nodes: [{ name: 'Node.js', detail: 'Server & APIs' }] },
        ],
        links: ['HTTP'],
        notes: [
          { layer: 'Frontend', icon: 'monitor', body: 'React.js builds the screens people use in the browser.' },
          { layer: 'Backend', icon: 'server', body: 'Node.js runs the server-side logic.' },
        ],
      },
      techGroups: [
        { layer: 'Frontend', icon: 'monitor', items: [{ name: 'React.js', purpose: 'User interface.' }] },
        { layer: 'Backend', icon: 'server', items: [{ name: 'Node.js', purpose: 'Server-side logic.' }] },
      ],
      outcomes: ['Developed as a production web application at Aspirantive Technologies.'],
      disclosureNote:
        'Feature-level details for Glamee aren’t published yet, so this page only covers what can be stated accurately. I’m happy to walk through the work in a conversation.',
    },
  },
]

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}
