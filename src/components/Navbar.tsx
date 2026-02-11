import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User, LayoutDashboard, CreditCard, Shield, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "?";

  const navLinks = (
    <>
      <Link to="/plans" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>
        <CreditCard className="h-4 w-4" /> Plans
      </Link>
      {isAuthenticated && (
        <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to="/admin/subscriptions" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(false)}>
          <Shield className="h-4 w-4" /> Admin
        </Link>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-lg font-bold tracking-tight">SubDash</Link>
          <nav className="hidden md:flex items-center gap-4">{navLinks}</nav>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate("/login"); }}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>Log in</Button>
              <Button size="sm" onClick={() => navigate("/register")}>Sign up</Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 flex flex-col gap-3 bg-background">
          {navLinks}
          {!isAuthenticated && (
            <div className="flex gap-2 pt-2 border-t">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => { navigate("/login"); setMobileOpen(false); }}>Log in</Button>
              <Button size="sm" className="flex-1" onClick={() => { navigate("/register"); setMobileOpen(false); }}>Sign up</Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
