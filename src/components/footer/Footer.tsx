'use client';

import {GithubIcon} from '../svg/GithubIcon';
import {LinkedInIcon} from '../svg/LinkedInIcon';
import {Text} from '../../ui/Typography.tsx';

export default function Footer() {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({behavior: 'smooth'});
    };

    return (
        <footer className="w-full border-t border-(--color-surface) px-6 pb-8 pt-12">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
                    {/* Brand */}
                    <div className="flex flex-col gap-1.5">
                        <Text size="sm" className="font-bold tracking-tight">
                            Mael Seewald
                        </Text>
                        <Text muted size="xs">
                            Frontend Developer · Switzerland
                        </Text>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        {[
                            {label: 'Home', id: 'home'},
                            {label: 'Projects', id: 'projects'},
                            {label: 'About', id: 'about'},
                            {label: 'Skills', id: 'skills'},
                            {label: 'Contact', id: 'contact'},
                        ].map(({label, id}) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className="text-xs uppercase tracking-wider text-(--color-text-muted) transition-colors hover:text-(--color-text)"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {/* Social */}
                    <div className="flex items-center gap-4">
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

                {/* Bottom */}
                <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-(--color-surface) pt-6 sm:flex-row">
                    <Text muted size="xs">
                        © 2026 Mael Seewald. All rights reserved.
                    </Text>
                    <Text muted size="xs">
                        Built with React & TypeScript
                    </Text>
                </div>
            </div>
        </footer>
    );
}
