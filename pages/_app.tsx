import '../styles/globals.css'
import 'antd/dist/antd.dark.css'
// import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import { UTCNowProvider } from 'providers/UTCNowProvider'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  EnvironmentProvider,
  getInitialProps,
} from '../providers/EnvironmentProvider'
import WalletConnectionProvider from '../components/WalletConnection/WalletConnectionProvider'
import { GlobalStyle } from 'styles/global'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
})

const App = ({
  Component,
  pageProps,
  cluster,
}: AppProps & { cluster: string }) => {
  return (
    <EnvironmentProvider defaultCluster={cluster}>
      <WalletConnectionProvider>
        <UTCNowProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <Component {...pageProps} />
          </QueryClientProvider>
        </UTCNowProvider>
      </WalletConnectionProvider>
    </EnvironmentProvider>
  )
}

App.getInitialProps = getInitialProps

export default App
