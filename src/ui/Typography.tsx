'use client';

import {motion, useInView} from 'motion/react';
import {useRef} from 'react';
import {cn} from '../../lib/utils';

interface AnimatedBlockProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export function AnimatedBlock({children, delay = 0, className}: AnimatedBlockProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, margin: '-60px'});

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 30}}
            animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
            transition={{duration: 0.6, delay, ease: 'easeOut'}}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface SectionTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function SectionTitle({children, className}: SectionTitleProps) {
    return (
        <div className={cn('flex items-center justify-center py-8', className)}>
            <h2 className="text-5xl font-bold text-(--color-text) md:text-7xl">
                {children}
            </h2>
        </div>
    );
}

interface HeadingProps {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function Heading({children, as: Tag = 'h3', size = 'md', className}: HeadingProps) {
    const sizes = {
        sm: 'text-lg font-semibold',
        md: 'text-xl font-bold',
        lg: 'text-2xl font-bold',
        xl: 'text-3xl font-bold',
    };

    return (
        <Tag className={cn(sizes[size], 'text-(--color-text)', className)}>
            {children}
        </Tag>
    );
}

interface TextProps {
    children: React.ReactNode;
    muted?: boolean;
    size?: 'xs' | 'sm' | 'base' | 'lg';
    className?: string;
}

export function Text({children, muted = false, size = 'base', className}: TextProps) {
    const sizes = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
    };

    return (
        <p className={cn(
            sizes[size],
            muted ? 'text-(--color-text-muted)' : 'text-(--color-text)',
            'leading-relaxed',
            className,
        )}>
            {children}
        </p>
    );
}

interface LabelProps {
    children: React.ReactNode;
    className?: string;
}

export function Label({children, className}: LabelProps) {
    return (
        <span className={cn(
            'text-xs font-medium uppercase tracking-wider text-(--color-text-muted)',
            className,
        )}>
            {children}
        </span>
    );
}

interface SectionWrapperProps {
    children: React.ReactNode;
    maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | '5xl' | '6xl';
    className?: string;
}

export function SectionWrapper({children, maxWidth = '5xl', className}: SectionWrapperProps) {
    const widths = {
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
    };

    return (
        <div className={cn('mx-auto w-full px-6 py-20', widths[maxWidth], className)}>
            {children}
        </div>
    );
}
