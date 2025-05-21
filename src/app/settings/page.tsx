"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { RadixTabs } from "common/components";
import s from "./page.module.css";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import { GeneralInfo } from "./generalInfo/generalInfo";
import { Devices } from "./devices/devices";
import { AccountManagement } from "./accountManagement/accountManagement";
import { MyPayments } from "./myPayments/myPayments";
import { useSearchParams } from "next/navigation";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("generalInfo");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const searchParams = useSearchParams();

  const tabs = [
    { value: "generalInfo", title: "General Information", component: <GeneralInfo /> },
    { value: "devices", title: "Devices", component: <Devices /> },
    {
      value: "accountManagement",
      title: "Account Management",
      component: <AccountManagement />,
    },
    { value: "myPayments", title: "My Payments", component: <MyPayments /> },
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
  useEffect(() => {
    const isSuccess = searchParams.get("success") || searchParams.get("error");
    if (isSuccess) {
      setActiveTab("accountManagement");
    }
  }, [searchParams]);

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
        {tabs.map((t) => (
          <Tabs.Content value={t.value} key={t.value}>
            {t.component}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
