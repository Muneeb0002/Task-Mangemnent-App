import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography, message } from 'antd';
import { LockOutlined, CheckCircleOutlined, ArrowLeftOutlined, SafetyCertificateOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ResetPassword() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    // Simulate updating password
    await new Promise((resolve) => setTimeout(resolve, 800));
    message.success('Your password has been reset successfully! Please log in.');
    navigate('/login');
  };

  return (
    <div className="auth-page-container">
      <Card className="auth-card" bordered={false}>
        <div className="auth-brand-header">
          <div className="auth-logo-badge">
            <SafetyCertificateOutlined />
          </div>
          <Title level={3} className="auth-title">Reset Your Password</Title>
          <Text type="secondary">Create a new secure password for your account</Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
          {/* New Password */}
          <div className="auth-form-item">
            <label className="auth-label">New Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'New password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Enter new password"
                  prefix={<LockOutlined className="auth-input-icon" />}
                  status={errors.password ? 'error' : ''}
                  autoFocus
                />
              )}
            />
            {errors.password && (
              <span className="auth-error-msg">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="auth-form-item">
            <label className="auth-label">Confirm New Password</label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm your new password',
                validate: (val) => val === passwordValue || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Re-enter new password"
                  prefix={<LockOutlined className="auth-input-icon" />}
                  status={errors.confirmPassword ? 'error' : ''}
                />
              )}
            />
            {errors.confirmPassword && (
              <span className="auth-error-msg">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting}
            icon={<CheckCircleOutlined />}
            className="auth-primary-btn"
          >
            Update Password
          </Button>
        </form>

        <div className="auth-footer-prompt">
          <Link to="/login" className="auth-switch-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeftOutlined />
            <span>Cancel and return to Log In</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
