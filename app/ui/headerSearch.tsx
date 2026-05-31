"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
export default function HeaderSearch() {
    const [inputValue, setInputValue] = useState("");
    return (
        <div className="relative flex-1 mr-[1em]">
            <Search className="h-8 w-8 absolute left-[1em] top-1/2 -translate-y-1/2"></Search>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                placeholder="Search..."
                className="flex-1 p-3 h-full pl-12 w-full bg-(--color-bg) outline-0 ml-[0.5em] mr-[0.5em]"
            />
        </div>
    );
}
