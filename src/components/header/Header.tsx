import {useState} from "react";
import {LiquidGlassCard} from "../../ui/liquid-glass-card.tsx";
import {cn} from "../../lib/utils";

import {FolderKanban, Home, Mail, User, Wrench,} from "lucide-react";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle.tsx";

const Header = ({className}: { className?: string }) => {
    const [active, setActive] = useState("Home");

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <div
            className={cn(
                "w-full flex items-center justify-center py-6 fixed z-50",
                className
            )}
        >
            <LiquidGlassCard
                glowIntensity="sm"
                shadowIntensity="sm"
                borderRadius="999px"
                blurIntensity="sm"
                className="px-6 py-3 max-w-4xl"
            >
                <nav className="flex items-center justify-between gap-2 w-full relative z-30">
                    <NavItem
                        icon={Home}
                        label="Home"
                        active={active === "Home"}
                        onClick={() => {
                            setActive("Home");
                            scrollTo("home");
                        }}
                    />
                    <NavItem
                        icon={FolderKanban}
                        label="Projects"
                        active={active === "Projects"}
                        onClick={() => {
                            setActive("Projects");
                            scrollTo("projects");
                        }}
                    />
                    <NavItem
                        icon={User}
                        label="About"
                        active={active === "About"}
                        onClick={() => {
                            setActive("About");
                            scrollTo("about");
                        }}
                    />
                    <NavItem
                        icon={Wrench}
                        label="Skills"
                        active={active === "Skills"}
                        onClick={() => {
                            setActive("Skills");
                            scrollTo("skills");
                        }}
                    />
                    <NavItem
                        icon={Mail}
                        label="Contact"
                        active={active === "Contact"}
                        onClick={() => {
                            setActive("Contact");
                            scrollTo("contact");
                        }}/>

                    <DarkModeToggle/>

                </nav>
            </LiquidGlassCard>
        </div>
    );
};

const NavItem = ({
                     icon: Icon,
                     label,
                     active = false,
                     onClick,
                 }: {
    icon: any;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all",
                active
                    ? "bg-(--color-nav-active-bg) text-(--color-nav-active-text) font-medium shadow"
                    : "text-(--color-nav-text) hover:bg-(--color-surface-hover)"
            )}
        >
            <Icon className="w-4 h-4"/>
            <span className="hidden sm:inline">{label}</span>
        </button>
    );
};
export default Header;