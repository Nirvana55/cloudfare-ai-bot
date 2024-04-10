import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-96 flex-col gap-y-3'>
      <h2 className='text-6xl'>404</h2>
      <div className='text-center'>
        <p>Page not found</p>
        <p>This page is missing or you assembled the link incorrectly.</p>
      </div>
      <Button>
        <Link href='/dashboard'>Go Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
