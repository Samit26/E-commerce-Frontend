import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get current route

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on every route change
  }, [pathname]); // Runs effect whenever `pathname` changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;