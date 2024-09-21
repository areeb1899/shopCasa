import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';



//to  get the page to the top whenever  the user navigates to a new page 

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
