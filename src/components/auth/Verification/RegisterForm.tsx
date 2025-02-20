import DynamicFeatherIcon from "@/Common/DynamicFeatherIcon";
import { FullName, Password } from "../../../utils/constant";
import Link from "next/link";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const [otp, setOtp] = React.useState("");

  const formSubmitHandle = async () => {
    const resp = await fetch(`/api/complete-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });

    if (resp.status === 200) {
      router.replace("/dashboard/feed");
    } else {
      const message = await resp.json();
      toast.error(message);
    }
  };


  return (
    <form className="theme-form">
      <FormGroup>
        <Input type="text"
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP" />
      </FormGroup>
      <div
        style={
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }
        }
      >
        <a onClick={formSubmitHandle} className="text-center btn btn-solid btn-lg">
          Verify
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
