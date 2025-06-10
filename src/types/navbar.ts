export interface Header {
    id: number;
    title: string;
}

export interface NavbarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
