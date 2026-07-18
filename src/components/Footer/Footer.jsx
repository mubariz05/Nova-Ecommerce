const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full px-6 py-4 sm:px-10 lg:px-16">
        <div className="flex w-full flex-col flex-wrap gap-6 sm:flex-row sm:justify-between">
          <div className="min-w-0 flex-1 text-center sm:max-w-xs sm:text-left">
            <h2 className="text-sm font-bold tracking-wide text-neutral-900">
              NOVA COMMERCE
            </h2>
            <p className="mt-1 text-[10px] leading-relaxed text-neutral-500">
              Elevating everyday essentials through meticulous curation and
              minimalist design.
            </p>
          </div>

          <div className="min-w-0 flex-1 text-center">
            <h3 className="text-[9px] font-semibold tracking-wider text-neutral-900 uppercase">
              Customer Care
            </h3>
            <ul className="mt-1 space-y-1">
              <li>
                <a
                  href="#"
                  className="text-[10px] text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[10px] text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[10px] text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[10px] text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0 flex-1 text-center sm:max-w-sm sm:text-left">
            <h3 className="text-[9px] font-semibold tracking-wider text-neutral-900 uppercase">
              Newsletter
            </h3>
            <p className="mt-1 text-[10px] text-neutral-500">
              Subscribe for updates & exclusive deals.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-1 flex w-full max-w-sm mx-auto sm:mx-0"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                className="min-w-0 flex-1 border border-neutral-300 bg-white px-2 py-1.5 text-[10px] text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
              <button
                type="submit"
                className="shrink-0 bg-neutral-900 px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 border-t border-neutral-200 pt-2 text-center">
          <p className="text-[9px] text-neutral-400">
            © 2026 NOVA COMMERCE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
