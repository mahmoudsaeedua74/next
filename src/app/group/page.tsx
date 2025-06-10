"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const RecommendedCategoriesComponent = dynamic(
    () => import("@/components/Category/RecommendedCategories")
);
const GetGroupId = dynamic(() => import("@/components/common/GetGroupId"));
const GroupProducts = dynamic(
    () => import("@/components/Products/Groups/GroupProducts")
);
export default function Page() {
    return (
        <section className="contain">
            <RecommendedCategoriesComponent />
            <Suspense fallback={null}>
                <GetGroupId>
                    {(groupId) => <GroupProducts groupId={groupId} />}
                </GetGroupId>
            </Suspense>
        </section>
    );
}
