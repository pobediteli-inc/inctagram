"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ControlledDatePicker,
  ControlledSelect,
  ControlledTextarea,
  ControlledTextField,
  Separator,
} from "common/components";
import { useEffect } from "react";
import { City, Country } from "country-state-city";
import s from "./generalInfo.module.css";
import { useGetProfileQuery } from "store/services/api/profile/profileApi";

const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const month = today.getMonth();
  const birthMonth = dateOfBirth.getMonth();
  const day = today.getDate();
  const birthDay = dateOfBirth.getDate();

  if (month < birthMonth || (month === birthMonth && day < birthDay)) {
    return age - 1;
  }
  console.log("age: ", age);
  return age;
};

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
  dateOfBirth: z.coerce
    .date()
    .refine(
      (date) => {
        console.log("Checking date:", date);
        if (isNaN(date.getTime())) {
          return false;
        }
        return calculateAge(date) >= 13;
      },
      {
        message: "A user under 13 cannot create a profile. Privacy Policy",
      }
    )
    .optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  aboutMe: z
    .string()
    .max(200)
    .regex(/^[0-9A-Za-zА-Яа-я\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]*$/)
    .optional(),
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;

export const GeneralInfo = () => {
  const { data: profile } = useGetProfileQuery();

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

  const onSubmit = handleSubmit((data) => {
    const selectedCountry = countries.find((country) => country.value === data.country)?.label;

    const selectedCity = cities?.find((city) => city.value === data.city)?.label;

    const transformedData = {
      ...data,
      country: selectedCountry || data.country,
      city: selectedCity || data.city,
    };

    alert(JSON.stringify(transformedData));
  });

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
        {formState.errors.dateOfBirth && <p style={{ color: "red" }}>{formState.errors.dateOfBirth.message}</p>}
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
    </div>
  );
};
