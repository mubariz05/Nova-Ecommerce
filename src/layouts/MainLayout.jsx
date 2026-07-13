import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-nova-cream text-nova-black">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
