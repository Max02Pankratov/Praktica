import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Fruktur&family=Rubik:ital@1&family=Zen+Kaku+Gothic+Antique:wght@900&display=swap" rel="stylesheet"/>
        <link href="/dist/output.css" rel="stylesheet"/>
        </Head>
        <body>
            <Main />
            <NextScript />
            <footer/>
        </body>
        </Html>
    )
}