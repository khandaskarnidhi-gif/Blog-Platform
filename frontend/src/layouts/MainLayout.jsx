import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
function MainLayout({ children }) {

    return (

        <>

            <Navbar/>

            <main className="container" style={{minHeight:"85vh",paddingTop:"40px"}}>

                {children}

            </main>

            <Footer/>

        </>

    )

}

export default MainLayout;