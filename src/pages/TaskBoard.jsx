import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Badge,
  Avatar,
  Space,
  Typography,
  message,
  Divider,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  UserOutlined,
  LogoutOutlined,
  ProjectOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const INITIAL_TASKS = [
  {
    id: 'TASK-101',
    title: 'Design Jira Authentication Flow',
    description: 'Create responsive login, signup, and reset password screens with validation.',
    status: 'done',
    priority: 'high',
    assignee: 'Munib Dev',
  },
  {
    id: 'TASK-102',
    title: 'Integrate Task Board & Drag-Drop',
    description: 'Implement Kanban columns for To-Do, In-Progress, and Completed tasks.',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Munib Dev',
  },
  {
    id: 'TASK-103',
    title: 'Setup API Service & Mock Database',
    description: 'Configure Axios / Fetch mock service to persist state across sessions.',
    status: 'todo',
    priority: 'medium',
    assignee: 'Rana Dev',
  },
  {
    id: 'TASK-104',
    title: 'Dark Mode & Theme Customization',
    description: 'Allow users to switch between light and dark Jira workspace themes.',
    status: 'todo',
    priority: 'low',
    assignee: 'Munib Dev',
  },
];

const COLUMNS = [
  { key: 'todo', title: 'To Do', color: '#108ee9', icon: <ClockCircleOutlined /> },
  { key: 'in-progress', title: 'In Progress', color: '#fa8c16', icon: <SyncOutlined spin /> },
  { key: 'done', title: 'Done', color: '#52c41a', icon: <CheckCircleOutlined /> },
];

export default function TaskBoard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleCreateTask = (values) => {
    const newTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title: values.title,
      description: values.description || 'No description provided.',
      status: values.status || 'todo',
      priority: values.priority || 'medium',
      assignee: values.assignee || 'Munib Dev',
    };
    setTasks((prev) => [newTask, ...prev]);
    setIsModalOpen(false);
    form.resetFields();
    message.success(`Task ${newTask.id} created successfully!`);
  };

  const handleMoveStatus = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t))
    );
    message.info('Task status updated');
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    message.warning('Task deleted');
  };

  const handleLogout = () => {
    localStorage.removeItem('jira_auth_user');
    message.info('Logged out');
    navigate('/login');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f5f7', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header
        style={{
          background: '#0747a6',
          color: '#fff',
          padding: '12px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <Space size="middle">
          <ProjectOutlined style={{ fontSize: 24, color: '#fff' }} />
          <div>
            <Title level={4} style={{ color: '#fff', margin: 0, lineHeight: 1.2 }}>
              Jira Sprint Board
            </Title>
            <Text style={{ color: '#deebff', fontSize: 12 }}>munib-dev branch feature</Text>
          </div>
        </Space>

        <Space orientation="horizontal" size="middle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ background: '#0052cc', borderColor: '#2684ff' }}
            onClick={() => setIsModalOpen(true)}
          >
            Create Task
          </Button>

          <Space size="small">
            <Avatar style={{ backgroundColor: '#ff5630' }} icon={<UserOutlined />} />
            <span style={{ color: '#fff', fontWeight: 500 }}>Munib</span>
          </Space>

          <Button
            type="text"
            icon={<LogoutOutlined />}
            style={{ color: '#fff' }}
            onClick={handleLogout}
            title="Log Out"
          />
        </Space>
      </header>

      {/* Main Board Container */}
      <main style={{ padding: '24px', flex: 1, maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        {/* Quick Board Summary */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ borderRadius: 8, borderLeft: '4px solid #108ee9' }}>
              <Text type="secondary">To Do Tasks</Text>
              <Title level={3} style={{ margin: '4px 0 0' }}>
                {tasks.filter((t) => t.status === 'todo').length}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ borderRadius: 8, borderLeft: '4px solid #fa8c16' }}>
              <Text type="secondary">In Progress</Text>
              <Title level={3} style={{ margin: '4px 0 0' }}>
                {tasks.filter((t) => t.status === 'in-progress').length}
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small" style={{ borderRadius: 8, borderLeft: '4px solid #52c41a' }}>
              <Text type="secondary">Completed</Text>
              <Title level={3} style={{ margin: '4px 0 0' }}>
                {tasks.filter((t) => t.status === 'done').length}
              </Title>
            </Card>
          </Col>
        </Row>

        {/* 3 Kanban Columns */}
        <Row gutter={[16, 16]}>
          {COLUMNS.map((col) => {
            const columnTasks = tasks.filter((t) => t.status === col.key);
            return (
              <Col xs={24} md={8} key={col.key}>
                <div
                  style={{
                    background: '#ebecf0',
                    borderRadius: 10,
                    padding: 16,
                    minHeight: 480,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Space>
                      <span style={{ color: col.color, fontSize: 16 }}>{col.icon}</span>
                      <Text strong style={{ textTransform: 'uppercase', fontSize: 13, letterSpacing: 0.5 }}>
                        {col.title}
                      </Text>
                    </Space>
                    <Badge count={columnTasks.length} style={{ backgroundColor: '#8993a4' }} />
                  </div>

                  {/* Task Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    {columnTasks.length === 0 ? (
                      <div
                        style={{
                          textAlign: 'center',
                          padding: '30px 10px',
                          color: '#8993a4',
                          border: '2px dashed #dfe1e6',
                          borderRadius: 8,
                        }}
                      >
                        No tasks in {col.title}
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <Card
                          key={task.id}
                          size="small"
                          hoverable
                          style={{
                            borderRadius: 8,
                            boxShadow: '0 1px 3px rgba(9, 30, 66, 0.1)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text strong style={{ fontSize: 12, color: '#0052cc' }}>
                              {task.id}
                            </Text>
                            <Tag color={getPriorityColor(task.priority)} style={{ textTransform: 'capitalize' }}>
                              {task.priority}
                            </Tag>
                          </div>

                          <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>
                            {task.title}
                          </Text>

                          <Paragraph
                            type="secondary"
                            ellipsis={{ rows: 2 }}
                            style={{ fontSize: 12, marginBottom: 12 }}
                          >
                            {task.description}
                          </Paragraph>

                          <Divider style={{ margin: '8px 0' }} />

                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Space size="small">
                              <Avatar size="small" icon={<UserOutlined />} />
                              <Text type="secondary" style={{ fontSize: 11 }}>
                                {task.assignee}
                              </Text>
                            </Space>

                            <Space size="small">
                              {col.key !== 'done' && (
                                <Button
                                  type="link"
                                  size="small"
                                  icon={<ArrowRightOutlined />}
                                  onClick={() =>
                                    handleMoveStatus(
                                      task.id,
                                      col.key === 'todo' ? 'in-progress' : 'done'
                                    )
                                  }
                                >
                                  Move
                                </Button>
                              )}
                              <Button
                                type="text"
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteTask(task.id)}
                              />
                            </Space>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </main>

      {/* Modal to Create New Task */}
      <Modal
        title="Create New Jira Task"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreateTask} initialValues={{ status: 'todo', priority: 'medium' }}>
          <Form.Item
            name="title"
            label="Task Summary"
            rules={[{ required: true, message: 'Please enter a task title' }]}
          >
            <Input placeholder="e.g. Implement user notifications" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Add detailed acceptance criteria or notes..." />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="priority" label="Priority">
                <Select>
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="Initial Status">
                <Select>
                  <Option value="todo">To Do</Option>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="done">Done</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="assignee" label="Assignee" initialValue="Munib Dev">
            <Input placeholder="Assignee name" />
          </Form.Item>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create Task
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
