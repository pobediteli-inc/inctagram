import React from "react";
import stl from "../terms.module.css";
import { Typography } from "common/components/typography/typography";
import { Button } from "common/components/button/button";
import ArrowBackOutline from "assets/icons/ArrowBackOutline";
import Link from "next/link";

export default function Service() {
  return (
    <div className={stl.termsWrapper}>
      <div className={stl.buttonWrapper}>
        <Link href={"/"}>
          <Typography variant={"regular_14"} className={stl.svgArrow}>
            <ArrowBackOutline width={24} height={24} />
          </Typography>
        </Link>
        <Button variant={"outlined"} className={stl.backButton} asChild>
          <Link href={"/"}>
            <Typography variant={"regular_14"}>Back to Sign Up</Typography>
          </Link>
        </Button>
      </div>
      <div className={stl.textWrapper}>
        <div className={stl.termText}>
          <Typography variant={"small"}>
            <Typography variant={"h3"} textAlign={"center"} className={stl.title}>
              Terms of Service
            </Typography>
            1. Introduction Welcome to our website! By accessing or using our services, you agree to be bound by these
            Terms of Service. If you do not agree with any part of these terms, please refrain from using our services.
            2. Use of Service 2.1. You agree to use our website solely for lawful purposes. 2.2. Posting content that
            infringes on copyright, promotes illegal activities, or contains harmful material is strictly prohibited. 3.
            User Responsibilities 3.1. You are responsible for maintaining the confidentiality of your account and
            password. 3.2. Any activity under your account is your responsibility. 4. Termination We reserve the right
            to suspend or terminate access to our services at our sole discretion, without prior notice, for any reason.
            5. Disclaimer of Warranties Our services are provided as\is without any guarantees or warranties. We do not
            ensure the accuracy, completeness, or reliability of any content. 6. Intellectual Property All content,
            including text, images, graphics, logos, and software, available on this website is the property of [Your
            Company Name] or its licensors and is protected by copyright and intellectual property laws. You may not
            reproduce, distribute, or create derivative works from this content without prior written consent. 7.
            Third-Party Links Our services may include links to third-party websites. We are not responsible for the
            content, policies, or practices of any third-party websites. Accessing these links is at your own risk. 8.
            Limitation of Liability To the fullest extent permitted by law, [Your Company Name] shall not be liable for
            any indirect, incidental, or consequential damages resulting from the use or inability to use our services.
            9. Governing Law These Terms of Service are governed by and construed in accordance with the laws of [Your
            Jurisdiction]. Any disputes shall be resolved in the courts of [Your Jurisdiction]. 10. Contact Information
            If you have any questions regarding these terms, please contact us at [your email address].
          </Typography>
        </div>
      </div>
    </div>
  );
}
