import styled from "styled-components";

const StyledDivider = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--color-neutral-300);
  margin: 0.375rem 0;
`;

function Divider() {
  return <StyledDivider></StyledDivider>;
}

export default Divider;
