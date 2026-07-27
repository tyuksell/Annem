"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, type KeyboardEvent, useCallback, useId, useState } from "react";

interface AnimatedTabsProps<T extends string> {
  activeTab?: T;
  className?: string;
  defaultTab?: T;
  layoutId?: string;
  onChange?: (tabId: T) => void;
  tabs: { id: T; label: string; icon?: ReactNode }[];
  variant?: "underline" | "pill" | "segment";
}

const SPRING = {
  type: "spring" as const,
  duration: 0.25,
  bounce: 0.05,
};

type ClassValue = string | false | null | undefined | ClassValue[];

function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((value) =>
      Array.isArray(value)
        ? value.filter(Boolean)
        : value ? [value] : []
    )
    .join(" ");
}

export default function AnimatedTabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  variant = "underline",
  layoutId: customLayoutId,
  className,
}: AnimatedTabsProps) {
  const shouldReduceMotion = useReducedMotion();
  const generatedId = useId();
  const layoutId = customLayoutId ?? `animated-tabs-${generatedId}`;

  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab ?? tabs[0]?.id ?? ""
  );

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabChange = useCallback(
    (tabId: string) => {
      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onChange?.(tabId);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        event.preventDefault();
        newIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        newIndex = tabs.length - 1;
      } else {
        return;
      }

      const newTab = tabs[newIndex];
      if (newTab) {
        handleTabChange(newTab.id);
        const tabElement = document.getElementById(
          `${layoutId}-tab-${newTab.id}`
        );
        tabElement?.focus();
      }
    },
    [tabs, handleTabChange, layoutId]
  );

  const baseContainerStyles = cn(
    "relative inline-flex w-full flex-wrap items-center justify-center gap-1.5",
    variant === "underline" && "border-b border-slate-300",
    variant === "pill" && "rounded-full bg-slate-200 p-1",
    variant === "segment" && "rounded-full bg-transparent p-1",
    className
  );

  const getTabStyles = (isActive: boolean) =>
    cn(
      "relative z-10 flex items-center justify-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
      variant === "underline" && [
        "rounded-t-md",
        isActive
          ? "text-slate-950"
          : "text-slate-500 hover:text-slate-900",
      ],
      variant === "pill" && [
        "rounded-full",
        isActive
          ? "bg-white text-slate-950 shadow-sm"
          : "text-slate-600 hover:text-slate-950",
      ],
      variant === "segment" && [
        "rounded-full",
        isActive
          ? "text-slate-950"
          : "text-white/80 hover:text-white",
      ]
    );

  const getIndicatorStyles = () =>
    cn(
      "absolute",
      variant === "underline" && "right-0 -bottom-px left-0 h-0.5 bg-orange-500",
      variant === "pill" &&
        "inset-0 rounded-full border border-slate-300 bg-white shadow-sm",
      variant === "segment" &&
        "inset-0 rounded-full border border-slate-300 bg-white shadow-sm"
    );

  return (
    <div
      aria-label="Tabs"
      className={baseContainerStyles}
      role="tablist"
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            aria-selected={isActive}
            className={getTabStyles(isActive)}
            id={`${layoutId}-tab-${tab.id}`}
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          >
            {isActive && (
              <motion.span
                className={getIndicatorStyles()}
                layout
                layoutId={layoutId}
                style={{ originY: "0px" }}
                transition={shouldReduceMotion ? { duration: 0 } : SPRING}
              />
            )}
            {tab.icon && <span className="relative z-10">{tab.icon}</span>}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
