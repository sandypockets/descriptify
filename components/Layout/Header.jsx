import Nav from './Nav';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="top-0 w-full h-20 bg-gray-900 text-white flex sm:grid sm:grid-cols-3">
      <Link href="/">
        <a className="mt-6 mx-6 sm:ml-6 max-w-min text-2xl sm:mt-5 sm:text-4xl font-bold hover:text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-blue-500 transition-colors duration-200">
          Descriptify
        </a>
      </Link>
      <div className="flex justify-center">
        <Nav />
      </div>
    </header>
  );
}
