"use client"

import { Button, Typography } from "common/components";
import Image from "next/image";
import s from './page.module.css'
import picture from './../../../../public/icons/svg/linkExpired.svg'
import { useState } from "react";
import { BaseModal } from "common/components/modal/baseModal/baseModal";

export default function LinkExpired() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const email = "epam@epam.com"

    return (
        <div className={s.linkExpiredWrapper}>
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
            <div className={s.container}>
                <Typography variant={'h1'} color={'light'}>
                    Email verification link expired
                </Typography>
                <Typography variant={'regular_16'} color={'light'} className={s.text}>
                    Looks like the verification link has expired. Not to worry, we can send the link again   
                </Typography>
                <div className={s.buttonWrapper}>
                    <Button variant={"primary"} className={s.button} onClick={() => setIsModalOpen(true)}>
                        Resend link
                    </Button>  
                </div>
            </div>
            <Image src={picture} alt="link expired picture" className={s.image}/>
        </div>
    )
}
