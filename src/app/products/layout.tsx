import React from "react";
export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className=" space-y-8 mb-20">{children}</section>;
}
