import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, rows = 4, label, ...props }, ref) => {
    const textarea = (
      <textarea
        ref={ref}
        rows={rows}
        className={cn('w-full rounded-lg border border-border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)}
        {...props}
      />
    )
    if (label) {
      return (
        <div>
          <label className="mb-2 block text-sm font-medium">{label}</label>
          {textarea}
        </div>
      )
    }
    return textarea
  }
)
Textarea.displayName = 'Textarea'


