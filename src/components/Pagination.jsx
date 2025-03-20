import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ setter, value, min, max }) {
    function handleLeftClick() {
        if (value !== min) {
            setter((prev) => --prev);
            window.scrollTo(0, 0);
        }
    }
    function handleLeftMaxClick() {
        if (value !== min) {
            setter(min);
            window.scrollTo(0, 0);
        }
    }

    function handleRightClick() {
        if (value !== max) {
            setter((prev) => ++prev);
            window.scrollTo(0, 0);
        }
    }
    function handleRightMaxClick() {
        if (value !== max) {
            setter(max);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className="flex gap-[1rem] justify-center m-[1rem] items-center ">
            <ChevronDoubleLeftIcon
                onClick={handleLeftMaxClick}
                className="h-[2rem] cursor-pointer"
            />
            <ChevronLeftIcon
                onClick={handleLeftClick}
                className="h-[2rem] cursor-pointer"
            />
            <div className="font-bold">{value + 1}</div>
            <ChevronRightIcon
                onClick={handleRightClick}
                className="h-[2rem] cursor-pointer"
            />
            <ChevronDoubleRightIcon
                onClick={handleRightMaxClick}
                className="h-[2rem] cursor-pointer"
            />
        </div>
    );
}
