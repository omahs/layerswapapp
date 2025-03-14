import React, { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router";
import QueryProvider from "../context/query";
import ThemeWrapper from "./themeWrapper";
import ErrorBoundary from "./ErrorBoundary";
import { QueryParams } from "../Models/QueryParams";
import MaintananceContent from "./maintanance/maintanance";
import { AuthProvider } from "../context/authContext";

type Props = {
  children: JSX.Element | JSX.Element[];
  hideFooter?: boolean;
  hideNavbar?: boolean;
};

export default function Layout({ hideFooter, hideNavbar, children }: Props) {
  const router = useRouter();
  const query: QueryParams = {
    ...router.query,
    ...(router.query.lockAddress === 'true' ? { lockAddress: true } : {}),
    ...(router.query.lockNetwork === 'true' ? { lockNetwork: true } : {}),
  };

  useEffect(() => {
    function prepareUrl(params) {
      const url = new URL(location.href)
      const queryParams = new URLSearchParams(location.search)
      let customUrl = url.protocol + "//" + url.hostname + url.pathname.replace(/\/$/, '')
      for (const paramName of params) {
        const paramValue = queryParams.get(paramName)
        if (paramValue) customUrl = customUrl + '/' + paramValue
      }
      return customUrl
    }
    plausible('pageview', { u: prepareUrl(['destNetwork', 'sourceExchangeName', 'addressSource', 'asset', 'amount']) })
  }, [])

  return (<>
    <Head>
      <title>Layerswap</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="favicon/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#111827" />
      <meta name="description" content="Move crypto from Binance or Coinbase to Arbitrum and Optimism - save 10x on fees." />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://www.layerswap.io/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Layerswap - Accelerating L2 migration" />
      <meta property="og:description" content="Move crypto from Binance or Coinbase to Arbitrum and Optimism - save 10x on fees." />
      <meta property="og:image" content="https://layerswap.io/opengraph.jpeg" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="layerswap.io" />
      <meta property="twitter:url" content="https://www.layerswap.io/" />
      <meta name="twitter:title" content="Layerswap - Accelerating L2 migration" />
      <meta name="twitter:description" content="Move crypto from Binance or Coinbase to Arbitrum and Optimism - save 10x on fees." />
      <meta name="twitter:image" content="https://layerswap.io/opengraphtw.jpeg" />
    </Head>
    <AuthProvider>
      <ErrorBoundary >
        <QueryProvider query={query}>
          <ThemeWrapper hideNavbar={hideNavbar}>
            {process.env.NEXT_PUBLIC_IN_MAINTANANCE === 'true' ? <MaintananceContent /> : children}
          </ThemeWrapper>
        </QueryProvider>
      </ErrorBoundary>
    </AuthProvider>
  </>)
}
