'use client';

import {useState} from 'react';
import {CheckCircle, Mail, MapPin, Send} from 'lucide-react';
import {LiquidGlassCard} from '../../ui/liquid-glass-card.tsx';
import {GithubIcon} from '../svg/GithubIcon';
import {LinkedInIcon} from '../svg/LinkedInIcon';
import {AnimatedBlock, Label, SectionTitle, SectionWrapper, Text} from '../../ui/Typography.tsx';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <SectionWrapper>
            <SectionTitle>Contact</SectionTitle>

            <div className="mt-12 grid gap-12 lg:grid-cols-2">
                {/* Left – Info */}
                <AnimatedBlock delay={0}>
                    <div className="flex flex-col gap-8">
                        <Text muted size="lg" className="max-w-md">
                            Got an idea, a project or just want to say hello?
                            Feel free to reach out – I'd love to hear from you.
                        </Text>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-(--color-surface) p-2.5">
                                    <Mail className="h-4 w-4 text-(--color-text)"/>
                                </div>
                                <a href="mailto:maelseewald@gmx.net"
                                   className="text-sm text-(--color-text) transition-colors hover:text-(--color-text-muted)">
                                    maelseewald@gmx.net
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-(--color-surface) p-2.5">
                                    <MapPin className="h-4 w-4 text-(--color-text)"/>
                                </div>
                                <Text size="sm">Switzerland</Text>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
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
                        </div>
                    </div>
                </AnimatedBlock>

                {/* Right – Form */}
                <AnimatedBlock delay={0.15}>
                    <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        blurIntensity="xl"
                        glowIntensity="sm"
                        shadowIntensity="sm"
                        borderRadius="16px"
                        className="w-full"
                    >
                        <form onSubmit={handleSubmit} className="relative z-30 flex flex-col gap-5 p-6 sm:p-8">
                            <div className="flex flex-col gap-1.5">
                                <Label>Name</Label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Your name"
                                    className="rounded-lg border border-(--color-surface-hover) bg-transparent px-4 py-2.5 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted) focus:border-(--color-text-muted)"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label>Email</Label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    className="rounded-lg border border-(--color-surface-hover) bg-transparent px-4 py-2.5 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted) focus:border-(--color-text-muted)"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label>Message</Label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    placeholder="Your message..."
                                    className="resize-none rounded-lg border border-(--color-surface-hover) bg-transparent px-4 py-2.5 text-sm text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-muted) focus:border-(--color-text-muted)"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitted}
                                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-(--color-nav-active-bg) px-6 py-2.5 text-sm font-medium text-(--color-nav-active-text) transition-opacity hover:opacity-80 disabled:opacity-60"
                            >
                                {submitted ? (
                                    <>
                                        <CheckCircle className="h-4 w-4"/>
                                        Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4"/>
                                        Send
                                    </>
                                )}
                            </button>
                        </form>
                    </LiquidGlassCard>
                </AnimatedBlock>
            </div>
        </SectionWrapper>
    );
}
