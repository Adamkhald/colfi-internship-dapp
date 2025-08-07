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
            accounts={[]}
            totalBanks={0}
            totalCurrentBalance={25000}
          />
        </header>

        Recent Transactions
      </div>
      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 13000}, {}]} 
      />
    </section>
  )
}

export default Home
