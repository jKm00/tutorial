import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import weapons from "@/weapons.json";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/infinite-query")({
  component: RouteComponent,
});

const getWeapons = createServerFn()
  .inputValidator((data: { limit: number; offset: number }) => data)
  .handler(async ({ data }) => {
    if (data.offset > weapons.length) {
      return {
        weapons: [],
        total: weapons.length,
        nextOffset: undefined,
      };
    }

    const nextOffset =
      data.offset + data.limit < weapons.length
        ? data.offset + data.limit
        : undefined;

    return {
      weapons: weapons.slice(data.offset, data.offset + data.limit),
      total: weapons.length,
      nextOffset,
    };
  });

const LIMIT = 10;

function RouteComponent() {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["weapons"],
    queryFn: (ctx) =>
      getWeapons({ data: { limit: LIMIT, offset: ctx.pageParam } }),
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    initialPageParam: 0,
  });

  const parentRef = React.useRef<HTMLDivElement>(null);

  // Go from
  // [[weapon1, weapon2], [weapon3, weapon4]]
  // To
  // [weapon1, weapon2, weapon3, weapon4]
  const allWeapons = data ? data.pages.flatMap((d) => d.weapons) : [];

  const weaponVirtualizer = useVirtualizer({
    count: data?.pages[0].total ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  React.useEffect(() => {
    const [lastItem] = [...weaponVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= allWeapons.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allWeapons.length,
    isFetchingNextPage,
    weaponVirtualizer.getVirtualItems(),
  ]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div ref={parentRef} className="overflow-auto min-w-[300px] h-[400px]">
      <div
        style={{
          height: `${weaponVirtualizer.getTotalSize()}px`,
        }}
        className="w-full relative"
      >
        {weaponVirtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            className="absolute top-0 left-0 w-full truncate"
          >
            {weapons[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
