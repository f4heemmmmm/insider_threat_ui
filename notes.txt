"use client";

// Import Statements
import bcrypt from "bcryptjs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

// TypeScript interfaces
interface FloatingLabelInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

// Custom FloatingLabelInput component
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={showPassword ? "eye" : "eyeOff"}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                transition={{ duration: 0.2 }}
              >
                {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
              </motion.div>
            </AnimatePresence>
          </button>
        )}
        {icon && <div className="absolute right-3 top-0 bottom-0 flex items-center justify-center text-gray-400">{icon}</div>}
      </div>
    </div>
  );
};

export default function SignUp() {
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    });

    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [matchPassword, setMatchPassword] = useState<boolean>(true);
    const [validEmail, setValidEmail] = useState<boolean>(true);

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setValidPassword(regex.test(password));
    };

    const validateEmail = (email: string) => {
        const validDomains = ["@ensigninfosecurity.com", "@dev.ensign@infosecurity.com"];
        return validDomains.some(domain => email.endsWith(domain));
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === "email") {
            setValidEmail(value === "" || validateEmail(value));
        }
        if (name === "password") {
            validatePassword(value);
            setMatchPassword(value === formData.confirmPassword || formData.confirmPassword === "");
        }
        if (name === "confirmPassword") {
            setMatchPassword(value === formData.password);
        }
    };

    const canProceedToStep2 = formData.email && formData.firstName && formData.lastName && validEmail;

    // Animation variants for page transitions
    const pageVariants = {
        initial: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 14
            }
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            transition: {
                duration: 0.4
            }
        })
    };

    // Track direction of transition
    const [direction, setDirection] = useState<number>(1);

    const goToNextStep = () => {
        setDirection(1);
        setStep(2);
    };

    const goToPrevStep = () => {
        setDirection(-1);
        setStep(1);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-xl bg-white rounded-2xl overflow-hidden">
                <CardContent>
                    <motion.h2 
                        className="text-2xl font-bold text-center text-gray-900 mb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={step}
                    >
                        {step === 1 ? "Administrator Registration" : "Account Setup"}
                    </motion.h2>
                    
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                            key={step}
                            custom={direction}
                            variants={pageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {step === 1 ? (
                                <div className="space-y-4">
                                    <FloatingLabelInput 
                                      label="Email" 
                                      type="email" 
                                      name="email" 
                                      value={formData.email} 
                                      onChange={handleChange} 
                                    />
                                    {!validEmail && formData.email.length > 0 && (
                                        <motion.p 
                                            className="text-red-500 text-sm" 
                                            initial={{ opacity: 0, height: 0 }} 
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Email must end with @ensigninfosecurity.com or @dev.ensign@infosecurity.com
                                        </motion.p>
                                    )}
                                    <FloatingLabelInput 
                                      label="First Name" 
                                      type="text" 
                                      name="firstName" 
                                      value={formData.firstName} 
                                      onChange={handleChange} 
                                    />
                                    <FloatingLabelInput 
                                      label="Last Name" 
                                      type="text" 
                                      name="lastName" 
                                      value={formData.lastName} 
                                      onChange={handleChange} 
                                    />
                                    <motion.div
                                        whileHover={{ scale: canProceedToStep2 ? 1.02 : 1 }}
                                        whileTap={{ scale: canProceedToStep2 ? 0.98 : 1 }}
                                    >
                                        <Button 
                                          className="w-full" 
                                          onClick={goToNextStep}
                                          disabled={!canProceedToStep2}
                                        >
                                          Continue
                                        </Button>
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <FloatingLabelInput 
                                      label="Enter password" 
                                      type="password" 
                                      name="password" 
                                      value={formData.password} 
                                      onChange={handleChange} 
                                      isPassword={true}
                                    />
                                    <FloatingLabelInput 
                                      label="Confirm password" 
                                      type="password" 
                                      name="confirmPassword" 
                                      value={formData.confirmPassword} 
                                      onChange={handleChange} 
                                      isPassword={true}
                                    />
                                    {!validPassword && formData.password.length > 0 && (
                                        <motion.p 
                                            className="text-red-500 text-sm" 
                                            initial={{ opacity: 0, height: 0 }} 
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Password must be at least 8 characters long and include uppercase, lowercase, number, and a symbol.
                                        </motion.p>
                                    )}
                                    {!matchPassword && formData.confirmPassword.length > 0 && (
                                        <motion.p 
                                            className="text-red-500 text-sm" 
                                            initial={{ opacity: 0, height: 0 }} 
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Passwords do not match.
                                        </motion.p>
                                    )}
                                    <div className="flex justify-between">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Button variant="outline" onClick={goToPrevStep}>Back</Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: validPassword && matchPassword ? 1.05 : 1 }}
                                            whileTap={{ scale: validPassword && matchPassword ? 0.95 : 1 }}
                                        >
                                            <Button disabled={!validPassword || !matchPassword}>Register</Button>
                                        </motion.div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
}