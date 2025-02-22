"use client";

import s from "app/signUp/signUp.module.css";
import { Button, TextField, Typography } from "common/components";
import { Github, Google } from "assets/icons";
import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { Cards } from "../../common/components/cards/cards";

type FormValuesType = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  isAgree: boolean;
};

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isAgree: false,
    },
    onSubmit: (values: FormValuesType, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      setEmail(values.email);
      resetForm();
      setIsOpen(true);
    },
    validate: (values) => {
      if (!values.username) {
        return {
          username: "Username is required",
        };
      } else if (values.username.length < 6) {
        return {
          username: "Minimum number of characters 6",
        };
      } else if (values.username.length > 30) {
        return {
          username: "Maximum number of characters 30",
        };
      } else if (!/^[a-z\d]+$/i.test(values.username)) {
        return {
          username: "Invalid username (0-9; A-Z; a-z; _; -)",
        };
      }

      if (!values.email) {
        return {
          email: "Email is required",
        };
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {
          email: "The email must match the format example@example.com",
        };
      }

      if (!values.password) {
        return {
          password: "Password is required",
        };
      } else if (values.password.length < 6) {
        return {
          password: "Minimum number of characters 6",
        };
      } else if (values.password.length > 20) {
        return {
          password: "Maximum number of characters 20",
        };
      }

      if (values.password.toString() !== values.passwordConfirm.toString()) {
        return {
          passwordConfirm: "The passwords must match",
        };
      }

      if (!values.isAgree) {
        return {
          isAgree: "Agreement is required",
        };
      }
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const openPopup = () => {
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className={s.signUpWrapper}>
      <Typography variant={"h1"} className={s.signUpHeader}>
        Sign Up
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
        <form onSubmit={formik.handleSubmit}>
          <div className={s.forms}>
            <div className={s.form}>
              <TextField
                textFieldClassName={s.username}
                variant={"standard"}
                type={"text"}
                placeholder={"username"}
                label={"Username"}
                {...formik.getFieldProps("username")}
              />
              {formik.errors.username && formik.touched.username ? (
                <div className={s.errorMessage}>{formik.errors.username}</div>
              ) : null}
            </div>

            <div className={s.form}>
              <TextField
                textFieldClassName={s.email}
                variant={"standard"}
                type={"email"}
                placeholder={"example@example.com"}
                label={"Email"}
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className={s.errorMessage}>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className={s.form}>
              <TextField
                textFieldClassName={s.password}
                variant={"standard"}
                type={"password"}
                placeholder={"**********"}
                label={"Password"}
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <div className={s.errorMessage}>{formik.errors.password}</div>
              ) : null}
            </div>

            <div className={s.form}>
              <TextField
                textFieldClassName={s.password}
                variant={"standard"}
                type={"password"}
                placeholder={"**********"}
                label={"Confirm password"}
                {...formik.getFieldProps("passwordConfirm")}
              />
              {formik.errors.passwordConfirm && formik.touched.passwordConfirm ? (
                <div className={s.errorMessage}>{formik.errors.passwordConfirm}</div>
              ) : null}
            </div>
          </div>

          <div className={s.terms}>
            <label className={s.container}>
              <input name="isAgree" type="checkbox" checked={formik.values.isAgree} onChange={formik.handleChange} />
              <span className={s.checkmark}></span>
            </label>

            <Typography variant={"small"}>
              I agree to the{" "}
              <Link className={s.link} href={"/signUp/terms/service"}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className={s.link} href={"/signUp/terms/policy"}>
                Privacy Policy
              </Link>
            </Typography>
          </div>

          <div className={s.buttonWrapper}>
            <Button variant={"primary"} type="submit" disabled={!formik.dirty || !formik.isValid}>
              Sign Up
            </Button>
            <Typography className={s.isAccount} variant={"regular_16"} textAlign={"center"}>
              Do you have an account?
            </Typography>
            <Button asChild variant={"link"}>
              <Link href={"../login"}>Sign In</Link>
            </Button>
            {isOpen && (
              <div className={s.popupStyles}>
                <Cards>
                  <div className={s.popUpHeader}>
                    <Typography variant={"h1"} color={"light"}>
                      Email sent
                    </Typography>
                    <span className={s.closeBtn} onClick={closePopup}>
                      &times;
                    </span>
                  </div>
                  <div className={s.messageAndButton}>
                    <Typography variant={"regular_16"} color={"light"}>
                      We have sent a link to confirm your email to {email}
                    </Typography>
                    <Button onClick={closePopup}>OK</Button>
                  </div>
                </Cards>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
