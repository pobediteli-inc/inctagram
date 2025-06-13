"use client";

import { Suspense } from "react";
import styles from "./page.module.css";

function FavoritesContent() {
  return <div className={styles.favorites}>Favorites</div>;
}

export default function Favorites() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FavoritesContent />
    </Suspense>
  );
}
