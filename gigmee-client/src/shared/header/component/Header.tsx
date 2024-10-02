import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderModalProps, IHeader, IHeaderModalProps } from "src/shared/header/interfaces/header.interface";
import { IButtonProps } from "src/shared/shared.interface";
import { FaTimes } from "react-icons/fa";
import { IModalBgProps } from "src/shared/modals/interfaces/modal.interface";
import ForgotPassword from "src/features/auth/components/ForgotPassword";
import { saveToLocalStorage } from "src/shared/utils/utils.service";

const Button: LazyExoticComponent<FC<IButtonProps>> = lazy(
  () => import("src/shared/button/Button"),
);
const Login: LazyExoticComponent<FC<IModalBgProps>> = lazy(
  () => import("src/features/auth/components/Login"),
);

const Register: LazyExoticComponent<FC<IModalBgProps>> = lazy(
  () => import("src/features/auth/components/Register"),
);

const Header: FC<IHeader> = ({ navClass }): ReactElement => {

  const [showModal, setShowModal] = useState<HeaderModalProps>({
    login: false,
    register: false,
    forgotPassword: false,
  })
  return (
    <>
    {showModal.login && (
      <Login
        onClose={() => setShowModal((item: HeaderModalProps) => ({...item, login: false}))}
        onToggle={() => setShowModal((item: HeaderModalProps) => ({...item, login: false, register: true}))}
        onTogglePassword={() => setShowModal((item: HeaderModalProps) => ({...item, login: false, forgotPassword: true}))}
      />
    )}
    {showModal.register && (
      <Register
        onClose={() => setShowModal((item: HeaderModalProps) => ({...item, register: false}))}
        onToggle={() => setShowModal((item: HeaderModalProps) => ({...item, register: false, login: true}))}
      />
    )}
    {showModal.forgotPassword && (
      <ForgotPassword
        onClose={() => setShowModal((item: HeaderModalProps) => ({...item, forgotPassword: false}))}
        onToggle={() => setShowModal((item: HeaderModalProps) => ({...item, forgotPassword: false, login: true}))}
      />
    )}
      <header>
        <nav className={navClass}>
          <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
              <div className="flex w-full items-center justify-between lg:w-auto">
                <Link
                  to="/"
                  className="relative z-10 cursor-pointer text-3xl font-semibold text-white font-smythe"
                >
                  Gigmee
                </Link>
                <div className="peer-checked:hamburger relative z-20 -mr-6 mt-1 block cursor-pointer p-6 lg:hidden">
                  <Suspense>
                    <Button
                      className="m-auto h-5 w-5 rounded transition duration-300"
                      // onClick={() => setOpenSidebar(!openSidebar)}
                      label={<FaTimes className="h-6 w-6 text-green-500" />}
                    />
                  </Suspense>
                </div>
              </div>
              <div className="navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-7/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                  <ul className="space-y-6 text-base font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm">
                    <li>
                      <div
                        onClick={() => {
                          setShowModal((item: IHeaderModalProps) => ({
                            ...item,
                            register: true,
                          }));
                          saveToLocalStorage(
                            "becomeASeller",
                            JSON.stringify(true),
                          );
                        }}
                        className="hover:text-primary dark:hover:text-primaryLight block transition md:px-4"
                      >
                        <span>Become a Seller</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="border-primary/10 -ml-1 flex w-full flex-col space-y-2 dark:border-gray-700 sm:flex-row md:w-max lg:space-y-0 lg:border-l">
                  <div
                    onClick={() =>
                      setShowModal((item: IHeaderModalProps) => ({
                        ...item,
                        login: true,
                      }))
                    }
                    className="relative ml-auto flex h-9 items-center justify-center before:absolute
                            before:inset-0 before:rounded-full before:transition before:duration-300
                            hover:before:scale-105 focus:before:bg-sky-600/10 active:duration-75 active:before:scale-95
                            dark:focus:before:bg-green-400/10 sm:px-6"
                  >
                    <span className="relative text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Sign In
                    </span>
                  </div>
                  <div
                    onClick={() =>
                      setShowModal((item: IHeaderModalProps) => ({
                        ...item,
                        register: true,
                      }))
                    }
                    className="relative ml-auto flex h-9 items-center justify-center rounded-full bg-green-500
                            text-white font-bold sm:px-6 hover:bg-green-400 transition 300"
                  >
                    <span className="relative text-sm font-semibold text-white">
                      Sign Up
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
