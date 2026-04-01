'use client';

import {Calendar, GraduationCap, Heart, Languages, MapPin} from 'lucide-react';
import {LiquidGlassCard} from '../../ui/liquid-glass-card.tsx';
import {AnimatedBlock, Heading, SectionTitle, SectionWrapper, Text} from '../../ui/Typography.tsx';

const facts = [
    {icon: Calendar, label: 'Age', value: '17 Years'},
    {icon: MapPin, label: 'Location', value: 'Switzerland'},
    {icon: GraduationCap, label: 'Studies', value: 'Computer Science'},
    {icon: Heart, label: 'Focus', value: 'Application dev'},
    {icon: Languages, label: 'Languages', value: 'DE, EN, FR'},
];

export default function About() {
    return (
        <SectionWrapper>
            <SectionTitle>About</SectionTitle>

            <div className="mt-12 flex flex-col items-center gap-12 lg:flex-row lg:items-start">
                <AnimatedBlock delay={0}>
                    <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        blurIntensity="xl"
                        glowIntensity="md"
                        shadowIntensity="sm"
                        borderRadius="16px"
                        className="w-64 shrink-0"
                    >
                        <div
                            className="relative z-30 flex aspect-square items-center justify-center overflow-hidden rounded-2xl">
                            <div className="flex h-full w-full items-center justify-center bg-(--color-surface)">
                                <span className="text-6xl font-bold text-(--color-text-muted)">MS</span>
                            </div>
                        </div>
                    </LiquidGlassCard>
                </AnimatedBlock>

                {/* Bio-Text */}
                <AnimatedBlock delay={0.15}>
                    <div className="flex flex-col gap-6">
                        <Heading as="h3" size="lg">
                            Hi, I'm Mael
                        </Heading>
                        <Text muted className="max-w-xl">
                            I'm a passionate developer focused on modern web technologies.
                            My goal is to build intuitive and performant applications that not only
                            convince technically but also inspire visually.
                        </Text>
                        <Text muted className="max-w-xl">
                            Currently studying Computer Science while working on personal projects
                            to continuously expand my skills. I value clean code, thoughtful
                            architecture and a keen eye for detail.
                        </Text>
                    </div>
                </AnimatedBlock>
            </div>

            {/* Quick Facts Grid */}
            <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                {facts.map((fact, i) => (
                    <AnimatedBlock key={fact.label} delay={0.3 + i * 0.08}>
                        <LiquidGlassCard
                            draggable={false}
                            expandable={false}
                            blurIntensity="lg"
                            glowIntensity="sm"
                            shadowIntensity="sm"
                            borderRadius="12px"
                            className="w-full"
                        >
                            <div className="relative z-30 flex flex-col items-center gap-2 p-5 text-center">
                                <fact.icon className="h-5 w-5 text-(--color-text-muted)"/>
                                <Text muted size="xs">{fact.label}</Text>
                                <Text size="sm" className="font-semibold">{fact.value}</Text>
                            </div>
                        </LiquidGlassCard>
                    </AnimatedBlock>
                ))}
            </div>
        </SectionWrapper>
    );
}
