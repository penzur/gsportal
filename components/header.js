import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <Link href="/">
          <a className="logo">.logs</a>
        </Link>
      </div>
      <div>
        <Link href="/logs/new">
          <a className="right">UPLOAD LOGS</a>
        </Link>
      </div>
    </header>
  )
}
