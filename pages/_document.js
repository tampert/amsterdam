// Libraries
import Document, { Head, Main, NextScript } from 'next/document';

// Analytics
// import Analytics from './analytics';

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {/* <Analytics /> */}
                </body>
            </html>
        )
    }
}