"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  ControlledDatePicker,
  ControlledTextarea,
  ControlledTextField,
  Separator,
  Typography,
} from "common/components";
import { useEffect, useState, useRef } from "react";
import s from "./generalInfo.module.css";
import Link from "next/link";
import { useGetProfileQuery, useUpdateProfileMutation } from "store/services/api/profile/profileApi";
import Image from "next/image";
import defaultImage from "public/icons/svg/image-outline-white.svg";
import { CloseOutline } from "assets/icons";
import { DeleteAvatarModal } from "./deleteAvatarModal/deleteAvatarModal";
import { useRouter } from "next/navigation";
import { handleProfileError } from "common/utils/handleProfileUpdateError";
import { ROUTES } from "common/constants/routes";
import { ControlledAsyncSelect } from "common/components/controlled/controlledAsyncSelect";
import { loadCities, loadCountries } from "common/utils/loadOptions";

const generalInfoSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(6)
    .max(30)
    .regex(/^[a-z\d\-_]+$/i, {
      message: "Usernames may only include letters, numbers, underscores (_), and hyphens (-).",
    }),
  firstName: z
    .string({
      required_error: "First Name is required.",
    })
    .min(1)
    .max(50)
    .regex(/^[A-Za-zА-Яа-яёЁ]+$/, {
      message: "First Name may only include letters",
    }),
  lastName: z
    .string({
      required_error: "Last Name is required.",
    })
    .min(1)
    .max(50)
    .regex(/^[A-Za-zА-Яа-яёЁ]+$/, {
      message: "Last Name may only include letters",
    }),
  dateOfBirth: z
    .date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), {
      message: "",
    })
    .optional(),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  city: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  aboutMe: z
    .string()
    .max(200)
    .regex(/^[0-9A-Za-zА-Яа-яёЁ\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]*$/)
    .optional(),
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;

export const GeneralInfo = () => {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">("success");
  const [isDeleteAvatarModalOpen, setIsDeleteAvatarModalOpen] = useState(false);
  const router = useRouter();
  const [showAgeError, setShowAgeError] = useState(false);
  const avatar = profile?.avatars[0];
  const initialValues = useRef<GeneralInfoFormValues | null>(null);

  const { control, handleSubmit, formState, reset, watch, getValues } = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      country: undefined,
      city: undefined,
      aboutMe: "",
    },
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("draftGeneralInfo");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      parsed.dateOfBirth = parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : undefined;
      reset(parsed);
      initialValues.current = parsed;

      if (
        parsed.dateOfBirth &&
        new Date(parsed.dateOfBirth) > new Date(new Date().setFullYear(new Date().getFullYear() - 13))
      ) {
        setShowAgeError(true);
      }
    } else if (profile) {
      const defaultValues = {
        username: profile.userName || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined,
        country: profile.country ? { label: profile.country, value: profile.country } : undefined,
        city: profile.city ? { label: profile.city, value: profile.city } : undefined,
        aboutMe: profile.aboutMe || "",
      };
      reset(defaultValues);
      initialValues.current = defaultValues;
    }
  }, [profile, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "dateOfBirth" && value.dateOfBirth) {
        const userAge = new Date().getFullYear() - new Date(value.dateOfBirth).getFullYear();
        if (userAge >= 13) {
          setShowAgeError(false);
        }
      }

      const currentValues = getValues();
      if (initialValues.current) {
        const textFields: (keyof GeneralInfoFormValues)[] = ["username", "firstName", "lastName", "aboutMe"];
        const hasTextChanges = textFields.some((field) => {
          const currentValue = currentValues[field];
          const initialValue = initialValues.current![field];
          return currentValue !== initialValue;
        });

        setHasChanges(hasTextChanges);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  const selectedCountry = watch("country");

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        userName: data.username,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        dateOfBirth: data.dateOfBirth || null,
        country: data.country?.label || null,
        city: data.city?.label || null,
        aboutMe: data.aboutMe || "",
      };

      await updateProfile(payload).unwrap();
      setAlertMessage("Your settings are saved!");
      setAlertVariant("success");
      localStorage.removeItem("draftGeneralInfo");
      initialValues.current = data;
      setHasChanges(false);
    } catch (err) {
      handleProfileError({ err, setAlertMessage, setAlertVariant, router });
    }
  });

  const openDeleteAvatarModalHandler = () => {
    setIsDeleteAvatarModalOpen(true);
  };
  const closeDeleteAvatarModalHandler = () => {
    setIsDeleteAvatarModalOpen(false);
  };
  const onCloseAlertHandler = () => {
    setAlertMessage(null);
  };

  const handlePolicyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const values = getValues();
    localStorage.setItem("draftGeneralInfo", JSON.stringify(values));
    router.push(ROUTES.policy);
  };

  return (
    <div className={s.container}>
      <div>
        <div className={s.avatarWrapper}>
          <Image
            src={avatar?.url || defaultImage}
            alt="Avatar"
            className={avatar ? s.avatar : s.defaultAvatar}
            width={192}
            height={192}
          />
          {avatar && (
            <div className={s.deletePhotoWrapper}>
              <CloseOutline className={s.deletePhotoButton} onClick={openDeleteAvatarModalHandler} />
            </div>
          )}
        </div>
        <Button variant={"outlined"} className={s.addPhotoButton} asChild>
          <Link href={ROUTES.uploadAvatar}>Add a Profile Photo</Link>
        </Button>
      </div>

      <form onSubmit={onSubmit} className={s.form}>
        <ControlledTextField name={"username"} control={control} label={"Username"} required />
        <ControlledTextField name={"firstName"} control={control} label={"First Name"} required />
        <ControlledTextField name={"lastName"} control={control} label={"Last Name"} required />
        <div className={s.datePickerWrapper}>
          <ControlledDatePicker
            name={"dateOfBirth"}
            control={control}
            label={"Date of birth"}
            captionLayout={"dropdown"}
            defaultMonth={new Date()}
            startMonth={new Date(1940, 1)}
            endMonth={new Date()}
          />
          {(formState.errors.dateOfBirth || showAgeError) && (
            <Typography variant="small" className={s.dateError}>
              A user under 13 cannot create a profile.&nbsp;
              <Link href={ROUTES.policy} className={s.link} onClick={handlePolicyClick}>
                Privacy Policy
              </Link>
            </Typography>
          )}
        </div>
        <div className={s.countryCitySelect}>
          <ControlledAsyncSelect
            control={control}
            name="country"
            label="Select your country"
            placeholder="Country"
            loadOptions={loadCountries()}
            className={s.select}
          />

          <ControlledAsyncSelect
            key={selectedCountry?.value ?? "no-country"}
            control={control}
            name="city"
            label="Select your city"
            placeholder="City"
            loadOptions={loadCities(selectedCountry?.value)}
            className={s.select}
            isDisabled={!selectedCountry}
          />
        </div>
        <ControlledTextarea control={control} name={"aboutMe"} title={"About me"} autoFocus={false} />
        <Separator className={s.separator} />
        <Button className={s.submit} disabled={!hasChanges || !formState.isValid} type={"submit"}>
          Save Changes
        </Button>
      </form>

      <DeleteAvatarModal open={isDeleteAvatarModalOpen} close={closeDeleteAvatarModalHandler} />

      {alertMessage && (
        <Alert variant={alertVariant} onClose={onCloseAlertHandler}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};
