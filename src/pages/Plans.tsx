import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { plans } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Plans() {
  const { user, isAuthenticated, subscribeToPlan } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = (planId: typeof plans[number]["id"]) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    subscribeToPlan(planId);
    toast({ title: "Plan updated!", description: `You are now on the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.` });
    navigate("/dashboard");
  };

  return (
    <div className="container py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Choose your plan</h1>
        <p className="text-muted-foreground max-w-md mx-auto">Simple, transparent pricing. Pick the plan that fits your needs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const isCurrent = user?.plan === plan.id;
          return (
            <Card key={plan.id} className={cn("flex flex-col", plan.highlighted && "border-primary shadow-lg ring-1 ring-primary")}>
              {plan.highlighted && (
                <div className="bg-primary text-primary-foreground text-center text-xs font-semibold py-1 rounded-t-lg -mt-px -mx-px">Most Popular</div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  disabled={isCurrent}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {isCurrent ? "Current Plan" : plan.price === 0 ? "Get Started" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
