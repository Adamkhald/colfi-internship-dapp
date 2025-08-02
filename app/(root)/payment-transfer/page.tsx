"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Building2,
  Landmark,
  DollarSign,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Info,
  TrendingUp,
  FileText,
  CreditCard,
  Briefcase
} from 'lucide-react';

const InstitutionalTransfer = () => {
  const [formData, setFormData] = useState({
    fromInstitution: '',
    toInstitution: '',
    transferType: 'interbank',
    amount: '',
    currency: 'USD',
    purpose: '',
    collateralType: '',
    collateralValue: '',
    bondReference: '',
    maturityDate: '',
    creditRating: '',
    swiftCode: '',
    routingNumber: '',
    accountNumber: '',
    riskLevel: 'medium'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const institutions = [
    { id: 1, name: 'Goldman Sachs', type: 'Investment Bank', balance: 2500000000, currency: 'USD', swift: 'GSCCUS33' },
    { id: 2, name: 'JPMorgan Chase', type: 'Commercial Bank', balance: 3200000000, currency: 'USD', swift: 'CHASUS33' },
    { id: 3, name: 'Bridgewater Associates', type: 'Hedge Fund', balance: 1800000000, currency: 'USD', swift: 'BRASUS33' },
    { id: 4, name: 'BlackRock Inc.', type: 'Asset Management', balance: 4100000000, currency: 'USD', swift: 'BLKRUS33' },
    { id: 5, name: 'Deutsche Bank AG', type: 'Investment Bank', balance: 2800000000, currency: 'EUR', swift: 'DEUTDEFF' }
  ];

  const transferTypes = [
    { id: 'interbank', name: 'Interbank Transfer', description: 'Large-scale transfers between financial institutions' },
    { id: 'repo', name: 'Repurchase Agreement', description: 'Short-term borrowing for dealers in government securities' },
    { id: 'derivatives', name: 'Derivatives Settlement', description: 'Settlement of derivative contracts and swaps' },
    { id: 'syndicated', name: 'Syndicated Loan', description: 'Multi-institution loan facility transfers' }
  ];

  const collateralTypes = [
    { id: 'treasury', name: 'US Treasury Securities', risk: 'AAA' },
    { id: 'corporate', name: 'Corporate Bonds', risk: 'BBB+' },
    { id: 'mortgage', name: 'Mortgage-Backed Securities', risk: 'A-' },
    { id: 'municipal', name: 'Municipal Bonds', risk: 'AA' },
    { id: 'commodities', name: 'Commodity Futures', risk: 'BB+' },
    { id: 'equity', name: 'Blue Chip Equity Portfolio', risk: 'A+' }
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD'];
  const riskLevels = [
    { id: 'low', name: 'Low Risk', color: 'text-green-600' },
    { id: 'medium', name: 'Medium Risk', color: 'text-yellow-600' },
    { id: 'high', name: 'High Risk', color: 'text-red-600' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fromInstitution) newErrors.fromInstitution = 'Source institution is required';
    if (!formData.toInstitution) newErrors.toInstitution = 'Destination institution is required';
    if (!formData.amount) newErrors.amount = 'Transfer amount is required';
    if (!formData.purpose) newErrors.purpose = 'Transfer purpose is required';

    if (formData.amount && (isNaN(formData.amount) || parseFloat(formData.amount) < 1000000)) {
      newErrors.amount = 'Minimum transfer amount is $1,000,000';
    }

    if (formData.fromInstitution && formData.amount) {
      const selectedInstitution = institutions.find(inst => inst.id.toString() === formData.fromInstitution);
      if (selectedInstitution && parseFloat(formData.amount) > selectedInstitution.balance) {
        newErrors.amount = 'Insufficient liquidity in selected institution';
      }
    }

    if (formData.fromInstitution === formData.toInstitution) {
      newErrors.toInstitution = 'Source and destination institutions cannot be the same';
    }

    if ((formData.transferType === 'repo' || formData.transferType === 'derivatives') && !formData.collateralType) {
      newErrors.collateralType = 'Collateral type is required for this transfer type';
    }

    if (formData.collateralType && (!formData.collateralValue || parseFloat(formData.collateralValue) <= 0)) {
      newErrors.collateralValue = 'Valid collateral value is required';
    }

    if (formData.transferType === 'repo' && !formData.maturityDate) {
      newErrors.maturityDate = 'Maturity date is required for repo agreements';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (Math.random() > 0.05) {
        setSubmitStatus('success');
        setFormData({
          fromInstitution: '',
          toInstitution: '',
          transferType: 'interbank',
          amount: '',
          currency: 'USD',
          purpose: '',
          collateralType: '',
          collateralValue: '',
          bondReference: '',
          maturityDate: '',
          creditRating: '',
          swiftCode: '',
          routingNumber: '',
          accountNumber: '',
          riskLevel: 'medium'
        });
      } else {
        setSubmitStatus('error');
        setErrors({ submit: 'Transfer validation failed. Please verify compliance requirements.' });
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrors({ submit: 'System error occurred. Contact treasury operations.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedFromInstitution = institutions.find(inst => inst.id.toString() === formData.fromInstitution);
  const selectedToInstitution = institutions.find(inst => inst.id.toString() === formData.toInstitution);
  const selectedCollateral = collateralTypes.find(col => col.id === formData.collateralType);

  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="payment-transfer">
      <div className="header-box mb-8">
        <h1 className="header-box-title">Institutional Transfer System</h1>
        <p className="header-box-subtext">
          Secure large-scale transfers between financial institutions with collateral management
        </p>
      </div>

      {submitStatus === 'success' && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Transfer successfully submitted for processing. Settlement expected within 2-4 hours during market hours.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {errors.submit || 'Please review and correct the validation errors below.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-20 font-semibold flex items-center gap-2">
                <Landmark className="w-5 h-5" />
                Transfer Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Transfer Type Selection */}
                <div className="form-item">
                  <label className="form-label">Transfer Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {transferTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.transferType === type.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('transferType', type.id)}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="transferType"
                            value={type.id}
                            checked={formData.transferType === type.id}
                            onChange={() => handleInputChange('transferType', type.id)}
                            className="text-blue-600"
                          />
                          <div>
                            <p className="text-14 font-medium">{type.name}</p>
                            <p className="text-12 text-gray-500">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* From Institution */}
                <div className="payment-transfer_form-item">
                  <div className="payment-transfer_form-content">
                    <div className="form-item">
                      <label className="form-label">From Institution *</label>
                      <select
                        className={`input-class w-full ${errors.fromInstitution ? 'border-red-300' : ''}`}
                        value={formData.fromInstitution}
                        onChange={(e) => handleInputChange('fromInstitution', e.target.value)}
                      >
                        <option value="">Select source institution</option>
                        {institutions.map((inst) => (
                          <option key={inst.id} value={inst.id}>
                            {inst.name} - {inst.type} ({formatCurrency(inst.balance, inst.currency)})
                          </option>
                        ))}
                      </select>
                      {errors.fromInstitution && <p className="form-message">{errors.fromInstitution}</p>}
                    </div>
                  </div>

                  {selectedFromInstitution && (
                    <Card className="bank-info">
                      <CardContent className="p-4">
                        <div className="bank-info_content">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-14 font-medium">{selectedFromInstitution.name}</p>
                              <p className="text-12 text-gray-500">{selectedFromInstitution.type} • SWIFT: {selectedFromInstitution.swift}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-12 text-gray-500">Available Liquidity</p>
                            <p className="text-16 font-semibold">{formatCurrency(selectedFromInstitution.balance, selectedFromInstitution.currency)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* To Institution */}
                <div className="payment-transfer_form-item">
                  <div className="payment-transfer_form-content">
                    <div className="form-item">
                      <label className="form-label">To Institution *</label>
                      <select
                        className={`input-class w-full ${errors.toInstitution ? 'border-red-300' : ''}`}
                        value={formData.toInstitution}
                        onChange={(e) => handleInputChange('toInstitution', e.target.value)}
                      >
                        <option value="">Select destination institution</option>
                        {institutions.filter(inst => inst.id.toString() !== formData.fromInstitution).map((inst) => (
                          <option key={inst.id} value={inst.id}>
                            {inst.name} - {inst.type}
                          </option>
                        ))}
                      </select>
                      {errors.toInstitution && <p className="form-message">{errors.toInstitution}</p>}
                    </div>
                  </div>

                  {selectedToInstitution && (
                    <Card className="bank-info">
                      <CardContent className="p-4">
                        <div className="bank-info_content">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-14 font-medium">{selectedToInstitution.name}</p>
                              <p className="text-12 text-gray-500">{selectedToInstitution.type} • SWIFT: {selectedToInstitution.swift}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Amount and Currency */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 form-item">
                    <label className="form-label">Transfer Amount *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        step="1000000"
                        min="1000000"
                        className={`input-class w-full pl-10 ${errors.amount ? 'border-red-300' : ''}`}
                        placeholder="1,000,000"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                      />
                    </div>
                    {errors.amount && <p className="form-message">{errors.amount}</p>}
                  </div>
                  <div className="form-item">
                    <label className="form-label">Currency</label>
                    <select
                      className="input-class w-full"
                      value={formData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>{currency}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Purpose */}
                <div className="form-item">
                  <label className="form-label">Transfer Purpose *</label>
                  <input
                    type="text"
                    className={`input-class w-full ${errors.purpose ? 'border-red-300' : ''}`}
                    placeholder="e.g., Liquidity provision, Capital injection, Securities settlement"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange('purpose', e.target.value)}
                  />
                  {errors.purpose && <p className="form-message">{errors.purpose}</p>}
                </div>

                {/* Collateral Section */}
                {(formData.transferType === 'repo' || formData.transferType === 'derivatives') && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <h3 className="text-16 font-semibold">Collateral Management</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-item">
                        <label className="form-label">Collateral Type *</label>
                        <select
                          className={`input-class w-full ${errors.collateralType ? 'border-red-300' : ''}`}
                          value={formData.collateralType}
                          onChange={(e) => handleInputChange('collateralType', e.target.value)}
                        >
                          <option value="">Select collateral type</option>
                          {collateralTypes.map(type => (
                            <option key={type.id} value={type.id}>
                              {type.name} ({type.risk})
                            </option>
                          ))}
                        </select>
                        {errors.collateralType && <p className="form-message">{errors.collateralType}</p>}
                      </div>
                      
                      <div className="form-item">
                        <label className="form-label">Collateral Value</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            step="100000"
                            className={`input-class w-full pl-10 ${errors.collateralValue ? 'border-red-300' : ''}`}
                            placeholder="Collateral market value"
                            value={formData.collateralValue}
                            onChange={(e) => handleInputChange('collateralValue', e.target.value)}
                          />
                        </div>
                        {errors.collateralValue && <p className="form-message">{errors.collateralValue}</p>}
                      </div>
                    </div>

                    {selectedCollateral && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-14 font-medium text-blue-800">{selectedCollateral.name}</p>
                            <p className="text-12 text-blue-600">Credit Rating: {selectedCollateral.risk}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Repo-specific fields */}
                {formData.transferType === 'repo' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-item">
                      <label className="form-label">Maturity Date *</label>
                      <input
                        type="date"
                        className={`input-class w-full ${errors.maturityDate ? 'border-red-300' : ''}`}
                        value={formData.maturityDate}
                        onChange={(e) => handleInputChange('maturityDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.maturityDate && <p className="form-message">{errors.maturityDate}</p>}
                    </div>
                    
                    <div className="form-item">
                      <label className="form-label">Risk Level Assessment</label>
                      <select
                        className="input-class w-full"
                        value={formData.riskLevel}
                        onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                      >
                        {riskLevels.map(level => (
                          <option key={level.id} value={level.id}>{level.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Additional Reference Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-item">
                    <label className="form-label">Bond/Security Reference</label>
                    <input
                      type="text"
                      className="input-class w-full"
                      placeholder="CUSIP, ISIN, or internal reference"
                      value={formData.bondReference}
                      onChange={(e) => handleInputChange('bondReference', e.target.value)}
                    />
                  </div>
                  
                  <div className="form-item">
                    <label className="form-label">Credit Rating</label>
                    <input
                      type="text"
                      className="input-class w-full"
                      placeholder="S&P/Moody's rating"
                      value={formData.creditRating}
                      onChange={(e) => handleInputChange('creditRating', e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="payment-transfer_btn-box">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="payment-transfer_btn flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        Processing Transfer...
                      </>
                    ) : (
                      <>
                        <ArrowUpRight className="w-4 h-4" />
                        Execute Transfer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-18 font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Transaction Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.fromInstitution && (
                <div className="payment-transfer_form-details">
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">From</span>
                    <span className="text-14 font-medium">{selectedFromInstitution?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">Type</span>
                    <span className="text-14">{selectedFromInstitution?.type}</span>
                  </div>
                </div>
              )}

              {formData.toInstitution && (
                <div className="payment-transfer_form-details">
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">To</span>
                    <span className="text-14 font-medium">{selectedToInstitution?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">SWIFT</span>
                    <span className="text-14">{selectedToInstitution?.swift}</span>
                  </div>
                </div>
              )}

              {formData.amount && (
                <div className="payment-transfer_form-details">
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">Principal Amount</span>
                    <span className="text-18 font-semibold">{formatCurrency(parseFloat(formData.amount || 0), formData.currency)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">Processing Fee</span>
                    <span className="text-14">{formatCurrency(Math.max(5000, parseFloat(formData.amount || 0) * 0.0001), formData.currency)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-14 font-medium">Total</span>
                    <span className="text-18 font-semibold">{formatCurrency(parseFloat(formData.amount || 0) + Math.max(5000, parseFloat(formData.amount || 0) * 0.0001), formData.currency)}</span>
                  </div>
                </div>
              )}

              {formData.collateralType && (
                <div className="payment-transfer_form-details">
                  <div className="flex justify-between items-center">
                    <span className="text-12 text-gray-500">Collateral</span>
                    <span className="text-14 font-medium">{selectedCollateral?.name}</span>
                  </div>
                  {formData.collateralValue && (
                    <div className="flex justify-between items-center">
                      <span className="text-12 text-gray-500">Value</span>
                      <span className="text-14">{formatCurrency(parseFloat(formData.collateralValue), formData.currency)}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div className="text-12 text-gray-600">
                    <p className="font-medium mb-1">Settlement Times:</p>
                    <p>• Interbank: Real-time (RTGS)</p>
                    <p>• Repo agreements: T+0</p>
                    <p>• Derivatives: T+2</p>
                    <p>• Syndicated loans: T+3</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Institutional Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-18 font-semibold">Recent Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { description: 'Repo Agreement Settlement', amount: -250000000, date: '2025-07-31', type: 'repo' },
                  { description: 'Liquidity Injection', amount: 500000000, date: '2025-07-30', type: 'interbank' },
                  { description: 'Derivatives Settlement', amount: -180000000, date: '2025-07-29', type: 'derivatives' }
                ].map((transfer, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transfer.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transfer.amount > 0 ? 
                          <ArrowDownLeft className="w-4 h-4 text-green-600" /> :
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="text-12 font-medium">{transfer.description}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-10 text-gray-500">{transfer.date}</p>
                          <Badge variant="outline" className="text-10 px-1 py-0">
                            {transfer.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <span className={`text-12 font-semibold ${
                      transfer.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transfer.amount > 0 ? '+' : ''}${(Math.abs(transfer.amount) / 1000000).toFixed(0)}M
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalTransfer;