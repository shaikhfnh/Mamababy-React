import React from 'react'
import Home from './Home'
import { useLanguage } from './context/LanguageContext'

const Layout = () => {
  const {language} = useLanguage()
  return (
    <div className={language === 'ar' ? "font-arabic" : 'font-sans'}>

      <Home />
    </div>
  )
}

export default Layout