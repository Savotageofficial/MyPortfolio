"use client";
import { useEffect } from "react";
import { setupPortfolioMotion } from "@/lib/portfolio-motion";
export default function PortfolioMotion() {
  useEffect(() => setupPortfolioMotion(), []);
  return <div className="page-progress" aria-hidden="true" />;
}
