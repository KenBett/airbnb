// @\components\EmptyState.tsx
"use client";
import { useRouter } from "next/navigation";
import Heading from "./heading";
import Button from "./button";
interface EmptyStateProps {
  title?: string
  subTitle?: string
  showReset?: boolean
};
const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "No exact match",
  subTitle = "Try changing or  removing some of your filters",
  showReset
 }) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        title={title}
        subTitle={subTitle}
        center
       />
       <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            pointer
            label="Remove all fiters"
            onClick={() => router.push('/')}
           />
        )}
       </div>
    </div>
  );
}
export default EmptyState