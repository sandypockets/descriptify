import Footer from './Footer';
import Header from './Header';

export default function Layout({children}) {
  return (
    <>
      <Header />
      <main className="my-14">{children}</main>
      <Footer />
    </>
  );
}
