import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "Tasty Mundo";

    switch (location.pathname) {
      case "/":
        title = "Tasty Mundo";
        break;
      default:
        title = "Tasty Mundo";
    }

    document.title = title;
  }, [location]);

  return null;
};

export default PageTitleUpdater;
