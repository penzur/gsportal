import styled from 'styled-components'

const Wrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Centered = ({ children }) => <Wrap>{children}</Wrap>
export default Centered
