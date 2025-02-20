import { startVer } from "@/api/operations";
import RegisterPage from "./RegPage";

const Page = () => {

  startVer();

  return (
    <>
      <RegisterPage></RegisterPage>
    </>
  );
};

export default Page;

