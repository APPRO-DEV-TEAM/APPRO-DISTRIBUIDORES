import React, { useState, useContext, createContext } from "react";

interface TabOptionProps {
  value: string;
  icon: React.ReactNode;
  title: string;
}

interface TabContentProps {
  value: string;
  children: React.ReactNode;
}

interface TabsRootProps {
  children: React.ReactNode;
}

interface TabContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabOptions = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-row gap-4">{children}</div>;
};

export const TabOption = ({ value, icon, title }: TabOptionProps) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("TabOption must be used within a TabContainer");
  }

  const { activeTab, setActiveTab } = context;

  return (
    <button
      className={`flex cursor-pointer flex-row items-center gap-2 border-b-4 pb-3 font-bold ${
        activeTab === value
          ? "border-[#846944]"
          : "border-transparent text-gray-500"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {icon}
      {title}
    </button>
  );
};

export const TabContent = ({ value, children }: TabContentProps) => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("TabContent must be used within a TabContainer");
  }

  const { activeTab } = context;

  return activeTab === value ? (
    <div className="mt-4 rounded-lg p-4">{children}</div>
  ) : null;
};

export const TabsContainer = ({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="space-y-4">{children}</div>
    </TabContext.Provider>
  );
};

export const TabsRoot = ({ children }: TabsRootProps) => {
  return <div className="flex flex-col">{children}</div>;
};
