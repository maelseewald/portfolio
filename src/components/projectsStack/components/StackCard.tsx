import {motion, type MotionValue, useScroll, useTransform} from "motion/react";
import {useRef} from "react";
import {LiquidGlassCard} from "../../../ui/liquid-glass-card.tsx";
import {Heading, Text} from "../../../ui/Typography.tsx";
import {GithubIcon} from "../../svg/GithubIcon.tsx";
import {WebIcon} from "../../svg/WebIcon.tsx";

interface CardProps {
    i: number;
    title: string;
    description: string;
    imageUrl: string;
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
            className="sticky top-0 flex h-screen items-center justify-center"
        >

            <motion.div
                style={{
                    scale,
                    top: `calc(0vh + ${i * 25}px)`,
                    width: '70%',
                }}
                className="relative top-[25%] origin-top"
            >
                <LiquidGlassCard
                    draggable={false}
                    expandable={false}
                    blurIntensity="xl"
                    glowIntensity="md"
                    shadowIntensity="md"
                    borderRadius="16px"
                    className="w-full"
                >
                    <div className="relative z-30 flex h-[60vh] w-full gap-8 p-2 sm:p-4 lg:p-10">
                        <div className="flex w-[40%] flex-col justify-between">
                            <div>
                                <Heading as="h2" size="lg">{title}</Heading>
                                <Text muted size="sm" className="mt-6">{description}</Text>
                            </div>
                            <div className="mt-3 flex flex-row gap-2">
                                {githubUrl && (
                                    <a
                                        href={githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block text-(--color-text) underline underline-offset-2"
                                    >
                                        <GithubIcon className="w-6 h-6"/>
                                    </a>
                                )}
                                {projectUrl && (
                                    <a
                                        href={projectUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block text-(--color-text) underline underline-offset-2"
                                    >
                                        <WebIcon className="w-6 h-6"/>
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="relative h-full w-[60%] overflow-hidden rounded-xl">
                            <motion.div className="h-full w-full" style={{scale: imageScale}}>
                                <img src={imageUrl} alt={title} className="h-full w-full object-cover"/>
                            </motion.div>
                        </div>
                    </div>
                </LiquidGlassCard>
            </motion.div>
        </div>
    );
}