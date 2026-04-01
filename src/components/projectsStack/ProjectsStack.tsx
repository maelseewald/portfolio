'use client';

import {useScroll} from 'motion/react';
import {useRef} from 'react';
import brawlTracker from '../../assets/brawlTracker.png';
import impostor from '../../assets/impostor.png';
import default_img from '../../assets/default.png';
import {StackCard} from './components/StackCard.tsx';

const projects = [
    {
        title: 'Brawl Tracker\n',
        description:
            'Web application for managing and visualizing software projects. Focus on clean architecture, reusable components and a clear user interface.',
        imageUrl: brawlTracker,
        githubUrl: 'https://github.com/maelseewald/brawlTracker',
        projectUrl: 'https://brawltracker-frontend.onrender.com',
    },
    {
        title: 'Impostor',
        description:
            'Planning tool for students to organize lectures, assignments and deadlines. Built with a focus on performance, responsive design and great UX.',
        imageUrl: impostor,
        githubUrl: 'https://github.com/maelseewald/impostor_new',
    },
    {
        title: 'Flashcard App',
        description:
            'Real-time chat app with user authentication, message history and a modern interface. The goal was to apply WebSockets and state management in practice.',
        imageUrl: default_img,
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
        <section ref={container} className="relative w-full ">
            {projects.map((project, i) => {
                const targetScale = 1 - (projects.length - i) * 0.05;

                return (
                    <StackCard
                        key={`p_${i}`}
                        i={i}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                        githubUrl={project.githubUrl}
                        projectUrl={project.projectUrl}
                        progress={scrollYProgress}
                        range={[i * 0.25, 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </section>
    );
}