import React from "react";
import stl from "app/SingUp/Terms/Terms.module.css";
import { Typography } from "common/components/Typography/Typography";

export const Service = () => {
  return (
    <div className={stl.termsWrapper}>
      <Typography variant={"small"}>
        <Typography variant={"h3"}>Terms of Service</Typography>
        1. Introduction
        Welcome to our website! By accessing or using our services, you agree to be bound by these Terms of Service. If
        you do not agree with any part of these terms, please refrain from using our services.

        2. Use of Service
        2.1. You agree to use our website solely for lawful purposes.
        2.2. Posting content that infringes on copyright, promotes illegal activities, or contains harmful material is
        strictly prohibited.

        3. User Responsibilities
        3.1. You are responsible for maintaining the confidentiality of your account and password.
        3.2. Any activity under your account is your responsibility.

        4. Termination
        We reserve the right to suspend or terminate access to our services at our sole discretion, without prior
        notice, for any reason.

        5. Disclaimer of Warranties
        Our services are provided "as is" without any guarantees or warranties. We do not ensure the accuracy,
        completeness, or reliability of any content.
      </Typography>
    </div>
  );
};
