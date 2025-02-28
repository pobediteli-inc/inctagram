import s from "./page.module.css";
import SignUp from "app/signUp/page";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function Home() {
  return (
    <Provider store={store}>
      <main className={s.main}>
        <SignUp />
      </main>
      <footer className={s.footer}></footer>
    </Provider>
  );
}
