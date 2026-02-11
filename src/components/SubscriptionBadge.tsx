import { Badge } from "@/components/ui/badge";
import type { SubscriptionStatus } from "@/lib/mock-data";

const statusConfig: Record<SubscriptionStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 hover:bg-emerald-500/20" },
  expired: { label: "Expired", className: "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20" },
  none: { label: "No Plan", className: "bg-muted text-muted-foreground border-border hover:bg-muted" },
};

export function SubscriptionBadge({ status }: { status: SubscriptionStatus }) {
  const config = statusConfig[status];
  return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
}
