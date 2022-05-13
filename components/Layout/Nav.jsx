import Link from 'next/link';

const navItems = [
  {
    name: 'View source on GitHub',
    href: 'https://github.com/sandypockets/descriptify',
    target: '_blank',
  },
];

export default function Nav() {
  return (
    <nav>
      <ul className="flex">
        {navItems.map((item, index) => (
          <li key={index} className="mt-7">
            <Link href={item.href}>
              <a
                data-test="logo"
                target={item.target}
                className="p-2 mx-2 hover:text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 transition-colors duration-200"
              >
                {item.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
