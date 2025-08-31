import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
          <aside className="hidden md:block bg-[#0a1326] border-r border-[#1a2550] p-5">
            <div className="text-xl font-semibold mb-6">Journey Portal</div>
            <nav className="space-y-2">
              <Link href="/dashboard" className="block hover:underline">Dashboard</Link>
              <Link href="/esims" className="block hover:underline">eSIMs</Link>
              <Link href="/products" className="block hover:underline">Products</Link>
              <Link href="/billing" className="block hover:underline">Billing</Link>
              <Link href="/settings" className="block hover:underline">Business Settings</Link>
            </nav>
          </aside>
          <main className="p-5">{children}</main>
        </div>
      </body>
    </html>
  );
}
