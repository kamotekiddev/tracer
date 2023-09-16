import Header from "@/components/Header";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
