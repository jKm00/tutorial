import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import weapons from "@/weapons.json";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [input, setInput] = React.useState("");

  // The scrollable element for your list
  const parentRef = React.useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: weapons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div className="grid place-items-center min-h-screen">
      <Popover open={input.length > 0}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[300px]"
            placeholder="Search for weapon..."
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-80"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div
            ref={parentRef}
            style={{
              height: `400px`,
              overflow: "auto", // Make it scroll!
            }}
          >
            {/* The large inner element to hold all of the items */}
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {/* Only the visible items in the virtualizer, manually positioned to be in view */}
              {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                <div
                  key={virtualItem.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {weapons[virtualItem.index].name}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>{" "}
    </div>
  );
}
