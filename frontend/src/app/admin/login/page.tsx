"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface FloatingLabelInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  icon,
  isPassword = false
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type={inputType}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(value ? true : false)}
          className="pt-6 pb-2 h-14"
        />
        <label
          htmlFor={name}
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            isFocused || value
              ? "text-xs top-2 text-primary"
              : "text-base text-gray-400 top-4"
          }`}
        >
          {label}
        </label>
        {isPassword && (
          <button
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-0 bottom-0 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <motion.div
              key={showPassword ? "eye" : "eyeOff"}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.2 }}
            >
              {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
            </motion.div>
          </button>
        )}
        {icon && (
          <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdminLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email domain
    const validDomains = ["@ensigninfosecurity.com", "@dev.ensign@infosecurity.com"];
    const isValidEmail = validDomains.some(domain => formData.email.endsWith(domain));

    if (!isValidEmail) {
      setError("Invalid email domain. Please use your company email.");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, check if it's a demo account
      if (formData.email === "admin@ensigninfosecurity.com" && formData.password === "Admin123!") {
    
        console.log("Logged in successfully");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <Shield className="text-blue-600 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-blue-600">Insider Threat UI</h1>
        </div>
        <div className="text-center text-gray-600">
          <p>Administrator Access Portal</p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl overflow-hidden border-none">
          <CardContent className="p-8">
            <motion.form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <FloatingLabelInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FloatingLabelInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isPassword={true}
                />
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center"
                >
                  <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: isFormValid ? 1.03 : 1 }}
                whileTap={{ scale: isFormValid ? 0.97 : 1 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                  disabled={!isFormValid || loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-opacity-50 border-t-white rounded-full mr-2"
                      />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </motion.form>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center text-sm text-gray-500"
            >
              <p>
                Need assistance?{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Contact support
                </a>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 text-center text-sm text-gray-500"
      >
        <p>© 2025 Ensign InfoSecurity. All rights reserved.</p>
      </motion.div>
    </div>
  );
}