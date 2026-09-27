import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Checkbox, Typography, message } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined, 
  UserAddOutlined, 
  CheckSquareOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;

export default function SignUp() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    // Simulate API registration call
    await new Promise((resolve) => setTimeout(resolve, 800));
    message.success('Account created successfully! Please log in.');
    navigate('/login');
  };

  return (
    <div className="auth-page-container">
      <Card className="auth-card" bordered={false}>
        <div className="auth-brand-header">
          <div className="auth-logo-badge">
            <CheckSquareOutlined />
          </div>
          <Title level={3} className="auth-title">Create your account</Title>
          <Text type="secondary">Sign up to start organizing tasks with your team</Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
          {/* Full Name */}
          <div className="auth-form-item">
            <label className="auth-label">Full Name</label>
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: 'Full name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  size="large"
                  placeholder="e.g. Ahmad Raza"
                  prefix={<UserOutlined className="auth-input-icon" />}
                  status={errors.fullName ? 'error' : ''}
                />
              )}
            />
            {errors.fullName && (
              <span className="auth-error-msg">{errors.fullName.message}</span>
            )}
          </div>

          {/* Email */}
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
                />
              )}
            />
            {errors.email && (
              <span className="auth-error-msg">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="auth-form-item">
            <label className="auth-label">Password</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Create a strong password"
                  prefix={<LockOutlined className="auth-input-icon" />}
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <span className="auth-error-msg">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="auth-form-item">
            <label className="auth-label">Confirm Password</label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: (val) => val === passwordValue || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder="Re-enter your password"
                  prefix={<LockOutlined className="auth-input-icon" />}
                  status={errors.confirmPassword ? 'error' : ''}
                />
              )}
            />
            {errors.confirmPassword && (
              <span className="auth-error-msg">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="auth-form-item">
            <Controller
              name="agreeTerms"
              control={control}
              rules={{
                required: 'You must accept the terms of service',
              }}
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
                  I agree to the <span className="auth-terms-text">Terms of Service</span> and{' '}
                  <span className="auth-terms-text">Privacy Policy</span>
                </Checkbox>
              )}
            />
            {errors.agreeTerms && (
              <span className="auth-error-msg">{errors.agreeTerms.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting}
            icon={<UserAddOutlined />}
            className="auth-primary-btn"
          >
            Create Account
          </Button>
        </form>

        <div className="auth-footer-prompt">
          <Text type="secondary">Already have an account? </Text>
          <Link to="/login" className="auth-switch-link">Log in</Link>
        </div>
      </Card>
    </div>
  );
}
