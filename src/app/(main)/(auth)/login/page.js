"use client";

import AuthLayout from "@/components/(auth)/AuthLayout/AuthLayout";
import Button from "@/components/(auth)/Button/Button";
import FormField from "@/components/shared/FormField/FormField";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { authActions } from "@/reducers/authReducer";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const axios = useAxiosSecure();
  const { dispatch } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setCookie = (value) => {
    Cookies.set("auth", value, {
      expires: 7,
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post("/v1/login", {
          email: formData.email,
          password: formData.password,
        });

        const { data } = response;

        if (formData.rememberMe) {
          localStorage.setItem("user", JSON.stringify(data.data));
          setCookie(JSON.stringify(data.data));
        }

        dispatch({ type: authActions.LOGIN, payload: data.data });

        router.push("/profile");
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          form:
            error?.response?.data?.message ||
            "An error occurred while logging in. Please try again.",
        });
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form onSubmit={handleSubmit}>
        <FormField
          label="Email address"
          type="email"
          id="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <FormField
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/forgot-password"
            className="text-primary-600 hover:text-primary-500 text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {errors.form && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
            {errors.form}
          </div>
        )}

        <Button type="submit" className="box-border w-full">
          Sign in
        </Button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
