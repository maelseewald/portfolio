'use client';

import {Calendar, GraduationCap, Heart, Languages, MapPin} from 'lucide-react';
import {LiquidGlassCard} from '../../ui/liquid-glass-card.tsx';
import {AnimatedBlock, Heading, SectionTitle, SectionWrapper, Text} from '../../ui/Typography.tsx';

const facts = [
    {icon: Calendar, label: 'Age', value: '17'},
    {icon: MapPin, label: 'Location', value: 'Switzerland'},
    {icon: GraduationCap, label: 'Studies', value: 'CS Student'},
    {icon: Heart, label: 'Focus', value: 'App Dev'},
    {icon: Languages, label: 'Languages', value: 'DE · EN · FR'},
];

export default function About() {
    return (
        <SectionWrapper>
            <SectionTitle subtitle="About Me">About</SectionTitle>

            <div className="mt-14 flex flex-col items-center gap-14 lg:flex-row lg:items-start">
                {/* Avatar */}
                <AnimatedBlock delay={0} className="shrink-0">
                    <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        blurIntensity="xl"
                        glowIntensity="md"
                        shadowIntensity="sm"
                        borderRadius="20px"
                        className="w-56"
                    >
                        <div className="relative z-30 aspect-square overflow-hidden rounded-[20px]">
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-(--color-surface)">
                                <span className="text-5xl font-bold tracking-tight text-(--color-text-muted)">MS</span>
                                <span className="text-xs font-medium uppercase tracking-widest text-(--color-text-muted) opacity-60">
                                    Mael Seewald
                                </span>
                            </div>
                        </div>
                    </LiquidGlassCard>
                </AnimatedBlock>

                {/* Bio */}
                <AnimatedBlock delay={0.15}>
                    <div className="flex flex-col gap-5">
                        <Heading as="h3" size="xl">
                            Hi, I'm Mael 👋
                        </Heading>
                        <Text muted className="max-w-xl leading-loose">
                            I'm a 17-year-old developer from Switzerland with a passion for building
                            beautiful, functional web applications. I focus on writing clean code that not
                            only works well but also looks great.
                        </Text>
                        <Text muted className="max-w-xl leading-loose">
                            Currently studying Computer Science while continuously working on personal
                            projects to sharpen my skills. I care deeply about thoughtful architecture,
                            attention to detail, and crafting experiences users actually enjoy.
                        </Text>

                        {/* Tags */}
                        <div className="mt-1 flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Node.js', 'Java', 'UI/UX', 'Clean Code'].map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-3 py-1 text-xs font-medium text-(--color-text-muted)"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </AnimatedBlock>
            </div>

            {/* Quick Facts */}
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {facts.map((fact, i) => (
                    <AnimatedBlock key={fact.label} delay={0.28 + i * 0.07}>
                        <LiquidGlassCard
                            draggable={false}
                            expandable={false}
                            blurIntensity="lg"
                            glowIntensity="sm"
                            shadowIntensity="sm"
                            borderRadius="14px"
                            className="w-full"
                        >
                            <div className="relative z-30 flex flex-col items-center gap-2.5 p-5 text-center">
                                <fact.icon className="h-4 w-4 text-(--color-accent)"/>
                                <Text muted size="xs" className="uppercase tracking-wider">{fact.label}</Text>
                                <Text size="sm" className="font-semibold leading-tight">{fact.value}</Text>
                            </div>
                        </LiquidGlassCard>
                    </AnimatedBlock>
                ))}
            </div>
        </SectionWrapper>
    );
}
