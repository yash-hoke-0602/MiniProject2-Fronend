import React from "react";

import { WebView } from "react-native-webview";
import PDFReader from "rn-pdf-reader-js";

import { url } from "../components/url";

function PdfViewer(props) {
  const { address } = props.route.params;
  console.log(address);
  return (
    <PDFReader
      source={{
        uri: url + "/feeds/" + address,
      }}
      webviewProps={{
        startInLoadingState: true,
      }}
      style={{ marginTop: 15 }}
    />
  );
}

export default PdfViewer;
