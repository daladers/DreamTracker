import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <AntFooter style={{ textAlign: "center", backgroundColor: "#424769", color: "#F6B17A"}}>
            DreamTracker ©{currentYear} Created by Roman Shvydko
        </AntFooter>
    );
};

export default Footer;
