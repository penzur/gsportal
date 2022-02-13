import styled from 'styled-components'

const Drop = styled.div`
  cursor: pointer;
  width: 300px;
  height: 200px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  line-height: 1.5em;
  align-items: center;
  justify-content: center;
  color: #666;
  background-color: white;
  outline: 2px dashed rgba(0, 0, 0, 0.5);
  padding: 32px;
  transition: box-shadow 0.3s;
  text-align: center;

  &:hover {
    box-shadow: 0 20px 32px 0px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
  }
`

export default Drop
