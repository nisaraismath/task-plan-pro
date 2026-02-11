import { useAuth } from "@/contexts/AuthContext";
import { plans } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SubscriptionBadge } from "@/components/SubscriptionBadge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, CreditCard, CalendarDays } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const currentPlan = plans.find((p) => p.id === user.plan);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        {/* Profile */}
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Role:</span>
              <span className="capitalize font-medium">{user.role}</span>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{currentPlan?.name ?? "No Plan"}</CardTitle>
              <CardDescription>${currentPlan?.price ?? 0}/mo</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <SubscriptionBadge status={user.subscriptionStatus} />
            </div>
            {user.subscriptionStart && (
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Started:</span>
                <span>{user.subscriptionStart}</span>
              </div>
            )}
            {user.subscriptionExpiry && (
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Expires:</span>
                <span>{user.subscriptionExpiry}</span>
              </div>
            )}
            <Button asChild variant="outline" size="sm" className="mt-2">
              <Link to="/plans">Change Plan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
