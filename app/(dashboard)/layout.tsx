import Header from "@/components/Header";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};
function Layout({ children }: LayoutProps) {
  return (
    <section className="h-screen grid grid-rows-[auto_1fr]">
      <Header />
      {children}
    </section>
  );
}

export default Layout;
