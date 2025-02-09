import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css"

export default function NewPassword() {
    return (
        <div className={s.newPasswordWrapper}>
            <Typography variant={'h1'} color={'light'} className={s.formTitle}>
                Create New Password
            </Typography>
            <div className={s.form}>
                <div className={s.inputWrapper}>
                    <TextField
                        textFieldClassName={s.password}
                        variant={"standard"}
                        type={"password"}
                        label={"New password"}
                        labelPosition={"top"}
                    />
                    <TextField
                        textFieldClassName={s.password}
                        variant={"standard"}
                        type={"password"}
                        label={"Password confirmation"}
                        labelPosition={"top"}
                    />    
                </div>
                <Typography variant={'regular_14'} className={s.text}>
                    Your password must be between 6 and 20 characters 
                </Typography>
                <div className={s.buttonsWrapper}>
                    <Button variant={"primary"} className={s.button}>
                        Create new password
                    </Button>
                </div>
            </div>
        </div>
    )
}
