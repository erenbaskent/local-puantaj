import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useState } from "react";
import { loginApi } from "@/api/auth";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const showNotification = useUIStore((s) => s.showNotification);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const identifier = fd.get("identifier") as string;
    const password = fd.get("password") as string;
    setLoading(true);
    try {
      const { data } = await loginApi(identifier, password);
      
      setAuth(data.token, data.user);
      showNotification("Giriş başarılı", "success");

      navigate("/schedules", { replace: true });
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Giriş başarısız",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900 text-sm font-bold text-white">
            P
          </div>
          <CardTitle>Puantaj Paneli</CardTitle>
          <p className="text-sm text-stone-500">Hesabınıza giriş yapın</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="identifier">E-posta / Kullanıcı adı</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder="Kullanıcı adı veya Email"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Spinner size="sm" /> : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
