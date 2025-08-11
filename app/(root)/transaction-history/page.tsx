'use client'

import React, { useState } from 'react'

const TransactionHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock transaction data - replace with your actual data
  const transactions = [
    {
      id: '1',
      date: '2024-08-10',
      time: '14:30',
      description: 'Transfer to Hedge Fund Alpha',
      type: 'transfer',
      category: 'Investment',
      amount: -25000.00,
      status: 'completed',
      from: 'Chase Checking',
      to: 'Hedge Fund Alpha',
      reference: 'TXN-001'
    },
    {
      id: '2',
      date: '2024-08-09',
      time: '09:15',
      description: 'Wire from Investment Bank',
      type: 'deposit',
      category: 'Investment Return',
      amount: 45000.00,
      status: 'completed',
      from: 'Goldman Sachs',
      to: 'Wells Fargo Savings',
      reference: 'WIR-002'
    },
    {
      id: '3',
      date: '2024-08-08',
      time: '16:45',
      description: 'Portfolio Rebalancing',
      type: 'transfer',
      category: 'Investment',
      amount: -15000.00,
      status: 'completed',
      from: 'Wells Fargo Savings',
      to: 'Vanguard Fund',
      reference: 'REB-003'
    },
    {
      id: '4',
      date: '2024-08-07',
      time: '11:20',
      description: 'Dividend Payment',
      type: 'deposit',
      category: 'Dividend',
      amount: 2500.00,
      status: 'completed',
      from: 'Berkshire Hathaway',
      to: 'Chase Checking',
      reference: 'DIV-004'
    },
    {
      id: '5',
      date: '2024-08-06',
      time: '13:10',
      description: 'Bank Transfer',
      type: 'transfer',
      category: 'Transfer',
      amount: -8000.00,
      status: 'pending',
      from: 'Chase Checking',
      to: 'Wells Fargo Savings',
      reference: 'TRF-005'
    },
    {
      id: '6',
      date: '2024-08-05',
      time: '10:30',
      description: 'Mutual Fund Investment',
      type: 'transfer',
      category: 'Investment',
      amount: -30000.00,
      status: 'completed',
      from: 'Wells Fargo Savings',
      to: 'Fidelity Growth Fund',
      reference: 'INV-006'
    },
    {
      id: '7',
      date: '2024-08-04',
      time: '15:45',
      description: 'Interest Payment',
      type: 'deposit',
      category: 'Interest',
      amount: 125.50,
      status: 'completed',
      from: 'Wells Fargo Bank',
      to: 'Wells Fargo Savings',
      reference: 'INT-007'
    },
    {
      id: '8',
      date: '2024-08-03',
      time: '12:00',
      description: 'Hedge Fund Withdrawal',
      type: 'deposit',
      category: 'Investment Return',
      amount: 75000.00,
      status: 'completed',
      from: 'Bridgewater Associates',
      to: 'Chase Checking',
      reference: 'WDL-008'
    },
    {
      id: '9',
      date: '2024-08-02',
      time: '14:20',
      description: 'ATM Withdrawal',
      type: 'withdrawal',
      category: 'Cash',
      amount: -500.00,
      status: 'completed',
      from: 'Chase Checking',
      to: 'ATM - 5th Avenue',
      reference: 'ATM-009'
    },
    {
      id: '10',
      date: '2024-08-01',
      time: '16:10',
      description: 'Emergency Fund Withdrawal',
      type: 'withdrawal',
      category: 'Emergency',
      amount: -10000.00,
      status: 'completed',
      from: 'Wells Fargo Savings',
      to: 'Chase Checking',
      reference: 'EMR-010'
    },
    {
      id: '11',
      date: '2024-07-31',
      time: '11:45',
      description: 'Investment Liquidation',
      type: 'withdrawal',
      category: 'Investment',
      amount: -25000.00,
      status: 'completed',
      from: 'Fidelity Growth Fund',
      to: 'Wells Fargo Savings',
      reference: 'LIQ-011'
    },
    {
      id: '12',
      date: '2024-07-30',
      time: '09:30',
      description: 'Cash Withdrawal',
      type: 'withdrawal',
      category: 'Cash',
      amount: -1000.00,
      status: 'completed',
      from: 'Chase Checking',
      to: 'Branch Withdrawal',
      reference: 'CSH-012'
    },
    {
      id: '13',
      date: '2024-07-29',
      time: '15:20',
      description: 'Loan Payment Withdrawal',
      type: 'withdrawal',
      category: 'Loan',
      amount: -3500.00,
      status: 'completed',
      from: 'Wells Fargo Savings',
      to: 'Mortgage Lender',
      reference: 'LPN-013'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.to.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    return {
      formatted: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(Math.abs(amount)),
      isPositive
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Header */}
        <div className="transactions-header">
          <div className="header-box">
            <h1 className="header-box-title">Transaction History</h1>
            <p className="header-box-subtext">
              Complete record of all your financial transactions across banks and investments
            </p>
          </div>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['all', 'deposit', 'transfer', 'withdrawal'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`text14_padding10 ${
                    selectedFilter === filter 
                      ? 'form-btn' 
                      : 'view-all-btn'
                  }`}
                  style={{
                    textTransform: 'capitalize',
                    minWidth: '80px'
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-class"
              style={{
                padding: '0.5rem 1rem',
                minWidth: '200px',
                flex: '1',
                maxWidth: '300px'
              }}
            />
          </div>
        </div>

        {/* Transaction Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse'
            }}>
              <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Date & Time
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Description
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    From / To
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Category
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Amount
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Status
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => {
                  const { formatted, isPositive } = formatAmount(transaction.amount);
                  return (
                    <tr 
                      key={transaction.id}
                      style={{ 
                        borderBottom: index < filteredTransactions.length - 1 ? '1px solid #f3f4f6' : 'none',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).closest('tr')!.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => (e.target as HTMLElement).closest('tr')!.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div className="text-14" style={{ fontWeight: '500', color: '#111827' }}>
                            {new Date(transaction.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="text-12" style={{ color: '#6b7280' }}>
                            {transaction.time}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div className="text-14" style={{ fontWeight: '500', color: '#111827' }}>
                          {transaction.description}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div className="text-12" style={{ color: '#6b7280' }}>From:</div>
                          <div className="text-14" style={{ fontWeight: '500', color: '#111827', marginBottom: '2px' }}>
                            {transaction.from}
                          </div>
                          <div className="text-12" style={{ color: '#6b7280' }}>To:</div>
                          <div className="text-14" style={{ fontWeight: '500', color: '#111827' }}>
                            {transaction.to}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div 
                          className="category-badge text-12"
                          style={{ 
                            color: isPositive ? '#059669' : '#dc2626',
                            borderColor: isPositive ? '#059669' : '#dc2626',
                            backgroundColor: isPositive ? '#ecfdf5' : '#fef2f2'
                          }}
                        >
                          {transaction.category}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div 
                          className="text-16"
                          style={{ 
                            fontWeight: '600',
                            color: isPositive ? '#059669' : '#dc2626'
                          }}
                        >
                          {isPositive ? '+' : '-'}{formatted}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <span 
                          className={`text-12 ${getStatusColor(transaction.status)}`}
                          style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '9999px',
                            fontWeight: '500',
                            textTransform: 'capitalize'
                          }}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div className="text-14" style={{ fontFamily: 'monospace', color: '#6b7280' }}>
                          {transaction.reference}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div className="text-14" style={{ color: '#6b7280' }}>
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div className="text-center">
              <div className="text-12" style={{ color: '#6b7280' }}>Total Inflow</div>
              <div className="text-16" style={{ fontWeight: '600', color: '#059669' }}>
                +{formatAmount(filteredTransactions.reduce((sum, t) => t.amount > 0 ? sum + t.amount : sum, 0)).formatted}
              </div>
            </div>
            <div className="text-center">
              <div className="text-12" style={{ color: '#6b7280' }}>Total Outflow</div>
              <div className="text-16" style={{ fontWeight: '600', color: '#dc2626' }}>
                -{formatAmount(Math.abs(filteredTransactions.reduce((sum, t) => t.amount < 0 ? sum + t.amount : sum, 0))).formatted}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory