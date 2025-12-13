import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  // const [data, setData] = useState<User[] | null>(null);

  // useEffect(() => {
  //   fetchUsers(debouncedSearch);
  // }, [debouncedSearch]);

  const query = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: () => fetchUsers(debouncedSearch),
  });

  async function fetchUsers(search: string) {
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append("search", search);
      }

      const res = await fetch(`/api/users?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const users = (await res.json()) as User[];
      return users;
    } catch (err) {
      throw new Error(`Failed to fetch users: ${err}`);
    }
  }

  return (
    <div className="p-4 mx-auto" style={{ width: "min(800px, 100%)" }}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <h3 className="font-bold text-2xl">Users</h3>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-[300px]"
        />
      </div>
      <section className="space-y-4">
        {!query.isPending ? (
          query.data?.map((user) => (
            <article key={user.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </article>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}
