"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  ControlledDatePicker,
  ControlledTextarea,
  ControlledTextField,
  Select,
  Separator,
} from "common/components";
import { useState } from "react";
import { City, Country } from "country-state-city";
import s from "./generalInfo.module.css";

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
    .regex(/^[0-9A-Za-zА-Яа-я!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]+$/)
    .optional(),
});

export type GeneralInfoFormValues = z.infer<typeof generalInfoSchema>;

export const GeneralInfo = () => {
  const { control, handleSubmit, formState, reset, setError } = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    mode: "onTouched",
  });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

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
    alert(JSON.stringify(data));
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
        <div className={s.countryCitySelect}>
          <Select
            items={countries}
            label={"Select your country"}
            name={"country"}
            onValueChange={(value) => {
              setSelectedCountry(value);
              setSelectedCity(null);
            }}
            defaultValue={countries[0].value}
            className={s.select}
          />
          <Select
            items={cities || []}
            label={"Select your city"}
            name={"city"}
            onValueChange={setSelectedCity}
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
