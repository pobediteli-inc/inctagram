"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { RadixTabs } from "../../common/components";
import s from "./page.module.css";
import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("generalInfo");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const tabs = [
    { value: "generalInfo", title: "General Information" },
    { value: "devices", title: "Devices" },
    { value: "accountManagement", title: "Account Management" },
    { value: "myPayments", title: "My Payments" },
  ];

  useLayoutEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setUnderlineStyle({
          left: rect.left - parentRect.left,
          width: rect.width,
        });
      }
    }
  }, [activeTab]);

  return (
    <div className={s.container}>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className={s.tabs}>
        <Tabs.List className={s.tabList}>
          {tabs.map((tab) => (
            <RadixTabs
              key={tab.value}
              value={tab.value}
              title={tab.title}
              ref={(el) => {
                tabRefs.current[`${tab.value}`] = el;
              }}
            />
          ))}

          <motion.div
            className={s.underline}
            animate={underlineStyle}
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
          />
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
}
