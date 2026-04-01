import {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';

function DarkModeToggle() {
    const [dark, setDark] = useState(() =>
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark(d => !d)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all bottom-6 right-6 z-50 rounded-full bg-(--color-surface) p-3 backdrop-blur-md transition-colors hover:bg-(--color-surface-hover)"
            aria-label="Toggle dark mode"
        >
            {dark
                ? <Sun className="h-5 w-5 text-white"/>
                : <Moon className="h-5 w-5 text-black"/>
            }
        </button>

    );
}

export default DarkModeToggle;