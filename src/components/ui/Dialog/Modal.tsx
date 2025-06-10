"use client";
import Dialog from "@/components/ui/Dialog/Dialog";
import { ExternalLink } from "lucide-react";
import React, { useState } from "react";

export default function Modal({ url }: { url: string }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleModal = () => setIsOpen(!isOpen);
    return (
        <>
            {isOpen ? <Dialog toggleModal={toggleModal} url={url} /> : null}
            <div
                onClick={() => setIsOpen(true)}
                className="w-8 z-10 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#0d6efd] text-[#0d6efd] border border-[#0d6efd] hover:text-white transition-colors cursor-pointer"
            >
                <ExternalLink size={16} />
            </div>
        </>
    );
}
