import { Skeleton } from "@/components/ui/skeleton";

const SkeletonGeneratingText = () => {
  return (
    <div className='ml-10 mt-2 flex flex-col space-y-3'>
      <Skeleton className='h-4  rounded-xl' />
      <Skeleton className='h-4  rounded-xl' />
      <Skeleton className='h-4  rounded-xl' />
    </div>
  );
};

export default SkeletonGeneratingText;
