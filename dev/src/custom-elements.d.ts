import type React from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'fm-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        size?: string
        disabled?: boolean
      }
      'fm-selectable-list': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'data-provider'?: string
      }
    }
  }
}
