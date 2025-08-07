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

  // Fixed: Added proper TypeScript types for category parameter and colors object
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
    <div className="my-banks">
      {/* Header */}
      <div className="header-box">
        <h1 className="header-box-title">Admin Dashboard</h1>
        <p className="header-box-subtext">
          Effortlessly manage your banking activities and expenses
        </p>
      </div>

      {/* Bank Cards Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="header-2">Your Bank Accounts</h2>
          <Button className="plaidlink-primary flex items-center gap-2 px-4 py-2">
            <Plus className="w-4 h-4" />
            Add Bank
          </Button>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {banks.map((bank, index) => (
            <Card 
              key={bank.id}
              className={`bank-card cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedBank === index ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedBank(index)}
            >
              <CardContent className="bank-card_content text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-12 opacity-80">Account Type</p>
                    <h3 className="text-16 font-semibold">{bank.type}</h3>
                  </div>
                  <Building2 className="w-6 h-6 opacity-80" />
                </div>
                
                <div className="flex flex-col gap-2 mt-6">
                  <p className="text-12 opacity-80">Balance</p>
                  <p className="text-24 font-bold">
                    ${bank.balance.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-12 opacity-80">{bank.name}</p>
                    <p className="text-14 font-medium">{bank.accountNumber}</p>
                  </div>
                  <CreditCard className="w-8 h-8 opacity-60" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Bank Details */}
        <Card className="border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-20 font-semibold">
                {banks[selectedBank].name} - Recent Transactions
              </CardTitle>
              <p className="text-14 text-gray-600 mt-1">
                Account ending in {banks[selectedBank].accountNumber}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Details
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Account Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="total-balance p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-12 text-gray-600">Available Balance</p>
                    <p className="text-18 font-semibold">
                      ${banks[selectedBank].balance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="total-balance p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-12 text-gray-600">This Month Income</p>
                    <p className="text-18 font-semibold text-green-600">+$5,225.50</p>
                  </div>
                </div>
              </div>
              
              <div className="total-balance p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-12 text-gray-600">This Month Expenses</p>
                    <p className="text-18 font-semibold text-red-600">-$1,246.77</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="form-btn flex items-center gap-2 px-4 py-2">
                <ArrowUpRight className="w-4 h-4" />
                Transfer Money
              </Button>
              <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
                <ArrowDownLeft className="w-4 h-4" />
                Request Money
              </Button>
              <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
                <CreditCard className="w-4 h-4" />
                Pay Bills
              </Button>
              <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
                <Plus className="w-4 h-4" />
                Add Money
              </Button>
            </div>

            {/* Transactions Table */}
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-14 font-semibold text-left px-4 py-3">Transaction</th>
                    <th className="text-14 font-semibold text-left px-4 py-3">Category</th>
                    <th className="text-14 font-semibold text-left px-4 py-3">Date</th>
                    <th className="text-14 font-semibold text-right px-4 py-3">Amount</th>
                    <th className="w-12 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' 
                              ? 'bg-green-100' 
                              : transaction.type === 'transfer'
                              ? 'bg-blue-100'
                              : 'bg-red-100'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="w-4 h-4 text-green-600" />
                            ) : transaction.type === 'transfer' ? (
                              <ArrowUpRight className="w-4 h-4 text-blue-600" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-14 font-medium">{transaction.description}</p>
                            <p className="text-12 text-gray-500">
                              {transaction.type === 'credit' ? 'Received' : 'Sent'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={`category-badge text-12 ${getCategoryColor(transaction.category)}`}>
                          {transaction.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-14 text-gray-600">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className={`px-4 py-3 text-14 font-semibold text-right ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View All Transactions Button */}
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="view-all-btn">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyBanks;