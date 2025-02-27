export default function Status({ state }: { state?: 'upcoming' | 'ongoing' | 'training' }) {
    if (state === 'upcoming') {
        return (
            <span className='relative flex items-center justify-center'>
                <span className='relative inline-flex h-2 w-2 rounded-full bg-zinc-950/15 dark:bg-zinc-50/15'/>
      		</span>
        );
    }

    if (state === 'ongoing') {
        return (
            <span className='relative flex items-center justify-center'>
     			<span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-green-500 bg-green-500 opacity-75'/>
     			<span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'/>
      		</span>
        );
    }

    if (state === 'training') {
        return (
            <span className='relative flex items-center justify-center'>
     			<span className='absolute inline-flex h-2 w-2 animate-ping rounded-full border border-blue-400 bg-blue-400 opacity-75'/>
     			<span className='relative inline-flex h-2 w-2 rounded-full bg-blue-400'/>
      		</span>
        );
    }
}
