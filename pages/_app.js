import '../styles/globals.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs';

import { useRouter } from 'next/router';

import Header from '../components/Header';

const publicPages = [];

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Header />
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
