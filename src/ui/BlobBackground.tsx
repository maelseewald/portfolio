export default function BlobBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Top-left – purple */}
            <div
                className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-purple-300/50 blur-[120px] animate-pulse dark:bg-purple-600/20"
                style={{animationDuration: '8s'}}
            />
            {/* Top-right – blue */}
            <div
                className="absolute -right-32 top-20 h-100 w-100 rounded-full bg-blue-300/60 blur-[100px] animate-pulse dark:bg-blue-500/15"
                style={{animationDuration: '10s'}}
            />
            {/* Center – indigo */}
            <div
                className="absolute left-1/2 top-1/3 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/50 blur-[140px] animate-pulse dark:bg-indigo-500/10"
                style={{animationDuration: '12s'}}
            />
            {/* Bottom-left – teal */}
            <div
                className="absolute -bottom-32 left-[10%] h-112.5 w-112.5 rounded-full bg-teal-300/40 blur-[110px] animate-pulse dark:bg-teal-400/15"
                style={{animationDuration: '9s'}}
            />
            {/* Bottom-right – rose */}
            <div
                className="absolute bottom-[5%] right-[5%] h-87.5 w-87.5 rounded-full bg-rose-300/20 blur-[100px] animate-pulse dark:bg-rose-500/10"
                style={{animationDuration: '11s'}}
            />
            {/* Mid-left – emerald */}
            <div
                className="absolute left-[5%] top-[60%] h-75 w-75 rounded-full bg-emerald-300/20 blur-[90px] animate-pulse dark:bg-emerald-500/10"
                style={{animationDuration: '14s'}}
            />
        </div>
    );
}