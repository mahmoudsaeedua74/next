"use client";
import React, {
    useCallback,
    useMemo,
    useState,
    useEffect,
    useRef,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
interface FilterItem {
    id: string;
    name: string;
}
interface FilterComponentProps {
    items: FilterItem[];
    onSelectionChange: (selected: (number | string)[]) => void;
    initialSelected?: (number | string)[];
    title: string;
    searchPlaceholder: string;
}
export default function FilterComponent({
    items,
    onSelectionChange,
    initialSelected = [],
    title,

    searchPlaceholder,
}: FilterComponentProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] =
        useState<(string | number)[]>(initialSelected);
    const listRef = useRef<HTMLDivElement>(null);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        requestAnimationFrame(() => {
            setSearchTerm(value);
        });
    };
    const filteredItems = useMemo(() => {
        if (!items) return [];
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, items]);
    const rowVirtualizer = useVirtualizer({
        count: filteredItems.length,
        getScrollElement: () => listRef.current,
        estimateSize: () => 40,
        overscan: 5,
    });
    const handleCheckboxChange = useCallback(
        (item: string) => {
            setSelectedItems((prev) => {
                const newSelected = prev.includes(item)
                    ? prev.filter((i) => i !== item)
                    : [...prev, item];

                onSelectionChange(newSelected);
                return newSelected;
            });
        },
        [onSelectionChange]
    );
    useEffect(() => {
        setSelectedItems(initialSelected);
    }, [initialSelected]);
    if (items.length === 0 || items[0].name === "null") {
        return null;
    }
    return (
        <div className="flex text-sm flex-col mb-4 gap-1  pb-3  border-b-2">
            <h3 className="text-slate-900 font-bold" id={`${title.toLowerCase()}-label`}>
                {title}:
            </h3>
            <input
                type="text"
                placeholder={searchPlaceholder}
                className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                onChange={handleSearchChange}
            />
            <div
                ref={listRef}
                className={`mt-2 bg-white p-2 border rounded-md ${
                    items.length < 4 ? "h-fit" : "h-60"
                }  overflow-y-auto`}
            >
                {filteredItems.length > 0 ? (
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                            overflowX: "hidden",
                        }}
                        className="w-full"
                    >
                        {rowVirtualizer.getVirtualItems()?.map((virtualRow) => {
                            const item = filteredItems[virtualRow.index];
                            return (
                                <div
                                    key={item.id}
                                    className="absolute top-0 left-0 w-full"
                                    style={{
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                >
                                    <div className="flex items-center text-sm cursor-pointer hover:bg-gray-100 w-full min-w-0">
                                        <input
                                            type="checkbox"
                                            id={`${title.toLowerCase()}-${
                                                item.id
                                            }`}
                                            checked={selectedItems.includes(
                                                item.id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(item.id)
                                            }
                                            className="m-2 flex-shrink-0 p-2"
                                        />
                                        <label
                                            htmlFor={`${title.toLowerCase()}-${
                                                item.id
                                            }`}
                                            className="cursor-pointer flex-1 truncate p-2"
                                        >
                                            {item.name}
                                        </label>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-2 text-gray-500">No Result</div>
                )}
            </div>
        </div>
    );
}
