'use client'

import React, { useState } from 'react'

interface FormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientId: string;
  accountType: string;
  jurisdiction: string;
  complianceAgreement: boolean;
  riskDisclosure: boolean;
  regulatoryCompliance: boolean;
  legalRepresentation: string;
  securityLevel: string;
  encryptionType: string;
  warrantyPeriod: string;
  insuranceCoverage: string;
  dataProtection: boolean;
  specialTerms: string;
  customClauses: string;
  penalties: string;
  disputeResolution: string;
  amendments: string;
  executionDate: string;
  executionTime: string;
  authorizedPersonnel: string;
  verificationMethod: string;
  completionCriteria: string;
}

interface AssetFormData {
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  assetName: string;
  assetType: string;
  assetValue: string;
  assetDescription: string;
  acquisitionDate: string;
  assetLocation: string;
  serialNumber: string;
  ownershipProof: string;
  legalCompliance: boolean;
  accurateInformation: boolean;
  ownershipRights: boolean;
  liabilityAcceptance: boolean;
}

interface SubmitResult {
  success: boolean;
  operationId?: string;
  blockHash?: string;
  message: string;
  gasUsed?: string;
  confirmations?: string;
}

const Operation = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  
  // Asset form states
  const [isSubmittingAsset, setIsSubmittingAsset] = useState<boolean>(false);
  const [assetSubmitResult, setAssetSubmitResult] = useState<SubmitResult | null>(null);
  
  // Replace with your EC2 public IP
const API_BASE_URL = 'http://16.171.199.116:3001';
  
  const [formData, setFormData] = useState<FormData>({
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

  const [assetFormData, setAssetFormData] = useState<AssetFormData>({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    assetName: '',
    assetType: '',
    assetValue: '',
    assetDescription: '',
    acquisitionDate: '',
    assetLocation: '',
    serialNumber: '',
    ownershipProof: '',
    legalCompliance: false,
    accurateInformation: false,
    ownershipRights: false,
    liabilityAcceptance: false
  });

  const steps = [
    { id: 1, name: 'Client Information' },
    { id: 2, name: 'Legal Compliance' },
    { id: 3, name: 'Security & Warranties' },
    { id: 4, name: 'Additional Provisions' },
    { id: 5, name: 'Execution Details' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAssetInputChange = (field: keyof AssetFormData, value: string | boolean) => {
    setAssetFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.clientName && formData.clientEmail && formData.clientPhone && 
               formData.clientAddress && formData.clientId && formData.accountType);
      case 2:
        return !!(formData.jurisdiction && formData.complianceAgreement && formData.riskDisclosure && 
               formData.regulatoryCompliance && formData.legalRepresentation);
      case 3:
        return !!(formData.securityLevel && formData.encryptionType && formData.warrantyPeriod && 
               formData.insuranceCoverage && formData.dataProtection);
      case 4:
        return !!(formData.specialTerms && formData.customClauses && formData.penalties && 
               formData.disputeResolution && formData.amendments);
      case 5:
        return !!(formData.executionDate && formData.executionTime && formData.authorizedPersonnel && 
               formData.verificationMethod && formData.completionCriteria);
      default:
        return true;
    }
  };

  const validateAssetForm = (): boolean => {
    return !!(assetFormData.ownerName && assetFormData.ownerEmail && assetFormData.ownerPhone &&
             assetFormData.assetName && assetFormData.assetType && assetFormData.assetValue &&
             assetFormData.assetDescription && assetFormData.acquisitionDate && assetFormData.assetLocation &&
             assetFormData.serialNumber && assetFormData.ownershipProof &&
             assetFormData.legalCompliance && assetFormData.accurateInformation &&
             assetFormData.ownershipRights && assetFormData.liabilityAcceptance);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitToBlockchain = async (formData: FormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-operation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Blockchain submission error:', error);
      throw new Error(`Failed to submit to blockchain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const submitAssetToBlockchain = async (assetData: AssetFormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-operation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Asset blockchain submission error:', error);
      throw new Error(`Failed to submit asset to blockchain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const blockchainResult = await submitToBlockchain(formData);
      
      setSubmitResult({
        success: true,
        operationId: blockchainResult.operationId,
        blockHash: blockchainResult.blockHash,
        message: 'Smart contract created successfully!',
        gasUsed: blockchainResult.gasUsed,
        confirmations: blockchainResult.confirmations
      });

      setTimeout(() => {
        setFormData({
          clientName: '', clientEmail: '', clientPhone: '', clientAddress: '',
          clientId: '', accountType: '', jurisdiction: '', complianceAgreement: false,
          riskDisclosure: false, regulatoryCompliance: false, legalRepresentation: '',
          securityLevel: '', encryptionType: '', warrantyPeriod: '', insuranceCoverage: '',
          dataProtection: false, specialTerms: '', customClauses: '', penalties: '',
          disputeResolution: '', amendments: '', executionDate: '', executionTime: '',
          authorizedPersonnel: '', verificationMethod: '', completionCriteria: ''
        });
        setCurrentStep(1);
        setSubmitResult(null);
      }, 10000);

    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssetSubmit = async () => {
    if (!validateAssetForm()) {
      return;
    }

    setIsSubmittingAsset(true);
    setAssetSubmitResult(null);

    try {
      const blockchainResult = await submitAssetToBlockchain(assetFormData);
      
      setAssetSubmitResult({
        success: true,
        operationId: blockchainResult.nodeId || blockchainResult.operationId,
        blockHash: blockchainResult.blockHash,
        message: 'Asset node created successfully on blockchain!',
        gasUsed: blockchainResult.gasUsed,
        confirmations: blockchainResult.confirmations
      });

      setTimeout(() => {
        setAssetFormData({
          ownerName: '', ownerEmail: '', ownerPhone: '', assetName: '', assetType: '',
          assetValue: '', assetDescription: '', acquisitionDate: '', assetLocation: '',
          serialNumber: '', ownershipProof: '', legalCompliance: false,
          accurateInformation: false, ownershipRights: false, liabilityAcceptance: false
        });
        setAssetSubmitResult(null);
      }, 10000);

    } catch (error) {
      setAssetSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsSubmittingAsset(false);
    }
  };

  const renderStepContent = () => {
    const baseInputStyle: React.CSSProperties = {
      padding: '0.75rem 1rem',
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none'
    };

    const labelStyle: React.CSSProperties = {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    };

    switch (currentStep) {
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('clientName', e.target.value)}
                  placeholder="Enter client full name"
                  style={baseInputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="client@example.com"
                  style={baseInputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  value={formData.clientPhone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={baseInputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Client ID *</label>
                <input
                  type="text"
                  value={formData.clientId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('clientId', e.target.value)}
                  placeholder="Unique client identifier"
                  style={baseInputStyle}
                />
              </div>
            </div>
            
            <div>
              <label style={labelStyle}>Address *</label>
              <textarea
                value={formData.clientAddress}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('clientAddress', e.target.value)}
                placeholder="Complete address"
                rows={3}
                style={{ ...baseInputStyle, resize: 'vertical' as const }}
              />
            </div>
            
            <div>
              <label style={labelStyle}>Account Type *</label>
              <select
                value={formData.accountType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('accountType', e.target.value)}
                style={baseInputStyle}
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
            <div>
              <label style={labelStyle}>Jurisdiction *</label>
              <select
                value={formData.jurisdiction}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('jurisdiction', e.target.value)}
                style={baseInputStyle}
              >
                <option value="">Select jurisdiction</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="eu">European Union</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Legal Representation *</label>
              <input
                type="text"
                value={formData.legalRepresentation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('legalRepresentation', e.target.value)}
                placeholder="Law firm or legal representative"
                style={baseInputStyle}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Required Agreements</h4>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="compliance"
                  checked={formData.complianceAgreement}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('complianceAgreement', e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <label htmlFor="compliance" style={{ fontSize: '0.875rem', color: '#374151' }}>
                  I agree to comply with all applicable regulations and laws *
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="risk"
                  checked={formData.riskDisclosure}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('riskDisclosure', e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <label htmlFor="risk" style={{ fontSize: '0.875rem', color: '#374151' }}>
                  I acknowledge and accept the risk disclosure statement *
                </label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="regulatory"
                  checked={formData.regulatoryCompliance}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('regulatoryCompliance', e.target.checked)}
                  style={{ width: '1.25rem', height: '1.25rem' }}
                />
                <label htmlFor="regulatory" style={{ fontSize: '0.875rem', color: '#374151' }}>
                  I confirm regulatory compliance requirements understanding *
                </label>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Security Level *</label>
                <select
                  value={formData.securityLevel}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('securityLevel', e.target.value)}
                  style={baseInputStyle}
                >
                  <option value="">Select security level</option>
                  <option value="standard">Standard</option>
                  <option value="enhanced">Enhanced</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Encryption Type *</label>
                <select
                  value={formData.encryptionType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('encryptionType', e.target.value)}
                  style={baseInputStyle}
                >
                  <option value="">Select encryption</option>
                  <option value="aes256">AES-256</option>
                  <option value="rsa2048">RSA-2048</option>
                  <option value="ecc">ECC</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Warranty Period *</label>
                <select
                  value={formData.warrantyPeriod}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('warrantyPeriod', e.target.value)}
                  style={baseInputStyle}
                >
                  <option value="">Select warranty period</option>
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                  <option value="3years">3 Years</option>
                  <option value="5years">5 Years</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Insurance Coverage *</label>
                <input
                  type="text"
                  value={formData.insuranceCoverage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('insuranceCoverage', e.target.value)}
                  placeholder="Coverage amount (e.g., $1,000,000)"
                  style={baseInputStyle}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="dataProtection"
                checked={formData.dataProtection}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('dataProtection', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem' }}
              />
              <label htmlFor="dataProtection" style={{ fontSize: '0.875rem', color: '#374151' }}>
                I agree to data protection and privacy policy terms *
              </label>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Special Terms *</label>
              <textarea
                value={formData.specialTerms}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('specialTerms', e.target.value)}
                placeholder="Enter any special terms or conditions"
                rows={4}
                style={{ ...baseInputStyle, resize: 'vertical' as const }}
              />
            </div>
            
            <div>
              <label style={labelStyle}>Custom Clauses *</label>
              <textarea
                value={formData.customClauses}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('customClauses', e.target.value)}
                placeholder="Additional custom clauses"
                rows={4}
                style={{ ...baseInputStyle, resize: 'vertical' as const }}
              />
            </div>
            
            <div>
              <label style={labelStyle}>Penalties and Sanctions *</label>
              <textarea
                value={formData.penalties}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('penalties', e.target.value)}
                placeholder="Penalty terms for non-compliance"
                rows={3}
                style={{ ...baseInputStyle, resize: 'vertical' as const }}
              />
            </div>
            
            <div>
              <label style={labelStyle}>Dispute Resolution *</label>
              <select
                value={formData.disputeResolution}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('disputeResolution', e.target.value)}
                style={baseInputStyle}
              >
                <option value="">Select dispute resolution method</option>
                <option value="arbitration">Arbitration</option>
                <option value="mediation">Mediation</option>
                <option value="litigation">Litigation</option>
                <option value="negotiation">Direct Negotiation</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Amendment Procedures *</label>
              <textarea
                value={formData.amendments}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('amendments', e.target.value)}
                placeholder="Procedures for contract amendments"
                rows={3}
                style={{ ...baseInputStyle, resize: 'vertical' as const }}
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Execution Date *</label>
                <input
                  type="date"
                  value={formData.executionDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('executionDate', e.target.value)}
                  style={baseInputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Execution Time *</label>
                <input
                  type="time"
                  value={formData.executionTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('executionTime', e.target.value)}
                  style={baseInputStyle}
                />
              </div>
            </div>
            
            <div>
              <label style={labelStyle}>Authorized Personnel *</label>
              <input
                type="text"
                value={formData.authorizedPersonnel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('authorizedPersonnel', e.target.value)}
                placeholder="Names of authorized personnel"
                style={baseInputStyle}
              />
            </div>
            
            <div>
              <label style={labelStyle}>Verification Method *</label>
              <select
                value={formData.verificationMethod}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('verificationMethod', e.target.value)}
                style={baseInputStyle}
              >
                <option value="">Select verification method</option>
                <option value="digital-signature">Digital Signature</option>
                <option value="biometric">Biometric Verification</option>
                <option value="two-factor">Two-Factor Authentication</option>
                <option value="multi-factor">Multi-Factor Authentication</option>
              </select>
            </div>
            
            <div>
              <label style={labelStyle}>Completion Criteria *</label>
              <textarea
                value={formData.completionCriteria}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('completionCriteria', e.target.value)}
                placeholder="Define criteria for successful completion"
                rows={4}
                style={{ ...baseInputStyle, resize: 'vertical' as const }}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderAssetForm = () => {
    const baseInputStyle: React.CSSProperties = {
      padding: '0.75rem 1rem',
      width: '100%',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none'
    };

    const labelStyle: React.CSSProperties = {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Owner Information */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Owner Full Name *</label>
            <input
              type="text"
              value={assetFormData.ownerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('ownerName', e.target.value)}
              placeholder="Enter your full name"
              style={baseInputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input
              type="email"
              value={assetFormData.ownerEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('ownerEmail', e.target.value)}
              placeholder="owner@example.com"
              style={baseInputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Phone Number *</label>
            <input
              type="tel"
              value={assetFormData.ownerPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('ownerPhone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              style={baseInputStyle}
            />
          </div>
        </div>

        {/* Asset Information */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={labelStyle}>Asset Name *</label>
            <input
              type="text"
              value={assetFormData.assetName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('assetName', e.target.value)}
              placeholder="Name of the asset"
              style={baseInputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Asset Type *</label>
            <select
              value={assetFormData.assetType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAssetInputChange('assetType', e.target.value)}
              style={baseInputStyle}
            >
              <option value="">Select asset type</option>
              <option value="real-estate">Real Estate</option>
              <option value="vehicle">Vehicle</option>
              <option value="artwork">Artwork</option>
              <option value="jewelry">Jewelry</option>
              <option value="electronics">Electronics</option>
              <option value="collectibles">Collectibles</option>
              <option value="intellectual-property">Intellectual Property</option>
              <option value="cryptocurrency">Cryptocurrency</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label style={labelStyle}>Asset Value (USD) *</label>
            <input
              type="text"
              value={assetFormData.assetValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('assetValue', e.target.value)}
              placeholder="$100,000"
              style={baseInputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Acquisition Date *</label>
            <input
              type="date"
              value={assetFormData.acquisitionDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('acquisitionDate', e.target.value)}
              style={baseInputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Serial/ID Number *</label>
            <input
              type="text"
              value={assetFormData.serialNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('serialNumber', e.target.value)}
              placeholder="Serial number or unique identifier"
              style={baseInputStyle}
            />
          </div>
          
          <div>
            <label style={labelStyle}>Ownership Proof Type *</label>
            <select
              value={assetFormData.ownershipProof}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleAssetInputChange('ownershipProof', e.target.value)}
              style={baseInputStyle}
            >
              <option value="">Select proof type</option>
              <option value="deed">Deed/Title</option>
              <option value="receipt">Purchase Receipt</option>
              <option value="certificate">Certificate of Authenticity</option>
              <option value="registration">Registration Document</option>
              <option value="invoice">Invoice/Bill of Sale</option>
              <option value="contract">Contract Agreement</option>
              <option value="other">Other Legal Document</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Asset Description *</label>
          <textarea
            value={assetFormData.assetDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleAssetInputChange('assetDescription', e.target.value)}
            placeholder="Detailed description of the asset"
            rows={4}
            style={{ ...baseInputStyle, resize: 'vertical' as const }}
          />
        </div>
        
        <div>
          <label style={labelStyle}>Asset Location *</label>
          <input
            type="text"
            value={assetFormData.assetLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('assetLocation', e.target.value)}
            placeholder="Current location of the asset"
            style={baseInputStyle}
          />
        </div>

        {/* Legal Declarations */}
        <div style={{ 
          backgroundColor: '#fef3c7', 
          border: '1px solid #f59e0b', 
          borderRadius: '0.5rem', 
          padding: '1.5rem' 
        }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#92400e', marginBottom: '1rem' }}>
            Legal Declarations
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="legalCompliance"
                checked={assetFormData.legalCompliance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('legalCompliance', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', marginTop: '0.125rem' }}
              />
              <label htmlFor="legalCompliance" style={{ fontSize: '0.875rem', color: '#92400e' }}>
                I confirm that this asset was acquired through legal means and complies with all applicable laws and regulations *
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="accurateInformation"
                checked={assetFormData.accurateInformation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('accurateInformation', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', marginTop: '0.125rem' }}
              />
              <label htmlFor="accurateInformation" style={{ fontSize: '0.875rem', color: '#92400e' }}>
                I declare that all information provided about this asset is accurate and complete to the best of my knowledge *
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="ownershipRights"
                checked={assetFormData.ownershipRights}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('ownershipRights', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', marginTop: '0.125rem' }}
              />
              <label htmlFor="ownershipRights" style={{ fontSize: '0.875rem', color: '#92400e' }}>
                I confirm that I have full legal ownership rights to this asset and there are no outstanding claims, liens, or disputes *
              </label>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <input
                type="checkbox"
                id="liabilityAcceptance"
                checked={assetFormData.liabilityAcceptance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAssetInputChange('liabilityAcceptance', e.target.checked)}
                style={{ width: '1.25rem', height: '1.25rem', marginTop: '0.125rem' }}
              />
              <label htmlFor="liabilityAcceptance" style={{ fontSize: '0.875rem', color: '#92400e' }}>
                I accept full responsibility and liability for the accuracy of this declaration and understand that false information may result in legal consequences *
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Success/Error result display for contract
  if (submitResult) {
    return (
      <div style={{ 
        padding: '2rem',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }}>
          {submitResult.success ? (
            <>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#059669', marginBottom: '1rem' }}>
                Smart Contract Created Successfully!
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                {submitResult.message}
              </p>
              <div style={{ 
                backgroundColor: '#f0f9ff', 
                border: '1px solid #0ea5e9', 
                borderRadius: '0.5rem', 
                padding: '1rem',
                marginBottom: '1rem',
                textAlign: 'left'
              }}>
                <h3 style={{ fontSize: '1rem', color: '#0c4a6e', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Contract Details:
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#0c4a6e' }}>
                  <p><strong>Contract ID:</strong> {submitResult.operationId}</p>
                  <p><strong>Block Hash:</strong> {submitResult.blockHash}</p>
                  <p><strong>Gas Used:</strong> {submitResult.gasUsed}</p>
                  <p><strong>Confirmations:</strong> {submitResult.confirmations}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Resetting form in a few seconds...
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
              <h2 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '1rem' }}>
                Creation Failed
              </h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
                {submitResult.message}
              </p>
              <button
                onClick={() => setSubmitResult(null)}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Header with Timeline */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#111827', marginBottom: '2rem', textAlign: 'center' }}>
            Create a Smart Contract
          </h1>
          
          {/* Progress Timeline */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: step.id <= currentStep 
                      ? (validateStep(step.id) ? '#10b981' : '#6b7280') 
                      : '#e5e7eb',
                    color: step.id <= currentStep ? 'white' : '#9ca3af',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                    border: step.id === currentStep ? '2px solid #2563eb' : 'none'
                  }}>
                    {step.id < currentStep && validateStep(step.id) ? '✓' : step.id}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem',
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
                    backgroundColor: step.id < currentStep ? '#10b981' : '#e5e7eb',
                    margin: '0 1rem',
                    alignSelf: 'flex-start',
                    marginTop: '1.25rem'
                  }} />
                )}
              </div>
            ))}
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>
            Step {currentStep}: {steps[currentStep - 1]?.name}
          </h2>
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
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: currentStep === 1 ? '#f9fafb' : '#6b7280',
              color: currentStep === 1 ? '#9ca3af' : 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ← Previous
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Step {currentStep} of {steps.length}
            </div>
          </div>
          
          {currentStep < 5 ? (
            <button
              onClick={handleNext}
              disabled={!validateStep(currentStep)}
              style={{ 
                padding: '0.75rem 1.5rem',
                backgroundColor: validateStep(currentStep) ? '#2563eb' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: validateStep(currentStep) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !validateStep(5)}
              style={{ 
                padding: '0.75rem 2rem',
                backgroundColor: isSubmitting 
                  ? '#9ca3af' 
                  : validateStep(5)
                  ? '#10b981'
                  : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: (isSubmitting || !validateStep(5)) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Creating Contract...
                </>
              ) : (
                validateStep(5) ? 'Create Smart Contract' : 'Complete All Fields'
              )}
            </button>
          )}
        </div>

        {/* Asset Declaration Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          marginTop: '3rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
              Asset Declaration
            </h1>
            <p style={{ fontSize: '1rem', color: '#6b7280' }}>
              Declare your asset ownership and create a blockchain node
            </p>
          </div>

          {assetSubmitResult ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem'
            }}>
              {assetSubmitResult.success ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#059669', marginBottom: '1rem' }}>
                    Asset Node Created Successfully!
                  </h2>
                  <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                    {assetSubmitResult.message}
                  </p>
                  <div style={{ 
                    backgroundColor: '#ecfdf5', 
                    border: '1px solid #10b981', 
                    borderRadius: '0.5rem', 
                    padding: '1rem',
                    marginBottom: '1rem',
                    textAlign: 'left'
                  }}>
                    <h3 style={{ fontSize: '1rem', color: '#065f46', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Node Details:
                    </h3>
                    <div style={{ fontSize: '0.875rem', color: '#065f46' }}>
                      <p><strong>Node ID:</strong> {assetSubmitResult.operationId}</p>
                      <p><strong>Block Hash:</strong> {assetSubmitResult.blockHash}</p>
                      <p><strong>Gas Used:</strong> {assetSubmitResult.gasUsed}</p>
                      <p><strong>Confirmations:</strong> {assetSubmitResult.confirmations}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Form will reset automatically...
                  </p>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '1rem' }}>
                    Asset Declaration Failed
                  </h2>
                  <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
                    {assetSubmitResult.message}
                  </p>
                  <button
                    onClick={() => setAssetSubmitResult(null)}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Try Again
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {renderAssetForm()}
              
              {/* Asset Submit Button */}
              <div style={{
                marginTop: '2rem',
                textAlign: 'center'
              }}>
                <button
                  onClick={handleAssetSubmit}
                  disabled={isSubmittingAsset || !validateAssetForm()}
                  style={{ 
                    padding: '1rem 2rem',
                    backgroundColor: isSubmittingAsset 
                      ? '#9ca3af' 
                      : validateAssetForm()
                      ? '#7c3aed'
                      : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    cursor: (isSubmittingAsset || !validateAssetForm()) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '0 auto'
                  }}
                >
                  {isSubmittingAsset ? (
                    <>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Creating Asset Node...
                    </>
                  ) : (
                    <>
                       {validateAssetForm() ? 'Declare Asset & Create Node' : 'Complete All Fields'}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Operation;
