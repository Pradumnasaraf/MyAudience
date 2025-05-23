// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Add other head elements like meta tags, link tags, etc. */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}