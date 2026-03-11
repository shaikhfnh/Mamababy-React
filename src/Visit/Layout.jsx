import Navbar from "../components/Navbar"
import { useLanguage } from "../context/LanguageContext"
import VisitSection from "./VisitSection"

const Layout = () => {
  const {language} = useLanguage()
  return (
    <div className={language === 'ar' ? "font-arabic" : 'font-sans'}>
      <Navbar />
      <VisitSection />
    </div>
  )
}

export default Layout