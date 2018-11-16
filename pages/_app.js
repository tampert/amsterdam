// Libraries
import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import Router from 'next/router';

// Custom Lib
import withRedux from '../app/lib/withRedux';

// cOMPONENTS
import { PageLoading } from '../app/components/utils';

// Style
import '../app/assets/css/index.css';

class MyApp extends App {

    constructor(props) {
        super(props);

        // Default states
        this.state = {
            progress: 0,
            loading: false
        }
    }

    componentDidMount() {
        Router.onRouteChangeStart = url => {
            this.setState({ loading: true, progress: 50 });
        };
        Router.onRouteChangeComplete = url => {
            window.scroll(0, 0);
            this.setState({ progress: 100 });
            const self = this;
            setTimeout(() => {
                self.setState({ loading: false, progress: 0 });
            }, 600);
        };
    }

    render() {
        const { Component, pageProps, reduxStore } = this.props
        const { progress, loading } = this.state;
        return (
            <Container>
                <PageLoading show={loading} progress={progress} />
                <Provider store={reduxStore}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withRedux(MyApp);