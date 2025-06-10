import { useEffect, useRef } from "react";
type Props = {
    handler: () => void;
    listenCapturing?: boolean;
};
export default function useOutsideClick({
    handler,
    listenCapturing = true,
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleClick(e: MouseEvent| React.ChangeEvent<HTMLInputElement> ) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }
        document.addEventListener("click", handleClick, listenCapturing);
        return () =>
            document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler, listenCapturing]);
    return ref;
}
