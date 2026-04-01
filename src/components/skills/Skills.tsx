'use client';

import {motion, useInView} from 'motion/react';
import type {ComponentType, SVGProps} from 'react';
import {useRef} from 'react';
import {LiquidGlassCard} from '../../ui/liquid-glass-card.tsx';
import {Heading, SectionTitle, SectionWrapper} from '../../ui/Typography.tsx';
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
    color: string;
    skills: Skill[];
}

const categories: SkillCategory[] = [
    {
        title: 'Frontend',
        color: 'from-blue-700 to-blue-900',
        skills: [
            {name: 'HTML / CSS', level: 95, icon: HtmlCssIcon},
            {name: 'Tailwind CSS', level: 85, icon: TailwindIcon},
            {name: 'React', level: 70, icon: ReactIcon},
            {name: 'TypeScript', level: 70, icon: TypeScriptIcon},
        ],
    },
    {
        title: 'Backend',
        color: 'from-sky-700 to-blue-800',
        skills: [
            {name: 'Node.js', level: 80, icon: NodejsIcon},
            {name: 'REST APIs', level: 80, icon: RestApiIcon},
            {name: 'Java', level: 75, icon: JavaIcon},
            {name: 'SQL', level: 70, icon: SqlIcon},
        ],
    },
    {
        title: 'Tools & Workflow',
        color: 'from-slate-600 to-blue-900',
        skills: [
            {name: 'VS Code / IntelliJ', level: 90, icon: IdeIcon},
            {name: 'Git', level: 80, icon: GitIcon},
            {name: 'Docker', level: 55, icon: DockerIcon},
            {name: 'CI/CD', level: 30, icon: CiCdIcon},
        ],
    },
];

function SkillChip({skill, color}: { skill: Skill; color: string }) {
    const Icon = skill.icon;
    const filledDots = Math.round(skill.level / 20);

    return (
        <div className="flex items-center gap-2.5 rounded-xl border border-(--color-surface-hover) bg-(--color-surface) px-3 py-2.5 transition-colors hover:bg-(--color-surface-hover)">
            <Icon className="h-4 w-4 shrink-0 text-(--color-text-muted)"/>
            <span className="text-sm font-medium text-(--color-text)">{skill.name}</span>
            <div className="ml-auto flex gap-1">
                {Array.from({length: 5}).map((_, idx) => (
                    <span
                        key={idx}
                        className={`h-1.5 w-1.5 rounded-full ${idx < filledDots ? `bg-linear-to-r ${color}` : 'bg-(--color-surface-hover)'}`}
                    />
                ))}
            </div>
        </div>
    );
}

function CategoryCard({category, index}: { category: SkillCategory; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, margin: '-60px'});

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 32}}
            animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 32}}
            transition={{duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1]}}
        >
            <LiquidGlassCard
                draggable={false}
                expandable={false}
                blurIntensity="xl"
                glowIntensity="sm"
                shadowIntensity="sm"
                borderRadius="18px"
                className="w-full"
            >
                <div className="relative z-30 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className={`h-1 w-6 rounded-full bg-linear-to-r ${category.color}`}/>
                        <Heading as="h3" size="md">
                            {category.title}
                        </Heading>
                    </div>
                    <div className="flex flex-col gap-2">
                        {category.skills.map((skill) => (
                            <SkillChip
                                key={skill.name}
                                skill={skill}
                                color={category.color}
                            />
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
            <SectionTitle subtitle="What I Work With">Skills</SectionTitle>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, i) => (
                    <CategoryCard key={category.title} category={category} index={i}/>
                ))}
            </div>
        </SectionWrapper>
    );
}
