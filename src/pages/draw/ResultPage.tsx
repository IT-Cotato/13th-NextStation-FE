import CloseIcon from '@/assets/close.svg?react';

function ResultPage() {
  return (
    <main className="flex flex-col h-dvh overflow-hidden bg-gray-10 pt-[calc(var(--safe-top)+12px)]">
      <div className='flex justify-end px-4'>
         <CloseIcon className="size-6" />
      </div>
     
    </main>
  )
}
export default ResultPage