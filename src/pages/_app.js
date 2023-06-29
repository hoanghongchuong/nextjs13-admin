import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/globals.css'
import '@/components/dropdown/dropdown.css'
import { SSRProvider } from 'react-bootstrap';

export default function App({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <SSRProvider>
      <Component {...pageProps} />
     </SSRProvider>
  
  )
}
