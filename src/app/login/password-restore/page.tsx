"use client"

import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css"
import Link from "next/link";
import { useState } from "react";
import { Cards } from "common/components/cards/cards";

export default function ForgotPassword() {
    const [linkSent, setLinkSent] = useState(false)

    return (
        <Cards>
            <Typography variant={'h1'} color={'light'} textAlign={'center'}>
                Forgot Password
            </Typography>
            <form className={s.form}>
                <TextField
                    textFieldClassName={s.email}
                    variant={"standard"}
                    type={"email"}
                    label={"Email"}
                />
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
                        <Button variant={"primary"} className={s.button} onClick={() => setLinkSent(false)}>
                            Send Link Again
                        </Button>
                        <Button variant={"link"} className={s.button} asChild>
                            <Link href={'/login'}>Back to Sign In</Link>
                        </Button>
                    </div>
                </>
                
                : 
                <div className={s.buttonsWrapper}>
                    <Button variant={"primary"} className={s.button} onClick={() => setLinkSent(true)}>
                        Send Link
                    </Button>
                    <Button variant={"link"} className={s.button} asChild>
                        <Link href={'/login'}>Back to Sign In</Link>
                    </Button>
                    <Button variant={"secondary"}>
                        Recaptcha
                    </Button>
                </div>
                }

            </form>
        </Cards>
    )
}
