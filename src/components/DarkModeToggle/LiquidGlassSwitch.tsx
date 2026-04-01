import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';

gsap.registerPlugin(Draggable);

interface DragContext {
    pointerX: number;
    dragBounds: number;
    x: number;
    startX: number;
    complete: number;
    deltaX: number;
    endX?: number;
    __pressTime: number;
    __releaseTime: number;
}

export default function LiquidGlassSwitch() {
    const [dark, setDark] = useState(() =>
        globalThis.matchMedia('(prefers-color-scheme: dark)').matches
    );
    const [pressed, setPressed] = useState(false);
    const [complete, setComplete] = useState(0);
    const [active, setActive] = useState(false);
    const [delta, setDelta] = useState(0);

    const toggleRef = useRef<HTMLButtonElement>(null);
    const proxyRef = useRef<HTMLDivElement>(null);
    const pressedRef = useRef(false);
    const activeRef = useRef(false);

    // Sync dark mode with pressed state
    useEffect(() => {
        const root = document.getElementById('root');
        if (!root) return;
        if (dark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [dark]);

    // Init pressed state from dark mode
    useEffect(() => {
        if (dark) {
            pressedRef.current = true;
            setPressed(true);
            setComplete(100);
            if (toggleRef.current) gsap.set(toggleRef.current, {'--complete': 100});
        }
    }, []);

    useEffect(() => {
        pressedRef.current = pressed;
    }, [pressed]);

    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    useEffect(() => {
        if (!toggleRef.current || !proxyRef.current) return;

        const toggle = toggleRef.current;
        const proxy = proxyRef.current;

        const syncPressed = (nextPressed: boolean) => {
            pressedRef.current = nextPressed;
            setPressed(nextPressed);
            setComplete(nextPressed ? 100 : 0);
            setDark(nextPressed);
            gsap.set(toggle, {'--complete': nextPressed ? 100 : 0});
        };

        const toggleState = async (): Promise<void> => {
            if (activeRef.current) return;

            toggle.dataset.pressed = 'true';
            setActive(true);

            const currentPressed = pressedRef.current;
            const nextPressed = !currentPressed;

            gsap.timeline({
                onComplete: () => {
                    gsap.delayedCall(0.05, () => {
                        setActive(false);
                        delete toggle.dataset.pressed;
                        syncPressed(nextPressed);
                    });
                },
            }).to(toggle, {
                '--complete': nextPressed ? 100 : 0,
                duration: 0.12,
                delay: 0.18,
            });
        };

        const draggableInstances = Draggable.create(proxy, {
            allowContextMenu: true,
            trigger: toggle,
            onDragStart(this: Draggable) {
                const self = this as Draggable & DragContext;
                const toggleBounds = toggle.getBoundingClientRect();
                const currentPressed = pressedRef.current;
                const bounds = currentPressed
                    ? toggleBounds.left - self.pointerX
                    : toggleBounds.left + toggleBounds.width - self.pointerX;
                self.dragBounds = bounds;
                self.complete = currentPressed ? 100 : 0;
                setActive(true);
            },
            onDrag(this: Draggable) {
                const self = this as Draggable & DragContext;
                const currentPressed = pressedRef.current;
                const dragged = self.x - self.startX;
                const newComplete = gsap.utils.clamp(
                    0, 100,
                    currentPressed
                        ? gsap.utils.mapRange(self.dragBounds, 0, 0, 100, dragged)
                        : gsap.utils.mapRange(0, self.dragBounds, 0, 100, dragged)
                );
                self.complete = newComplete;
                setComplete(newComplete);
                gsap.set(toggle, {'--complete': newComplete});
                setDelta(Math.min(Math.abs(self.deltaX), 12));
            },
            onDragEnd(this: Draggable) {
                const self = this as Draggable & DragContext;
                const finalComplete = self.complete >= 50 ? 100 : 0;
                gsap.fromTo(toggle,
                    {'--complete': self.complete},
                    {
                        '--complete': finalComplete,
                        duration: 0.15,
                        onComplete: () => {
                            gsap.delayedCall(0.05, () => {
                                setActive(false);
                                setDelta(0);
                                syncPressed(finalComplete === 100);
                            });
                        },
                    }
                );
            },
            onPress(this: Draggable) {
                const self = this as Draggable & DragContext;
                self.__pressTime = Date.now();
                if ('ontouchstart' in window && navigator.maxTouchPoints > 0) {
                    setActive(true);
                }
            },
            onRelease(this: Draggable) {
                const self = this as Draggable & DragContext;
                self.__releaseTime = Date.now();
                setDelta(0);
                if (
                    'ontouchstart' in window &&
                    navigator.maxTouchPoints > 0 &&
                    ((self.startX !== undefined && self.endX !== undefined && Math.abs(self.endX - self.startX) < 4) || self.endX === undefined)
                ) {
                    setActive(false);
                }
                if (self.__releaseTime - self.__pressTime <= 150) {
                    void toggleState();
                }
            },
        });

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') void toggleState();
            if (e.key === ' ') e.preventDefault();
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === ' ') void toggleState();
        };

        toggle.addEventListener('keydown', handleKeyDown);
        toggle.addEventListener('keyup', handleKeyUp);
        gsap.set(toggle, {'--complete': pressedRef.current ? 100 : 0});

        return () => {
            draggableInstances[0]?.kill();
            toggle.removeEventListener('keydown', handleKeyDown);
            toggle.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <>
            <style>{`
                .liquid-toggle {
                    --unchecked: hsl(218, 8%, 81%);
                    --checked: hsl(var(--hue, 250), calc((8 + (var(--complete) / 100 * 92)) * 1%), calc((81 - (var(--complete) / 100 * (81 - 43))) * 1%));
                    --control: hsl(300, 100%, 100%);
                    --border: 3px;
                    --width: 48;
                    --height: 24;
                    --transition: 0.2s;
                    --ease: ease-out;
                    height: calc(var(--height) * 1px);
                    width: calc(var(--width) * 1px);
                    border-radius: 100px;
                    border: 0;
                    padding: 0;
                    cursor: pointer;
                    position: relative;
                    overflow: visible;
                    container-type: inline-size;
                    background: transparent;
                    outline: none;
                }
                [data-bounce-toggle='true']:has(:is(button:active, [data-pressed="true"])) .liquid-toggle {
                    --transition: 0.6s;
                    --ease: linear(0 0%,0.6091 3.69%,1.0259 7.24%,1.1733 9.05%,1.283 10.92%,1.3562 12.87%,1.3948 14.95%,1.4014 16.03%,1.3999 17.16%,1.3731 19.64%,1.3202 22.27%,1.1394 29.39%,1.0582 33.17%,0.9943 37.45%,0.9734 39.64%,0.9593 41.92%,0.9505 45.08%,0.9517 48.7%,0.9924 63.02%,1.0046 71.2%,1.0061 78.24%,1 100%);
                }
                .liquid-toggle:focus-visible { outline: 2px solid color-mix(in oklch, var(--checked), transparent); outline-offset: 2px; }
                .liquid-toggle:active { outline: none; }
                .liquid-toggle[data-active='true']:focus-visible { outline: 2px solid transparent; }
                .lt-indicator { border-radius:100px; pointer-events:none; height:100%; width:100%; background:var(--checked); position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); }
                .lt-knockout { height:calc(var(--height)*1px); width:calc(var(--width)*1px); border-radius:100px; filter:url(#lt-remove-black); position:absolute; inset:0; transform:translate3d(0,0,0); }
                .lt-indicator--masked { background:var(--checked); z-index:12; height:100%; width:100%; transform:translate(-50%,-50%); container-type:inline-size; transition:background calc(var(--transition)*0.5) ease-out; }
                .lt-mask { position:absolute; height:calc(100% - (2*var(--border))); width:calc(60% - (2*var(--border))); top:50%; background:#000; left:var(--border); border-radius:100px; transform:translate(calc((var(--complete)/100)*(100cqi - 60cqi)),-50%); transition-property:height,width,margin; transition-duration:var(--transition); transition-timing-function:var(--ease); }
                .lt-wrapper { position:absolute; inset:0; border-radius:100px; clip-path:inset(0 0 0 0 round 100px); filter:blur(4px); transition:filter var(--transition) var(--ease); }
                .lt-liquids { position:absolute; inset:0; transform:translate3d(0,0,0); border-radius:100px; overflow:hidden; filter:url(#lt-goo); }
                .lt-liquid__shadow { position:absolute; inset:0; box-shadow:inset 0 0 2px 2px var(--checked),inset calc(((var(--complete)/100)*6px) + -3px) 0 2px 2px var(--checked); border-radius:100px; transition:box-shadow calc(var(--transition)*0.5) ease-out; }
                .lt-liquid__track { height:calc((var(--height)*1px) - (0*var(--border))); width:calc((var(--width)*1px) - (0*var(--border))); background:var(--checked); border-radius:100px; position:absolute; top:50%; left:0; transform:translate(calc((var(--complete)/100)*(100cqi - 100% - (6*var(--border)))),-50%); transition-property:height,width,filter,left,background; transition-duration:var(--transition); transition-timing-function:var(--ease); }
                .lt-indicator__liquid { position:absolute; height:calc(100% - (2*var(--border))); width:calc(60% - (2*var(--border))); container-type:inline-size; top:50%; background:transparent; left:var(--border); border-radius:100px; transform:translate(calc((var(--complete)/100)*(100cqi - 100% - (2*var(--border)))),-50%); transition:scale var(--transition) var(--ease); }
                .lt-shadow { opacity:0; position:absolute; inset:0; border-radius:100px; box-shadow:1px -1px 1px hsl(0 0% 100%/0.5) inset,0 -1px 1px hsl(0 0% 100%/0.5) inset,-1px -1px 1px hsl(0 0% 100%/0.5) inset,1px 1px 1px hsl(0 0% 30%/0.5) inset,-4px 2px 6px -3px hsl(0 0% 30%/0.25) inset,-1px 1px 4px hsl(0 0% 30%/0.25) inset,-1px -1px 4px hsl(0 0% 60%/0.15),1px 1px 1px hsl(0 0% 30%/0.15),2px 2px 4px hsl(0 0% 30%/0.15),-2px -1px 1px hsl(0 0% 100%/0.25) inset,2px 4px 10px -4px hsl(0 0% 30%/0.5); z-index:20; transition:opacity var(--transition) var(--ease); }
                .lt-cover { position:absolute; inset:0; background:white; border-radius:100px; transition:opacity var(--transition) var(--ease); }
                [data-active='true'] .lt-mask { height:calc((100% - (2*var(--border)))*(1.65 - (var(--delta,0)*0.025))); width:calc((60% - (2*var(--border)))*(1.65 + (var(--delta,0)*0.025))); margin-left:calc((60% - (2*var(--border)))*((.65 + (var(--delta,0)*0.025))*-0.5)); }
                [data-active='true'] .lt-indicator__liquid { scale:calc(1.65 + (var(--delta,0)*0.025)) calc(1.65 - (var(--delta,0)*0.025)); }
                [data-active='true'] .lt-wrapper { filter:blur(0); }
                [data-active='true'] .lt-shadow { opacity:1; }
                [data-active='true'] .lt-cover { opacity:0; }
                [data-active='true'] .lt-liquid__track { left:calc(var(--border)*3); height:calc((var(--height)*1px) - (6*var(--border))); }
                [aria-pressed='true']:not([data-active='true']) .lt-liquid__track { left:calc(var(--border)*6); }
                [data-pressed='true'] .lt-liquid__track { min-height:12px; }
            `}</style>

            <div
                data-bounce-toggle="true"
                data-active={active}
                style={{
                    '--complete': complete,
                    '--hue': 250,
                    '--delta': delta,
                    display: 'flex',
                    alignItems: 'center',
                } as React.CSSProperties}
            >
                <button
                    ref={toggleRef}
                    aria-label="Toggle dark mode"
                    aria-pressed={pressed}
                    className="liquid-toggle"
                    data-active={active}
                >
                    <div className="lt-knockout">
                        <div className="lt-indicator lt-indicator--masked">
                            <div className="lt-mask"/>
                        </div>
                    </div>
                    <div className="lt-indicator__liquid">
                        <div className="lt-shadow"/>
                        <div className="lt-wrapper">
                            <div className="lt-liquids">
                                <div className="lt-liquid__shadow"/>
                                <div className="lt-liquid__track"/>
                            </div>
                        </div>
                        <div className="lt-cover"/>
                    </div>
                </button>
            </div>

            <div
                ref={proxyRef}
                style={{position: 'fixed', inset: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none'}}
            />

            <svg style={{position: 'absolute', width: 0, height: 0}} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="lt-goo">
                        <feGaussianBlur result="blur" in="SourceGraphic" stdDeviation="6"/>
                        <feColorMatrix result="matrix" in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -10"
                                       type="matrix"/>
                        <feComposite result="composite" in="matrix" operator="atop"/>
                    </filter>
                    <filter id="lt-remove-black" colorInterpolationFilters="sRGB">
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -255 -255 -255 0 1"
                                       result="black-pixels"/>
                        <feMorphology in="black-pixels" operator="dilate" radius="0.5" result="smoothed"/>
                        <feComposite in="SourceGraphic" in2="smoothed" operator="out"/>
                    </filter>
                </defs>
            </svg>
        </>
    );
}