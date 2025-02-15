"use client"

import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css"
import Link from "next/link";
import { useState } from "react";
import { Cards } from "common/components/cards/cards";
import ReCaptcha from "common/components/recaptcha/recaptcha";
import { BaseModal } from "common/components/modal/baseModal/baseModal";

export default function ForgotPassword() {
    const [linkSent, setLinkSent] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Cards>
            <BaseModal open={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle="Email sent">
                <div className={s.modalContainer}>
                    <Typography variant={'regular_16'} color={'light'}>
                        We have sent a link to confirm your email to epam@epam.com
                    </Typography>
                    <Button variant={'primary'} onClick={() => setIsModalOpen(false)} className={s.modalButton}>
                        OK
                    </Button>    
                </div>     
            </BaseModal>
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
                        <Button variant={"primary"} className={s.button} type={'button'}>
                            Send Link Again
                        </Button>
                        <Button variant={"link"} className={s.button} asChild>
                            <Link href={'/login'}>Back to Sign In</Link>
                        </Button>
                    </div>
                </>
                
                : 
                <div className={s.buttonsWrapper}>
                    <Button variant={"primary"} className={s.button} onClick={() => {setLinkSent(true); setIsModalOpen(true)}}>
                        Send Link
                    </Button>
                    <Button variant={"link"} className={s.button} asChild>
                        <Link href={'/login'}>Back to Sign In</Link>
                    </Button>
                    <ReCaptcha sitekey="qwe123" onVerify={() => null} error={false}/>
                </div>
                }

            </form>      
        </Cards>
    )
}
