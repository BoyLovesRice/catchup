import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'Catchup', description: 'Skip 200 emails. Read 1 page.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Catchup" className="h-8 w-8 rounded-xl" />
            <b>Catchup</b>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="btn">Home</Link>
            <Link href="/pricing" className="btn">Pricing</Link>
            <Link href="/app" className="btn btn-primary text-white">Open App</Link>
          </div>
        </nav>
        {children}
        <footer className="container mt-12 text-sm text-[color:var(--muted)]">
          <div className="border-t border-[color:var(--line)] my-6"></div>
          <div className="flex items-center justify-between">
            <span>© {new Date().getFullYear()} Catchup</span>
            <div className="flex items-center gap-3">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
