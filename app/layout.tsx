import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuxeStone — кузовное ателье в Алматы",
  description: "LuxeStone — кузовное ателье, покраска и полировка автомобилей в Алматы. Зейна Шашкина, 29.",
  openGraph: { title: "LuxeStone — кузовное ателье", description: "Форма. Характер. LuxeStone. Кузовное ателье в Алматы.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}


