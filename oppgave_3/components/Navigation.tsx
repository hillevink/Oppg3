import Link from "next/link"

const Navigation = () => {

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link href="/" passHref><a className="first">Lunsjkalender 🍵🥪</a></Link>
        </li>
        <li>
          <Link href="/employees" passHref><a className="second">Ansatte</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation