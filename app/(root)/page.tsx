'use client'

import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {
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
  };

  const mockBanks = [
    {
      $id: 'bank-1',
      accountId: 'account-1',
      bankId: 'bank-001',
      accessToken: 'mock-access-token-1',
      fundingSourceUrl: '',
      userId: 'user-123',
      sharableId: 'share-1',
      shareableId: 'share-1',
      id: 'bank-1',
      availableBalance: 12000,
      currentBalance: 13000,
      officialName: 'Chase Bank',
      mask: '1234',
      institutionId: 'ins_1',
      name: 'Chase Checking',
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
      userId: 'user-123',
      sharableId: 'share-2',
      shareableId: 'share-2',
      id: 'bank-2',
      availableBalance: 8000,
      currentBalance: 8500,
      officialName: 'Wells Fargo',
      mask: '5678',
      institutionId: 'ins_2',
      name: 'Wells Fargo Savings',
      type: 'depository',
      subtype: 'savings',
      appwriteItemId: 'item-2'
    }
  ];

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Glad to have you here!"
          />
          
          <TotalBalanceBox 
            accounts={mockBanks}
            totalBanks={2}
            totalCurrentBalance={21500}
          />
        </header>

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