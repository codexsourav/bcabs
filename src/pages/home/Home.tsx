import { useEffect } from "react"
import AboutUs from "../../components/basic/AboutUs"
import Blogs from "../../components/basic/Blogs"
import CallSection from "../../components/basic/CallSection"
import DownloadApp from "../../components/basic/DownloadApp"
import Drivers from "../../components/basic/Drivers"
import Faqs from "../../components/basic/Faqs"
import Feature from "../../components/basic/Feature"
import Header from "../../components/basic/Header"
import Services from "../../components/basic/Services"
import { UserWrapper } from "../../components/wrapper/UserWrapper"



function Home() {
    useEffect(() => {
        const fragment = window.location.hash.substring(1);
        const element = document.getElementById(fragment);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <UserWrapper>
            <Header />
            <AboutUs />
            <Services />
            <Feature />
            <Drivers />
            <Faqs />
            <CallSection />
            <Blogs />
            <DownloadApp />
        </UserWrapper>
    )
}
export default Home