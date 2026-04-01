'use client';

import {useScroll} from 'motion/react';
import {useRef} from 'react';
import brawlTracker from '../../assets/brawlTracker.png';
import impostor from '../../assets/impostor.png';
import default_img from '../../assets/default.png';
import {StackCard} from './components/StackCard.tsx';
import {SectionTitle} from '../../ui/Typography.tsx';

const projects = [
    {
        title: 'Brawl Tracker',
        description:
            'Full-stack app that tracks Brawl Stars player stats over time via the official API. Three-tier containerized architecture: React frontend, Spring Boot REST API, PostgreSQL — all wired through Docker and nginx.',
        imageUrl: brawlTracker,
        tags: ['React', 'Spring Boot', 'PostgreSQL', 'Docker'],
        githubUrl: 'https://github.com/maelseewald/brawlTracker',
        projectUrl: 'https://brawltracker-frontend.onrender.com',
    },
    {
        title: 'Impostor',
        description:
            'A production-ready fullstack boilerplate built to skip the setup and go straight to business logic. React + Vite frontend, Spring Boot backend with Flyway migrations, and a Playwright test suite covering both API and E2E scenarios.',
        imageUrl: impostor,
        tags: ['React', 'Spring Boot', 'TypeScript', 'Playwright'],
        githubUrl: 'https://github.com/maelseewald/impostor_new',
    },
    {
        title: 'Flashcard App',
        description:
            'Offline-first mobile flashcard app built with React Native and Expo. Users create and study custom decks entirely on-device — no backend, no account. Minimalist design with haptic feedback and local persistence via AsyncStorage.',
        imageUrl: default_img,
        tags: ['React Native', 'Expo', 'TypeScript'],
        githubUrl: 'https://github.com/maelseewald/flashcard-app-API-1-seemal',
    },
];

export default function ProjectsStack() {
    const container = useRef<HTMLDivElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <SectionTitle subtitle="Selected Work">Projects</SectionTitle>
            </div>

            <div ref={container} className="relative z-10 w-full">
                {projects.map((project, i) => {
                    const targetScale = 1 - (projects.length - i) * 0.05;

                    return (
                        <StackCard
                            key={`p_${i}`}
                            i={i}
                            title={project.title}
                            description={project.description}
                            imageUrl={project.imageUrl}
                            tags={project.tags}
                            githubUrl={project.githubUrl}
                            projectUrl={project.projectUrl}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </div>
    );
}
