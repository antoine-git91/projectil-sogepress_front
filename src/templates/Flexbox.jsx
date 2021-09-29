import styled from 'styled-components'

const Flexbox = styled.div`
	display: ${({ inline }) => inline ? "inline-flex" : "flex"};
  	flex-direction: ${({ direction }) => direction ?? "row"};
  	justify-content: ${({ justify }) => justify ?? "flex-start"};
  	align-items: ${({ align }) => align ?? "baseline"};
  	flex: ${({ flex }) => flex ?? "initial"};
  	flex-wrap: ${({ wrap }) => wrap ?? "nowrap"};
`;

export default Flexbox;