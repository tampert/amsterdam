// Sections
import { Header, Footer } from './sections';

const Layout = (props) => {
    const { children, showSearch = true } = props;
    return (
        <div>
            <Header showSearch={showSearch} />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;