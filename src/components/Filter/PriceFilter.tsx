"use client";
import React, { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { Button } from "../ui/Button/Button";

interface PriceFilterProps {
    onPriceChange: (values: { price_min: number; price_max: number }) => void;
    min: number;
    max: number;
    step?: number;
    initialValues?: [number, number];
}

export default function PriceFilter({
    onPriceChange,
    min,
    max,
    step = 5,
    initialValues = [min, max],
}: PriceFilterProps) {
    const [priceRange, setPriceRange] =
        useState<[number, number]>(initialValues);

    const handleRangeChange = (values: number[]) => {
        setPriceRange([values[0], values[1]]);
    };

    const handleApply = () => {
        // Format the values to match the API requirements
        onPriceChange({
            price_min: Math.floor(priceRange[0]),
            price_max: Math.ceil(priceRange[1]),
        });
    };

    return (
        <div className="flex flex-col gap-y-2 border-b pb-3 text-sm">
            <div className="flex justify-between items-center">
                <h3 className="text-slate-900 font-bold" id="price-label">
                    Price:
                </h3>
                <Button onClick={handleApply} size={"sm"}>
                    Apply
                </Button>
            </div>
            <div aria-labelledby="price-label">
                <label
                    htmlFor="price"
                    className="flex justify-between mb-4 text-slate-900 "
                    id="price-range-description"
                >
                    <span>
                        Range: ${priceRange[0]} - ${priceRange[1]}
                    </span>
                </label>
                <div className="flex flex-col gap-y-4">
                    <RangeSlider
                        id="price"
                        min={min}
                        max={max}
                        step={step}
                        defaultValue={priceRange}
                        onInput={handleRangeChange}
                    />
                </div>
            </div>
        </div>
    );
}
