import styles from "./Header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <div className={styles.header}>
      <div>Inctagram</div>
      <div className={styles.bellAndSelect}>
        <Image src="/outlinebell.png"
               alt={"bell"}
               width={26}
               height={26}
        />
        <Image src="/selectbox.png"
               alt={"selectbox"}
               width={164}
               height={36}
        />
      </div>
    </div>
  )
}