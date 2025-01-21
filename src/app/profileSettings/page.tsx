import Image from "next/image"
import s from "./page.module.css"

export const ProfileSettings = () => {
    return (
        <>
        <div className={s.container}>
        <div className={s.menu}>
            <ul className={s.ul}>
                <li>General information</li>
                <li>Devices</li>
                <li>Account Management</li>
                <li>My payments</li>
            </ul>
        </div>
        <form>
            <div className={s.infoWrapper}>
            <div className={s.avatarWrapper}>
                <Image
                    src="/profile-picture.jpg"
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                />
                <p>Avatar</p>
                <button className={s.button}>Add a Profile Photo</button>
            </div>
            <div className={s.inputWrapper}>
                <label>Username</label>
                <input className={s.input}></input>
                <label>First Name</label>
                <input className={s.input}></input>
                <label>Last Name</label>
                <input className={s.input}></input>
                <label>Date of birth</label>
                <input className={s.input} type="date"></input>
                <div className={s.selectWrapper}>
                    <div className={s.select}>
                        <label>Select your country</label>
                        <select className={s.select}>
                            <option>Country</option>
                            <option>Russia</option>
                            <option>USA</option>
                        </select>    
                    </div>
                    <div className={s.select}>
                        <label>Select your city</label>
                        <select className={s.select}>
                            <option>City</option>
                            <option>Moscow</option>
                            <option>Los Angeles</option>
                        </select>    
                    </div>  
                </div>
                <label>About me</label>
                <textarea className={s.input}></textarea>
            </div>
            </div>
            <hr className={s.hr}/>
            <div className={s.buttonWrapper}>
                <button type="submit" className={s.button}>Save Changes</button>    
            </div>       
        </form>
        </div>
        </>
    )
}