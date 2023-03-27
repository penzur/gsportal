import styled from 'styled-components'

const LogView = styled.div`
  display: flex;
  & > ul {
    flex: 1;
    list-style: none;
    padding: 0;

    & > li {
      cursor: pointer;
      padding: 16px;
      background-color: #ffffff;
      margin-bottom: 5px;
      border-radius: 5px;
      border-bottom: 1px solid #dddddd;
      &:not(.head) {
        min-height: 64px;
      }
      display: flex;
      align-items: center;
      transition: background-color 0.3s, color 0.3s;
      & > strong {
        display: flex;
        align-items: center;
      }
      & > span {
        display: flex;
        align-items: center;
      }
      .txt {
        flex: 1;
        .idx {
          position: relative;
          margin-right: 28px;
          left: 8px;
          font-family: 'Ropa Sans';
          font-weight: normal;
          opacity: 0.5;
        }
        &.center {
          justify-content: center;
        }
      }
      .numbers {
        display: inline-block;
        width: 88px;
        text-align: center;
      }
      &:hover,
      &.selected {
        background-color: rgb(104 104 149);
        color: #ffffff;
      }
      &.head {
        background-color: rgb(104 104 149);
        color: #ffffff;
        padding: 8px 16px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
      }
      &.selected {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.details {
        cursor: default;
        position: relative;
        background-color: rgb(45 45 76);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.7);
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        font-weight: normal;
        padding: 32px;
        display: flex;
        align-items: baseline;
        & > div {
          flex: 1;
          max-width: 45%;
          &:not(:last-child) {
            &::before {
              content: ' ';
              box-sizing: border-box;
              position: absolute;
              display: block;
              width: 1px;
              height: 100%;
              top: 0;
              left: 50%;
              background-color: rgba(255, 255, 255, 0.1);
            }
          }
          h1,
          h2,
          h3,
          h4 {
            margin-top: 0;
          }

          ul {
            padding-left: 16px;
          }

          small {
            font-size: 13px;
            opacity: 0.5;
          }

          &:last-child {
            padding-left: 64px;
          }
        }
        .code {
          padding: 16px 0;
        }
        .code > li {
          margin-bottom: 8px;
          display: flex;
          flex-direction: row;
          & > * {
            flex: 1;
            width: 50%;
            overflow-wrap: break-word;
          }
          & > :last-child {
            text-align: right;
          }
        }
      }
    }

    &:first-child {
      margin-right: 16px;
    }

    &.guild > li.selected {
      border-radius: 5px;
      margin-bottom: 5px;
    }
  }

  @media only screen and (max-width: 1100px) {
    display: block;
    & > ul:first-child {
      margin-right: 0;
    }
  }
  @media only screen and (max-width: 720px) {
    & > ul {
      width: 100%;
      & > li.details {
        display: block !important;
        & > div {
          max-width: inherit;
        }
        & > div:first-child::before {
          display: none;
        }
        & > div:last-child {
          padding-left: 0;
        }
      }
    }
  }
`

export default LogView
