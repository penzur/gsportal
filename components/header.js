import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a className="logo">GSParser</a>
      </Link>
    </header>
  )
}
