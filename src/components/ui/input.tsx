import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        type={type}
        className={cn('flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)}
        {...props}
      />
    )
    if (label) {
      return (
        <div>
          <label className="mb-2 block text-sm font-medium">{label}</label>
          {input}
        </div>
      )
    }
    return input
  }
)
Input.displayName = 'Input'


