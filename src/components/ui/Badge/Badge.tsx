type BadgeProps = {
    type: string | null;
};
export default function Badge({ type }: BadgeProps) {
    const badgeColors = {
        "Best Seller": "bg-[#2563eb]",
        New: "bg-main",
    };
    if (!type || type.startsWith("Sale") || !(type in badgeColors)) return null;
    const backgroundColor = badgeColors[type as keyof typeof badgeColors];
    return (
        <span
            className={`inline-block px-3 py-1 text-xs font-medium text-white rounded-tl-2xl rounded-br-2xl ${backgroundColor}`}
        >
            {type}
        </span>
    );
}
