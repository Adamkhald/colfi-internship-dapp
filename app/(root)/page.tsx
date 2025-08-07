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

        Recent Transactions
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