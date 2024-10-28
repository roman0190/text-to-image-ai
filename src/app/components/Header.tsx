"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

// Define the type for menu items
interface MenuItem {
  key: string;
  icon: React.ReactNode; // Using ReactNode to allow any valid React node
  label: string;
}

const FuturisticHeader: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false); // Specify state type

  // Define menu items with the type defined above
  const menuItems: MenuItem[] = [
    { key: "1", icon: <HomeOutlined />, label: "Home" },
    { key: "2", icon: <UserOutlined />, label: "About" },
    { key: "3", icon: <InfoCircleOutlined />, label: "Services" },
  ];

  return (
    <Header className="bg-slate-300 shadow-lg z-50 relative">
      <div className="flex gap-[12rem] md:justify-between items-center h-full">
        <div className="text-white text-2xl font-bold">RomanAi</div>
        <button className="hidden" onClick={() => setVisible(false)}>
          hi
        </button>
        <Menu
          mode="horizontal"
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
          }))} // Map items to conform to the Menu component's requirements
          className={`bg-slate-300 transition-transform duration-300 ${
            visible ? "transform translate-x-0" : "transform -translate-x-full"
          } lg:translate-x-0 lg:flex`}
        />
      </div>
    </Header>
  );
};

export default FuturisticHeader;
