/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { cn } from "@/lib/utils";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { z } from "zod";

function Button({ 
    children,
    type = 'button',
    onClick = () => {} 
}: { 
    children: ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit'
}) {
    return (
        <button 
            type={type}
            onClick={onClick}
            className={cn(
                'w-full p-3 rounded-lg bg-Blue-800 ',
                'text-sm text-center text-White font-semibold cursor-pointer',
                'transition-all hover:bg-linear-90 from-pink-500 to-amber-500'
            )}
        >
            { children }
        </button>
    );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-4 text-sm tracking-wider">
      <img
        src={'/icon-list.svg'}
        alt="check icon"
      />
      { text }
    </li>
  );
}

export function Form({
    onSuccess,
    onChange,
    email,
}: {
    onSuccess?: () => void
    email: string;
    onChange: (e: any) => void;
}) {
    const [hasError, setHasError] = useState(false);

    function getFormData(e: FormEvent<HTMLFormElement>) {
        return Object.fromEntries(new FormData(e.target))
    }

    function validateForm(form: any) {
        return z
            .object({ email: z.string().email() })
            .safeParse(form)
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const form = getFormData(e);

        const { error } = validateForm(form)
        if (error) {
            setHasError(true)
        } else {
            if (typeof onSuccess === 'function') { onSuccess() }
        }
    }

    function handleOnChange(e) {
      setHasError(false)
      if (typeof onChange === 'function') { onChange(e) }
    }

    useEffect(() => {
      console.log({ email, hasError })
    }, [email, hasError])

    return (
        <div className={cn(
            'flex flex-col gap-2',
            'sm:flex-row-reverse'
          )}>
            <div className="">
              <img
                src={'/illustration-sign-up-mobile.svg'}
                alt="random illustration"
              />
            </div>
            <div className={cn(
              'flex flex-col gap-8 p-6 pb-8',
            )}>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold self-start">Stay updated!</h1>
                <p className="text-sm tracking-wide">Join 60,000+ product managers receiving monthly updates on:</p>
                <ul className="flex flex-col gap-4">
                  <ListItem text="Product discovery and building what matters" />
                  <ListItem text="Measuring to ensure updates are a success" />
                  <ListItem text="And much more!" />
                </ul>
              </div>
    
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-semibold"
                  >
                    <div className="flex justify-between">
                      <span>Email address</span>
                      { hasError && <span className="text-Red">Valid email required</span>}
                    </div>
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="email@company.com"
                    onChange={handleOnChange}
                    value={email}
                    className={cn(
                      'p-3 ring ring-Grey rounded-lg focus:ring-Blue-700 cursor-pointer',
                      { 'text-Red ring-Red ring-2 bg-Red/20': hasError }
                    )}
                  />
                </div>
    
                <Button type='submit'>
                    Subscribe to monthly newsletter
                </Button>
              </form>
            </div>
          </div>
    );
}

export function Success({
    email,
    onClose
}: {
    email: string;
    onClose: () => void;
}) {
    function handleOnClick() {
        if (typeof onClose === 'function') { onClose() }
    }

    return (
        <div className="flex flex-col h-screen justify-between gap-6 p-6">
            <div className="flex flex-col flex-grow justify-center gap-6">
                <img 
                    src={'/icon-success.svg'}
                    alt="Successful subscription"
                    className="size-14"
                />
                <h1 
                    className="text-4xl font-bold"
                >
                    Thanks for subscribing!
                </h1>
                <p className="text-sm">
                    A confirmation email has been sent to <span className="font-bold">{ email }</span>.
                    Please open it and click the button inside to confirm your subscription.
                </p>
            </div>

            <Button onClick={handleOnClick}>
                Dismiss message    
            </Button>
        </div>
    );
}