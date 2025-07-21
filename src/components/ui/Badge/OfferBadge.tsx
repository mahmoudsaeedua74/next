// OfferBadge.tsx
type Props = {
    offer: string;
};

export default function OfferBadge({ offer }: Props) {
    return (
        <span className="bg-[#dc2626] text-white text-[10px] md:text-xs font-semibold px-2 py-[2px] rounded-full w-fit text-center inline-block">
            -{offer}%
        </span>
    );
}
