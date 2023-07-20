import React, { ReactNode } from "react";
import "./Layout.scss";
import { Navbar } from "..";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page_layout">
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
