import { createContext, useContext, useState } from "react";
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

const StyledTabsTrigger = styled(Button)`
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

const TabsContext = createContext(null);

function Tabs({ children, defaultValue }) {
  const [currentTab, setCurrentTab] = useState(defaultValue || null);

  return (
    <TabsContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabsContext.Provider>
  );
}

function List({ children }) {
  return <StyledTabsList>{children}</StyledTabsList>;
}

function Trigger({ children, value }) {
  const { currentTab, setCurrentTab } = useContext(TabsContext);

  return (
    <StyledTabsTrigger
      onClick={() => setCurrentTab(value)}
      $isCurrentTab={currentTab === value}
    >
      {children}
    </StyledTabsTrigger>
  );
}

function Content({ children, value }) {
  const { currentTab } = useContext(TabsContext);
  if (currentTab !== value) return null;
  return children;
}

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;

export default Tabs;
