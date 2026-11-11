"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { MotionConfig } from "framer-motion";

export const DEFAULT_BRAND = "#2563eb";

type BrandContextValue = {
  brand: string;
  setBrand: (color: string) => void;
};

const BrandContext = createContext<BrandContextValue>({
  brand: DEFAULT_BRAND,
  setBrand: () => {},
});

export function useBrand() {
  return useContext(BrandContext);
}

/**
 * Holds the site's accent color. Every brand-colored element reads the
 * `--brand` CSS variable, so changing it here recolors the whole page —
 * the live demo behind the "Make it yours" section.
 */
export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brand, setBrandState] = useState(DEFAULT_BRAND);

  const setBrand = useCallback((color: string) => {
    setBrandState(color);
    document.documentElement.style.setProperty("--brand", color);
  }, []);

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </BrandContext.Provider>
  );
}
