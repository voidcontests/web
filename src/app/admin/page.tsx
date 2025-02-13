import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const plans = [
    {
        id: 'easy',
        name: 'Easy',
        description:
            'Easy problems involve basic concepts and can be solved quickly with simple reasoning',
        points: 1,
        color: 'green',
    },
    {
        id: 'mid',
        name: 'Medium',
        description: 'Medium problems require a deeper understanding and the application of multiple concepts, often involving moderate complexity',
        points: 2,
        color: 'amber',
    },
    {
        id: 'hard',
        name: 'Hard',
        description: 'Difficult challenge for advanced participants with complex scenarios',
        points: 3,
        color: 'scarlet',
    },
];

export default function Page() {
    return (
        <div className='px-24 py-12'>
            <div className='flex flex-col gap-6'>
                <RadioGroup defaultValue='starter' className='max-w-sm'>
                    {/* Easy */}
                    <Label
                        className={cn(
                            'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                            'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                            'has-[[data-state=checked]]:border-green-500',
                            'has-[[data-state=checked]]:bg-green-50 dark:has-[[data-state=checked]]:bg-green-500/16',
                        )}
                    >
                        <RadioGroupItem
                            value='easy'
                            className='shadow-none data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                        />
                        <div className='grid gap-1.5 font-normal'>
                            <div className='flex flex-row gap-1.5'>
                                <span className='font-medium'>
                                    Easy
                                </span>
                                <span className='text-secondary-foreground'>
                                    (1 pts)
                                </span>
                            </div>
                            <div className='text-foreground/80 leading-snug'>
                                Easy problems involve basic concepts and can be solved quickly with simple reasoning
                            </div>
                        </div>
                    </Label>

                    {/* Mid */}
                    <Label
                        className={cn(
                            'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                            'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                            'has-[[data-state=checked]]:border-amber-500',
                            'has-[[data-state=checked]]:bg-amber-50 dark:has-[[data-state=checked]]:bg-amber-500/16',
                        )}
                    >
                        <RadioGroupItem
                            value='mid'
                            className='shadow-none data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                        />
                        <div className='grid gap-1.5 font-normal'>
                            <div className='flex flex-row gap-1.5'>
                                <span className='font-medium'>
                                    Medium
                                </span>
                                <span className='text-secondary-foreground'>
                                    (2 pts)
                                </span>
                            </div>
                            <div className='text-foreground/80 leading-snug'>
                                Difficult challenge for advanced participants with complex scenarios
                            </div>
                        </div>
                    </Label>

                    {/* Hard */}
                    <Label
                        className={cn(
                            'flex items-start gap-3 rounded-xl border p-3 hover:cursor-pointer',
                            'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4',
                            'has-[[data-state=checked]]:border-scarlet-500',
                            'has-[[data-state=checked]]:bg-scarlet-50 dark:has-[[data-state=checked]]:bg-scarlet-500/16',
                        )}
                    >
                        <RadioGroupItem
                            value='hard'
                            className='shadow-none data-[state=checked]:border-scarlet-500 data-[state=checked]:bg-scarlet-500 *:data-[slot=radio-group-indicator]:[&>svg]:fill-white *:data-[slot=radio-group-indicator]:[&>svg]:stroke-white'
                        />
                        <div className='grid gap-1.5 font-normal'>
                            <div className='flex flex-row gap-1.5'>
                                <span className='font-medium'>
                                    Hard
                                </span>
                                <span className='text-secondary-foreground'>
                                    (3 pts)
                                </span>
                            </div>
                            <div className='text-foreground/80 leading-snug'>
                                Medium problems require a deeper understanding and the application of multiple concepts, often involving moderate complexity
                            </div>
                        </div>
                    </Label>
                </RadioGroup>

                <Label className={cn(
                    'flex w-fit items-start gap-3 rounded-xl border p-4 hover:cursor-pointer',
                    'hover:bg-zinc-950/3 dark:hover:bg-zinc-50/4 has-[[aria-checked=true]]:border-blue-400 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:bg-blue-400/20'
                )}>
                    <Checkbox
                        id='toggle-2'
                        defaultChecked
                        className='data-[state=checked]:bg-blue-400 dark:data-[state=checked]:bg-blue-400'
                    />
                    <div className='grid gap-1.5 font-normal'>
                        <p className='text-sm leading-none font-medium'>
                            Keep public
                        </p>
                        <p className='text-foreground/80 text-sm'>
                            After the end of the contest, the task will remain visible in public archives
                        </p>
                    </div>
                </Label>
            </div>
        </div>
    );
}
