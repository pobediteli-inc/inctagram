import { Button, Typography } from "common/components";
import Link from "next/link";
import Image from "next/image";
import bro from "../../../assets/bro.png";
import s from "./success.module.css";

export default function Success() {
  return (
    <div className={s.wrapper}>
      <Typography variant={"h1"} color={"light"} textAlign={"center"} className={s.congratulations}>
        Congratulations!
      </Typography>
      <Typography variant={"regular_16"} color={"light"} textAlign={"center"} className={s.message}>
        Your email has been confirmed
      </Typography>
      <Button asChild variant={"primary"} className={s.button}>
        <Link href={"../../login"}>Sign In</Link>
      </Button>
      <Image src={bro} width={432} height={300} alt="Picture of the user" />
    </div>
  );
}
