import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className='flex justify-center bg-background mt-[40px]'>
            <div className='h-[90px] w-[1200px] flex justify-between items-center text-sm text-muted-foreground '>
                <div>
                    Built by <Link href="https://github.com/jus1d" className='hover:text-foreground transition duration-300'>@ndbtea</Link>
                </div>
                <div className='flex gap-4'>
                    <Link href="https://github.com/cascadecontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=" className='hover:text-foreground transition duration-300'>Bug Report</Link>
                    <Link href="https://github.com/cascadecontests" className='hover:text-foreground transition duration-300'>GitHub</Link>
                    <Link href="mailto:artfa63@gmail.com" className='hover:text-foreground transition duration-300'>Email</Link>
                </div>
            </div>
        </footer>
    );
}
