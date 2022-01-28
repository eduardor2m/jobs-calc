import '../styles/globals.scss';
import type { AppProps } from 'next/app';

import { JobProvider } from '../hooks/useJob';
import { ProfileProvider } from '../hooks/useProfile';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </ProfileProvider>
  );
}

export default MyApp;
