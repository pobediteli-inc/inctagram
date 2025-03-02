"use client"

import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css"
import { Cards } from "common/components/cards/cards";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Inputs = {
    password: string
    confirmPassword: string
}

export default function NewPassword() {
    const router = useRouter()
    const { register, handleSubmit, setError, formState: { errors, isSubmitted } } = useForm<Inputs>()
    const onSubmit = (data: Inputs) => {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", { type: "manual", message: "The passwords must match" })
            return
        }
        router.push("/login")
    }

    return (
        <Cards>
            <Typography variant={'h1'} color={'light'} textAlign={'center'}>
                Create New Password
            </Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={s.inputWrapper}>
                    <TextField
                        textFieldClassName={errors.password ? s.errorPassword : s.password}
                        variant={"standard"}
                        type={"password"}
                        label={"New password"}
                        {...register("password", {required: true, minLength: 6, maxLength: 20})}
                    />
                    <div>
                        <TextField
                            textFieldClassName={errors.confirmPassword ? s.errorPassword : s.password}
                            variant={"standard"}
                            type={"password"}
                            label={"Password confirmation"}
                            {...register("confirmPassword", {required: true, minLength: 6, maxLength: 20})}
                        />
                        {isSubmitted && errors.confirmPassword && (
                        <Typography variant={'regular_14'} color={'error'}>
                            {errors.confirmPassword.message}
                        </Typography>
                        )}    
                    </div>
                </div>
                <Typography variant={'regular_14'} color={'dark'} className={s.text}>
                    Your password must be between 6 and 20 characters 
                </Typography>
                <div className={s.buttonsWrapper}>
                    <Button variant={"primary"} className={s.button}>
                        Create new password
                    </Button>
                </div>
            </form>
        </Cards>
    )
}
