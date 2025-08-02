"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Search,
  Calendar,
  MoreVertical,
  Building2,
  CreditCard,
  Smartphone,
  Globe
} from 'lucide-react';

const TransactionHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBank, setSelectedBank] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const banks = [
    { id: 'all', name: 'All Banks' },
    { id: 1, name: 'Chase Bank', color: 'bg-blue-600' },
    { id: 2, name: 'Bank of America', color: 'bg-red-600' },
    { id: 3, name: 'Wells Fargo', color: 'bg-yellow-600' }
  ];

  const transactions = [
    {
      id: 1,
      description: "Salary Deposit",
      amount: 5200.00,
      type: "credit",
      date: "2025-07-30",
      time: "09:15 AM",
      category: "Income",
      status: "completed",
      bankId: 1,
      bankName: "Chase Bank",
      reference: "TXN001234567",
      method: "Direct Deposit",
      icon: "building"
    },
    {
      id: 2,
      description: "HSBC",
      amount: -156.78,
      type: "debit",
      date: "2025-07-29",
      time: "02:45 PM",
      category: "Cash",
      status: "completed",
      bankId: 1,
      bankName: "Chase Bank",
      reference: "TXN001234568",
      method: "Debit Card",
      icon: "card"
    },
    {
      id: 3,
      description: "Transfer to Savings Account",
      amount: -1000.00,
      type: "transfer",
      date: "2025-07-28",
      time: "11:30 AM",
      category: "Transfer",
      status: "approved",
      bankId: 1,
      bankName: "Chase Bank",
      reference: "TXN001234569",
      method: "Internal Transfer",
      icon: "building"
    },
    {
      id: 4,
      description: "Monthly Interest Payment",
      amount: 25.50,
      type: "credit",
      date: "2025-07-27",
      time: "12:00 PM",
      category: "Interest",
      status: "completed",
      bankId: 2,
      bankName: "Bank of America",
      reference: "TXN001234570",
      method: "Auto Credit",
      icon: "building"
    },
    {
      id: 5,
      description: "Coffee Shop Payment",
      amount: -4.95,
      type: "debit",
      date: "2025-07-26",
      time: "08:20 AM",
      category: "Food",
      status: "pending",
      bankId: 3,
      bankName: "Wells Fargo",
      reference: "TXN001234571",
      method: "Mobile Payment",
      icon: "mobile"
    },
    {
      id: 6,
      description: "Utility Bill Payment",
      amount: -89.99,
      type: "debit",
      date: "2025-07-25",
      time: "03:15 PM",
      category: "Bills",
      status: "completed",
      bankId: 2,
      bankName: "Bank of America",
      reference: "TXN001234572",
      method: "Online Banking",
      icon: "web"
    },
    {
      id: 7,
      description: "Refund - Electronics Store",
      amount: 299.99,
      type: "credit",
      date: "2025-07-24",
      time: "04:30 PM",
      category: "Refund",
      status: "approved",
      bankId: 1,
      bankName: "Chase Bank",
      reference: "TXN001234573",
      method: "Store Credit",
      icon: "card"
    },
    {
      id: 8,
      description: "Gas Station Payment",
      amount: -45.20,
      type: "debit",
      date: "2025-07-23",
      time: "07:45 AM",
      category: "Transportation",
      status: "completed",
      bankId: 3,
      bankName: "Wells Fargo",
      reference: "TXN001234574",
      method: "Debit Card",
      icon: "card"
    }
  ];

  const statusOptions = [
    { id: 'all', label: 'All Transactions', count: transactions.length },
    { id: 'completed', label: 'Completed', count: transactions.filter(t => t.status === 'completed').length },
    { id: 'approved', label: 'Approved', count: transactions.filter(t => t.status === 'approved').length },
    { id: 'pending', label: 'Pending', count: transactions.filter(t => t.status === 'pending').length }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    const matchesBank = selectedBank === 'all' || transaction.bankId === selectedBank;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesBank && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'approved':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Income': 'bg-green-100 text-green-800 border-green-200',
      'Food': 'bg-orange-100 text-orange-800 border-orange-200',
      'Transfer': 'bg-blue-100 text-blue-800 border-blue-200',
      'Interest': 'bg-purple-100 text-purple-800 border-purple-200',
      'Shopping': 'bg-pink-100 text-pink-800 border-pink-200',
      'Bills': 'bg-red-100 text-red-800 border-red-200',
      'Refund': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Transportation': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getTransactionIcon = (icon, type) => {
    const iconClass = `w-5 h-5 ${type === 'credit' ? 'text-green-600' : 'text-red-600'}`;
    
    switch (icon) {
      case 'building':
        return <Building2 className={iconClass} />;
      case 'card':
        return <CreditCard className={iconClass} />;
      case 'mobile':
        return <Smartphone className={iconClass} />;
      case 'web':
        return <Globe className={iconClass} />;
      default:
        return type === 'credit' ? 
          <ArrowDownLeft className={iconClass} /> : 
          <ArrowUpRight className={iconClass} />;
    }
  };

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const creditAmount = filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const debitAmount = filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="transactions">
      {/* Header */}
      <div className="transactions-header">
        <div className="header-box">
          <h1 className="header-box-title">Transaction History</h1>
          <p className="header-box-subtext">
            View and manage all your financial transactions across accounts
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button className="form-btn flex items-center gap-2 px-4 py-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2 px-4 py-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="total-balance">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-12 text-gray-600">Total Transactions</p>
                <p className="text-20 font-semibold">{filteredTransactions.length}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="total-balance">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-12 text-gray-600">Total Credits</p>
                <p className="text-20 font-semibold text-green-600">
                  +${creditAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="total-balance">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-12 text-gray-600">Total Debits</p>
                <p className="text-20 font-semibold text-red-600">
                  -${debitAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="total-balance">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-12 text-gray-600">Net Amount</p>
                <p className={`text-20 font-semibold ${totalAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalAmount >= 0 ? '+' : ''}${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                totalAmount >= 0 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {totalAmount >= 0 ? 
                  <ArrowDownLeft className="w-5 h-5 text-green-600" /> :
                  <ArrowUpRight className="w-5 h-5 text-red-600" />
                }
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="input-class w-full pl-10 pr-4 py-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Bank Filter */}
            <div className="min-w-48">
              <select
                className="input-class w-full px-3 py-2"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div className="min-w-48">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="input-class w-full pl-10 pr-4 py-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Tabs */}
      <div className="recent-transactions-tablist mb-6">
        {statusOptions.map((status) => (
          <button
            key={status.id}
            onClick={() => setSelectedStatus(status.id)}
            className={`banktab-item min-w-fit ${
              selectedStatus === status.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-14 font-medium">{status.label}</span>
              <Badge className="text-10 bg-gray-100 text-gray-600">
                {status.count}
              </Badge>
            </div>
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-14 font-semibold text-left px-6 py-4">Transaction</th>
                  <th className="text-14 font-semibold text-left px-6 py-4">Bank & Method</th>
                  <th className="text-14 font-semibold text-left px-6 py-4">Category</th>
                  <th className="text-14 font-semibold text-left px-6 py-4">Status</th>
                  <th className="text-14 font-semibold text-left px-6 py-4">Date & Time</th>
                  <th className="text-14 font-semibold text-right px-6 py-4">Amount</th>
                  <th className="w-12 px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' 
                            ? 'bg-green-100' 
                            : transaction.type === 'transfer'
                            ? 'bg-blue-100'
                            : 'bg-red-100'
                        }`}>
                          {getTransactionIcon(transaction.icon, transaction.type)}
                        </div>
                        <div>
                          <p className="text-14 font-medium">{transaction.description}</p>
                          <p className="text-12 text-gray-500">
                            Ref: {transaction.reference}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-14 font-medium">{transaction.bankName}</p>
                        <p className="text-12 text-gray-500">{transaction.method}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`category-badge text-12 ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`flex items-center gap-1 w-fit text-12 ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="capitalize">{transaction.status}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-14 font-medium">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="text-12 text-gray-500">{transaction.time}</p>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-14 font-semibold text-right ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-16 font-medium text-gray-900 mb-2">No transactions found</p>
              <p className="text-14 text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {filteredTransactions.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-14 text-gray-500">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;