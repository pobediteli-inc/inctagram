"use client";

import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { Card } from "common/components/card/card";
import ReCaptcha from "common/components/recaptcha/recaptcha";
import { BaseModal } from "common/components/modal/baseModal/baseModal";
import { useForm } from "react-hook-form";

type Inputs = {
    email: string
    recaptcha: boolean
}

export default function ForgotPassword() {
    const [linkSent, setLinkSent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [captchaError, setCaptchaError] = useState(true)
    const { register, handleSubmit, formState: { errors, isSubmitted }, watch } = useForm<Inputs>()
    const email = watch('email')

    const onSubmit = (data: any) => {
        if (captchaError) {
            setCaptchaError(true)
            return
        }
        setLinkSent(true)
        setIsModalOpen(true)
    }

    const handleCaptcha = (value: any) => {
        if (value) {
            setCaptchaError(false)
        } else {
            setCaptchaError(true)
        }
    }

    return (
        <Card className={s.card}>
            <BaseModal open={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle="Email sent">
                <div className={s.modalContainer}>
                    <Typography variant={'regular_16'} color={'light'}>
                        We have sent a link to confirm your email to {email}
                    </Typography>
                    <Button variant={'primary'} onClick={() => setIsModalOpen(false)} className={s.modalButton}>
                        OK
                    </Button>    
                </div>     
            </BaseModal>
            <Typography variant={'h1'} color={'light'} textAlign={'center'}>
                Forgot Password
            </Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        textFieldClassName={errors.email ? s.errorEmail : s.email}
                        variant={"standard"}
                        type={"email"}
                        label={"Email"}
                        {...register("email", {
                            required: "Email is required",   
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Please enter a valid email'
                            }
                        })}
                    />
                    {isSubmitted && errors.email && (
                    <Typography variant={'regular_14'} color={'error'}>
                        {errors.email.message}
                    </Typography>
                    )}    
                </div>
                
                <Typography variant={'regular_14'} className={s.text} color={'dark'}>
                    Enter your email address and we will send you further instructions 
                </Typography>

                {linkSent 
                ? 
                <>
                    <Typography variant={'regular_14'} color={'light'} className={s.otherText}>
                        The link has been sent by email.
                        <br/>
                        If you don’t receive an email send link again 
                    </Typography>
                    <div className={s.buttonsWrapper}>
                        <Button variant={"primary"} className={s.button}>
                            Send Link Again
                        </Button>
                        <Button variant={"link"} className={s.button} asChild>
                            <Link href={'/login'}>Back to Sign In</Link>
                        </Button>
                    </div>
                </>
                
                : 
                <div className={s.buttonsWrapper}>
                    <Button variant={"primary"} className={s.button}>
                        Send Link
                    </Button>
                    <Button variant={"link"} className={s.button} asChild>
                        <Link href={'/login'}>Back to Sign In</Link>
                    </Button>
                    <ReCaptcha sitekey="6LdHxG4qAAAAAPKRxEHrlV5VvLFHIf2BO5NMI8YM" onVerify={handleCaptcha} error={isSubmitted && captchaError}/>
                </div>
                }

            </form>      
        </Card>
    )
}
