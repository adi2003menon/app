'use client'

import {
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
} from 'react'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils'

type ToasterProps = {
  className?: string
  keyboardClose?: boolean
  closeButton?: boolean
  richColors?: boolean
}

const Toaster = forwardRef<HTMLDivElement, ToasterProps>(
  ({ className, keyboardClose, closeButton, richColors, ...props }, ref) => {
    const isMounted = useIsMounted()

    if (!isMounted) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'pointer-events-auto[z]',
          'fixed bottom-0 z-[var(--z-toast)] flex w-full flex-col gap-4 p-4',
          'sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl',
          className
        )}
        {...props}
      />
    )
  }
)
Toaster.displayName = 'Toaster'

export { Toaster }

export type ToasterProps = {
  /**
   * If `true`, the toaster will close when pressing the keyboard escape key.
   */
  keyboardClose?: boolean
  /**
   * If `true`, the toaster will show a close button on each toast.
   */
  closeButton?: boolean
  /**
   * If `true`, the toaster will use the theme's accent colors for the toast border.
   */
  richColors?: boolean
}
