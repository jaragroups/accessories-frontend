"use client";

import AuthLayout from "@/components/(auth)/AuthLayout/AuthLayout";
import Button from "@/components/(auth)/Button/Button";
import FormField from "@/components/shared/FormField/FormField";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    customerType: "customer",
    confirmPassword: "",
    agreeToTerms: true,
  });

  const [errors, setErrors] = useState({});
  const axios = useAxiosSecure();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

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

    if (!formData.fname.trim()) {
      newErrors.name = "First name is required";
    }
    if (!formData.lname.trim()) {
      newErrors.name = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (validateForm()) {
      const data = {
        first_name: formData.fname,
        last_name: formData.lname,
        email: formData.email,
        password: formData.password,
        customer_type: formData.customerType,
      };

      try {
        const res = await axios.post("/v1/register", data);

        if (res.status === 201 && res.data?.status === "success") {
          router.push("/login");
          toast.success("Registration successful! Please log in.");
        } else {
          setErrors({ form: "Something went wrong! Please try again." });
        }
      } catch (error) {
        setErrors({ form: error?.response?.data?.message });
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to get started with Micropack"
    >
      <form onSubmit={handleSubmit}>
        <FormField
          label="First name"
          type="text"
          id="fname"
          placeholder="John"
          value={formData.fname}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <FormField
          label="Last name"
          type="text"
          id="lname"
          placeholder="Doe"
          value={formData.lname}
          onChange={handleChange}
          error={errors.name}
          required
        />

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

        <FormField
          label="Confirm password"
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <div>
          <label
            htmlFor={"customerType"}
            className="mb-1 block w-full text-sm font-medium text-gray-700"
          >
            Customer Type <span className="text-red-500">*</span>
          </label>

          <select
            name="customerType"
            id="customerType"
            value={formData.customerType}
            onChange={handleChange}
            className="w-[91.5%] rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-500"
          >
            <option value="customer">Customer</option>
            <option value="partner">Partner</option>
          </select>
        </div>

        <div className="mt-5 mb-6">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </a>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-red-500">{errors.agreeToTerms}</p>
              )}
            </div>
          </div>
        </div>

        {errors?.form && (
          <div className="my-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
            {errors.form}
          </div>
        )}

        <Button type="submit" variant="primary" className="box-border w-full">
          Create account
        </Button>

        {/* <SocialLogin providers={socialProviders} /> */}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
