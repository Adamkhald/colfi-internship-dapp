'use client'

import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  
  // Default user data as a constant to avoid re-creation
  const defaultUser = React.useMemo(() => ({
    $id: 'mock-id-123',
    userId: 'user-123',
    firstName: 'Adam',
    lastName: 'KHALD',
    name: 'Adam KHALD',
    email: 'adkhald@gmail.com',
    currentBalance: 25000,
    totalBanks: 2,
    dwollaCustomerUrl: '',
    dwollaCustomerId: '',
    dwollaCustomerAvatarUrl: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: ''
  }), []);

  const [loggedIn, setLoggedIn] = useState(defaultUser)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication on component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser')
    
    if (!storedUser) {
      // No user logged in, redirect to sign-in
      router.push('/sign-in')
      return
    }
    
    try {
      const userData = JSON.parse(storedUser)
      setLoggedIn(userData)
    } catch (error) {
      console.error('Error parsing stored user data:', error)
      // Invalid data, redirect to sign-in
      sessionStorage.removeItem('loggedInUser')
      router.push('/sign-in')
      return
    }
    
    setIsLoading(false)
  }, [defaultUser, router])

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser')
    router.push('/sign-in')
  }

  // Generate mock banks based on logged in user
  const getMockBanks = (user: typeof defaultUser) => {
    const bankNames = ['Chase Bank', 'Wells Fargo', 'Bank of America', 'Citibank'];
    const userBankName = user.name.includes('HSBC') ? 'HSBC' : 
                        user.name.includes('BNP') ? 'BNP Paribas' :
                        user.name.includes('Société') ? 'Société Générale' :
                        user.name.includes('Lebanese') ? 'Lebanese Bank' :
                        bankNames[0];
    
    return [
      {
        $id: 'bank-1',
        accountId: 'account-1',
        bankId: 'bank-001',
        accessToken: 'mock-access-token-1',
        fundingSourceUrl: '',
        userId: user.userId,
        sharableId: 'share-1',
        shareableId: 'share-1',
        id: 'bank-1',
        availableBalance: Math.floor(user.currentBalance * 0.6),
        currentBalance: Math.floor(user.currentBalance * 0.65),
        officialName: userBankName,
        mask: '1234',
        institutionId: 'ins_1',
        name: `${userBankName} Checking`,
        type: 'depository',
        subtype: 'checking',
        appwriteItemId: 'item-1'
      },
      {
        $id: 'bank-2',
        accountId: 'account-2',
        bankId: 'bank-002',
        accessToken: 'mock-access-token-2',
        fundingSourceUrl: '',
        userId: user.userId,
        sharableId: 'share-2',
        shareableId: 'share-2',
        id: 'bank-2',
        availableBalance: Math.floor(user.currentBalance * 0.3),
        currentBalance: Math.floor(user.currentBalance * 0.35),
        officialName: 'Secondary Bank',
        mask: '5678',
        institutionId: 'ins_2',
        name: `${userBankName} Savings`,
        type: 'depository',
        subtype: 'savings',
        appwriteItemId: 'item-2'
      }
    ];
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading COLFI...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  const mockBanks = getMockBanks(loggedIn);

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext={`Logged in as ${loggedIn?.name || 'Guest User'}`}
          />
          
          <TotalBalanceBox 
            accounts={mockBanks}
            totalBanks={2}
            totalCurrentBalance={loggedIn?.currentBalance || 25000}
          />
        </header>

        {/* Logout Button */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: '1rem' 
        }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          >
            Logout
          </button>
        </div>

        {/* Three horizontal cards grid */}
        <style jsx>{`
          .section-card:hover {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border-color: rgba(229, 231, 235, 0.7);
          }
          .section-card:hover .card-title {
            color: #2563eb;
          }
          .option-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          {/* Customers Card */}
          <div
            className="section-card"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              overflow: 'hidden',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            {/* Picture at top - full width */}
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f3f4f6',
              marginBottom: '1.5rem',
              backgroundImage: 'url("https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=400&h=200&fit=crop&crop=center")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              <h3 className="card-title" style={{
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1.5rem',
                transition: 'color 0.3s ease'
              }}>
                Customers
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  Your Customers
                </button>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  Find Customers
                </button>
              </div>
            </div>
          </div>

          {/* Collaterals Card */}
          <div
            className="section-card"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              overflow: 'hidden',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            {/* Picture at top - full width */}
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f3f4f6',
              marginBottom: '1.5rem',
              backgroundImage: 'url("https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=200&fit=crop&crop=center")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              <h3 className="card-title" style={{
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1.5rem',
                transition: 'color 0.3s ease'
              }}>
                Collaterals
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  VM Contracts
                </button>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  IM Contracts
                </button>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  AI Contracts
                </button>
              </div>
            </div>
          </div>

          {/* Operations Card */}
          <div
            className="section-card"
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              overflow: 'hidden',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            {/* Picture at top - full width */}
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f3f4f6',
              marginBottom: '1.5rem',
              backgroundImage: 'url("https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=200&fit=crop&crop=center")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
            
            <div style={{ padding: '0 2rem 2rem 2rem' }}>
              <h3 className="card-title" style={{
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1.5rem',
                transition: 'color 0.3s ease'
              }}>
                Operations
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  Create Contract
                </button>
                <button
                  className="option-button"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    color: '#374151',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '0.5rem', color: '#9ca3af' }}>›</span>
                  Monitor Contract Validation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Debug Panel (Optional - Remove in production) */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '0.5rem' }}>
            Current User Session:
          </h4>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Name: {loggedIn.name} | Email: {loggedIn.email} | Balance: ${loggedIn.currentBalance?.toLocaleString()}
          </div>
        </div>
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={mockBanks}
      />
    </section>
  )
}

export default Home