// src/global.d.ts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }

  // Optional: for direct usage without window prefix
  var gtag: ((...args: any[]) => void) | undefined
}

export {}
