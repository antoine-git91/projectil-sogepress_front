import styled from "styled-components";

const DivButtonAction = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify ?? "flex-end"};
  margin: ${({ margin }) => margin ?? 0};
`
export default DivButtonAction;