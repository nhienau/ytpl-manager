import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-lg);
  padding: 2rem 2.5rem;
  transition: all 0.3s;
`;

function Modal({ onClose }) {
  return (
    <StyledModal>
      <button onClick={onClose}>Close</button>
      <p>Modal</p>
    </StyledModal>
  );
}

export default Modal;
