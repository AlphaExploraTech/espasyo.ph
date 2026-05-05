// src/constants/homeData.ts

export const testimonialData = [
    { id: 'pic1', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774460460/Pic1.jpg', caption: "Your hub for INNOVATION and COMMUNITY.", rotate: "rotate-[-2deg]" },
    { id: 'pic2', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774460460/Pic2.jpg', caption: "Transforming spaces into opportunities.", rotate: "rotate-[1.5deg]" },
    { id: 'pic3', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774460460/Pic3.jpg', caption: "Built for Community, Designed for Success.", rotate: "rotate-[-1deg]" },
    { id: 'founder', src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/team.jpg', caption: "From IDEA to OPERATION, ESPASYO gives you the SPACE, SUPPORT, AND SYSTEM to SUCCEED.", rotate: "rotate-[-3deg]", isFounder: true },
    { id: 1, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/1.jpg', caption: "Where Ambition Meets Opportunity.", rotate: "rotate-[1.5deg]" },
    { id: 2, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-43-09-616.jpg', caption: "Empowering Entrepreneurs, Enabling Success.", rotate: "rotate-[-1deg]" },
    { id: 3, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-44-21-936.jpg', caption: "Turning Vision into Enterprise.", rotate: "rotate-[2deg]" },
    { id: 4, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-44-24-162.jpg', caption: "A HUB for Innovation, Collaboration, and Success.", rotate: "rotate-[-1.5deg]" },
    { id: 5, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-44-24-631.jpg', caption: "From Home to CEO, we’ve got your SPACE.", rotate: "rotate-[1deg]" },
    { id: 6, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-44-28-832.jpg', caption: "Empowering Business with Space, Solutions, and Support.", rotate: "rotate-[-2deg]" },
    { id: 8, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-44-29-257.jpg', caption: "Espasyo is a Space for DREAMERS, DOERS, and ACHIEVERS. ", rotate: "rotate-[1.5deg]" },
    { id: 9, src: 'https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/viber_image_2026-03-16_19-44-29-668.jpg', caption: "ESPASYO— Where Business Grow Together!", rotate: "rotate-[-1deg]" },
    { id: 'viewall', src: null, caption: "VIEW ALL TESTIMONIALS", rotate: "rotate-0", isViewAll: true },
];

export const serviceCategories = [
    {
        id: 'workspace',
        title: 'CORE SERVICES',
        provider: 'Espasyo Coworking',
        bgText: 'WORKSPACE',
        image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457581/landing11.jpg",
        description: "LAUNCH, MANAGE AND GROW.",
        services: [
            {
                title: "Coworking Space Memberships",
                items: [
                    "Flexible desk rentals (daily, weekly, monthly)",
                    "Dedicated desks for long-term professionals",
                    "Private office spaces for teams"
                ]
            },
            {
                title: "Virtual Office Solutions",
                items: [
                    "Business address registration",
                    "Mail handling and forwarding",
                    "Call answering and reception services"
                ]
            },
            {
                title: "Study Hub Access",
                items: [
                    "Hourly or daily study desk rentals",
                    "Quiet zones for students and exam reviewers",
                    "Group study rooms with booking options"
                ]
            },
            {
                title: "Business Hub Services",
                items: [
                    "Meeting room rentals (with AV equipment)",
                    "Event space for workshops, seminars, and networking",
                    "Business consultancy and mentorship programs"
                ]
            },
        ]
    },
    {
        id: 'it',
        title: 'CORE I.T. SERVICES',
        provider: 'Alphaexplora Information Technology Services',
        bgText: 'TECHNOLOGY',
        image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457570/landing1.jpg",
        description: "Comprehensive digital solutions to power your business operations and scale your growth.",
        services: [
            {
                title: "Digital Foundation",
                items: ["Website Development", "E-commerce Solutions", "Custom Applications", "Search Engine Optimization"]
            },
            {
                title: "Traction & Growth",
                items: ["Social Media Marketing", "Lead Generation", "Data Insights", "Digital Transformation"]
            },
            {
                title: "Lean Operations",
                items: ["Workflow Automation", "Process Improvement", "Custom System Solutions", "Business Process Analysis"]
            },
            {
                title: "Managed Reliability",
                items: ["Managed Operations", "System Maintenance", "24/7 IT Helpdesk", "Security Audits"]
            }
        ]
    },
    {
        id: 'accounting',
        title: 'CORE BUSINESS SERVICES',
        provider: 'BORJAL-AMAHAN Tax and Accounting Services',
        bgText: 'ACCOUNTING',
        image: "https://res.cloudinary.com/dlk93aehl/image/upload/f_auto,q_auto/v1774457587/landing9.jpg",
        description: "Expert financial management, compliance, and advisory tailored for businesses and freelancers.",
        services: [
            {
                title: "Business Incorporation & Registration",
                items: [
                    "Assistance with SEC/DTI registration",
                    "Business name reservation and permits",
                    "End-to-end incorporation packages (solo, partnership, corporation)"
                ]
            },
            {
                title: "Tax Services",
                items: [
                    "Tax filing and compliance (monthly, quarterly, annual)",
                    "VAT registration and reporting",
                    "Tax advisory and planning for entrepreneurs"
                ]
            },
            {
                title: "Accounting & Bookkeeping",
                items: [
                    "Monthly bookkeeping services",
                    "Payroll management and compliance",
                    "Financial statement preparation and audit support"
                ]
            },
            {
                title: "Virtual Office + Compliance Bundle",
                items: [
                    "Business address + incorporation support",
                    "Mail handling + tax filing assistance",
                    "Premium package for startups needing both space and compliance"
                ]
            },
        ]
    }
];

export const marqueeText = Array(4).fill("COMMUNITY • WORK • CREATE • ");