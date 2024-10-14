import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <title>Qumulo</title>
        </Head>
        <body className="antialiased font-nunito">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
