import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ setter, value, min, max }) {
    function handleLeftClick() {
        if (value !== min) setter((prev) => --prev);
    }
    function handleRightClick() {
        if (value !== max) setter((prev) => ++prev);
    }

    return (
        <div className="flex gap-[1rem] justify-center m-[1rem] items-center">
            <ChevronDoubleLeftIcon
                onClick={() => setter(min)}
                className="h-[2rem]"
            />
            <ChevronLeftIcon onClick={handleLeftClick} className="h-[2rem]" />
            <div className="font-bold">{value + 1}</div>
            <ChevronRightIcon onClick={handleRightClick} className="h-[2rem]" />
            <ChevronDoubleRightIcon
                onClick={() => setter(max)}
                className="h-[2rem]"
            />
        </div>
    );
}
