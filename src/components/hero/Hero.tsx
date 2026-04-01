'use client';

import {motion, useScroll, useTransform} from 'motion/react';
import {ArrowDown, ExternalLink, Mail} from 'lucide-react';
import {GithubIcon} from '../svg/GithubIcon';
import {LinkedInIcon} from '../svg/LinkedInIcon';

export default function Hero() {
    const {scrollYProgress} = useScroll();
    const scrollOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6">
            {/* Available badge */}
            <motion.div
                className="mb-8 flex items-center gap-2 rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-4 py-1.5"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.1}}
            >
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"/>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/>
                </span>
                <span className="text-xs font-medium tracking-wide text-(--color-text-muted)">
                    Open to work
                </span>
            </motion.div>

            {/* Name */}
            <motion.h1
                className="text-center text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl lg:text-9xl bg-linear-to-br from-gray-900 via-gray-700 to-blue-900 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-blue-300"
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
            >
                Mael Seewald
            </motion.h1>

            {/* Role */}
            <motion.p
                className="mt-5 text-center text-base font-medium uppercase tracking-[0.2em] text-(--color-text-muted) sm:text-lg"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.38}}
            >
                Frontend Developer &nbsp;·&nbsp; Design Enthusiast &nbsp;·&nbsp; Student
            </motion.p>

            {/* Description */}
            <motion.p
                className="mt-6 max-w-md text-center text-base leading-relaxed text-(--color-text-muted)"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.5}}
            >
                Building modern, performant web applications with a focus on clean
                design and great user experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.62}}
            >
                <button
                    onClick={() => scrollToSection('projects')}
                    className="flex items-center gap-2 rounded-full bg-(--color-nav-active-bg) px-6 py-2.5 text-sm font-semibold text-(--color-nav-active-text) transition-opacity hover:opacity-80 shadow-[0_0_24px_rgba(30,58,95,0.3)]"
                >
                    <ExternalLink className="h-4 w-4"/>
                    View Projects
                </button>
                <button
                    onClick={() => scrollToSection('contact')}
                    className="flex items-center gap-2 rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-6 py-2.5 text-sm font-semibold text-(--color-text) transition-colors hover:bg-(--color-surface-hover)"
                >
                    <Mail className="h-4 w-4"/>
                    Get in Touch
                </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
                className="mt-8 flex items-center gap-3"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.6, delay: 0.74}}
            >
                <a
                    href="https://github.com/maelseewald"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full p-2.5 text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                    aria-label="GitHub"
                >
                    <GithubIcon className="h-5 w-5"/>
                </a>
                <div className="h-4 w-px bg-(--color-surface-hover)"/>
                <a
                    href="https://www.linkedin.com/in/ma%C3%ABl-seewald-40633937a/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full p-2.5 text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                    aria-label="LinkedIn"
                >
                    <LinkedInIcon className="h-5 w-5"/>
                </a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={() => scrollToSection('projects')}
                className="absolute bottom-10 flex flex-col items-center gap-2 text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.6, delay: 1.1}}
                style={{opacity: scrollOpacity}}
                aria-label="Scroll to projects"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{y: [0, 6, 0]}}
                    transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
                >
                    <ArrowDown className="h-4 w-4"/>
                </motion.div>
            </motion.button>
        </div>
    );
}
