'use client';

import {GithubIcon} from '../svg/GithubIcon';
import {LinkedInIcon} from '../svg/LinkedInIcon';
import {Text} from '../../ui/Typography.tsx';

export default function Footer() {
    return (
        <footer className="w-full border-t border-(--color-surface) px-6 py-10">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
                {/* Logo / Name */}
                <Text size="sm" className="font-semibold tracking-wide">
                    Mael Seewald
                </Text>

                {/* Navigation */}
                <nav className="flex flex-wrap justify-center gap-6">
                    {['Home', 'Projects', 'About', 'Skills', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-xs uppercase tracking-wider text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                    <a
                        href="https://github.com/maelseewald"
                        target="_blank"
                        rel="noreferrer"
                        className="text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                        aria-label="GitHub"
                    >
                        <GithubIcon className="h-4 w-4"/>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ma%C3%ABl-seewald-40633937a/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon className="h-4 w-4"/>
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center">
                <Text muted size="xs">
                    © 2025 Mael Seewald. All rights reserved.
                </Text>
            </div>
        </footer>
    );
}
