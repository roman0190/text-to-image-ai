"use client";

import Link from "next/link";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-gray-800 text-white text-center  py-4 z-50">
      <div className="flex justify-center space-x-4 mb-2">
        <Link href="/privacy" className="hover:text-gray-400">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-gray-400">
          Terms of Service
        </Link>
        <Link href="/contact" className="hover:text-gray-400">
          Contact Us
        </Link>
      </div>
      <p>
        &copy; {new Date().getFullYear()} Roman Howladar. All rights reserved.
      </p>
    </AntFooter>
  );
};

export default Footer;
