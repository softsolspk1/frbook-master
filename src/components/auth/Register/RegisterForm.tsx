import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FullName, Password } from "../../../utils/constant";
import Link from "next/link";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassWord, setShowPassWord] = React.useState(false);

  const formSubmitHandle = async () => {
    const resp = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (resp.status === 200) {
      router.replace("/verification");
    } else {
      const message = await resp.json();
      toast.error(message);
    }
  };


  return (
    <form className="theme-form">
      <FormGroup>
        <Label>{FullName}</Label>
        <Input type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name" />
        <DynamicFeatherIcon
          iconName="User"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Input type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email" />
        <DynamicFeatherIcon
          iconName="Mail"
          className="input-icon iw-20 ih-20"
        />
      </FormGroup>
      <FormGroup>
        <Label>{Password}</Label>
        <Input autoComplete=""
          type={showPassWord ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" />
        <DynamicFeatherIcon iconName="Eye"
          onClick={() => setShowPassWord(!showPassWord)}
          className="input-icon iw-20 ih-20" />
      </FormGroup>
      <div className="bottom-sec">
        <div className="form-check checkbox_animated">
          <Input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            remember me
          </label>
        </div>
        <a href="#">forget password?</a>
      </div>
      <div className="btn-section">
        <a onClick={formSubmitHandle} className="btn btn-solid btn-lg">
          sign up
        </a>
        <Link href="/login" className="btn btn-solid btn-lg ms-auto">
          login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
