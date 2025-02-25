export default function Status({ active }: { active?: boolean }) {
    return (
        <span className='relative flex items-center justify-center'>
            {
                active
                    ? <>
             			<span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-green-500 bg-green-500 opacity-75'/>
             			<span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'/>
                    </>
                    : <span className='relative inline-flex h-2 w-2 rounded-full bg-zinc-950/15 dark:bg-zinc-50/15'/>
            }
  		</span>
    );
}
