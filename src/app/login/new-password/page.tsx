import { Button, TextField, Typography } from "common/components";
import s from "./page.module.css"
import { Cards } from "common/components/cards/cards";

export default function NewPassword() {
    return (
        <Cards>
            <Typography variant={'h1'} color={'light'} textAlign={'center'}>
                Create New Password
            </Typography>
            <form className={s.form}>
                <div className={s.inputWrapper}>
                    <TextField
                        textFieldClassName={s.password}
                        variant={"standard"}
                        type={"password"}
                        label={"New password"}
                    />
                    <TextField
                        textFieldClassName={s.password}
                        variant={"standard"}
                        type={"password"}
                        label={"Password confirmation"}
                    />    
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
