import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import type {Feature, FeatureCollection, MultiLineString} from "geojson";

const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const TOPOJSON_URL = "https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js";

interface TopojsonClient {
    feature: (topology: unknown, object: unknown) => FeatureCollection | Feature;
    mesh: (
        topology: unknown,
        object: unknown,
        filter?: (a: unknown, b: unknown) => boolean
    ) => MultiLineString;
}

declare global {
    interface Window {
        topojson?: TopojsonClient;
    }
}

let topojsonPromise: Promise<TopojsonClient | null> | null = null;

function loadTopojson(): Promise<TopojsonClient | null> {
    if (typeof window === "undefined") return Promise.resolve(null);
    if (window.topojson) return Promise.resolve(window.topojson);
    if (topojsonPromise) return topojsonPromise;
    topojsonPromise = new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = TOPOJSON_URL;
        s.onload = () => resolve(window.topojson ?? null);
        s.onerror = () => reject(new Error("Failed to load topojson-client"));
        document.head.appendChild(s);
    });
    return topojsonPromise;
}

interface WorldData {
    countries: FeatureCollection | Feature;
    borders: MultiLineString;
    highlightedCountry?: Feature;
}

export interface GlobeLoaderProps {
    size?: number;
}

export default function GlobeLoader({
                                        size = 360,
                                    }: Readonly<GlobeLoaderProps>): React.ReactElement {
    const landRef = useRef<SVGPathElement | null>(null);
    const bordersRef = useRef<SVGPathElement | null>(null);
    const gratRef = useRef<SVGPathElement | null>(null);
    const highlightRef = useRef<SVGPathElement | null>(null);
    const [world, setWorld] = useState<WorldData | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const topo = await loadTopojson();
                const data = await fetch(WORLD_URL).then((r) => r.json());
                if (cancelled || !topo) return;
                // The world-atlas topology object has a `countries` collection.
                const countriesObj = data.objects.countries;
                const countries = topo.feature(data, countriesObj) as FeatureCollection;

                const highlightedCountry = countries.features.find(
                    (feature) => String(feature.id) === "756"
                );

                const borders = topo.mesh(
                    data,
                    countriesObj,
                    (a, b) => a !== b
                );

                setWorld({countries, borders, highlightedCountry});
            } catch (err) {
                console.warn("[GlobeLoader] world atlas unavailable:", err);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const W = 200;
        const H = 200;
        const R = 78;
        const projection = d3
            .geoOrthographic()
            .scale(R)
            .translate([W / 2, H / 2])
            .clipAngle(90)
            .rotate([0, -18, 0]);
        const path = d3.geoPath(projection);
        const graticule = d3.geoGraticule10();

        let lambda = 0;
        const TILT = -18;
        const SPEED = 36; // deg / sec
        let last = performance.now();
        let raf = 0;

        const frame = (now: number) => {
            const dt = (now - last) / 1000;
            last = now;
            lambda = (lambda + SPEED * dt) % 360;
            projection.rotate([lambda, TILT, 0]);

            if (gratRef.current) {
                gratRef.current.setAttribute("d", path(graticule) || "");
            }
            if (world && landRef.current) {
                landRef.current.setAttribute(
                    "d",
                    path(world.countries as Feature) || ""
                );
            }
            if (world && bordersRef.current) {
                bordersRef.current.setAttribute(
                    "d",
                    path(world.borders as MultiLineString) || ""
                );
            }
            if (world?.highlightedCountry && highlightRef.current) {
                highlightRef.current.setAttribute(
                    "d",
                    path(world.highlightedCountry) || ""
                );
            }
            raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(raf);
    }, [world]);

    return (
        <div
            className="globe-loader-root"
            style={{width: size, height: size}}
        >
            <style>{css}</style>
            <svg viewBox="0 0 200 200" aria-hidden="true" className="gl-globe">
                <defs>
                    <linearGradient id="gl-country-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--gl-country-from)"/>
                        <stop offset="50%" stopColor="var(--gl-country-via)"/>
                        <stop offset="100%" stopColor="var(--gl-country-to)"/>
                    </linearGradient>
                </defs>
                <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="none"
                    stroke="var(--gl-ink)"
                    strokeWidth="1.6"
                />
                <path
                    ref={gratRef}
                    fill="none"
                    stroke="var(--gl-ink)"
                    strokeWidth="0.5"
                    opacity="0.25"
                />
                <path
                    ref={landRef}
                    fill="url(#gl-country-gradient)"
                    fillOpacity="0.92"
                    stroke="var(--gl-country-stroke)"
                    strokeWidth="0.35"
                    strokeLinejoin="round"
                />
                <path
                    ref={highlightRef}
                    fill="red"
                    fillOpacity="1"
                    stroke="white"
                    strokeWidth="0.8"
                    strokeLinejoin="round"
                />
                <path
                    ref={bordersRef}
                    fill="none"
                    stroke="var(--gl-border)"
                    strokeWidth="0.4"
                    strokeLinejoin="round"
                    opacity="0.7"
                />
            </svg>
        </div>
    );
}

const css = `
  .globe-loader-root {
    --gl-bg: transparent;
    --gl-ink: #ffffff;
    background: transparent;
    color: transparent;
    display: grid;
    place-items: center;
    border-radius: 4px;
  }
  .globe-loader-root .gl-globe {
    width: 100%;
    height: 100%;
    overflow: visible;
    background: transparent;
  }
`;