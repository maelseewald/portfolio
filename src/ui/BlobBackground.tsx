export default function BlobBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Top-left – indigo/violet */}
            <div
                className="absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full bg-indigo-400/30 blur-[130px] dark:bg-indigo-600/15"
                style={{ animation: 'blob-drift-a 18s ease-in-out infinite' }}
            />
            {/* Top-right – violet */}
            <div
                className="absolute -right-32 top-16 h-[380px] w-[380px] rounded-full bg-violet-300/25 blur-[110px] dark:bg-violet-500/12"
                style={{ animation: 'blob-drift-b 22s ease-in-out infinite' }}
            />
            {/* Center – indigo (very subtle) */}
            <div
                className="absolute left-1/2 top-[40%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200/20 blur-[160px] dark:bg-indigo-500/8"
                style={{ animation: 'blob-drift-c 28s ease-in-out infinite' }}
            />
            {/* Bottom-left – purple */}
            <div
                className="absolute -bottom-24 left-[8%] h-[420px] w-[420px] rounded-full bg-purple-300/25 blur-[120px] dark:bg-purple-500/12"
                style={{ animation: 'blob-drift-d 20s ease-in-out infinite' }}
            />
            {/* Bottom-right – indigo/blue */}
            <div
                className="absolute bottom-[8%] right-[4%] h-[320px] w-[320px] rounded-full bg-blue-300/20 blur-[100px] dark:bg-blue-500/10"
                style={{ animation: 'blob-drift-e 24s ease-in-out infinite' }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />
        </div>
    );
}
