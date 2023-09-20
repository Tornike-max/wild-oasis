import { styled } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
    padding: 1.2rem 0;
    gap: 0.8rem;
    align-items: center;
    justify-content: space-between;
`;


const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;


function FormRowVertical({ children, label, error }) {
    return (
        <StyledFormRow>
            {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
            {children}
            {error && <Error>{error}</Error>}
        </StyledFormRow>
    )
}

export default FormRowVertical
