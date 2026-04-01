'use client';

import {motion, useInView} from 'motion/react';
import type {ComponentType, SVGProps} from 'react';
import {useRef} from 'react';
import {LiquidGlassCard} from '../../ui/liquid-glass-card.tsx';
import {Heading, SectionTitle, SectionWrapper, Text} from '../../ui/Typography.tsx';
import {
    CiCdIcon,
    DockerIcon,
    GitIcon,
    HtmlCssIcon,
    IdeIcon,
    JavaIcon,
    NodejsIcon,
    ReactIcon,
    RestApiIcon,
    SqlIcon,
    TailwindIcon,
    TypeScriptIcon,
} from '../svg/SkillIcons.tsx';

interface Skill {
    name: string;
    level: number;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

const categories: SkillCategory[] = [
    {
        title: 'Frontend',
        skills: [
            {name: 'React', level: 70, icon: ReactIcon},
            {name: 'TypeScript', level: 70, icon: TypeScriptIcon},
            {name: 'Tailwind CSS', level: 85, icon: TailwindIcon},
            {name: 'HTML / CSS', level: 95, icon: HtmlCssIcon},
        ],
    },
    {
        title: 'Backend',
        skills: [
            {name: 'Node.js', level: 80, icon: NodejsIcon},
            {name: 'Java', level: 75, icon: JavaIcon},
            {name: 'REST APIs', level: 80, icon: RestApiIcon},
            {name: 'SQL', level: 70, icon: SqlIcon},
        ],
    },
    {
        title: 'Tools & Workflow',
        skills: [
            {name: 'Git', level: 80, icon: GitIcon},
            {name: 'Docker', level: 55, icon: DockerIcon},
            {name: 'VS Code / IntelliJ', level: 90, icon: IdeIcon},
            {name: 'CI/CD', level: 10, icon: CiCdIcon},
        ],
    },
];

function SkillBar({skill, delay}: { skill: Skill; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, margin: '-50px'});
    const Icon = skill.icon;

    return (
        <div ref={ref} className="flex items-center gap-4 py-3">
            <Icon className="h-5 w-5 shrink-0 text-(--color-text)"/>
            <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                    <Text size="sm" className="font-medium">{skill.name}</Text>
                    <Text muted size="xs">{skill.level}%</Text>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-(--color-surface)">
                    <motion.div
                        className="h-full rounded-full bg-linear-to-r from-indigo-500 to-purple-500"
                        initial={{width: 0}}
                        animate={isInView ? {width: `${skill.level}%`} : {width: 0}}
                        transition={{duration: 1, delay, ease: 'easeOut'}}
                    />
                </div>
            </div>
        </div>
    );
}

function CategoryCard({category, index}: { category: SkillCategory; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, margin: '-80px'});

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 40}}
            animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 40}}
            transition={{duration: 0.6, delay: index * 0.15, ease: 'easeOut'}}
        >
            <LiquidGlassCard
                draggable={false}
                expandable={false}
                blurIntensity="xl"
                glowIntensity="sm"
                shadowIntensity="sm"
                borderRadius="16px"
                className="w-full"
            >
                <div className="relative z-30 p-6 sm:p-8">
                    <Heading as="h3" size="md" className="mb-6">
                        {category.title}
                    </Heading>
                    <div className="space-y-1">
                        {category.skills.map((skill, i) => (
                            <SkillBar key={skill.name} skill={skill} delay={index * 0.15 + i * 0.08}/>
                        ))}
                    </div>
                </div>
            </LiquidGlassCard>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <SectionWrapper maxWidth="6xl">
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, i) => (
                    <CategoryCard key={category.title} category={category} index={i}/>
                ))}
            </div>
        </SectionWrapper>
    );
}
