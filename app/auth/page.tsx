"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import GlowingButton from "@/components/glowing-button"

// Country data with emoji flags and phone codes
const countries = [
  { code: "br", name: "Brasil", flag: "🇧🇷", phoneCode: "+55" },
  { code: "pt", name: "Portugal", flag: "🇵🇹", phoneCode: "+351" },
  { code: "us", name: "Estados Unidos", flag: "🇺🇸", phoneCode: "+1" },
  { code: "es", name: "Espanha", flag: "🇪🇸", phoneCode: "+34" },
  { code: "uk", name: "Reino Unido", flag: "🇬🇧", phoneCode: "+44" },
  { code: "de", name: "Alemanha", flag: "🇩🇪", phoneCode: "+49" },
  { code: "fr", name: "França", flag: "🇫🇷", phoneCode: "+33" },
  { code: "it", name: "Itália", flag: "🇮🇹", phoneCode: "+39" },
  { code: "jp", name: "Japão", flag: "🇯🇵", phoneCode: "+81" },
  { code: "cn", name: "China", flag: "🇨🇳", phoneCode: "+86" },
]

export default function AuthPage() {
  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  //Recovery Password
  const [stateLoginForm, setStateFormLogin] = useState("login")
  const [codeResetPassword, setCodeResetPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")



  // Register form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [country, setCountry] = useState("br")
  const [phoneCode, setPhoneCode] = useState("55")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [registerCurrency, setRegisterCurrency] = useState("brl") // Novo estado para currency
  const [registerPasswordConfirmation, setRegisterPasswordConfirmation] = useState("") // Novo estado para password_confirmation
  const [checkedForgot, setCheckedForgot] = useState(false) // Novo estado para checked_forgot
  const [confirmedCountry, setConfirmedCountry] = useState(false) // Novo estado para confirmed_country

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Check for hash fragment to determine active tab
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "")
      if (hash === "register" || hash === "login") {
        setActiveTab(hash)
      }
    }
  }, [])

  // Update phone code when country changes
  useEffect(() => {
    const selectedCountry = countries.find((c) => c.code === country)
    if (selectedCountry) {
      setPhoneCode(selectedCountry.phoneCode)
    }
  }, [country])

  // Format phone number as user types
  useEffect(() => {
    // Remove all non-numeric characters
    const numericValue = phoneNumber.replace(/\D/g, "")

    // Format the phone number
    let formatted = ""
    if (numericValue.length > 0) {
      // Add area code parentheses
      formatted = `(${numericValue.slice(0, 2)}`

      if (numericValue.length > 2) {
        // Add closing parenthesis and space
        formatted += `) ${numericValue.slice(2, 3)}`

        if (numericValue.length > 3) {
          // Add first part of number
          formatted += ` ${numericValue.slice(3, 7)}`

          if (numericValue.length > 7) {
            // Add hyphen and last part
            formatted += `-${numericValue.slice(7, 11)}`
          }
        }
      }
    }

    setFormattedPhoneNumber(formatted)
  }, [phoneNumber])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/\D/g, "")

    // Limit to 11 digits (2 for area code + 9 for number)
    if (value.length <= 11) {
      setPhoneNumber(value)
    }
  }

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) newErrors.firstName = "Nome é obrigatório"
    if (!lastName.trim()) newErrors.lastName = "Sobrenome é obrigatório"
    if (!registerEmail.trim()) {
      newErrors.registerEmail = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      newErrors.registerEmail = "Email inválido"
    }

    if (!registerPassword.trim()) {
      newErrors.registerPassword = "Senha é obrigatória"
    } else if (registerPassword.length < 6) {
      newErrors.registerPassword = "Senha deve ter pelo menos 6 caracteres"
    }

    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, "").length < 10) {
      newErrors.phoneNumber = "Telefone válido é obrigatório"
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "Você deve confirmar que tem 18 anos ou mais e aceitar os termos"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (validateRegisterForm()) {
      // Handle registration logic here
      console.log("Registration with:", {
        firstName,
        lastName,
        email: registerEmail,
        password: registerPassword,
        password_confirmation: registerPasswordConfirmation, // Adicionado
        country,
        currency: registerCurrency, // Adicionado
        ddi: phoneCode, // A formatação será feita na API
        phone: phoneNumber.replace(/\D/g, ""), // Mapeado phoneNumber para phone (apenas números)
        checked_forgot: checkedForgot, // Adicionado
        confirmed_country: confirmedCountry, // Adicionado
        agreeToTerms, // Mantido, embora não esteja na API, é para validação local
      })

      const apiUrl = "/api/register"

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: country,
            password: registerPassword,
            currency: registerCurrency,
            checked_forgot: checkedForgot,
            confirmed_country: confirmedCountry,
            ddi: phoneCode, // A formatação será feita na API
            phone: phoneNumber.replace(/\D/g, ""),
            password_confirmation: registerPasswordConfirmation,
            email: registerEmail,
          }),
        })

        const data = await response.json()

        if (response.ok) {
          window.location.href = "https://traderoom.asafebroker.com/auth/external/" + data.token // Redireciona para a página de login após o registro
          console.log("Registration successful:", data)
          // TODO: Handle successful registration (e.g., show success message, redirect)
        } else {
          //console.log("Registration failed:", data.errorDetails.errors)
          // TODO: Handle registration errors (e.g., display error messages from API)
          if(data.error) {
            setErrors(prevErrors => ({ ...prevErrors, general: data.error }));
          } else {
            if (data.errorDetails.errors) {
              const apiErrors: Record<string, string> = {};
              for (const key in data.errorDetails.errors) {
                console.log(key)
                if(key === "email") {
                  if(data.errorDetails.errors[key][0] == 'validation.unique') {
                    apiErrors.registerEmail = "Esse e-mail já está em uso. Tente outro.";
                  } else {
                    apiErrors.registerEmail = data.errorDetails.errors[key][0];
                  }
                }
                if(key === "password") {
                  if(data.errorDetails.errors[key][0] == 'validation.min.string') {
                    apiErrors.registerPassword = "A senha deve ter pelo menos 8 caracteres.";
                  } else if(data.errorDetails.errors[key][0] == 'validation.regex') {
                    apiErrors.registerPassword = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.";
                  } else {
                    apiErrors.registerPassword = data.errorDetails.errors[key][0];
                  }
                }
                /*
                if (data.errorDetails.errors[key] && data.errorDetails.errors[key].length > 0) {
                  // Assuming the API returns an array of error messages for each field
                  apiErrors[key] = data.errorDetails.errors[key][0];
                }
                */
              }
              setErrors(prevErrors => ({ ...prevErrors, ...apiErrors }));
            } else if (data.message) {
               // Handle general error message
               setErrors(prevErrors => ({ ...prevErrors, general: data.message }));
            }
          }
        }
      } catch (error) {
        console.error("Error during registration:", error)
        // TODO: Handle network or other unexpected errors
         setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar registrar. Tente novamente." }));
      }
    }
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({}); // Limpa erros anteriores
    console.log("Login attempt with:", { email, password })

    const apiUrl = "/api/login" // Usando a rota de API local

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await response.json()

      console.log("Login response status:", response.status); // Log do status
      console.log("Login response data:", data); // Log dos dados da resposta

      if (response.ok) {
        console.log(data.url_access)
        window.location.href = data.url_access;
        console.log("Login successful:", data)
        // TODO: Handle successful login (e.g., store token, redirect)
      } else {
        console.error("Login failed:", data)
        // TODO: Handle login errors (e.g., display error message)
         if (data && data.errorDetails) { // Verifica se data e data.message existem
             setErrors(prevErrors => ({ ...prevErrors, general: data.errorDetails.message }));
          } else {
             setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar fazer login. Verifique suas credenciais." }));
          }
      }
    } catch (error) {
      console.error("Error during login:", error)
      // TODO: Handle network or other unexpected errors
       setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar fazer login. Tente novamente." }));
    }
  }

  const handlesendCodeSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setErrors({}); // Limpa erros anteriores
    console.log("Login attempt with:", { email })

    const apiUrl = "/api/recovery-password" // Usando a rota de API local

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email
        }),
      })

      const data = await response.json()

      console.log("Login response status:", response.status); // Log do status
      console.log("Login response data:", data); // Log dos dados da resposta

      if (response.ok) {
        setStateFormLogin('reset-password');
        // TODO: Handle successful login (e.g., store token, redirect)
      } else {
        console.error("Login failed:", data)
        // TODO: Handle login errors (e.g., display error message)
         if (data && data.errorDetails) { // Verifica se data e data.message existem
             setErrors(prevErrors => ({ ...prevErrors, general: data.errorDetails.message }));
          } else {
             setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar fazer login. Verifique suas credenciais." }));
          }
      }
    } catch (error) {
      console.error("Error during login:", error)
      // TODO: Handle network or other unexpected errors
       setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar fazer login. Tente novamente." }));
    }    
  }

  const handleResetPasswordSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setErrors({}); // Limpa erros anteriores
    console.log("Login attempt with:", { email })

    const apiUrl = "/api/reset-password" // Usando a rota de API local

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          code: codeResetPassword
        }),
      })

      const data = await response.json()

      console.log("Login response status:", response.status); // Log do status
      console.log("Login response data:", data); // Log dos dados da resposta

      if (response.ok) {
        setStateFormLogin('login');
        // TODO: Handle successful login (e.g., store token, redirect)
      } else {
        console.error("Login failed:", data)
        // TODO: Handle login errors (e.g., display error message)
         if (data && data.errorDetails) { // Verifica se data e data.message existem
             setErrors(prevErrors => ({ ...prevErrors, general: data.errorDetails.message }));
          } else {
             setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar fazer login. Verifique suas credenciais." }));
          }
      }
    } catch (error) {
      console.error("Error during login:", error)
      // TODO: Handle network or other unexpected errors
       setErrors(prevErrors => ({ ...prevErrors, general: "Ocorreu um erro ao tentar fazer login. Tente novamente." }));
    } 
  }  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="flex justify-center mb-8 w-full">
          <Image src="asafebroker/logomodelado_inverted.png" alt="ASAFE Broker" width={200} height={50} className="h-12 w-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 w-full"
        >
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrar-se</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              
              {stateLoginForm === 'login' ? (

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {errors.general && (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.general}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      href="#"
                      className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      rel="noopener noreferrer"
                      onClick={(e) => {e.preventDefault(); setStateFormLogin('send-code');}}
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <GlowingButton className="w-full">Entrar</GlowingButton>
                </div>
              </form>

              ) : stateLoginForm === 'send-code' ? (

              <form onSubmit={handlesendCodeSubmit} className="space-y-4">
                {errors.general && (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.general}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <GlowingButton className="w-full">Enviar Código</GlowingButton>
                </div>
              </form>

              ) : (

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                {errors.general && (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {errors.general}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <div className="relative">
                  <Input
                        id="codeReset"
                        type="text"
                        placeholder="999-999-999"
                        value={codeResetPassword}
                        onChange={(e) => setCodeResetPassword(e.target.value)}
                        required
                        className="text-center"
                      />
                  </div>
                </div>                
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Confirma Senha</Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <GlowingButton className="w-full">Alterar Senha</GlowingButton>
                </div>
              </form>
              
              )}

            </TabsContent>

            <TabsContent value="register">
              <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">Registrar-se</h2>
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                 {errors.general && (
                   <div className="text-red-500 text-sm flex items-center">
                     <AlertCircle className="h-4 w-4 mr-1" /> {errors.general}
                   </div>
                 )}
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Nome"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={errors.firstName && formSubmitted ? "border-red-500" : ""}
                      required
                    />
                    {errors.firstName && formSubmitted && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Sobrenome"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={errors.lastName && formSubmitted ? "border-red-500" : ""}
                      required
                    />
                    {errors.lastName && formSubmitted && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Select defaultValue="br" value={country} onValueChange={(value) => setCountry(value)}>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center">
                          <span className="mr-2 text-base">{countries.find((c) => c.code === country)?.flag}</span>
                          <span>{countries.find((c) => c.code === country)?.name}</span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <div className="flex items-center">
                              <span className="mr-2 text-base">{country.flag}</span>
                              <span>{country.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                    Certifique-se de que este é seu país de residência permanente
                  </p>

                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="E-mail"
                      className={`pl-10 ${errors.registerEmail && formSubmitted ? "border-red-500" : ""}`}
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                    {errors.registerEmail && formSubmitted && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.registerEmail}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      className={`pl-10 ${errors.registerPassword && formSubmitted ? "border-red-500" : ""}`}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {errors.registerPassword && formSubmitted && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.registerPassword}
                      </p>
                    )}
                  </div>

                  {/* Campo de Confirmação de Senha */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      id="register-password-confirmation"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirmar Senha"
                      className={`pl-10 ${errors.registerPasswordConfirmation && formSubmitted ? "border-red-500" : ""}`}
                      value={registerPasswordConfirmation}
                      onChange={(e) => setRegisterPasswordConfirmation(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    {errors.registerPasswordConfirmation && formSubmitted && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> {errors.registerPasswordConfirmation}
                      </p>
                    )}
                  </div>

                  {/* Campo de Moeda */}
                  <div className="relative">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select value={registerCurrency} onValueChange={(value) => setRegisterCurrency(value)}>
                      <SelectTrigger id="currency" className="w-full">
                        <span>{registerCurrency.toUpperCase()}</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brl">BRL</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campo de Telefone */}
                  <div className="flex">
                    <div className="w-1/4">
                      <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-10">
                        <span className="mr-1 text-base">{countries.find((c) => c.code === country)?.flag}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">+{phoneCode}</span>
                      </div>
                    </div>
                    <div className="w-3/4 ml-2">
                      <Input
                        id="phone"
                        type="text"
                        placeholder="(99) 9 9999-9999"
                        value={formattedPhoneNumber}
                        onChange={handlePhoneChange}
                        className={errors.phoneNumber && formSubmitted ? "border-red-500" : ""}
                        required
                      />
                      {errors.phoneNumber && formSubmitted && (
                        <p className="text-red-500 text-xs mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" /> {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Checkbox Confirmação de País */}
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="confirmed-country"
                      checked={confirmedCountry}
                      onCheckedChange={(checked) => setConfirmedCountry(checked as boolean)}
                      className={errors.confirmedCountry && formSubmitted ? "border-red-500" : ""}
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="confirmed-country"
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                           errors.confirmedCountry && formSubmitted ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                         }`}
                      >
                        Confirmo que este é meu país de residência permanente.
                      </label>
                    </div>
                  </div>
                  {errors.confirmedCountry && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1 ml-7 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {errors.confirmedCountry}
                    </p>
                  )}

                  {/* Checkbox Aceito receber comunicações */}
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="checked-forgot"
                      checked={checkedForgot}
                      onCheckedChange={(checked) => setCheckedForgot(checked as boolean)}
                      className={errors.checkedForgot && formSubmitted ? "border-red-500" : ""}
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="checked-forgot"
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                           errors.checkedForgot && formSubmitted ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                         }`}
                      >
                        Aceito receber comunicações e ofertas.
                      </label>
                    </div>
                  </div>
                  {errors.checkedForgot && formSubmitted && (
                    <p className="text-red-500 text-xs mt-1 ml-7 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {errors.checkedForgot}
                    </p>
                  )}

                  {/* Checkbox Termos e Condições */}
                  <div
                    className={`flex items-start space-x-2 pt-2 ${errors.agreeToTerms && formSubmitted ? "pb-6" : ""}`}
                  >
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      className={errors.agreeToTerms && formSubmitted ? "border-red-500" : ""}
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                           errors.agreeToTerms && formSubmitted ? "text-red-500" : "text-gray-700 dark:text-gray-300"
                         }`}
                      >
                        <span className="text-sm">
                          Confirmo que tenho 18 anos ou mais e aceito os{" "}
                          <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                            Termos e Condições
                          </Link>
                          , a{" "}
                          <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                            Política de Privacidade
                          </Link>{" "}
                          e a{" "}
                          <Link href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                            Política de Execução de Ordens
                          </Link>
                        </span>
                      </label>
                    </div>
                  </div>
                  {errors.agreeToTerms && formSubmitted && (
                    <p className="text-red-500 text-xs -mt-6 ml-7 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> {errors.agreeToTerms}
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <GlowingButton className="w-full">
                    Abrir uma conta gratis
                  </GlowingButton>
                </div>
               </form>
             </TabsContent>
           </Tabs>
         </motion.div>

         <div className="mt-8 w-full">
           <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4 text-sm text-yellow-800 dark:text-yellow-200">
             <p className="font-semibold mb-1">Aviso de risco:</p>
             <p>Toda negociação envolve risco. Apenas arrisque o capital que você está preparado para perder.</p>
           </div>
         </div>

         <div className="mt-6 text-center">
           <p className="text-sm text-gray-500 dark:text-gray-400">
             Precisa de ajuda?{" "}
             <a
               href="https://w.app/suporteasafe"
               target="_blank"
               className="text-blue-600 hover:underline dark:text-blue-400"
               rel="noopener noreferrer"
             >
               Fale com o suporte
             </a>
           </p>
         </div>
       </div>
       <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 w-full">
         © {new Date().getFullYear()} ASAFE Broker. Todos os direitos reservados.
       </div>
     </div>
   )
 }
