"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import "@/styles/login-effects.css";

export function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Xóa lỗi khi user bắt đầu nhập lại
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
    });

    if (!res?.ok) {
      // toast.error("Thông tin đăng nhập chưa chính xác");
      setError("Thông tin đăng nhập chưa chính xác");
      setLoading(false);
      return;
    }

    toast.success("Đăng nhập thành công");
    router.push("/");
  };

  return (
    <div className="relative z-10 w-full max-w-sm">
      <Card className="relative overflow-hidden">

        {/* Glow nền card */}
        <div className="sv-card-glow"></div>

        <CardHeader className="text-center relative z-10">
          {/* Logo hiệu ứng */}
          <div className="sv-logo-center-small mb-4">
            <img src="/smileviet.svg" className="sv-logo" />
            <div className="sv-shine"></div>
          </div>

          <CardTitle className="text-xl">
            Phần mềm quản lý tour
          </CardTitle>
        </CardHeader>

        {/* Hiện lỗi dưới title (mềm mại và đẹp) */}
        {/* {error && (
          <div className="px-6 pb-0 relative z-20 animate-fade-in">
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi đăng nhập</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )} */}

        {error && (
          <div className="px-6 pb-0 relative z-20">
            <div className="sv-alert">
              <div className="sv-alert-icon">
                <AlertCircle className="h-4 w-4 text-[#8a5f2d]" />
              </div>

              <div>
                <div className="sv-alert-title">Lỗi đăng nhập</div>
                <div className="sv-alert-desc">{error}</div>
              </div>
            </div>
          </div>
        )}



        <CardContent className="relative z-10 mt-2">
          <form onSubmit={handleLogin} className="grid gap-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Tài khoản</FieldLabel>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full text-white" disabled={loading}>
                  {loading ? "Đang xử lý..." : "Đăng nhập"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
