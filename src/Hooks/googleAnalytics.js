import { useEffect } from "react";
import ReactGA from "react-ga4";

const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}

const useGoogleAnalytics = () => {

    useEffect(() => {
        // Initialize Google Analytics
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);


        // Log the initial pageview
        logPageView();

    }, []);
}

export default useGoogleAnalytics;