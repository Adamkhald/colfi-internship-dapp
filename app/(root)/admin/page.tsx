"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  MoreVertical,
  DollarSign,
  Building2,
  Eye,
  Settings
} from 'lucide-react';

const MyBanks = () => {
  const [selectedBank, setSelectedBank] = useState(0);

  const banks = [
    {
      id: 1,
      name: "Chase Bank",
      accountNumber: "****1234",
      balance: 15420.50,
      type: "Checking",
      color: "bg-blue-600"
    },
    {
      id: 2,
      name: "Bank of America",
      accountNumber: "****5678",
      balance: 8750.25,
      type: "Savings",
      color: "bg-red-600"
    },
    {
      id: 3,
      name: "Wells Fargo",
      accountNumber: "****9012",
      balance: 3250.75,
      type: "Credit Card",
      color: "bg-yellow-600"
    }
  ];

  const transactions = [
    {
      id: 1,
      description: "Salary Deposit",
      amount: 5200.00,
      type: "credit",
      date: "2025-07-30",
      category: "Income",
      bankId: 1
    },
    {
      id: 2,
      description: "Grocery Store",
      amount: -156.78,
      type: "debit",
      date: "2025-07-29",
      category: "Food",
      bankId: 1
    },
    {
      id: 3,
      description: "Transfer to Savings",
      amount: -1000.00,
      type: "transfer",
      date: "2025-07-28",
      category: "Transfer",
      bankId: 1
    },
    {
      id: 4,
      description: "Interest Payment",
      amount: 25.50,
      type: "credit",
      date: "2025-07-27",
      category: "Interest",
      bankId: 2
    },
    {
      id: 5,
      description: "Online Purchase",
      amount: -89.99,
      type: "debit",
      date: "2025-07-26",
      category: "Shopping",
      bankId: 3
    }
  ];

  const filteredTransactions = transactions.filter(t => t.bankId === banks[selectedBank].id);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Income': 'bg-green-100 text-green-800 border-green-200',
      'Food': 'bg-orange-100 text-orange-800 border-orange-200',
      'Transfer': 'bg-blue-100 text-blue-800 border-blue-200',
      'Interest': 'bg-purple-100 text-purple-800 border-purple-200',
      'Shopping': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
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
          <h1 className="header-box-title">My Bank Accounts</h1>
          <p className="header-box-subtext">
            Effortlessly manage your banking activities and expenses
          </p>
        </div>

        {/* Bank Cards Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h2 className="header-2">Your Bank Accounts</h2>
            <Button className="plaidlink-primary" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.5rem' 
            }}>
              <Plus className="w-4 h-4" />
              Add Bank
            </Button>
          </div>

          {/* Bank Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {banks.map((bank, index) => (
              <Card 
                key={bank.id}
                className={`bank-card cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedBank === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedBank(index)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: selectedBank === index ? '2px solid #3b82f6' : '1px solid #e5e7eb'
                }}
              >
                <CardContent className="bank-card_content text-white p-6">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p className="text-12" style={{ opacity: 0.8 }}>Account Type</p>
                      <h3 className="text-16" style={{ fontWeight: '600' }}>{bank.type}</h3>
                    </div>
                    <Building2 className="w-6 h-6" style={{ opacity: 0.8 }} />
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.5rem', 
                    marginTop: '1.5rem' 
                  }}>
                    <p className="text-12" style={{ opacity: 0.8 }}>Balance</p>
                    <p className="text-24" style={{ fontWeight: 'bold' }}>
                      ${bank.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-end', 
                    marginTop: '1rem' 
                  }}>
                    <div>
                      <p className="text-12" style={{ opacity: 0.8 }}>{bank.name}</p>
                      <p className="text-14" style={{ fontWeight: '500' }}>{bank.accountNumber}</p>
                    </div>
                    <CreditCard className="w-8 h-8" style={{ opacity: 0.6 }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Bank Details */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                {banks[selectedBank].name} - Recent Transactions
              </h3>
              <p className="text-14" style={{ color: '#6b7280' }}>
                Account ending in {banks[selectedBank].accountNumber}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="outline" size="sm" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1rem'
              }}>
                <Eye className="w-4 h-4" />
                View Details
              </Button>
              <Button variant="outline" size="sm" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1rem'
              }}>
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
          
          {/* Account Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div className="total-balance" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#dcfce7',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DollarSign className="w-5 h-5" style={{ color: '#16a34a' }} />
                </div>
                <div>
                  <p className="text-12" style={{ color: '#6b7280' }}>Available Balance</p>
                  <p className="text-18" style={{ fontWeight: '600' }}>
                    ${banks[selectedBank].balance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="total-balance" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArrowUpRight className="w-5 h-5" style={{ color: '#2563eb' }} />
                </div>
                <div>
                  <p className="text-12" style={{ color: '#6b7280' }}>This Month Income</p>
                  <p className="text-18" style={{ fontWeight: '600', color: '#16a34a' }}>+$5,225.50</p>
                </div>
              </div>
            </div>
            
            <div className="total-balance" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundColor: '#fee2e2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ArrowDownLeft className="w-5 h-5" style={{ color: '#dc2626' }} />
                </div>
                <div>
                  <p className="text-12" style={{ color: '#6b7280' }}>This Month Expenses</p>
                  <p className="text-18" style={{ fontWeight: '600', color: '#dc2626' }}>-$1,246.77</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.75rem', 
            marginBottom: '2rem' 
          }}>
            <Button className="form-btn" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.5rem' 
            }}>
              <ArrowUpRight className="w-4 h-4" />
              Transfer Money
            </Button>
            <Button variant="outline" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.5rem' 
            }}>
              <ArrowDownLeft className="w-4 h-4" />
              Request Money
            </Button>
            <Button variant="outline" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.5rem' 
            }}>
              <CreditCard className="w-4 h-4" />
              Pay Bills
            </Button>
            <Button variant="outline" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.75rem 1.5rem' 
            }}>
              <Plus className="w-4 h-4" />
              Add Money
            </Button>
          </div>

          {/* Transactions Table */}
          <div style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.5rem', 
            overflow: 'hidden' 
          }}>
            <table style={{ width: '100%' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th className="text-14" style={{ 
                    fontWeight: '600', 
                    textAlign: 'left', 
                    padding: '0.75rem 1rem' 
                  }}>
                    Transaction
                  </th>
                  <th className="text-14" style={{ 
                    fontWeight: '600', 
                    textAlign: 'left', 
                    padding: '0.75rem 1rem' 
                  }}>
                    Category
                  </th>
                  <th className="text-14" style={{ 
                    fontWeight: '600', 
                    textAlign: 'left', 
                    padding: '0.75rem 1rem' 
                  }}>
                    Date
                  </th>
                  <th className="text-14" style={{ 
                    fontWeight: '600', 
                    textAlign: 'right', 
                    padding: '0.75rem 1rem' 
                  }}>
                    Amount
                  </th>
                  <th style={{ width: '3rem', padding: '0.75rem 1rem' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} style={{ 
                    borderTop: '1px solid #e5e7eb',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: transaction.type === 'credit' 
                            ? '#dcfce7' 
                            : transaction.type === 'transfer'
                            ? '#dbeafe'
                            : '#fee2e2'
                        }}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="w-4 h-4" style={{ color: '#16a34a' }} />
                          ) : transaction.type === 'transfer' ? (
                            <ArrowUpRight className="w-4 h-4" style={{ color: '#2563eb' }} />
                          ) : (
                            <ArrowUpRight className="w-4 h-4" style={{ color: '#dc2626' }} />
                          )}
                        </div>
                        <div>
                          <p className="text-14" style={{ fontWeight: '500' }}>{transaction.description}</p>
                          <p className="text-12" style={{ color: '#6b7280' }}>
                            {transaction.type === 'credit' ? 'Received' : 'Sent'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <Badge className={`category-badge text-12 ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </Badge>
                    </td>
                    <td className="text-14" style={{ 
                      padding: '0.75rem 1rem', 
                      color: '#6b7280' 
                    }}>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="text-14" style={{ 
                      padding: '0.75rem 1rem', 
                      fontWeight: '600', 
                      textAlign: 'right',
                      color: transaction.amount > 0 ? '#16a34a' : '#dc2626'
                    }}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <Button variant="ghost" size="sm" style={{ 
                        width: '2rem', 
                        height: '2rem', 
                        padding: 0 
                      }}>
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Transactions Button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2rem' 
          }}>
            <Button className="view-all-btn" style={{ padding: '0.75rem 2rem' }}>
              View All Transactions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBanks;