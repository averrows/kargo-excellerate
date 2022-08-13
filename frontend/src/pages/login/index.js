import { Button, Form, Radio, Space } from "antd";
import "./style.scss";

// This is mostly cover what ticket #1 is all about
function Login() {
  const onFinish = (values) => {
    console.log(values)
  };
  
  return (
    <div className="login">
      <div className="login-header">
        <div className="login-header-wrapper">
          <Space direction="vertical">
            <Space direction="horizontal" align="start" className="login-role">
              <Form onFinish={onFinish}>
                <Form.Item label="Role"
                  rules={[
                    {
                      required: true,
                      message: 'Pilih role anda terlebih dahulu!'
                    }
                  ]}>
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="transporter">Transporter</Radio>
                      <Radio value="shipper">Shipper</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <Form.Item>
                  <div>
                    <Button type="primary" htmlType="submit">
                      Login
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Space>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Login;
