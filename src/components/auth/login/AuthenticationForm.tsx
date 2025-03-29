"use client"

import type React from "react"

import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon"
import { EmailAddress, ForgetPassword, Login, Password, RememberMe, SignUp } from "../../../utils/constant"
import Link from "next/link"
import { type ChangeEvent, useState } from "react"
import { FormGroup, Input, Label } from "reactstrap"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const AuthenticationForm: React.FC = () => {
  const router = useRouter()

  const [showPassWord, setShowPassWord] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formValues
  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }
  const formSubmitHandle = async () => {
    // Check for admin credentials
    if (email === "admin@respire.com" && password === "admin123") {
      // Set admin cookies
      Cookies.set("adminEmail", email, { path: "/" })
      Cookies.set("adminPassword", password, { path: "/" })
      // For admin, directly route to admin page
      router.replace("/admin")
      return
    }

    const resp = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (resp.status === 200) {
      router.replace("/mid")
    } else {
      const message = await resp.json()
      toast.error(message)
    }
  }

  return (
    <form className="theme-form">
      <FormGroup>
        <Label>{EmailAddress}</Label>
        <Input type="email" required placeholder="Email" value={email} name="email" onChange={handleUserValue} />
        <DynamicFeatherIcon iconName="User" className="input-icon iw-20 ih-20" />
      </FormGroup>
      <FormGroup>
        <Label>{Password}</Label>
        <Input
          type={showPassWord ? "text" : "password"}
          placeholder="Password"
          onChange={handleUserValue}
          value={password}
          name="password"
        />
        <DynamicFeatherIcon
          iconName="Eye"
          className="input-icon iw-20 ih-20"
          onClick={() => setShowPassWord(!showPassWord)}
        />
      </FormGroup>
      <div className="bottom-sec">
        <div className="form-check checkbox_animated">
          <Input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            {RememberMe}
          </label>
        </div>
        <a href="#" className="forget-password">
          {ForgetPassword}
        </a>
      </div>
      <div className="btn-section">
        <a className="btn btn-solid btn-lg" onClick={formSubmitHandle}>
          {Login}
        </a>
        <Link href="/register" className="btn btn-solid btn-lg ms-auto">
          {SignUp}
        </Link>
      </div>
    </form>
  )
}

export default AuthenticationForm

