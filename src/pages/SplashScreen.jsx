import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress, Button } from 'antd';
import { CheckSquareOutlined, ArrowRightOutlined } from '@ant-design/icons';

export default function SplashScreen() {
  const navigate = useNavigate();
  const totalSeconds = 5;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    // 1-second countdown interval
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const progressPercent = Math.round(((totalSeconds - secondsLeft) / totalSeconds) * 100);

  return (
    <div className="splash-container">
      <div className="splash-card">
        <div className="splash-logo-wrapper">
          <CheckSquareOutlined className="splash-logo-icon" />
        </div>

        <h1 className="splash-title">Jira Task Management</h1>
        <p className="splash-subtitle">
          Plan, track, and deliver team work seamlessly with modern Kanban workflows.
        </p>

        <div className="splash-progress-wrapper">
          <Progress 
            percent={progressPercent} 
            strokeColor={{
              '0%': '#0052cc',
              '100%': '#2684ff',
            }}
            showInfo={false}
          />
          <div className="splash-timer-text">
            Redirecting to Login in <strong>{secondsLeft}s</strong>...
          </div>
        </div>

        <Button 
          type="link" 
          icon={<ArrowRightOutlined />} 
          onClick={() => navigate('/login')}
          className="splash-skip-btn"
        >
          Skip to Login
        </Button>
      </div>
    </div>
  );
}
