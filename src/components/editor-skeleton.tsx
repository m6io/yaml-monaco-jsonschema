import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const EditorSkeleton = () => {
  return (
    <div
      className={cn(
        "grid h-full items-center justify-center overflow-y-scroll border",
      )}
    >
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}

export default EditorSkeleton
