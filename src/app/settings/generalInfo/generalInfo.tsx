"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextarea,
  ControlledTextField,
  Separator,
  Typography,
} from "common/components";
import { useEffect, useState } from "react";
import { City, Country } from "country-state-city";
import s from "./generalInfo.module.css";
import Link from "next/link";
import { useGetProfileQuery, useUpdateProfileMutation } from "store/services/api/profile/profileApi";
import Image from "next/image";
import defaultImage from "public/icons/svg/image-outline-white.svg";
import { CloseOutline } from "assets/icons";
import { DeleteAvatarModal } from "./deleteAvatarModal/deleteAvatarModal";
import { useRouter } from "next/navigation";
import { handleProfileError } from "common/utils/handleProfileUpdateError";

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
  country: z.string().optional(),
  city: z.string().optional(),
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

  const { control, handleSubmit, formState, reset, watch, getValues } = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      country: "",
      city: "",
      aboutMe: "",
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("draftGeneralInfo");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      parsed.dateOfBirth = parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : undefined;
      reset(parsed);

      if (
        parsed.dateOfBirth &&
        new Date(parsed.dateOfBirth) > new Date(new Date().setFullYear(new Date().getFullYear() - 13))
      ) {
        setShowAgeError(true);
      }
    } else if (profile) {
      reset({
        username: profile.userName || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined,
        country: profile.country || "",
        city: profile.city || "",
        aboutMe: profile.aboutMe || "",
      });
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
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const selectedCountry = watch("country");

  const countries = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const cities = selectedCountry
    ? City.getCitiesOfCountry(selectedCountry)?.map((city) => ({
        value: `${city.name}-${city.stateCode}`,
        label: city.name,
      }))
    : [];

  const onSubmit = handleSubmit(async (data) => {
    try {
      const selectedCountryLabel = countries.find((country) => country.value === data.country)?.label;
      const selectedCityLabel = cities?.find((city) => city.value === data.city)?.label;

      const payload = {
        userName: data.username,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        dateOfBirth: data.dateOfBirth || null,
        country: selectedCountryLabel || null,
        city: selectedCityLabel || null,
        aboutMe: data.aboutMe || "",
      };

      await updateProfile(payload).unwrap();
      setAlertMessage("Your settings are saved!");
      setAlertVariant("success");
      localStorage.removeItem("draftGeneralInfo");
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
    router.push("/auth/terms/policy");
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
          <Link href={"/settings/uploadAvatar"}>Add a Profile Photo</Link>
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
              <Link href={"/auth/terms/policy"} className={s.link} onClick={handlePolicyClick}>
                Privacy Policy
              </Link>
            </Typography>
          )}
        </div>
        <div className={s.countryCitySelect}>
          <ControlledSelect
            control={control}
            items={countries}
            placeholder={"Country"}
            label={"Select your country"}
            name={"country"}
            defaultValue={countries[0]?.value}
            className={s.select}
          />
          <ControlledSelect
            control={control}
            items={cities || []}
            placeholder={"City"}
            label={"Select your city"}
            name={"city"}
            disabled={!selectedCountry}
            className={s.select}
          />
        </div>
        <ControlledTextarea control={control} name={"aboutMe"} title={"About me"} autoFocus={false} />
        <Separator className={s.separator} />
        <Button className={s.submit} disabled={!formState.isDirty || !formState.isValid} type={"submit"}>
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
