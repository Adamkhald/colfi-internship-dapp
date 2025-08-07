'use client';

import React from 'react';

// Define the type for better type safety
type CustomerType = 'Investment Bank' | 'Hedge Fund' | 'Commercial Bank' | 'Asset Management';

interface Customer {
  id: number;
  name: string;
  type: CustomerType;
  startingDate: string;
  contractValue: string;
  image: string;
}

const MyCustomers = () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: "Goldman Sachs",
      type: "Investment Bank",
      startingDate: "2021-03-15",
      contractValue: "$2,450,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Bridgewater Associates",
      type: "Hedge Fund",
      startingDate: "2020-11-22",
      contractValue: "$3,200,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "JPMorgan Chase",
      type: "Commercial Bank",
      startingDate: "2022-01-08",
      contractValue: "$1,875,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Renaissance Technologies",
      type: "Hedge Fund",
      startingDate: "2021-07-12",
      contractValue: "$4,100,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "BlackRock",
      type: "Asset Management",
      startingDate: "2020-09-30",
      contractValue: "$5,600,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "Citadel",
      type: "Hedge Fund",
      startingDate: "2021-12-03",
      contractValue: "$3,750,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 7,
      name: "Morgan Stanley",
      type: "Investment Bank",
      startingDate: "2022-05-18",
      contractValue: "$2,900,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 8,
      name: "Two Sigma",
      type: "Hedge Fund",
      startingDate: "2021-08-25",
      contractValue: "$2,300,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 9,
      name: "Wells Fargo",
      type: "Commercial Bank",
      startingDate: "2020-12-14",
      contractValue: "$1,650,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 10,
      name: "Vanguard Group",
      type: "Asset Management",
      startingDate: "2021-04-07",
      contractValue: "$4,800,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 11,
      name: "Point72",
      type: "Hedge Fund",
      startingDate: "2022-02-28",
      contractValue: "$2,750,000",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop&crop=center"
    }
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Fixed: Added type annotation to the type parameter
  const getTypeColor = (type: CustomerType) => {
    switch (type) {
      case 'Investment Bank':
        return { backgroundColor: 'rgba(219, 234, 254, 1)', color: '#2563eb', border: '1px solid #93c5fd' };
      case 'Hedge Fund':
        return { backgroundColor: 'rgba(243, 232, 255, 1)', color: '#7c3aed', border: '1px solid #c4b5fd' };
      case 'Commercial Bank':
        return { backgroundColor: 'rgba(220, 252, 231, 1)', color: '#059669', border: '1px solid #86efac' };
      case 'Asset Management':
        return { backgroundColor: 'rgba(255, 237, 213, 1)', color: '#ea580c', border: '1px solid #fdba74' };
      default:
        return { backgroundColor: 'rgba(249, 250, 251, 1)', color: '#4b5563', border: '1px solid #d1d5db' };
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '2rem',
    backgroundColor: '#f9fafb',
    padding: '2rem',
    minHeight: '100vh'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '30px',
    lineHeight: '38px',
    fontWeight: '600',
    color: '#111827'
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    color: '#4b5563'
  };

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const statCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    padding: '1rem',
    textAlign: 'center'
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280'
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid rgba(229, 231, 235, 0.5)',
    padding: '2rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const cardContentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  };

  const leftContentStyle: React.CSSProperties = {
    flex: '1',
    paddingRight: '2rem'
  };

  const companyNameStyle: React.CSSProperties = {
    fontSize: '18px',
    lineHeight: '22px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '1rem',
    transition: 'color 0.3s ease'
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
    marginBottom: '2rem'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '1.5rem'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '0.75rem',
    display: 'block'
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  };

  const contractValueStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const imageContainerStyle: React.CSSProperties = {
    flexShrink: '0'
  };

  const imageStyle: React.CSSProperties = {
    width: '96px',
    height: '96px',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    border: '2px solid white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease'
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const bottomSectionStyle: React.CSSProperties = {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const statusStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const statusDotStyle: React.CSSProperties = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981'
  };

  const statusTextStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#6b7280'
  };

  const idStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#9ca3af'
  };

  return (
    <>
      <style jsx>{`
        .customer-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: rgba(229, 231, 235, 0.7);
        }
        .customer-card:hover .company-name {
          color: #2563eb;
        }
        .customer-card:hover .customer-image {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .customer-card:hover .customer-img {
          transform: scale(1.05);
        }
      `}</style>
      
      <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={titleStyle}>My Customers</h1>
          <p style={subtitleStyle}>
            Manage your portfolio of institutional clients and their contracts
          </p>
        </div>

        {/* Summary Stats - NOW AT TOP */}
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={{...statValueStyle, color: '#2563eb'}}>11</div>
            <div style={statLabelStyle}>Total Customers</div>
          </div>
          <div style={statCardStyle}>
            <div style={{...statValueStyle, color: '#059669'}}>$35.4M</div>
            <div style={statLabelStyle}>Total Contract Value</div>
          </div>
          <div style={statCardStyle}>
            <div style={{...statValueStyle, color: '#7c3aed'}}>5</div>
            <div style={statLabelStyle}>Hedge Funds</div>
          </div>
          <div style={statCardStyle}>
            <div style={{...statValueStyle, color: '#ea580c'}}>$3.2M</div>
            <div style={statLabelStyle}>Avg Contract Value</div>
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div style={gridStyle}>
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="customer-card"
              style={cardStyle}
            >
              <div style={cardContentStyle}>
                {/* Left side - Content */}
                <div style={leftContentStyle}>
                  {/* Company Name */}
                  <div>
                    <h3 className="company-name" style={companyNameStyle}>
                      {customer.name}
                    </h3>
                    <span style={{...badgeStyle, ...getTypeColor(customer.type)}}>
                      {customer.type}
                    </span>
                  </div>
                  
                  {/* Date section */}
                  <div style={sectionStyle}>
                    <span style={labelStyle}>Starting Date</span>
                    <span style={valueStyle}>
                      {formatDate(customer.startingDate)}
                    </span>
                  </div>
                  
                  {/* Contract Value section */}
                  <div style={sectionStyle}>
                    <span style={labelStyle}>Contract Value</span>
                    <span style={contractValueStyle}>
                      {customer.contractValue}
                    </span>
                  </div>
                </div>

                {/* Right side - Image */}
                <div style={imageContainerStyle}>
                  <div className="customer-image" style={imageStyle}>
                    <img
                      src={customer.image}
                      alt={customer.name}
                      className="customer-img"
                      style={imgStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom section */}
              <div style={bottomSectionStyle}>
                <div style={statusStyle}>
                  <div style={statusDotStyle}></div>
                  <span style={statusTextStyle}>Active Contract</span>
                </div>
                <div style={idStyle}>
                  ID: #{customer.id.toString().padStart(3, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyCustomers;