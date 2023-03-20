import { AppProps } from 'next/app';
import Layout from "../components/layouts/main"

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  )
}

export default App;