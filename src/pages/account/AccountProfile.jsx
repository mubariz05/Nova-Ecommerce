import { useState } from "react";

const initialProfile = {
  fullName: "Alex Mercer",
  email: "alex.mercer@example.com",
  phone: "+1 (555) 123-4567",
};

function CameraIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export default function AccountProfile() {
  const [, setProfile] = useState(initialProfile);
  const [formValues, setFormValues] = useState(initialProfile);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop",
  );
  const [savedMessage, setSavedMessage] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfile(formValues);
    setSavedMessage("Changes saved.");
    setTimeout(() => setSavedMessage(""), 2500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setPasswordError("Fill in all password fields.");
      return;
    }
    if (passwordForm.next.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    setPasswordMessage("Password updated.");
    setPasswordForm({ current: "", next: "", confirm: "" });
    setTimeout(() => setPasswordMessage(""), 2500);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold text-nova-black">Settings</h1>
        <p className="mt-1 text-sm text-nova-gray">
          Manage your profile and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-nova-border bg-white p-5">
            <h2 className="text-sm font-bold text-nova-black">
              Profile Picture
            </h2>
            <div className="mt-3 border-t border-nova-border pt-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-nova-black px-4 py-2 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90">
                    <CameraIcon />
                    Change photo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-2 text-xs text-nova-gray">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleProfileSubmit}
            className="rounded-xl border border-nova-border bg-white p-5"
          >
            <h2 className="text-sm font-bold text-nova-black">
              Personal Information
            </h2>
            <div className="mt-3 flex flex-col gap-4 border-t border-nova-border pt-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-nova-gray">
                  Full Name
                </label>
                <input
                  value={formValues.fullName}
                  onChange={(e) =>
                    setFormValues((f) => ({ ...f, fullName: e.target.value }))
                  }
                  className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-nova-gray">
                  Email
                </label>
                <input
                  type="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-nova-gray">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formValues.phone}
                  onChange={(e) =>
                    setFormValues((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-nova-black px-4 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                >
                  Save Changes
                </button>
                {savedMessage ? (
                  <span className="text-xs font-medium text-emerald-600">
                    {savedMessage}
                  </span>
                ) : null}
              </div>
            </div>
          </form>
        </div>

        <div className="h-fit rounded-xl border border-nova-border bg-white p-5">
          <h2 className="text-sm font-bold text-nova-black">Security</h2>
          <form
            onSubmit={handlePasswordSubmit}
            className="mt-3 flex flex-col gap-4 border-t border-nova-border pt-4"
          >
            <div>
              <label className="mb-1 block text-xs font-medium text-nova-gray">
                Current Password
              </label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) =>
                  setPasswordForm((f) => ({ ...f, current: e.target.value }))
                }
                className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-nova-gray">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.next}
                onChange={(e) =>
                  setPasswordForm((f) => ({ ...f, next: e.target.value }))
                }
                className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-nova-gray">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) =>
                  setPasswordForm((f) => ({ ...f, confirm: e.target.value }))
                }
                className="w-full rounded-lg border border-nova-border bg-white px-3 py-2.5 text-sm text-nova-black placeholder:text-nova-black focus:border-nova-accent focus:outline-none"
              />
            </div>

            {passwordError ? (
              <p className="text-xs font-medium text-red-600">
                {passwordError}
              </p>
            ) : null}
            {passwordMessage ? (
              <p className="text-xs font-medium text-emerald-600">
                {passwordMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="rounded-lg bg-nova-black px-4 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
