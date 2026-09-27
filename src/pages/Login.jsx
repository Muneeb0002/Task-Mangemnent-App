import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Input, Button, Checkbox, Typography, message } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined, CheckSquareOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  });

  const onSubmit = async (data) => {
    // Simulate API authentication call
    await new Promise((resolve) => setTimeout(resolve, 800));
    message.success(`Welcome back, ${data.email}!`);
    // Save dummy session
    localStorage.setItem('jira_auth_user', JSON.stringify({ email: data.email }));
  };

  const handleDemoFill = () => {
    setValue('email', 'developer@practice.com', { shouldValidate: true });
    setValue('password', 'secret123', { shouldValidate: true });
  };

  return (
    <div className="auth-page-container">
      <Card className="auth-card" bordered={false}>
        <div className="auth-brand-header">
          <div className="auth-logo-badge">
            <CheckSquareOutlined />
          </div>
          <Title level={3} className="auth-title">Log in to your account</Title>
          <Text type="secondary">Enter your credentials to access your Jira workspace</Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form" noValidate>
          {/* Email Field */}
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

          {/* Password Field */}
          <div className="auth-form-item">
            <div className="auth-label-row">
              <label className="auth-label">Password</label>
              <Link to="/forgot-password" className="auth-forgot-link">Forgot password?</Link>
            </div>
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
                  placeholder="Enter your password"
                  prefix={<LockOutlined className="auth-input-icon" />}
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            {errors.password && (
              <span className="auth-error-msg">{errors.password.message}</span>
            )}
          </div>

          {/* Remember Me */}
          <div className="auth-remember-row">
            <Controller
              name="remember"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
                  Remember this device
                </Checkbox>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isSubmitting}
            icon={<LoginOutlined />}
            className="auth-primary-btn"
          >
            Log In
          </Button>

          {/* Demo Fill Helper */}
          <Button
            type="dashed"
            size="middle"
            block
            onClick={handleDemoFill}
            className="auth-demo-btn"
          >
            Fill Demo Credentials
          </Button>
        </form>

        <div className="auth-footer-prompt">
          <Text type="secondary">Don't have an account yet? </Text>
          <Link to="/signup" className="auth-switch-link">Sign up</Link>
        </div>
      </Card>
    </div>
  );
}
