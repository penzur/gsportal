import styled from 'styled-components'

const Spin = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.5);
  background-color: rgba(0, 0, 0, 0.8);
  font-family: 'JetBrains Mono';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ripple div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`

const spin = ({ spin, children }) => (
  <>
    {children}
    {spin && (
      <Spin>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        <small>PLEASE WAIT...</small>
      </Spin>
    )}
  </>
)
export default spin
