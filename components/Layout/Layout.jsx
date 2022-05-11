import Header from './Header';
import Meta from './Meta';

export default function Layout({children}) {
  return (
    <>
      <Meta />
      <Header />
      <main className="my-24">{children}</main>
    </>
  );
}
