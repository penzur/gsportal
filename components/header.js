import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <a className="logo">
            GS
            <span className="mute">
              <small
                style={{
                  fontSize: 16,
                  position: 'relative',
                  fontFamily: 'Inconsolata',
                  top: -5,
                  left: 2,
                }}
              >
                / BETA
              </small>
            </span>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/logs/new">
          <a className="right">↥ UPLOAD LOGS</a>
        </Link>
        <span className="mute right">|</span>
        <Link href="/calculator">
          <a className="right">λ CALCULATOR</a>
        </Link>
      </div>
    </header>
  )
}
