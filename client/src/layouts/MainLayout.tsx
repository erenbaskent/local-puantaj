import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useUIStore } from "@/store/uiStore";
import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { logoutApi } from "@/api/auth";

const NAV_ITEMS = [
  { to: "/schedules", label: "Puantaj Takvimi", icon: "📅" },
  { to: "/my-calendar", label: "Kişisel Takvim", icon: "📋" },
  { to: "/shifts", label: "Vardiyalar", icon: "🕐" },
];

const PAGE_TITLES: Record<string, string> = {
  "/schedules": "Puantaj Takvimi",
  "/my-calendar": "Kişisel Takvim",
  "/shifts": "Vardiyalar",
};

export default function MainLayout() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const showNotification = useUIStore((s) => s.showNotification);
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const pageTitle = PAGE_TITLES[location.pathname] ?? "Puantaj Paneli";

  const handleLogout = async () => {
    try {
      await logoutApi();
      clearAuth();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      <Toast />

      <aside
        className={`${sidebarOpen ? "w-52" : "w-14"} bg-white border-r border-stone-200 flex flex-col flex-shrink-0 transition-all duration-200`}
      >
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-stone-200 overflow-hidden">
          <div className="w-7 h-7 bg-stone-900 text-white rounded-md flex items-center justify-center text-xs font-semibold flex-shrink-0">
            P
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-sm tracking-tight">
              Puantaj
            </span>
          )}
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13.5px] transition-all overflow-hidden whitespace-nowrap
                ${isActive ? "bg-stone-900 text-white font-medium" : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"}`
              }
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-2 border-t border-stone-200">
          {sidebarOpen ? (
            <div className="flex items-center gap-2 px-2 py-1.5">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{user.full_name}</p>
                <p className="text-xs text-stone-400">{user.role_code}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Çıkış"
                className="text-stone-400 hover:text-stone-600"
              >
                ⇥
              </Button>
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={clearAuth}
                title="Çıkış"
              >
                ⇥
              </Button>
            </div>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-13 bg-white border-b border-stone-200 flex items-center px-6 gap-3 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-md hover:bg-stone-50"
          >
            ☰
          </button>
          <span className="text-sm font-medium text-stone-700">
            {pageTitle}
          </span>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
