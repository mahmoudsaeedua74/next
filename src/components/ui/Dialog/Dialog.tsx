"use client";
import useOutsideClick from "@/Hooks/useOutsideClick";
import { Copy, Facebook, Linkedin, Mail, MessageCircle, X } from "lucide-react";
import React, { memo, useCallback, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import { motion } from "framer-motion";
import { FaPinterest, FaSnapchat, FaTelegram, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

type Props = {
    toggleModal: () => void;
    url: string;
};

const socialColors: Record<string, string> = {
    Facebook: "bg-[#1877F2] text-white hover:bg-[#1877F2]/90",
    X: "bg-black text-white hover:bg-black/90",
    LinkedIn: "bg-[#0077B5] text-white hover:bg-[#0077B5]/90",
    WhatsApp: "bg-[#25D366] text-white hover:bg-[#25D366]/90",
    Telegram: "bg-[#0088cc] text-white hover:bg-[#0088cc]/90",
    Snapchat: "bg-[#FFFC00] text-black hover:bg-[#FFFC00]/90",
    TikTok: "bg-[#010101] text-white hover:bg-[#010101]/90",
    Pinterest: "bg-[#E60023] text-white hover:bg-[#E60023]/90",
    Email: "bg-[#EA4335] text-white hover:bg-[#EA4335]/90",
};

const SocialButton = memo(function SocialButton({
    label,
    icon,
    onClick,
    className,
}: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    className: string;
}) {
    return (
        <Button
            variant="social"
            size="default"
            onClick={onClick}
            title={label}
            className={className}
        >
            {icon}
            <span>{label}</span>
        </Button>
    );
});
const Dialog = function Dialog({ toggleModal, url }: Props) {
    const [copied, setCopied] = useState(false);
    const shareButtons = useMemo(
        () => [
            {
                label: "Facebook",
                icon: <Facebook />,
                link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                )}`,
            },
            {
                label: "X",
                icon: <FaSquareXTwitter />,
                link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                )}`,
            },
            {
                label: "LinkedIn",
                icon: <Linkedin />,
                link: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    url
                )}`,
            },
            {
                label: "WhatsApp",
                icon: <MessageCircle />,
                link: `https://wa.me/?text=${encodeURIComponent(url)}`,
            },
            {
                label: "Telegram",
                icon: <FaTelegram />,
                link: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
            },
            {
                label: "Snapchat",
                icon: <FaSnapchat />,
                // Snapchat doesn't have a direct share URL, typically uses a username
                link: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(
                    url
                )}`,
            },
            {
                label: "TikTok",
                icon: <FaTiktok />,
                // TikTok doesn't have a standard sharing URL, but this opens the app
                link: `https://www.tiktok.com/upload?url=${encodeURIComponent(
                    url
                )}`,
            },
            {
                label: "Pinterest",
                icon: <FaPinterest />,
                link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    url
                )}`,
            },
            {
                label: "Email",
                icon: <Mail />,
                link: `mailto:?subject=Check this out&body=${encodeURIComponent(
                    url
                )}`,
            },
        ],
        [url]
    );
    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    }, [url]);
    const ref = useOutsideClick({ handler: toggleModal });
    const handleShare = useCallback((link: string) => {
        window.open(link, "_blank", "noopener,noreferrer");
    }, []);
    return createPortal(
        <div className="bg-black/60 z-[666] fixed inset-0 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                ref={ref}
                className="bg-white rounded-lg shadow-lg"
            >
                <div className="flex justify-between items-center p-4">
                    <h5 className="text-[#121535] font-bold text-lg">
                        Share The Link
                    </h5>
                    <X
                        onClick={toggleModal}
                        className="cursor-pointer hover:text-[#121535]/80"
                    />
                </div>
                <div className="w-full h-0.5 bg-black/70" />
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 justify-items-center gap-2 justify-center">
                    {shareButtons.map(({ label, icon, link }) => (
                        <SocialButton
                            key={label}
                            label={label}
                            icon={icon}
                            onClick={() => handleShare(link)}
                            className={`${socialColors[label]} px-3 py-2 min-w-[130px] justify-start`}
                        />
                    ))}
                    <SocialButton
                        label={copied ? "Copied!" : "Copy Link"}
                        icon={<Copy />}
                        onClick={handleCopy}
                        className="bg-gray-200 hover:bg-gray-300 text-black px-3 md:translate-x-full py-2 min-w-[130px]"
                    />
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

export default Dialog;
