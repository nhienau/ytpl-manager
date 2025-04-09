import styled from "styled-components";

interface FormFieldProps {
  $vertical?: boolean;
}

const FormField = styled.div<FormFieldProps>`
  display: flex;
  flex-direction: ${(props) => (props.$vertical ? "column" : "row")};
  gap: 0.25rem;
`;

FormField.defaultProps = {
  $vertical: false,
};

export default FormField;
