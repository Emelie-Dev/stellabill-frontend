import { Link, Outlet, useLocation } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import { 
  LayoutDashboard, 
  CreditCard, 
  ClipboardList, 
  Search, 
  Settings, 
  Component,
  ChevronRight
} from "lucide-react";

const nav = [
  { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { path: "/subscriptions", label: "Subscriptions", icon: <CreditCard size={18} /> },
  { path: "/plans", label: "Plans", icon: <ClipboardList size={18} /> },
  { path: "/browse-plans", label: "Browse Plans", icon: <Search size={18} /> },
  { path: "/settings", label: "Settings", icon: <Settings size={18} /> },
  { path: "/ui-kit", label: "UI Kit", icon: <Component size={18} /> },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-height-screen bg-slate-950 text-slate-200">
      {/* Top Navbar */}
      <LandingNavbar />
      
      <div className="flex flex-1 pt-18 lg:pt-20 lg:h-screen">
        {/* Sidebar - Hidden on mobile, shown as part of the shell on desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-900/50 border-r border-white/10 overflow-y-auto">
          <div className="flex-1 py-8 px-4 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 px-3">Workspace</p>
            {nav.map(({ path, label, icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive 
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}>
                      {icon}
                    </span>
                    {label}
                  </span>
                  {isActive && <ChevronRight size={14} className="text-cyan-400" />}
                </Link>
              );
            })}
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5">
             <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-white/5 shadow-inner">
                <p className="text-xs font-medium text-slate-400 mb-1">Current Plan</p>
                <p className="text-sm font-bold text-white mb-3">Enterprise Pro</p>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-3/4 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">75% of limit reached</p>
             </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950 relative">
          <div className="max-w-7xl mx-auto p-6 md:p-8 lg:p-10">
            <Outlet />
          </div>
          
          {/* Subtle background glow */}
          <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] pointer-events-none -z-10" />
        </main>
      </div>
    </div>
  );
}
