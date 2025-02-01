import stl from "./login.module.css";
import { Typography } from "common/components/typography/typography";
import Link from "next/link";
import GoogleSvgRepoCom1 from "assets/icons/GoogleSvgRepoCom1";
import GithubSvgRepoCom31 from "assets/icons/GithubSvgRepoCom31";
import { TextField } from "common/components/textField/textField";
import { Button } from "common/components/button/button";

export default function Login() {
  return (
    <div className={stl.loginWrapper}>
      <Typography variant={"h1"} className={stl.signInHeader}>
        Sign In
      </Typography>
      <div className={stl.socialIcons}>
        <Link href={"https://www.google.com"} target={"_blank"}>
          <GoogleSvgRepoCom1 width={36} height={36} />
        </Link>
        <Link href={"https://www.github.com"} target={"_blank"}>
          <GithubSvgRepoCom31 width={36} height={36} color={"white"} />
        </Link>
      </div>
      <div className={stl.forms}>
        <div className={stl.fieldWrapper}>
          <TextField
            textFieldClassName={stl.email}
            variant={"standard"}
            type={"email"}
            placeholder={"example@example.com"}
            label={"Email"}
            labelPosition={"top"}
          />
          <TextField
            textFieldClassName={stl.password}
            variant={"standard"}
            type={"password"}
            placeholder={"**********"}
            label={"Password"}
            labelPosition={"top"}
          />
        </div>
      </div>
      <div className={stl.buttonsWrapper}>
        <Typography variant={"regular_14"} className={stl.forgotPassword}>
          <Link href={"#"} className={stl.forgotLink}>
            Forgot password?
          </Link>
        </Typography>
        <div className={stl.buttonWrapper}>
          <Button variant={"primary"} className={stl.signInButton}>
            Sign In
          </Button>
        </div>
        <Typography variant={"regular_16"}>Don&#39;t have an account?</Typography>
        <div className={stl.buttonWrapper}>
          <Button variant={"outlined"} className={stl.signInButton} asChild>
            <Link href={"/"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
