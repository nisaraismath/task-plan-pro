import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getMySubscription } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, CreditCard, CalendarDays } from "lucide-react";

interface Subscription {
  _id: string;
  startDate: string;
  endDate: string;
  status: string;
  planId: {
    name: string;
    price: number;
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getMySubscription();
        setSubscription(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (!user) return null;

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
              <CardTitle className="text-lg">
                User ID: {user.id}
              </CardTitle>
              <CardDescription>Role: {user.role}</CardDescription>
            </div>
          </CardHeader>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {subscription?.planId?.name ?? "No Active Plan"}
              </CardTitle>
              <CardDescription>
                ₹{subscription?.planId?.price ?? 0}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {loading ? (
              <p>Loading subscription...</p>
            ) : subscription ? (
              <>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium capitalize">
                    {subscription.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Started:</span>
                  <span>
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Expires:</span>
                  <span>
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                You have no active subscription.
              </p>
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
