import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div>
      <h1 className="mb-3 text-3xl font-bold">Task</h1>
      {children}
    </div>
  );
}

export default layout;
