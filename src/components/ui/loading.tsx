import { Spinner } from "@radix-ui/themes";

export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner size="3" />
    </div>
  );
}
