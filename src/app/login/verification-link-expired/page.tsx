import { Button, Typography } from "common/components";
import Image from "next/image";
import s from './page.module.css'
import picture from './../../../../public/icons/svg/linkExpired.svg'

export default function LinkExpired() {
    return (
        <div className={s.linkExpiredWrapper}>
            <div className={s.container}>
                <Typography variant={'h1'} color={'light'} className={''}>
                    Email verification link expired
                </Typography>
                <Typography variant={'regular_16'} color={'light'} className={s.text}>
                    Looks like the verification link has expired. Not to worry, we can send the link again   
                </Typography>
                <div className={s.buttonWrapper}>
                    <Button variant={"primary"} className={s.button}>
                        Resend link
                    </Button>  
                </div>
            </div>
            <Image src={picture} alt="link expired picture" className={s.image}/>
        </div>
    )
}
