import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography, Alert } from 'antd';
import { MailOutlined, SendOutlined, ArrowLeftOutlined, KeyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    // Simulate sending recovery link
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSentEmail(data.email);
    setEmailSent(true);
  };

  return (
    <div className="auth-page-container">
      <Card className="auth-card" bordered={false}>
        <div className="auth-brand-header">
          <div className="auth-logo-badge">
            <KeyOutlined />
          </div>
          <Title level={3} className="auth-title">Forgot Password?</Title>
          <Text type="secondary">
            {emailSent
              ? `We sent password reset instructions to ${sentEmail}`
              : "Enter your registered email address to receive reset instructions"}
          </Text>
        </div>

        {emailSent ? (
          <div className="auth-form">
            <Alert
              message="Reset Email Dispatched"
              description={`Check your inbox (${sentEmail}) for the recovery link, or proceed directly to enter your new password below.`}
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Button
              type="primary"
              size="large"
              block
              onClick={() => navigate('/reset-password')}
              className="auth-primary-btn"
            >
              Enter New Password
            </Button>

            <Button
              type="text"
              block
              onClick={() => setEmailSent(false)}
              className="auth-demo-btn"
            >
              Try another email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
            <div className="auth-form-item">
              <label className="auth-label">Email Address</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="name@company.com"
                    prefix={<MailOutlined className="auth-input-icon" />}
                    status={errors.email ? 'error' : ''}
                    autoFocus
                  />
                )}
              />
              {errors.email && (
                <span className="auth-error-msg">{errors.email.message}</span>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isSubmitting}
              icon={<SendOutlined />}
              className="auth-primary-btn"
            >
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="auth-footer-prompt">
          <Link to="/login" className="auth-switch-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeftOutlined />
            <span>Back to Log In</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
