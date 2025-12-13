import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import weapons from "@/weapons.json";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: weapons.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef} className="overflow-auto min-w-[300px] h-[400px]">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
        className="relative w-full"
      >
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
  );
}
