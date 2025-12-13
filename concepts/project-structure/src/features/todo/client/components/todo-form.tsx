import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TodoForm() {
  return (
    <form>
      <Label htmlFor="todo">New Todo</Label>
      <Input type="text" id="todo" placeholder="Enter todo" />
    </form>
  );
}
