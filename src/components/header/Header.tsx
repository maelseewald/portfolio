import {useEffect, useState} from "react";
import {LiquidGlassCard} from "../../ui/liquid-glass-card.tsx";
import {cn} from "../../lib/utils";
import {FolderKanban, Home, Mail, User, Wrench} from "lucide-react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.tsx";

const Header = ({className}: { className?: string }) => {
    const [active, setActive] = useState("Home");

    useEffect(() => {
        const sections = ['home', 'projects', 'about', 'skills', 'contact'];
        const labels: Record<string, string> = {
            home: 'Home', projects: 'Projects', about: 'About', skills: 'Skills', contact: 'Contact',
        };

        const onScroll = () => {
            const scrollY = window.scrollY + window.innerHeight * 0.4;
            let current = 'home';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollY) current = id;
            }
            setActive(labels[current]);
        };

        window.addEventListener('scroll', onScroll, {passive: true});
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className={cn("w-full flex items-center justify-center fixed z-50", className)} style={{paddingTop: `calc(1.25rem + env(safe-area-inset-top))`, paddingBottom: '1.25rem'}}>
            <LiquidGlassCard
                glowIntensity="sm"
                shadowIntensity="sm"
                borderRadius="999px"
                blurIntensity="md"
                className="px-5 py-2.5 max-w-4xl"
            >
                <nav className="flex items-center justify-between gap-1 w-full relative z-30">
                    <NavItem icon={Home} label="Home" active={active === "Home"} onClick={() => { setActive("Home"); scrollTo("home"); }}/>
                    <NavItem icon={FolderKanban} label="Projects" active={active === "Projects"} onClick={() => { setActive("Projects"); scrollTo("projects"); }}/>
                    <NavItem icon={User} label="About" active={active === "About"} onClick={() => { setActive("About"); scrollTo("about"); }}/>
                    <NavItem icon={Wrench} label="Skills" active={active === "Skills"} onClick={() => { setActive("Skills"); scrollTo("skills"); }}/>
                    <NavItem icon={Mail} label="Contact" active={active === "Contact"} onClick={() => { setActive("Contact"); scrollTo("contact"); }}/>
                    <div className="ml-1">
                        <DarkModeToggle/>
                    </div>
                </nav>
            </LiquidGlassCard>
        </div>
    );
};

const NavItem = ({icon: Icon, label, active = false, onClick}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-full text-sm transition-all",
                active
                    ? "bg-(--color-nav-active-bg) text-(--color-nav-active-text) font-semibold shadow-sm"
                    : "text-(--color-nav-text) hover:bg-(--color-surface-hover)"
            )}
        >
            <Icon className="w-4 h-4 shrink-0"/>
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
};

export default Header;
