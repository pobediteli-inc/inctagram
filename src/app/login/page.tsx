import s from "./login.module.css";
import Link from "next/link";
import { Github, Google } from "assets/icons";
import { TextField, Button, Typography } from "common/components";

export default function Login() {
  return (
    <div className={s.loginWrapper}>
      <Typography variant={"h1"} className={s.signInHeader}>
        Sign In
      </Typography>
      <div className={s.socialIcons}>
        <Link href={"https://www.google.com"} target={"_blank"}>
          <Google width={36} height={36} />
        </Link>
        <Link href={"https://www.github.com"} target={"_blank"}>
          <Github width={36} height={36} color={"white"} />
        </Link>
      </div>
      <div className={s.mainContent}>
        <div className={s.fieldsWrapper}>
          <TextField variant={"standard"} type={"email"} placeholder={"example@example.com"} label={"Email"} />
          <TextField variant={"standard"} type={"password"} placeholder={"**********"} label={"Password"} />
        </div>
        <div className={s.buttonsWrapper}>
          <Typography variant={"regular_14"} textAlign={"right"} style={{ marginBottom: 25 }}>
            <Link href={"#"} className={s.forgotLink}>
              Forgot password?
            </Link>
          </Typography>
          <Button variant={"primary"}>Sign In</Button>
          <Typography variant={"regular_16"} textAlign={"center"} style={{ marginBottom: 5, marginTop: 15 }}>
            Don&#39;t have an account?
          </Typography>
          <Button variant={"link"} asChild>
            <Link href={"/"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
