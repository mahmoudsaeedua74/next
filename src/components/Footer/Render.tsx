import {
  FaSquareFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareSnapchat,
  FaPinterest,
} from "react-icons/fa6";
import Link from "next/link";
import { AiFillTikTok } from "react-icons/ai";
const iconProps = { size: 20, className: "" };
export const useSocialIcon = () => {
  const render = (name: string, link: string) => {
    const lower = name.toLowerCase();
    const commonProps = {
      href: link,
      target: "_blank",
      className:
        "w-10 h-10 flex items-center justify-center  themed-text rounded-full  bg-icon transition-colors",
      rel: "noopener noreferrer",
    };

    switch (lower) {
      case "facebook":
        return (
          <Link {...commonProps}>
            <FaSquareFacebook {...iconProps} />
          </Link>
        );
      case "tiktok":
        return (
          <Link {...commonProps}>
            <AiFillTikTok size={20} />
          </Link>
        );
      case "instagram":
        return (
          <Link {...commonProps}>
            <FaInstagram {...iconProps} />
          </Link>
        );
      case "linkedin":
        return (
          <Link {...commonProps}>
            <FaLinkedin {...iconProps} />
          </Link>
        );
      case "twitter":
      case "x":
        return (
          <Link {...commonProps}>
            <FaSquareXTwitter {...iconProps} />
          </Link>
        );
      case "snapchat":
        return (
          <Link {...commonProps}>
            <FaSquareSnapchat {...iconProps} />
          </Link>
        );
      case "pinterest":
        return (
          <Link {...commonProps}>
            <FaPinterest {...iconProps} />
          </Link>
        );
      default:
        return null;
    }
  };

  return { render };
};
