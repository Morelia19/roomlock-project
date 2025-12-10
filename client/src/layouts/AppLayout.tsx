import type { FC, ReactNode } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};
