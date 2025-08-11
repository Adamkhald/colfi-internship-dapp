'use client'

import React, { useState } from 'react'

const Operation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Client Info
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientId: '',
    accountType: '',
    
    // Step 2: Obligations and Law
    jurisdiction: '',
    complianceAgreement: false,
    riskDisclosure: false,
    regulatoryCompliance: false,
    legalRepresentation: '',
    
    // Step 3: Security and Warranties
    securityLevel: '',
    encryptionType: '',
    warrantyPeriod: '',
    insuranceCoverage: '',
    dataProtection: false,
    
    // Step 4: Additional Provisions
    specialTerms: '',
    customClauses: '',
    penalties: '',
    disputeResolution: '',
    amendments: '',
    
    // Step 5: Execution Details
    executionDate: '',
    executionTime: '',
    authorizedPersonnel: '',
    verificationMethod: '',
    completionCriteria: ''
  });

  const steps = [
    { id: 1, name: 'Client Information', description: 'Basic client details and account setup' },
    { id: 2, name: 'Obligations and Law', description: 'Legal compliance and regulatory requirements' },
    { id: 3, name: 'Security and Warranties', description: 'Security measures and warranty terms' },
    { id: 4, name: 'Additional Provisions', description: 'Custom terms and special conditions' },
    { id: 5, name: 'Execution Details', description: 'Implementation and completion specifications' }
  ];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Operation form submitted successfully!');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              Step 1: Client Information
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="form-item">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="input-class"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client full name"
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
              
              <div className="form-item">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="input-class"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="client@example.com"
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
              
              <div className="form-item">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="input-class"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
              
              <div className="form-item">
                <label className="form-label">Client ID</label>
                <input
                  type="text"
                  className="input-class"
                  value={formData.clientId}
                  onChange={(e) => handleInputChange('clientId', e.target.value)}
                  placeholder="Unique client identifier"
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
            </div>
            
            <div className="form-item">
              <label className="form-label">Address</label>
              <textarea
                className="input-class"
                value={formData.clientAddress}
                onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                placeholder="Complete address"
                rows={3}
                style={{ padding: '0.75rem 1rem', resize: 'vertical' }}
              />
            </div>
            
            <div className="form-item">
              <label className="form-label">Account Type *</label>
              <select
                className="input-class"
                value={formData.accountType}
                onChange={(e) => handleInputChange('accountType', e.target.value)}
                style={{ padding: '0.75rem 1rem' }}
              >
                <option value="">Select account type</option>
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
                <option value="institutional">Institutional</option>
                <option value="trust">Trust</option>
              </select>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              Step 2: Obligations and Law
            </h3>
            
            <div className="form-item">
              <label className="form-label">Jurisdiction *</label>
              <select
                className="input-class"
                value={formData.jurisdiction}
                onChange={(e) => handleInputChange('jurisdiction', e.target.value)}
                style={{ padding: '0.75rem 1rem' }}
              >
                <option value="">Select jurisdiction</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="eu">European Union</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>
            
            <div className="form-item">
              <label className="form-label">Legal Representation</label>
              <input
                type="text"
                className="input-class"
                value={formData.legalRepresentation}
                onChange={(e) => handleInputChange('legalRepresentation', e.target.value)}
                placeholder="Law firm or legal representative"
                style={{ padding: '0.75rem 1rem' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 className="text-16" style={{ fontWeight: '600', color: '#374151' }}>Required Agreements</h4>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="compliance"
                  checked={formData.complianceAgreement}
                  onChange={(e) => handleInputChange('complianceAgreement', e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <label htmlFor="compliance" className="text-14" style={{ color: '#374151' }}>
                  I agree to comply with all applicable regulations and laws
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="risk"
                  checked={formData.riskDisclosure}
                  onChange={(e) => handleInputChange('riskDisclosure', e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <label htmlFor="risk" className="text-14" style={{ color: '#374151' }}>
                  I acknowledge and accept the risk disclosure statement
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="regulatory"
                  checked={formData.regulatoryCompliance}
                  onChange={(e) => handleInputChange('regulatoryCompliance', e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <label htmlFor="regulatory" className="text-14" style={{ color: '#374151' }}>
                  I confirm regulatory compliance requirements understanding
                </label>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              Step 3: Security and Warranties
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="form-item">
                <label className="form-label">Security Level *</label>
                <select
                  className="input-class"
                  value={formData.securityLevel}
                  onChange={(e) => handleInputChange('securityLevel', e.target.value)}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <option value="">Select security level</option>
                  <option value="standard">Standard</option>
                  <option value="enhanced">Enhanced</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              
              <div className="form-item">
                <label className="form-label">Encryption Type</label>
                <select
                  className="input-class"
                  value={formData.encryptionType}
                  onChange={(e) => handleInputChange('encryptionType', e.target.value)}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <option value="">Select encryption</option>
                  <option value="aes256">AES-256</option>
                  <option value="rsa2048">RSA-2048</option>
                  <option value="ecc">ECC</option>
                </select>
              </div>
              
              <div className="form-item">
                <label className="form-label">Warranty Period</label>
                <select
                  className="input-class"
                  value={formData.warrantyPeriod}
                  onChange={(e) => handleInputChange('warrantyPeriod', e.target.value)}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <option value="">Select warranty period</option>
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="3years">3 Years</option>
                  <option value="5years">5 Years</option>
                </select>
              </div>
              
              <div className="form-item">
                <label className="form-label">Insurance Coverage</label>
                <input
                  type="text"
                  className="input-class"
                  value={formData.insuranceCoverage}
                  onChange={(e) => handleInputChange('insuranceCoverage', e.target.value)}
                  placeholder="Coverage amount (e.g., $1,000,000)"
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="dataProtection"
                checked={formData.dataProtection}
                onChange={(e) => handleInputChange('dataProtection', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem' }}
              />
              <label htmlFor="dataProtection" className="text-14" style={{ color: '#374151' }}>
                I agree to data protection and privacy policy terms
              </label>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              Step 4: Additional Provisions
            </h3>
            
            <div className="form-item">
              <label className="form-label">Special Terms</label>
              <textarea
                className="input-class"
                value={formData.specialTerms}
                onChange={(e) => handleInputChange('specialTerms', e.target.value)}
                placeholder="Enter any special terms or conditions"
                rows={4}
                style={{ padding: '0.75rem 1rem', resize: 'vertical' }}
              />
            </div>
            
            <div className="form-item">
              <label className="form-label">Custom Clauses</label>
              <textarea
                className="input-class"
                value={formData.customClauses}
                onChange={(e) => handleInputChange('customClauses', e.target.value)}
                placeholder="Additional custom clauses"
                rows={4}
                style={{ padding: '0.75rem 1rem', resize: 'vertical' }}
              />
            </div>
            
            <div className="form-item">
              <label className="form-label">Penalties and Sanctions</label>
              <textarea
                className="input-class"
                value={formData.penalties}
                onChange={(e) => handleInputChange('penalties', e.target.value)}
                placeholder="Penalty terms for non-compliance"
                rows={3}
                style={{ padding: '0.75rem 1rem', resize: 'vertical' }}
              />
            </div>
            
            <div className="form-item">
              <label className="form-label">Dispute Resolution</label>
              <select
                className="input-class"
                value={formData.disputeResolution}
                onChange={(e) => handleInputChange('disputeResolution', e.target.value)}
                style={{ padding: '0.75rem 1rem' }}
              >
                <option value="">Select dispute resolution method</option>
                <option value="arbitration">Arbitration</option>
                <option value="mediation">Mediation</option>
                <option value="litigation">Litigation</option>
                <option value="negotiation">Direct Negotiation</option>
              </select>
            </div>
            
            <div className="form-item">
              <label className="form-label">Amendment Procedures</label>
              <textarea
                className="input-class"
                value={formData.amendments}
                onChange={(e) => handleInputChange('amendments', e.target.value)}
                placeholder="Procedures for contract amendments"
                rows={3}
                style={{ padding: '0.75rem 1rem', resize: 'vertical' }}
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 className="text-20" style={{ fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              Step 5: Execution Details
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="form-item">
                <label className="form-label">Execution Date *</label>
                <input
                  type="date"
                  className="input-class"
                  value={formData.executionDate}
                  onChange={(e) => handleInputChange('executionDate', e.target.value)}
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
              
              <div className="form-item">
                <label className="form-label">Execution Time</label>
                <input
                  type="time"
                  className="input-class"
                  value={formData.executionTime}
                  onChange={(e) => handleInputChange('executionTime', e.target.value)}
                  style={{ padding: '0.75rem 1rem' }}
                />
              </div>
            </div>
            
            <div className="form-item">
              <label className="form-label">Authorized Personnel *</label>
              <input
                type="text"
                className="input-class"
                value={formData.authorizedPersonnel}
                onChange={(e) => handleInputChange('authorizedPersonnel', e.target.value)}
                placeholder="Names of authorized personnel"
                style={{ padding: '0.75rem 1rem' }}
              />
            </div>
            
            <div className="form-item">
              <label className="form-label">Verification Method</label>
              <select
                className="input-class"
                value={formData.verificationMethod}
                onChange={(e) => handleInputChange('verificationMethod', e.target.value)}
                style={{ padding: '0.75rem 1rem' }}
              >
                <option value="">Select verification method</option>
                <option value="digital-signature">Digital Signature</option>
                <option value="biometric">Biometric Verification</option>
                <option value="two-factor">Two-Factor Authentication</option>
                <option value="multi-factor">Multi-Factor Authentication</option>
              </select>
            </div>
            
            <div className="form-item">
              <label className="form-label">Completion Criteria</label>
              <textarea
                className="input-class"
                value={formData.completionCriteria}
                onChange={(e) => handleInputChange('completionCriteria', e.target.value)}
                placeholder="Define criteria for successful completion"
                rows={4}
                style={{ padding: '0.75rem 1rem', resize: 'vertical' }}
              />
            </div>
          </div>
        );
      
      default:
        return null;
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
          <h1 className="header-box-title">Operations Management</h1>
          <p className="header-box-subtext">
            Complete the 5-step process to set up your operation
          </p>
        </div>

        {/* Progress Timeline */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            {steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: step.id <= currentStep ? '#2563eb' : '#e5e7eb',
                    color: step.id <= currentStep ? 'white' : '#6b7280',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    marginBottom: '0.5rem'
                  }}>
                    {step.id < currentStep ? '✓' : step.id}
                  </div>
                  <div className="text-12" style={{ 
                    color: step.id === currentStep ? '#2563eb' : '#6b7280',
                    fontWeight: step.id === currentStep ? '600' : '400',
                    textAlign: 'center'
                  }}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    height: '2px',
                    flex: 1,
                    backgroundColor: step.id < currentStep ? '#2563eb' : '#e5e7eb',
                    margin: '0 1rem',
                    alignSelf: 'flex-start',
                    marginTop: '1.5rem'
                  }} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: '1rem' }}>
            <div className="text-14" style={{ color: '#6b7280' }}>
              {steps[currentStep - 1]?.description}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
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
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="view-all-btn"
            style={{
              padding: '0.75rem 1.5rem',
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          
          <div className="text-14" style={{ color: '#6b7280' }}>
            Step {currentStep} of {steps.length}
          </div>
          
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              className="form-btn"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="form-btn"
              style={{ 
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
              }}
            >
              Submit Operation
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Operation