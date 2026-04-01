import {motion, type MotionValue, useScroll, useTransform} from "motion/react";
import {useRef} from "react";
import {ExternalLink} from "lucide-react";
import {LiquidGlassCard} from "../../../ui/liquid-glass-card.tsx";
import {Text} from "../../../ui/Typography.tsx";
import {GithubIcon} from "../../svg/GithubIcon.tsx";

interface CardProps {
    i: number;
    title: string;
    description: string;
    imageUrl: string;
    tags?: string[];
    githubUrl?: string;
    projectUrl?: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
}

export function StackCard({
                              i,
                              title,
                              description,
                              imageUrl,
                              tags,
                              githubUrl,
                              projectUrl,
                              progress,
                              range,
                              targetScale,
                          }: Readonly<CardProps>) {
    const container = useRef<HTMLDivElement | null>(null);

    const {scrollYProgress} = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });
    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className="relative flex justify-center py-3 lg:sticky lg:top-0 lg:h-screen lg:items-center lg:py-0"
        >
            <motion.div
                style={{scale, top: `calc(0vh + ${i * 25}px)`}}
                className="relative w-[92%] origin-top sm:w-[85%] lg:w-[72%]"
            >
                {/* Glow border wrapper */}
                <div
                    className="rounded-[20px] p-px"
                    style={{
                        background: 'linear-gradient(135deg, rgba(30,58,95,0.35) 0%, rgba(91,138,184,0.15) 50%, rgba(30,58,95,0.05) 100%)',
                        boxShadow: '0 0 40px rgba(30,58,95,0.12), 0 0 80px rgba(30,58,95,0.06)',
                    }}
                >
                    <LiquidGlassCard
                        draggable={false}
                        expandable={false}
                        blurIntensity="xl"
                        glowIntensity="md"
                        shadowIntensity="md"
                        borderRadius="20px"
                        className="w-full"
                    >
                        <div className="relative z-30 w-full p-4 sm:p-6 lg:p-8">

                            {/* Ghost number */}
                            <div
                                className="pointer-events-none absolute right-6 top-4 select-none font-bold leading-none text-blue-800/10 dark:text-blue-400/8"
                                style={{fontSize: 'clamp(60px, 8vw, 140px)'}}
                                aria-hidden="true"
                            >
                                {String(i + 1).padStart(2, '0')}
                            </div>

                            {/* Responsive layout: column on mobile, row on desktop */}
                            <div className="flex flex-col gap-4 lg:h-[58vh] lg:flex-row lg:gap-6">

                                {/* Description & Links */}
                                <div className="flex flex-col gap-4 lg:w-[38%] lg:justify-between lg:py-2">
                                    <div className="flex flex-col gap-4">
                                        <Text muted size="sm" className="leading-loose">{description}</Text>

                                        {tags && tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-2.5 py-0.5 text-xs font-medium text-(--color-text-muted)"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-row gap-2">
                                        {githubUrl && (
                                            <a
                                                href={githubUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 rounded-full border border-(--color-surface-hover) bg-(--color-surface) px-3 py-1.5 text-xs font-medium text-(--color-text) transition-colors hover:bg-(--color-surface-hover)"
                                            >
                                                <GithubIcon className="h-3.5 w-3.5"/>
                                                Code
                                            </a>
                                        )}
                                        {projectUrl && (
                                            <a
                                                href={projectUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 rounded-full bg-(--color-nav-active-bg) px-3 py-1.5 text-xs font-medium text-(--color-nav-active-text) transition-opacity hover:opacity-80"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5"/>
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative h-48 w-full overflow-hidden rounded-2xl sm:h-64 lg:h-full lg:w-[62%]">
                                    <motion.div className="absolute inset-0" style={{scale: imageScale}}>
                                        <img
                                            src={imageUrl}
                                            alt={title}
                                            className="h-full w-full object-cover"
                                        />
                                    </motion.div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                                        <h2 className="text-xl font-bold leading-tight text-white drop-shadow-lg sm:text-2xl lg:text-3xl">
                                            {title}
                                        </h2>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </LiquidGlassCard>
                </div>
            </motion.div>
        </div>
    );
}
