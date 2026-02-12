import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getPlans, subscribePlan } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  _id: string;
  name: string;
  price: number;
  features: string[];
  durationDays: number;
}

export default function Plans() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await getPlans();
        console.log("plans", res.data);
        setPlans(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await subscribePlan(planId);

      toast({
        title: "Subscription successful!",
        description: "Your plan has been activated.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description:
          error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading plans...</div>;
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Choose your plan
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Simple, transparent pricing.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan._id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                {plan.durationDays} days validity
              </CardDescription>
              <div className="pt-2">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan._id)}
              >
                Subscribe
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
