import styled from "styled-components";

const MainContainer = styled.div`
  position: absolute;
  max-width: calc(100vw - 317px);
  width: 100%;
  left: 200px;
  top: 55px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;

  &.validated {
    background-color: #eeeeee;
  }
`;
export default MainContainer;