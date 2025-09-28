import { Meta, StoryObj } from "@storybook/react";
import { ReCaptcha } from "./recaptcha";
import "app/globals.css";
import process from "process";

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const meta: Meta<typeof ReCaptcha> = {
  title: "Components/ReCaptcha",
  component: ReCaptcha,
  argTypes: {
    siteKey: {
      description: "Google reCAPTCHA site key",
      control: "text",
    },
    error: {
      description: "Indicates if an error message should be shown",
      control: "boolean",
    },
  },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ReCaptcha>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    siteKey: siteKey,
    error: false,
  },
};

export const WithError: Story = {
  args: {
    siteKey: siteKey,
    error: true,
  },
};
