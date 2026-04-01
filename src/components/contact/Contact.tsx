'use client';

import {useRef, useState} from 'react';
import {CheckCircle, Mail, MapPin, Send, AlertCircle, Loader2} from 'lucide-react';
import emailjs from '@emailjs/browser';
import {LiquidGlassCard} from '../../ui/liquid-glass-card.tsx';
import {GithubIcon} from '../svg/GithubIcon';
import {LinkedInIcon} from '../svg/LinkedInIcon';
import {AnimatedBlock, Label, SectionTitle, SectionWrapper, Text} from '../../ui/Typography.tsx';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        const form = formRef.current;
        const name = (form.elements.namedItem('from_name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('from_email') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

        setStatus('sending');

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name,
                    email,
                    message,
                    title: `Portfolio Contact from ${name}`,
                    time: new Date().toLocaleString('de-CH'),
                },
                {publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY},
            );
            setStatus('success');
            formRef.current.reset();
            setTimeout(() => setStatus('idle'), 4000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 4000);
        }
    };

    const inputClass =
        'rounded-xl border border-(--color-surface-hover) bg-(--color-surface) px-4 py-3 text-sm text-(--color-text) outline-none transition-all placeholder:text-(--color-text-muted) focus:border-(--color-accent) focus:bg-(--color-accent-muted)';

    return (
        <SectionWrapper>
            <SectionTitle subtitle="Let's Talk">Contact</SectionTitle>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
                {/* Left – Info */}
                <AnimatedBlock delay={0}>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <Text size="lg" className="font-semibold">Have a project in mind?</Text>
                            <Text muted size="base" className="max-w-sm leading-loose">
                                Whether it's a collaboration, an idea you want to build, or just a
                                hello — feel free to reach out. I'll get back to you as soon as I can.
                            </Text>
                        </div>

                        {/* Contact Details */}
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:maelseewald@gmx.net"
                                className="group flex items-center gap-3"
                            >
                                <div className="rounded-xl bg-(--color-accent-muted) p-2.5">
                                    <Mail className="h-4 w-4 text-(--color-accent)"/>
                                </div>
                                <span className="text-sm text-(--color-text) transition-colors group-hover:text-(--color-accent)">
                                    maelseewald@gmx.net
                                </span>
                            </a>
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-(--color-surface) p-2.5">
                                    <MapPin className="h-4 w-4 text-(--color-text-muted)"/>
                                </div>
                                <Text size="sm" muted>Switzerland</Text>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-12 bg-(--color-surface-hover)"/>

                        {/* Social Links */}
                        <div className="flex flex-col gap-2">
                            <Text muted size="xs" className="uppercase tracking-widest">Find me on</Text>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://github.com/maelseewald"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-4 py-2 text-sm text-(--color-text) transition-colors hover:bg-(--color-surface-hover)"
                                    aria-label="GitHub"
                                >
                                    <GithubIcon className="h-4 w-4"/>
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ma%C3%ABl-seewald-40633937a/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-4 py-2 text-sm text-(--color-text) transition-colors hover:bg-(--color-surface-hover)"
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon className="h-4 w-4"/>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </AnimatedBlock>

                {/* Right – Form */}
                <AnimatedBlock delay={0.12}>
                    <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        blurIntensity="xl"
                        glowIntensity="sm"
                        shadowIntensity="sm"
                        borderRadius="20px"
                        className="w-full"
                    >
                        <form ref={formRef} onSubmit={handleSubmit} className="relative z-30 flex flex-col gap-4 p-6 sm:p-8">
                            <div className="flex flex-col gap-1.5">
                                <Label>Name</Label>
                                <input
                                    id="name"
                                    name="from_name"
                                    type="text"
                                    required
                                    placeholder="Your name"
                                    className={inputClass}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label>Email</Label>
                                <input
                                    id="email"
                                    name="from_email"
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    className={inputClass}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label>Message</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="What's on your mind?"
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    <AlertCircle className="h-4 w-4 shrink-0"/>
                                    Something went wrong. Please try again or email me directly.
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-(--color-nav-active-bg) px-6 py-3 text-sm font-semibold text-(--color-nav-active-text) transition-opacity hover:opacity-80 disabled:opacity-60"
                            >
                                {status === 'sending' && (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                        Sending…
                                    </>
                                )}
                                {status === 'success' && (
                                    <>
                                        <CheckCircle className="h-4 w-4"/>
                                        Sent!
                                    </>
                                )}
                                {(status === 'idle' || status === 'error') && (
                                    <>
                                        <Send className="h-4 w-4"/>
                                        Send Message
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
