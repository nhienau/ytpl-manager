import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styled, { css } from "styled-components";
import Button from "./Button";

const StyledTabsList = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  background-color: var(--color-neutral-300);
  border-radius: 0.5rem;
  padding: 0.25rem;
`;

interface StyledTabsTriggerProps {
  $isCurrentTab: boolean;
}

const StyledTabsTrigger = styled(Button)<StyledTabsTriggerProps>`
  font-size: 0.875rem;
  ${(props) =>
    props.$isCurrentTab &&
    css`
      background-color: var(--color-neutral-50);

      &:not(:disabled):hover {
        background-color: var(--color-neutral-50);
      }
    `}
`;

interface TabsContextValue {
  currentTab: string | null;
  setCurrentTab: Dispatch<SetStateAction<string | null>>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
}

function Tabs({ children, defaultValue }: TabsProps) {
  const [currentTab, setCurrentTab] = useState<string | null>(
    defaultValue || null
  );

  return (
    <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function useTabs() {
  const context = useContext(TabsContext);
  if (context === null || context === undefined)
    throw new Error("TabsContext was used outside of TabsProvider");
  return context;
}

function List({ children }: { children: ReactNode }) {
  return <StyledTabsList>{children}</StyledTabsList>;
}

interface TriggerProps {
  children: ReactNode;
  value: string;
}

function Trigger({ children, value }: TriggerProps) {
  const { currentTab, setCurrentTab } = useTabs();

  return (
    <StyledTabsTrigger
      onClick={() => setCurrentTab(value)}
      $isCurrentTab={currentTab === value}
    >
      {children}
    </StyledTabsTrigger>
  );
}

interface ContentProps {
  children: ReactNode;
  value: string;
}

function Content({ children, value }: ContentProps) {
  const { currentTab } = useTabs();
  if (currentTab !== value) return null;
  return children;
}

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export default Tabs;
