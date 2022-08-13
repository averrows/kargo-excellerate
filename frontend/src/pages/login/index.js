import { useCallback, useState } from "react";
import { Button, Radio, Space } from "antd";
import "./style.scss";

// This is mostly cover what ticket #1 is all about
function Login() {
  const handleLogin = useCallback(() => {
    {
      /* YOUR CODE HERE */
    }
  });

  const [setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div className="login">
      <div className="login-header">
        <div className="login-header-wrapper">
          <Space direction="vertical">
            <Space direction="horizontal" align="start" className="login-role">
              <div className="login-role-text">
                Role
              </div>
              <Radio.Group onChange={onChange}>
                <Space direction="vertical">
                  <Radio value={1}>Transporter</Radio>
                  <Radio value={2}>Shipper</Radio>
                </Space>
              </Radio.Group>
            </Space>
            <div>
              <Button onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Login;
