"use client";
import React from "react";
import { GitCompareArrows, Heart } from "lucide-react";
import Link from "next/link";
import TooltipComponent from "../ui/Tooltip/Tooltip";

export default function NavIcons({ className = "" }: { className?: string }) {

    // The countries section will be temporarily hidden until it's added in the future.

    // const [localizationOpen, setLocalizationOpen] = useState(false);
    // const localizationRef = useRef<HTMLDivElement>(null);
    // const { data: countries } = useCountries();
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (
    //             localizationRef.current &&
    //             !localizationRef.current.contains(event.target as Node)
    //         ) {
    //             setLocalizationOpen(false);
    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);
    return (
        <div className={`flex items-center z-[60] gap-2 ${className}`}>
            {/* <div className="relative" ref={localizationRef}>
                <button
                    className="dropdown-button"
                    onClick={() => setLocalizationOpen(!localizationOpen)}
                >
                    <span className="inline size-5">
                        <Flag
                            code={"us"}
                            style={{ width: 20, height: 20 }}
                            alt="us"
                        />
                    </span>
                    <svg
                        className="dropdown-icon"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1l4 4 4-4"
                        />
                    </svg>
                </button>
                {localizationOpen && (
                    <div className="dropdown-menu">
                        <ul className="text-sm text-gray-700">
                            {countries?.map((country: Country) => (
                                <li key={country.code}>
                                    <span className="dropdown-item ">
                                        <Flag
                                            alt={country.code}
                                            code={country.code}
                                            style={{ width: 30, height: 30 }}
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div> */}
            {/* Wishlist */}
            <TooltipComponent title="Wishlist">
                <Link href="/Wishlist" className="icon-with-text icon-navbar">
                    <Heart />
                </Link>
            </TooltipComponent>
            {/* Compare */}
            <TooltipComponent title="Compare">
                <Link href="/Compare" className="icon-with-text icon-navbar">
                    <GitCompareArrows />
                </Link>
            </TooltipComponent>
        </div>
    );
}
