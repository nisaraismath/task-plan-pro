import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  try {
    const res = await loginUser({
      email,
      password,
    });

    const token = res.data.token;

    localStorage.setItem("token", token);

    login(token);

    toast({
      title: "Welcome back!",
      description: "You have logged in successfully.",
    });

    navigate("/dashboard");

  } catch (error: any) {
    toast({
      title: "Login failed",
      description: error.response?.data?.message || "Invalid email or password.",
      variant: "destructive",
    });
  }
};

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@demo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <p className="text-xs text-muted-foreground">Demo: admin@demo.com / admin123</p>
          </CardContent>
          <CardFooter className="flex-col gap-3">
            <Button type="submit" className="w-full">Sign in</Button>
            <p className="text-sm text-muted-foreground">
              Don't have an account? <Link to="/register" className="text-primary underline-offset-4 hover:underline">Sign up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
