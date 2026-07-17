"use client";

import { createContext, useContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import QuoteModal from "./QuoteModal";

const QuoteContext = createContext<() => void>(() => undefined);

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);
  return <QuoteContext.Provider value={openQuote}><Header onQuote={openQuote} /><main className="pt-[76px]">{children}</main><Footer /><QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} /></QuoteContext.Provider>;
}

export function QuoteButton({ children = "Solicitar orçamento", className = "primary-cta" }: { children?: React.ReactNode; className?: string }) {
  const openQuote = useContext(QuoteContext);
  return <button onClick={openQuote} className={className}>{children}</button>;
}
