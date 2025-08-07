"use client"

import React, { useState } from 'react'

// Define the counterparty type
interface Counterparty {
  email: string
  password: string
  name: string
}

const AuthForm = () => {
  const [selectedCounterparty, setSelectedCounterparty] = useState('')
  const [serverType, setServerType] = useState('Server')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const counterparties: Counterparty[] = [
    { email: 'bnp@colfi.com', password: 'colfi123456', name: 'BNP Paribas' },
    { email: 'sg@colfi.com', password: 'colfi123456', name: 'Société Générale' },
    { email: 'lb@colfi.com', password: 'colfi123456', name: 'Lebanese Bank' },
    { email: 'hsbc@colfi.com', password: 'colfi123456', name: 'HSBC' }
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

  // ✅ Inputs are filled, so redirect
  window.location.href = 'http://localhost:3000/';
};

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
      padding: '2rem 1rem'
    }}>
      {/* Header Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        maxWidth: '800px',
        margin: '0 auto 3rem auto'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '1rem',
          letterSpacing: '-0.025em'
        }}>
          Welcome to COLFI
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#6b7280',
          marginBottom: '1.5rem'
        }}>
          Secure banking authentication for financial institutions
        </p>
        <div style={{
          width: '6rem',
          height: '0.25rem',
          background: '#4f46e5',
          margin: '0 auto',
          borderRadius: '9999px'
        }}></div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        {/* Left Panel - Counterparty Selection */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Select Financial Institution
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '1rem'
          }}>
            {counterparties.map((counterparty) => (
              <button
                key={counterparty.email}
                onClick={() => handleCounterpartySelect(counterparty)}
                style={{
                  padding: '1.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  borderRadius: '0.75rem',
                  border: selectedCounterparty === counterparty.name ? '2px solid #4f46e5' : '2px solid #e5e7eb',
                  background: selectedCounterparty === counterparty.name ? '#eef2ff' : 'white',
                  color: selectedCounterparty === counterparty.name ? '#4338ca' : '#4b5563',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    if (selectedCounterparty !== counterparty.name) {
                      target.style.borderColor = '#a5b4fc';
                      target.style.background = '#f9fafb';
                      target.style.transform = 'translateY(-2px)';
                      target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLElement;
                    if (selectedCounterparty !== counterparty.name) {
                      target.style.borderColor = '#e5e7eb';
                      target.style.background = 'white';
                      target.style.transform = 'translateY(0)';
                      target.style.boxShadow = 'none';
                    }
                  }}

              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{counterparty.name}</span>
                  {selectedCounterparty === counterparty.name && (
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#4f46e5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      ✓
                    </div>
                  )}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginTop: '0.5rem'
                }}>
                  {counterparty.email}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Authentication
          </h2>

          {/* Server Type Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#374151', 
              marginBottom: '0.75rem' 
            }}>
              Connection Type
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setServerType('Server')}
                style={{
                  flex: '1',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  background: serverType === 'Server' ? '#4f46e5' : '#f3f4f6',
                  color: serverType === 'Server' ? 'white' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: serverType === 'Server' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                Server
              </button>
              <button
                onClick={() => setServerType('Blockchain')}
                style={{
                  flex: '1',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  background: serverType === 'Blockchain' ? '#4f46e5' : '#f3f4f6',
                  color: serverType === 'Blockchain' ? 'white' : '#4b5563',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: serverType === 'Blockchain' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
                }}
              >
                Blockchain
              </button>
            </div>
          </div>

          {/* Wise Bank Account */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              background: '#fefce8',
              border: '1px solid #fde047',
              borderRadius: '0.75rem',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '0.75rem',
                  height: '0.75rem',
                  background: '#22c55e',
                  borderRadius: '50%',
                  marginRight: '0.75rem'
                }}></div>
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: '500', 
                  color: '#374151' 
                }}>
                  Wise Bank Account Connected
                </span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                placeholder="Enter your email"
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: '#374151', 
                marginBottom: '0.5rem' 
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                placeholder="Enter your password"
                onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading || !email || !password}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                fontSize: '1.125rem',
                border: 'none',
                cursor: (isLoading || !email || !password) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                background: (isLoading || !email || !password) ? '#9ca3af' : '#4f46e5',
                color: 'white',
                opacity: (isLoading || !email || !password) ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                  if (!isLoading && email && password) {
                    const target = e.target as HTMLElement;
                    target.style.background = '#4338ca';
                    target.style.transform = 'translateY(-2px)';
                    target.style.boxShadow = '0 10px 25px -5px rgba(79, 70, 229, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && email && password) {
                    const target = e.target as HTMLElement;
                    target.style.background = '#4f46e5';
                    target.style.transform = 'translateY(0)';
                    target.style.boxShadow = 'none';
                  }
                }}

            >
              {isLoading ? 'Authenticating...' : 'Login to COLFI'}
            </button>
          </div>

          {/* Selected Credentials Display */}
          {selectedCounterparty && (
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: '#f9fafb',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  background: '#22c55e',
                  borderRadius: '50%',
                  marginRight: '0.5rem'
                }}></div>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#4b5563',
                  fontWeight: '500'
                }}>
                  Connected to {selectedCounterparty}
                </p>
              </div>
              <p style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280' 
              }}>
                Using credentials: {email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm