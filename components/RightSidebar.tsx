'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { countTransactionCategories } from '@/lib/utils'
import BankCard from './BankCard'
import Category from './Category'

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1280);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button - Visible on large screens only */}
      {isLargeScreen && (
        <button 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1001,
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          {isOpen ? (
            // X icon when sidebar is open
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            // Menu icon when sidebar is closed
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          )}
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            cursor: 'pointer'
          }}
        />
      )}

      {/* Sidebar */}
      <aside 
        className="right-sidebar"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '350px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
          overflow: 'auto'
        }}
      >
        <section className="flex flex-col pb-8">
          <div className="profile-banner" />
          <div className="profile">
            <div className="profile-img">
              <span className="text-5xl font-bold text-blue-500">{user.firstName[0]}</span>
            </div>

            <div className="profile-details">
              <h1 className='profile-name'>
                {user.firstName} {user.lastName}
              </h1>
              <p className="profile-email">
                {user.email}
              </p>
            </div>
          </div>
        </section>

        <section className="banks">
          <div className="flex w-full justify-between">
            <h2 className="header-2">My Banks</h2>
            <Link href="/" className="flex gap-2">
              <Image 
                 src="/icons/plus.svg"
                width={20}
                height={20}
                alt="plus"
              />
              <h2 className="text-14 font-semibold text-gray-600">
                Add Bank
              </h2>
            </Link>
          </div>

          {banks?.length > 0 && (
            <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
              <div className='relative z-10'>
                <BankCard 
                  key={banks[0].$id}
                  account={banks[0]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
              {banks[1] && (
                <div className="absolute right-0 top-8 z-0 w-[90%]">
                  <BankCard 
                    key={banks[1].$id}
                    account={banks[1]}
                    userName={`${user.firstName} ${user.lastName}`}
                    showBalance={false}
                  />
                </div>
              )}
            </div>
          )}

          <div className="mt-10 flex flex-1 flex-col gap-6">
            <h2 className="header-2" style={{paddingTop : 30 }}></h2>

            <div className='space-y-5'>
              {categories.map((category, index) => (
                <Category key={category.name} category={category} />
              ))}
            </div>
          </div>
        </section>
      </aside>
    </>
  )
}

export default RightSidebar