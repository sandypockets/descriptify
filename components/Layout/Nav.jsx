import Link from 'next/link';

const navItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export default function Nav() {
  return (
    <nav>
      <ul className="flex">
        {navItems.map((item, index) => (
          <li key={index} className="pt-3">
            <Link href={item.href}>
              <a className="p-1 mx-2">{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
