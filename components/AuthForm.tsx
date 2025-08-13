"use client"

import React, { useState } from 'react'

// Define the counterparty type
interface Counterparty {
  email: string
  password: string
  name: string
  firstName: string
  lastName: string
}

interface AuthFormProps {
  onLoginSuccess?: () => void
}

const AuthForm = ({ onLoginSuccess }: AuthFormProps = {}) => {
  const [selectedCounterparty, setSelectedCounterparty] = useState('')
  const [serverType, setServerType] = useState('Server')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const counterparties: Counterparty[] = [
    { 
      email: 'bnp@colfi.com', 
      password: 'colfi123456', 
      name: 'BNP Paribas',
      firstName: 'BNP',
      lastName: 'Paribas'
    },
    { 
      email: 'sg@colfi.com', 
      password: 'colfi123456', 
      name: 'Société Générale',
      firstName: 'Société',
      lastName: 'Générale'
    },
    { 
      email: 'lb@colfi.com', 
      password: 'colfi123456', 
      name: 'Lebanese Bank',
      firstName: 'Lebanese',
      lastName: 'Bank'
    },
    { 
      email: 'hsbc@colfi.com', 
      password: 'colfi123456', 
      name: 'HSBC',
      firstName: 'HSBC',
      lastName: 'Bank'
    }
  ]

  const handleCounterpartySelect = (counterparty: Counterparty) => {
    setSelectedCounterparty(counterparty.name)
    setEmail(counterparty.email)
    setPassword(counterparty.password)
  }

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    // Find the selected counterparty
    const selectedUser = counterparties.find(cp => cp.email === email)
    
    if (selectedUser) {
      // Store user data in sessionStorage to pass to home page
      const userData = {
        $id: `mock-id-${Date.now()}`,
        userId: `user-${Date.now()}`,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        name: selectedUser.name,
        email: selectedUser.email,
        currentBalance: Math.floor(Math.random() * 50000) + 10000, // Random balance
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
      }
      
      // Store in sessionStorage (Note: In a real app, you'd use a proper state management solution)
      sessionStorage.setItem('loggedInUser', JSON.stringify(userData))
      
      // Call the success callback if provided
      if (onLoginSuccess) {
        onLoginSuccess()
      } else {
        // Fallback for direct routing (if used standalone)
        window.location.href = '/';
      }
    }
  };

  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Header */}
        <div className="header-box">
          <h1 className="header-box-title">Welcome to COLFI</h1>
          <p className="header-box-subtext">
            Secure banking authentication for financial institutions
          </p>
        </div>

        {/* Financial Institution Selection */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>
            Select Financial Institution
          </h3>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem'
          }}>
            {counterparties.map((counterparty) => (
              <div
                key={counterparty.email}
                onClick={() => handleCounterpartySelect(counterparty)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: selectedCounterparty === counterparty.name ? '2px solid #2563eb' : '1px solid #e5e7eb',
                  backgroundColor: selectedCounterparty === counterparty.name ? '#dbeafe' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '200px',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (selectedCounterparty !== counterparty.name) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#a5b4fc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCounterparty !== counterparty.name) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }
                }}
              >
                {selectedCounterparty === counterparty.name && (
                  <div style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem'
                  }}>
                    ✓
                  </div>
                )}
                <div>
                  <div className="text-16" style={{ 
                    fontWeight: '600', 
                    color: selectedCounterparty === counterparty.name ? '#1d4ed8' : '#111827',
                    marginBottom: '0.25rem'
                  }}>
                    {counterparty.name}
                  </div>
                  <div className="text-14" style={{ color: '#6b7280' }}>
                    {counterparty.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentication Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>
            Authentication Details
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Connection Type */}
            <div className="form-item">
              <label className="form-label">Connection Type *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                <button
                  onClick={() => setServerType('Server')}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: serverType === 'Server' ? '2px solid #2563eb' : '1px solid #d1d5db',
                    backgroundColor: serverType === 'Server' ? '#dbeafe' : 'white',
                    color: serverType === 'Server' ? '#1d4ed8' : '#4b5563',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '14px'
                  }}
                >
                  Server
                </button>
                <button
                  onClick={() => setServerType('Blockchain')}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: serverType === 'Blockchain' ? '2px solid #2563eb' : '1px solid #d1d5db',
                    backgroundColor: serverType === 'Blockchain' ? '#dbeafe' : 'white',
                    color: serverType === 'Blockchain' ? '#1d4ed8' : '#4b5563',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '14px'
                  }}
                >
                  Blockchain
                </button>
              </div>
            </div>

            {/* Bank Connection Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.5rem'
            }}>
              <div style={{
                width: '0.75rem',
                height: '0.75rem',
                backgroundColor: '#22c55e',
                borderRadius: '50%'
              }}></div>
              <span className="text-14" style={{ color: '#15803d', fontWeight: '500' }}>
                Wise Bank Account Connected
              </span>
            </div>

            {/* Form Fields - Full Width */}
            <div className="form-item">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="input-class"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ padding: '0.75rem 1rem', width: '100%' }}
              />
            </div>

            <div className="form-item">
              <label className="form-label">Password *</label>
              <input
                type="password"
                className="input-class"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{ padding: '0.75rem 1rem', width: '100%' }}
              />
            </div>

            {/* Selected Institution Display */}
            {selectedCounterparty && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    marginRight: '0.5rem'
                  }}></div>
                  <span className="text-14" style={{ color: '#4b5563', fontWeight: '500' }}>
                    Connected to {selectedCounterparty}
                  </span>
                </div>
                <span className="text-12" style={{ color: '#6b7280' }}>
                  Using credentials: {email}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '1.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div className="text-14" style={{ color: '#6b7280' }}>
            Select an institution and enter credentials
          </div>
          
          <button
            onClick={handleLogin}
            disabled={!email || !password}
            className="form-btn"
            style={{ 
              padding: '0.75rem 2rem',
              opacity: (!email || !password) ? 0.5 : 1,
              cursor: (!email || !password) ? 'not-allowed' : 'pointer'
            }}
          >
            Login to COLFI
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthForm