import { useState, useRef } from 'react'
import styled from 'styled-components'

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #efefefaa;
`

const Wrap = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  line-height: 1.5em;
  align-items: center;
  color: #aaa;
  background-color: #fff;
  padding: 32px;
  transition: box-shadow 0.3s;
  border: 1px solid blue;
  box-shadow: 0 10px 10px 0px rgba(0, 0, 0, 0.05);
  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none;
  border: 1px solid #efefef;
  `}

  p {
    margin: 8px 0;
    padding: 0;
    width: 100%;
  }

  small {
    display: inline-block;
    letter-spacing: 1px;
    padding-top: 10px;
  }

  .file {
    position: relative;
    display: flex;
    background-color: #0000ff11;
    border: 1px solid blue;
    color: blue;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    height: 200px;
    text-align: center;
    font-family: Inconsolata;
    button {
      cursor: pointer;
      position: absolute;
      top: -11px;
      right: -11px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #000000;
      border-radius: 100px;
      font-size: 12px;
      width: 24px;
      height: 24px;
      color: #ffffff;
      background-color: blue;
    }
    .icon {
      font-size: 50px;
      margin: 16px 0 32px;
      opacity: 0.5;
    }
  }

  p > button {
    cursor: pointer;
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    outline: none;
    background-color: #0000ff11;
    outline: none;
    border: 1px solid blue;
    color: blue;
    font-size: 12px;
    letter-spacing: 1px;
    transition: background-color 0.3s;
    &:hover {
      background-color: blue;
      transition: background-color 0.3s;
      color: #ffffff;
    }
  }
`

const Target = styled.div`
  width: 100%;
  height: 160px;
  border: 2px dashed #0000ff44;
  background-color: #0000ff11;
  color: #0000ffaa;
  display: flex;
  font-family: Inconsolata;
  font-weight: normal;
  justify-content: center;
  align-items: center;
  &.dragover {
    background-color: #0000ff11;
    border: 2px dashed blue;
    color: blue;
  }
`

export default function Drop({ onFile, disabled }) {
  const inputRef = useRef()
  const [file, setFile] = useState()

  const onChange = ({ target }) => {
    const f = target?.files[0]
    // should be text/plain only and not more than 256kb
    if (!f || f.type !== 'text/plain' || f.size > 256000) return false
    setFile(f)
    onFile(f)
    inputRef.current.value = ''
  }

  const clickFile = () => {
    inputRef.current.click()
  }

  const reset = (e) => {
    e.preventDefault()
    inputRef.current.value = ''
    setFile()
    onFile()
  }

  return (
    <Wrap disabled={disabled}>
      <input
        ref={inputRef}
        type="file"
        name="file"
        onChange={onChange}
        accept="text/plain"
        style={{ display: 'none' }}
      />
      {file ? (
        <div className="file">
          <button onClick={reset}>✖</button>
          <p className="icon">📄</p>
          <p>{file.name}</p>
        </div>
      ) : (
        <>
          <Target
            onDragOver={(e) => {
              e.preventDefault()
              e.target.classList.add('dragover')
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.target.classList.remove('dragover')
            }}
            onDragEnter={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              e.target.classList.remove('dragover')
              const f = e.dataTransfer?.files[0]
              if (!f || f.type !== 'text/plain' || f.size > 256000) return false
              setFile(f)
              onFile(f)
              inputRef.current.value = ''
            }}
          >
            Drag &amp; Drop File
          </Target>
          <p className="center code">
            <small>OR</small>
          </p>
          <p>
            <button onClick={clickFile}>BROWSE YOUR PC</button>
          </p>
        </>
      )}
      {disabled && <Cover />}
    </Wrap>
  )
}
