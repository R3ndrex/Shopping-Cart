import { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function ImageSlider({ images, alt }) {
    const [index, setIndex] = useState(0);
    function handleLeftClick() {
        index <= 0 ? setIndex(images.length - 1) : setIndex((prev) => --prev);
    }
    function handleRightClick() {
        index >= images.length - 1 ? setIndex(0) : setIndex((prev) => ++prev);
    }

    return (
        <div className="relative">
            <ChevronLeftIcon
                onClick={handleLeftClick}
                className="absolute left-0 h-[3rem] top-1/2"
                data-testid="left-chevron"
            />
            <img src={images[index]} alt={alt} className="w-max" />
            <ChevronRightIcon
                onClick={handleRightClick}
                className="absolute right-0 h-[3rem] top-1/2"
                data-testid="right-chevron"
            />
        </div>
    );
}
