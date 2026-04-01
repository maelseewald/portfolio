'use client';

import {motion, useScroll, useTransform} from 'motion/react';
import {ArrowDown} from 'lucide-react';
import {GithubIcon} from '../svg/GithubIcon';
import {LinkedInIcon} from '../svg/LinkedInIcon';

export default function Hero() {
    const {scrollYProgress} = useScroll();
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);

    const scrollToProjects = () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
            {/* Greeting */}
            <motion.p
                className="mb-4 text-sm font-medium tracking-widest uppercase text-(--color-text-muted)"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.2}}
            >
                Hey, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
                className="text-center text-6xl font-bold text-(--color-text) sm:text-7xl md:text-8xl lg:text-9xl"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.35}}
            >
                Mael Seewald
            </motion.h1>

            {/* Tagline */}
            <motion.p
                className="mt-6 max-w-lg text-center text-lg leading-relaxed text-(--color-text-muted) md:text-xl"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.55}}
            >
                Frontend Developer · Design Enthusiast · Student
            </motion.p>

            {/* Social Links */}
            <motion.div
                className="mt-10 flex items-center gap-5"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.7}}
            >
                <a
                    href="https://github.com/maelseewald"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-(--color-surface) p-3 text-(--color-text) transition-colors hover:bg-(--color-surface-hover)"
                    aria-label="GitHub"
                >
                    <GithubIcon className="h-5 w-5"/>
                </a>
                <a
                    href="https://www.linkedin.com/in/ma%C3%ABl-seewald-40633937a/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-(--color-surface) p-3 text-(--color-text) transition-colors hover:bg-(--color-surface-hover)"
                    aria-label="LinkedIn"
                >
                    <LinkedInIcon className="h-5 w-5"/>
                </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToProjects}
                className="absolute bottom-10 flex flex-col items-center gap-2 text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.6, delay: 1}}
                style={{opacity: scrollOpacity}}
                aria-label="Scroll to projects"
            >
                <span className="text-xs tracking-wider uppercase">Explore</span>
                <motion.div
                    animate={{y: [0, 8, 0]}}
                    transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
                >
                    <ArrowDown className="h-5 w-5"/>
                </motion.div>
            </motion.button>
        </div>
    );
}
