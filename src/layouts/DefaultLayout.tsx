import React from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-gray-100 p-4 shadow">
      {/* Add your header here */}
      <h1>My App</h1>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="bg-gray-100 p-4 text-center">
      {/* Add your footer here */}
      &copy; {new Date().getFullYear()} My App
    </footer>
  </div>
);

export default DefaultLayout;