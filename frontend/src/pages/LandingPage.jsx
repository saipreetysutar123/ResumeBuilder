import React, { useState } from 'react'
import { LayoutTemplate, X, Menu } from 'lucide-react';
import { landingPageStyles } from '../assets/dummystyle'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className={landingPageStyles.container}>
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>QuickResume</span>
          </div>

          {/* {MOBILE MENU BTN} */}
          <button className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} className={landingPageStyles.mobileMenuIcon} /> : <Menu size={24} className={landingPageStyles.mobileMenuIcon} />}

          {/* DESKTOP NAVIGATION */}
          <div className='hidden md:flex items-center'>
            {/* {user} */}
          </div>
          </button>
        </div>
      </header>
    </div>
  )
}

export default LandingPage
