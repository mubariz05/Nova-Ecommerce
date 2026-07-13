import { Link } from "react-router-dom";

export default function AccountFooter() {
  return (
    <footer className="mt-auto border-t border-nova-border bg-white px-8 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-nova-gray">
        <span className="font-medium">Nova Commerce</span>

        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
          <Link to="/support" className="transition-colors hover:text-nova-black">
            Privacy Policy
          </Link>
          <Link to="/support" className="transition-colors hover:text-nova-black">
            Terms of Service
          </Link>
          <Link to="/support" className="transition-colors hover:text-nova-black">
            Help Center
          </Link>
        </nav>

        <span>© 2024 Nova Commerce. All rights reserved.</span>
      </div>
    </footer>
  );
}
