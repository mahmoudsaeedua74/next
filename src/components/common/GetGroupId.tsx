"use client";

import { useSearchParams } from "next/navigation";

export default function GetGroupId({
    children,
}: {
    children: (groupId: number) => React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const groupId = Number(searchParams.get("group"));

    return <>{children(groupId)}</>;
}
