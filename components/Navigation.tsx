import { getSession } from "@auth0/nextjs-auth0";

import styles from "./Navigation.module.css";

export default async function Navigation() {
  const session = await getSession();

  return (
    <nav className={styles["nav"]}>
      <a className={styles["nav-btn"]} href="/">
        Home
      </a>
      {session ? (
        <div className={styles["nav-loggedin-container"]}>
          <a className={styles["nav-btn"]} href="/posts">
            Your posts
          </a>
          <a className={styles["nav-btn"]} href="/api/auth/logout">
            Logout
          </a>
        </div>
      ) : (
        <a className={styles["nav-btn"]} href="/api/auth/login">
          Login
        </a>
      )}
    </nav>
  );
}
