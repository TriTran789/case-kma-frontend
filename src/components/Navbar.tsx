"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useGetUser } from "./actions";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const { getUser } = useGetUser();

  const fetchUser = async () => {
    if (getCookie("access_token")) {
      const res = await getUser();
      setUser(res);
    }
  };

  const handleLogout = () => {
    removeCookie("access_token");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    fetchUser();
  }, [cookies]);

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-blue-600">kma</span>
          </Link>

          <div className="h-full flex items-center sm:space-x-4 space-x-1">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLogout()}
                >
                  Log out
                </Button>
                {user.role === "admin" ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : (
                  <Link
                    href="/orders"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Orders
                  </Link>
                )}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Register
                </Link>

                <Link
                  href="/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                {user ? (
                  <Link
                    href="/configure/upload"
                    className={buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex items-center gap-1",
                    })}
                  >
                    Create case
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className={buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex items-center gap-1",
                    })}
                  >
                    Create case
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Link>
                )}

                {/* <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link> */}
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
