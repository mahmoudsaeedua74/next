import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
const item = [
  {
    id: 1,
    name: "Cogent",
  },
  {
    id: 2,
    name: "Art-n-Fly",
  },
  {
    id: 3,
    name: "Advantage",
  },
  {
    id: 4,
    name: "ArtCreativity",
  },
  {
    id: 5,
    name: "BeiHCain",
  },
  {
    id: 6,
    name: "ArtSkills",
  },
  {
    id: 7,
    name: "ArtSkills",
  },
];
const size = [
  {
    id: 1,
    name: "1 enh",
  },
  {
    id: 2,
    name: "# 8 - 0.81 Inch",
  },
  {
    id: 3,
    name: "#2",
  },
  {
    id: 4,
    name: "#6",
  },
  {
    id: 5,
    name: "#2 Round",
  },
  {
    id: 6,
    name: "#6 Round",
  },
  {
    id: 7,
    name: "#5 Round",
  },
];
export default function LoadingFilter() {
  return (
    <div className="flex flex-col gap-y-4 text-sm bg-[#F6F7F8] py-4 px-5 font-semibold rounded-md">
      {/* Brand */}
      <div className="flex flex-col mb-4 gap-1">
        <h3 className="text-lg font-medium" id="brand-label">
          Brand :
        </h3>
        <input
          type="text"
          placeholder="search for a brand"
          className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
        />
        <div className="mt-2 bg-white p-2 border rounded-md h-60 overflow-y-auto">
          {item?.map((item) => (
            <div className="w-full  last:border-none" key={item.id}>
              <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="mr-2" />
                <label className="cursor-pointer flex-1">{item.name}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mb-4 gap-1">
        <h3 className="text-lg font-medium" id="brand-label">
          size :
        </h3>
        <input
          type="text"
          placeholder="search for a brand"
          className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
        />
        <div className="mt-2 bg-white p-2 border rounded-md h-60 overflow-y-auto">
          {size?.map((item) => (
            <div className="w-full  last:border-none" key={item.id}>
              <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
                <input type="checkbox" className="mr-2" />
                <label className="cursor-pointer flex-1">{item.name}</label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price section - to be connected later */}
      <div className="">
        <h3 className="text-[18px] text-textColor uppercase" id="price-label">
          Price
        </h3>
        <div aria-labelledby="price-label">
          <label
            htmlFor="price"
            className="flex justify-between mb-4"
            id="price-range-description"
          >
            <span>Range:</span>
            <span></span>
          </label>
          <div className="flex">
            <RangeSlider
              min={0}
              max={100}
              step={5}
              aria-labelledby="price-range-description"
            />
          </div>
        </div>
      </div>

      {/* You can add more filter components here */}
    </div>
  );
}
