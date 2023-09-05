import './Home.scss'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbars/Navbar'
import Footer from './components/Footers/Footer'
import BeforeNavbar from './components/Before_Navbar/BeforeNavbar'
import DropDown from '@/components/ChooseLanguage'

export default function Home() {
    return (
        <div className='home_page'>
            <div className='home_page_content'>
                <BeforeNavbar />
                <Navbar />

                <div className='content_body'>
                    <Outlet />
                </div>

                <DropDown />
                <Footer />
            </div>
        </div>
    )
}
