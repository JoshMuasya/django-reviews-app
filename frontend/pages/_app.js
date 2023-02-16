import '@/styles/globals.css';

import { AuthenticationProvider } from '@/context/AuthenticationContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
    </AuthenticationProvider>
  )
}
