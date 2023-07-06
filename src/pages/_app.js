import "bootstrap/dist/css/bootstrap.css";
import "@/styles/globals.css";
import "@/components/dropdown/dropdown.css";
import { SSRProvider } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <SSRProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </SSRProvider>
  );
}
