import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="text-muted-foreground mt-2">
            Oops! The page you're looking for doesn't exist.
          </p>
        </div>

        <Button asChild>
          <Link to="/plans">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
