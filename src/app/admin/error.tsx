'use client';

import Button from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex cursor-pointer justify-center items-center w-full h-screen">
      <div className="text-center">
        <h2 className="text-[50px] font-bold text-red-500">
          Something went wrong!
        </h2>
        <div className="w-full my-4 flex justify-center">
          <div className="w-[200px]">
            <Button name="Try Again" handle={reset} />
          </div>
        </div>
      </div>
    </div>
  );
}
