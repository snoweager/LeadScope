import { 
  LayoutDashboard, 
  Users, 
  Search, 
  Settings, 
  BarChart3, 
  Database,
  FileText,
  Microscope,
  Building2,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: string;
}

const mainNav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Leads', badge: '512' },
  { icon: Search, label: 'Search' },
  { icon: BarChart3, label: 'Analytics' },
];

const sourceNav: NavItem[] = [
  { icon: Building2, label: 'LinkedIn' },
  { icon: FileText, label: 'PubMed' },
  { icon: Microscope, label: 'Conferences' },
  { icon: Database, label: 'Funding' },
  { icon: GraduationCap, label: 'Grants' },
];

export function DashboardSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Microscope className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-sidebar-foreground">LeadScope</h1>
            <p className="text-xs text-sidebar-foreground/60">3D In-Vitro Intelligence</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
            Main
          </p>
          {mainNav.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-sidebar-primary/20 px-2 py-0.5 text-xs font-semibold text-sidebar-primary">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="my-4 border-t border-sidebar-border" />

          <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/50">
            Data Sources
          </p>
          {sourceNav.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings */}
        <div className="border-t border-sidebar-border p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
