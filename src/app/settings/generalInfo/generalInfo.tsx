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
} from "common/components";
import { useEffect, useState } from "react";
import { City, Country } from "country-state-city";
import s from "./generalInfo.module.css";
import { useGetProfileQuery, useUpdateProfileMutation } from "store/services/api/profile/profileApi";

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
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: "First Name may only include letters",
    }),
  lastName: z
    .string({
      required_error: "Last Name is required.",
    })
    .min(1)
    .max(50)
    .regex(/^[A-Za-zА-Яа-я]+$/, {
      message: "Last Name may only include letters",
    }),
  dateOfBirth: z.date().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  aboutMe: z
    .string()
    .max(200)
    .regex(/^[0-9A-Za-zА-Яа-я!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]*$/)
    .optional(),
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;

export const GeneralInfo = () => {
  const { data: profile } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertVariant, setAlertVariant] = useState<"success" | "danger">("success");

  const { control, handleSubmit, formState, reset, watch } = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    mode: "onTouched",
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
    if (profile) {
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
        aboutMe: data.aboutMe || null,
      };

      console.log(JSON.stringify(payload));

      await updateProfile(payload).unwrap();

      setAlertMessage("Your settings are saved!");
      setAlertVariant("success");
    } catch (error) {
      setAlertMessage("Error! Server is not available!");
      setAlertVariant("danger");
    }
  });

  const onCloseAlertHandle = () => setAlertMessage(null);

  return (
    <div className={s.container}>
      <div>photo block</div>
      <form onSubmit={onSubmit} className={s.form}>
        <ControlledTextField name={"username"} control={control} label={"Username"} />
        <ControlledTextField name={"firstName"} control={control} label={"First Name"} />
        <ControlledTextField name={"lastName"} control={control} label={"Last Name"} />
        <ControlledDatePicker
          name={"dateOfBirth"}
          control={control}
          label={"Date of birth"}
          captionLayout={"dropdown"}
          defaultMonth={new Date()}
          startMonth={new Date(1940, 1)}
          endMonth={new Date()}
        />
        <div className={s.countryCitySelect}>
          <ControlledSelect
            control={control}
            items={countries}
            label={"Select your country"}
            name={"country"}
            defaultValue={countries[0]?.value}
            className={s.select}
          />
          <ControlledSelect
            control={control}
            items={cities || []}
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

      {alertMessage && (
        <Alert variant={alertVariant} onClose={onCloseAlertHandle}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
};
