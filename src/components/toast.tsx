'use client';

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

function Toast(props: ToastProps) {
    const { title, description, button, id } = props;

    return (
        <div className="flex rounded-xl bg-surface not-dark:shadow-md border w-[364px] items-center p-4">
            <div className="flex flex-1 items-center">
                <div className="w-full">
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    {description &&
                        <p className="mt-1 text-sm text-secondary-foreground">{description}</p>
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
