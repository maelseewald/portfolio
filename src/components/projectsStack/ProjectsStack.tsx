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
            'A web app for tracking and visualizing Brawl Stars stats. Features clean architecture, reusable components and an intuitive user interface.',
        imageUrl: brawlTracker,
        tags: ['React', 'Node.js', 'REST API'],
        githubUrl: 'https://github.com/maelseewald/brawlTracker',
        projectUrl: 'https://brawltracker-frontend.onrender.com',
    },
    {
        title: 'Impostor',
        description:
            'A planning tool for students to organize lectures, assignments and deadlines. Built with a focus on performance, responsive design and great UX.',
        imageUrl: impostor,
        tags: ['React', 'TypeScript', 'Tailwind'],
        githubUrl: 'https://github.com/maelseewald/impostor_new',
    },
    {
        title: 'Flashcard App',
        description:
            'A flashcard learning app with a clean interface for creating and studying custom decks. Built to practice REST API integration and state management.',
        imageUrl: default_img,
        tags: ['React', 'REST API', 'Java'],
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
