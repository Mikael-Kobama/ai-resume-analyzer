import { AccordionContext } from "@chakra-ui/react";
import { ClassNames } from "@emotion/react";
import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpen,
  allowMultiple = false,
  ClassName = "",
}) => {
  const [activeItems, setActiveItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : []
  );

  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };


  const isItemActive = (id: string) => activeItems.includes(id)

  return (
    <AccordionContext.Provider
      value=({ activeItems, toggleItem, isItemActive})
    >
      <div className={`space-y-2 ${ClassName}`} {children}></div>
    </AccordionContext.Provider>
  )
};
