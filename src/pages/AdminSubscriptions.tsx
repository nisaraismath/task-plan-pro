import { useEffect, useState } from "react";
import { getAllSubscriptions } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Subscription {
  _id: string;
  status: string;
  startDate: string;
  endDate: string;
  userId: {
    name: string;
    email: string;
  };
  planId: {
    name: string;
    price: number;
  };
}

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await getAllSubscriptions();
        setSubscriptions(res.data);
      } catch (error: any) {
        toast({
          title: "Access denied",
          description:
            error.response?.data?.message || "Unauthorized",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [toast]);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">
        Admin – All Subscriptions
      </h1>

      {loading ? (
        <p>Loading subscriptions...</p>
      ) : subscriptions.length === 0 ? (
        <p className="text-muted-foreground">
          No subscriptions found.
        </p>
      ) : (
        <div className="grid gap-4">
          {subscriptions.map((sub) => (
            <Card key={sub._id}>
              <CardHeader>
                <CardTitle>
                  {sub.userId?.name} – {sub.planId?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p>
                  <strong>Email:</strong> {sub.userId?.email}
                </p>
                <p>
                  <strong>Plan Price:</strong> ₹{sub.planId?.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">
                    {sub.status}
                  </span>
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(sub.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {new Date(sub.endDate).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
