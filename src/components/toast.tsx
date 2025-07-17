'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { toast as sonner } from 'sonner';

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

export function toast(props: Omit<ToastProps, 'id'>) {
    if (props.button === undefined) {
        return sonner.custom((id) => (
            <Toast
                id={id}
                title={props.title}
                description={props.description}
            />
        ));
    }

    return sonner.custom((id) => (
        <Toast
            id={id}
            title={props.title}
            description={props.description}
            button={{
                label: props.button?.label ?? '',
                onClick: props.button?.onClick ?? (() => {}),
            }}
        />
    ));
}

// NOTE: I can not come up with this setting
const INVERSED = false;

function Toast(props: ToastProps) {
    const { title, description, button, id } = props;

    return (
        <div className={cn("flex rounded-xl not-dark:shadow-md border w-[364px] items-center p-4", INVERSED ? 'bg-zinc-900 dark:bg-zinc-50' : 'bg-surface')}>
            <div className="flex flex-1 items-center">
                <div className="w-full">
                    <p className={cn("text-sm font-medium", INVERSED ? 'text-zinc-50 dark:text-zinc-950' : 'text-foreground')}>{title}</p>
                    {description &&
                        <p className={cn("mt-1 text-sm", INVERSED ? 'text-zinc-300 dark:text-zinc-700' : 'text-secondary-foreground')}>{description}</p>
                    }
                </div>
            </div>
            {button &&
                <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                    <button
                        className="transition-colors duration-300 rounded bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-500 hover:cursor-pointer"
                        onClick={() => {
                            button.onClick();
                            sonner.dismiss(id);
                        }}
                    >
                        {button.label}
                    </button>
                </div>
            }
        </div>
    );
}
