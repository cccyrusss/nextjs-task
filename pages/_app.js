import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("@popperjs/core/dist/umd/popper.min.js");
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Component {...pageProps} />
}
