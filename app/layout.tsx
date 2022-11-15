import "../styles/globals.css";

import Link from "next/link";
import { ThemeChangerDropdown } from "../components/ThemeChangerDropdown";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="dark">
      <head />
      <body>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
          <div className="flex flex-col drawer-content">
            <header>
              <div className="navbar bg-base-300">
                <div className="flex-none lg:hidden">
                  <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className="flex-1 ">
                  <Link href="/" className="text-xl normal-case btn btn-ghost">
                    Realtime
                  </Link>
                </div>
                <div className="flex-1 hidden lg:block">
                  <ul className="p-0 menu menu-horizontal">
                    <li className="hidden lg:block">
                      <Link href="/emoji" className="text-xl normal-case">
                        Emoji
                      </Link>
                    </li>
                    <li className="hidden lg:block">
                      <Link href="/mover" className="text-xl normal-case">
                        Mover
                      </Link>
                    </li>
                  </ul>
                </div>
                <ThemeChangerDropdown />
                {/* <div className="flex-none hidden lg:block">
              {user ? (
                <div className="dropdown dropdown-end dropdown-hover">
                  <label tabIndex={0} className="m-1 btn btn-primary">
                    {user.name}
                  </label>
                  <ul
                    tabIndex={0}
                    className="p-2 shadow dropdown-content menu bg-primary rounded-box w-52"
                  >
                    <li>
                      <a onClick={() => drsAccount.deleteSessions()}>Logout</a>
                    </li>
                  </ul>
                </div>
              ) : (
                <a
                  className="btn btn-primary"
                  onClick={() => drsAccount.createSession()}
                >
                  Login
                </a>
              )}
            </div> */}
              </div>
            </header>
            <main className="flex-1">
              <>{children}</>
            </main>
            <footer className="p-10 footer bg-neutral text-neutral-content">
              <div>
                <span className="footer-title">Appwrite</span>
                <a className="link link-hover" href="https://appwrite.io/docs">
                  Docs
                </a>
                <a
                  className="link link-hover"
                  href="https://github.com/appwrite/appwrites"
                >
                  Appwrite Repo
                </a>
              </div>
            </footer>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <ul className="p-4 overflow-y-auto menu w-80 bg-base-100">
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
