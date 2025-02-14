import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold font-mono">1234Hello World</h1>
        <h1 className="text-2xl font-bold font-sans">1234Hello World</h1>
        <Button size="sm" variant={"outline"}>
          Button
        </Button>
        <p className={cn("text-xl font-semibold text-destructive")}>hi</p>
      </div>
    </div>
  );
}
