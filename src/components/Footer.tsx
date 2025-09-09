const Footer = () => {
    return (
        <footer className="footer bg-base-200 text-base-content px-6 py-12 md:px-24">
            <aside>
                <img src='/logo.png' alt='logo' className='w-32 h-16 lg:w-36 lg:h-16'/>
                <p>
                    ClearLens Private Ltd.
                    <br/>
                    Providing reliable specs since 1992
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Categories</h6>
                <a className="link link-hover">Vision</a>
                <a className="link link-hover">Sunglasses</a>
                <a className="link link-hover">Sports</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )
}

export default Footer;
