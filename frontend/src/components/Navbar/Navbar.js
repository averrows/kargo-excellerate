import { useCallback, useState } from "react";
import { Button, Radio, Space } from "antd";
import "./style.scss";

function Navbar(props) {
    const isShipper = props.shipper
    return (
        <div className="Navbar">
            <Space>
                <h2>LMS</h2>
                <div class="Navbar-vl"></div>
                <h2>
                    <a className="Navbar-text" href="#">
                        Shipments
                    </a>
                </h2>
                {isShipper && 
                    <Space>
                        <h2>
                            <a className="Navbar-text" href="#">
                                Trucks
                            </a>
                        </h2>
                        <h2>
                            <a className="Navbar-text" href="#">
                                Drivers
                            </a>
                        </h2>
                    </Space>
                }
            </Space>
        </div>
    );
}

export default Navbar;
