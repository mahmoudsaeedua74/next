export interface Header {
  id: number;
  title: string;
  pages?: {
    link: string;
  }[];
}

export interface NavbarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
