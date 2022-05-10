import Head from 'next/head';
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';

export default function Meta() {
  const [pageTitle, setPageTitle] = useState(
    'Descriptify | AI Product Descriptions',
  );

  const router = useRouter();

  useEffect(() => {
    function removeSlash(string) {
      return string.replace('/', '');
    }
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function formatTitle(string) {
      return capitalize(removeSlash(string));
    }

    if (router.pathname === '/') {
      setPageTitle('Descriptify | AI Product Descriptions');
    } else {
      setPageTitle(`${formatTitle(router.pathname)} | Descriptify`);
    }
  }, [router.pathname]);

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="description"
        content="Generate product descriptions with AI"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
