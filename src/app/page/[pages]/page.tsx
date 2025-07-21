"use client";
import { useFooterLink } from "@/lib/api/queries";
import { useParams } from "next/navigation";
import parse from "html-react-parser";
import React from "react";
import Spinner from "@/components/ui/Loader";
import NotFound from "@/app/not-found";

export default function Page() {
  const params = useParams();
  const slug = (params.pages as string) || "";
  const { data, isLoading } = useFooterLink(slug);
  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.content) {
    return <NotFound />;
  }

  return (
    <section className="contain py-8" key={slug}>
      <div className="read-only-content">{parse(data.content)}</div>
    </section>
  );
}
