"use client";

import React from "react";
import stl from "../terms.module.css";
import { Typography } from "common/components/typography/typography";
import { Button } from "common/components/button/button";
import ArrowBackOutline from "assets/icons/ArrowBackOutline";
import { useRouter } from "next/navigation";

export default function Policy() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={stl.termsWrapper}>
      <div className={stl.buttonWrapper}>
        <Button variant={"link"} className={stl.backButton} onClick={handleBack}>
          <ArrowBackOutline width={24} height={24} color={"var(--light-100)"} />
          <Typography variant={"regular_14"} color={"light"}>
            Back
          </Typography>
        </Button>
      </div>
      <div className={stl.textWrapper}>
        <Typography variant={"h3"} color={"light"} textAlign={"center"} style={{ marginBottom: 20 }}>
          Privacy Policy
        </Typography>
        <Typography variant={"small"} color={"light"} style={{ maxWidth: 400, width: "100%" }}>
          1. Introduction We value your privacy and are committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, and share your data. 2. Information We Collect 2.1. Personal Information:
          Name, email address, and other details you provide when using our services. 2.2. Usage Data: Information about
          how you interact with our website, such as pages visited and time spent on the site. 3. How We Use Your
          Information We use your information to improve our services, communicate with you, and ensure the security of
          our platform. 4. Sharing Your Information We do not share your personal information with third parties, except
          as required by law or to provide our services (e.g., payment processing). 5. Security We implement reasonable
          security measures to protect your data but cannot guarantee absolute security. 6. Changes to This Policy We
          may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated
          revision date. 7. Cookies and Tracking Technologies We use cookies and similar technologies to enhance your
          experience on our website, analyze site traffic, and personalize content. You can manage your cookie
          preferences through your browser settings. 8. Data Retention We retain your personal information only for as
          long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law. 9. Your
          Rights Depending on your jurisdiction, you may have the following rights regarding your personal data: The
          right to access the information we hold about you. The right to request correction or deletion of your data.
          The right to restrict or object to the processing of your data. The right to data portability. To exercise
          these rights, please contact us at [your email address]. 10. Children’s Privacy Our services are not intended
          for individuals under the age of 13. We do not knowingly collect personal information from children. If you
          believe that a child has provided us with personal information, please contact us, and we will take
          appropriate action.
        </Typography>
      </div>
    </div>
  );
}
