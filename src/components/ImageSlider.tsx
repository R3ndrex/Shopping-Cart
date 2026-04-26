import { useState, type SyntheticEvent } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import placeholderImage from "../assets/placeholder.png";

interface ParamTypes {
    images: string[];
    alt: string;
}

export default function ImageSlider({ images, alt }: ParamTypes) {
    const [index, setIndex] = useState(0);
    function handleLeftClick() {
        if (index <= 0) {
            setIndex(images.length - 1);
            return;
        }
        setIndex((prev) => prev - 1);
    }
    function handleRightClick() {
        if (index >= images.length - 1) {
            setIndex(0);
            return;
        }
        setIndex((prev) => prev + 1);
    }

    return (
        <div className="relative">
            {images.length === 1 ? (
                <img
                    src={images[index]}
                    alt={alt}
                    onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                        const img = e.currentTarget;
                        img.onerror = null;
                        img.src = placeholderImage;
                    }}
                    className="w-max"
                />
            ) : (
                <>
                    <ChevronLeftIcon
                        onClick={handleLeftClick}
                        className="absolute left-0 h-[3rem] top-1/2 -translate-y-1/2 cursor-pointer"
                        data-testid="left-chevron"
                    />
                    <img
                        src={images[index]}
                        alt={alt}
                        className="w-max"
                        onError={(
                            e: SyntheticEvent<HTMLImageElement, Event>,
                        ) => {
                            const img = e.currentTarget;
                            img.onerror = null;
                            img.src = placeholderImage;
                        }}
                    ></img>
                    <ChevronRightIcon
                        onClick={handleRightClick}
                        className="absolute right-0 h-[3rem] top-1/2 -translate-y-1/2 cursor-pointer"
                        data-testid="right-chevron"
                    />
                </>
            )}
        </div>
    );
}
