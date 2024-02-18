import Section from "../page-assets/section";
import { Skeleton } from "../ui/skeleton";

export default function CountdownLoading() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[28.25rem] justify-between">
        <Skeleton className="h-[4.5rem] w-full rounded-md" />
      </div>
    </div>
  );
}
