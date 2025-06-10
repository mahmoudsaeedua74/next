import React from "react";

export default function Heading({
    title,
    className,
}: {
    title: React.ReactNode;
    className?: string;
}) {
    return <h2 className={`text-3xl font-bold text-center ${className}`}>{title}</h2>;
}
