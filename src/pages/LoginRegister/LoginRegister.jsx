import { useState } from "react";
import { Eye, EyeOff, Check, ArrowRight } from "lucide-react";

const GoogleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
    />
    <path
      fill="#FF3D00"
      d="M6.3 14.7l6.6 4.8C14.7 15.9 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.4 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.3 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C40.3 36 44 30.7 44 24c0-1.3-.1-2.7-.4-3.5z"
    />
  </svg>
);

const AppleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 384 512" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const NovaMark = () => (
  <div
    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
    style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
  >
    <span
      style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 16 }}
    >
      N
    </span>
  </div>
);

const inputClass =
  "w-full rounded-lg border border-[#e2e0da] px-3.5 py-2.5 text-sm placeholder:text-[#b4b2ac] focus:outline-none focus:ring-2 focus:ring-[#5b4fd1]/20 focus:border-[#5b4fd1]/60";

const displayFont = { fontFamily: "Georgia, 'Times New Roman', serif" };

function SignInForm({ showPw, setShowPw, remember, setRemember }) {
  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
      <p className="text-[11px] tracking-[0.18em] uppercase text-[#9a9a9a] mb-1">
        Welcome back
      </p>
      <h1 className="text-2xl text-[#17122c] mb-6" style={displayFont}>
        Log in to Nova
      </h1>

      <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
        Email address
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        className={`${inputClass} mb-4`}
      />

      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-xs font-semibold text-[#1a1a1a]">
          Password
        </label>
        <a href="#" className="text-xs text-[#5b4fd1] hover:underline">
          Forgot password?
        </a>
      </div>
      <div className="relative mb-3">
        <input
          type={showPw ? "text" : "password"}
          placeholder="Enter your password"
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setShowPw((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
          aria-label={showPw ? "Hide password" : "Show password"}
        >
          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <label className="flex items-center gap-2 text-xs text-[#4a4a4a] cursor-pointer select-none mb-4">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-[#d0cdc6] accent-[#5b4fd1]"
        />
        Remember me
      </label>

      <button
        type="submit"
        className="w-full bg-[#17122c] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-[#241a4a] transition-colors mb-3"
      >
        Log in
      </button>

      <div className="flex items-center gap-3 mb-3">
        <div className="h-px bg-[#ececec] flex-1" />
        <span className="text-xs text-[#9a9a9a]">or continue with</span>
        <div className="h-px bg-[#ececec] flex-1" />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 border border-[#e2e0da] rounded-lg py-2.5 text-sm font-medium text-[#2a2a2a] hover:bg-[#faf9f7] transition-colors"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="flex-1 flex items-center justify-center gap-2 border border-[#e2e0da] rounded-lg py-2.5 text-sm font-medium text-[#2a2a2a] hover:bg-[#faf9f7] transition-colors"
        >
          <AppleIcon />
          Apple
        </button>
      </div>
    </form>
  );
}

function SignUpForm({ showPw, setShowPw }) {
  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
      <p className="text-[11px] tracking-[0.18em] uppercase text-[#9a9a9a] mb-1">
        New here
      </p>
      <h1 className="text-2xl text-[#17122c] mb-6" style={displayFont}>
        Create your account
      </h1>

      <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
        Full name
      </label>
      <input
        type="text"
        placeholder="Jane Doe"
        className={`${inputClass} mb-4`}
      />

      <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
        Email address
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        className={`${inputClass} mb-4`}
      />

      <label className="block text-xs font-semibold text-[#1a1a1a] mb-1.5">
        Password
      </label>
      <div className="relative mb-6">
        <input
          type={showPw ? "text" : "password"}
          placeholder="Create a password"
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setShowPw((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]"
          aria-label={showPw ? "Hide password" : "Show password"}
        >
          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#17122c] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-[#241a4a] transition-colors"
      >
        Create account
      </button>
    </form>
  );
}

export default function NovaCommerceAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPw1, setShowPw1] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [remember, setRemember] = useState(false);

  const gradient =
    "linear-gradient(120deg, #17122c 0%, #362a72 55%, #5b4fd1 100%)";

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-[#f4f2ef]">
      <div
        className="relative w-full max-w-[820px] bg-white rounded-[20px] overflow-hidden shadow-[0_30px_60px_-20px_rgba(26,20,50,0.28),0_8px_24px_rgba(26,20,50,0.10)]"
        style={{ minHeight: 520 }}
      >
        <div
          className="hidden md:block relative w-full h-full"
          style={{ minHeight: 520 }}
        >
          <div
            className="absolute top-0 left-0 w-1/2 h-full flex items-center px-10 lg:px-14 transition-transform duration-500 ease-in-out"
            style={{
              transform: isSignup ? "translateX(100%)" : "translateX(0%)",
            }}
          >
            {isSignup ? (
              <SignUpForm showPw={showPw2} setShowPw={setShowPw2} />
            ) : (
              <SignInForm
                showPw={showPw1}
                setShowPw={setShowPw1}
                remember={remember}
                setRemember={setRemember}
              />
            )}
          </div>

          <div
            className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out"
            style={{
              transform: isSignup ? "translateX(-100%)" : "translateX(0%)",
            }}
          >
            <div
              className="w-full h-full flex flex-col items-center justify-center text-center text-white px-9"
              style={{ background: gradient }}
            >
              {isSignup ? (
                <>
                  <NovaMark />
                  <h2 className="text-xl mt-4 mb-3" style={displayFont}>
                    Already with us?
                  </h2>
                  <p className="text-sm text-white/75 leading-relaxed mb-6">
                    Log in to pick up your cart, track orders, and see deals
                    curated for you.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    className="border border-white/70 rounded-full px-8 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    Log in
                  </button>
                </>
              ) : (
                <>
                  <NovaMark />
                  <h2 className="text-xl mt-4 mb-3" style={displayFont}>
                    New to Nova?
                  </h2>
                  <ul className="text-sm text-white/75 space-y-2 mb-6 text-left">
                    {[
                      "Track orders in real time",
                      "Faster one-tap checkout",
                      "Early access to sales",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-white/50 flex items-center justify-center shrink-0">
                          <Check size={9} strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    className="border border-white/70 rounded-full px-8 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="md:hidden px-6 py-10">
          {isSignup ? (
            <SignUpForm showPw={showPw2} setShowPw={setShowPw2} />
          ) : (
            <SignInForm
              showPw={showPw1}
              setShowPw={setShowPw1}
              remember={remember}
              setRemember={setRemember}
            />
          )}
          <button
            type="button"
            onClick={() => setIsSignup((s) => !s)}
            className="w-full flex items-center justify-center gap-1.5 text-sm text-[#5b4fd1] mt-6 font-medium"
          >
            {isSignup
              ? "Already have an account? Log in"
              : "New here? Create an account"}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
