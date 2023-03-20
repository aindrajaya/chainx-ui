import Head from "next/head";

const Main = ({children}) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Chainx Scanner homepage" />
        <meta name="author" content="Arista Indrajaya" />
        <meta name="author" content="aindrajaya" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Chainx Scanner" />
        <meta name="og:title" content="Chainx Scanner" />
        <meta property="og:type" content="website" />
        <title>Chainx - HomePage</title>
      </Head>
      {/* It could be routing Navbar */}
      {/* And then Container to wrapping Children */}
      <div>
        {children}
      </div>
    </div>
  )
}

export default Main;