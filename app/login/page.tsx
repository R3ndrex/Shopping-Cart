import Link from "next/link";

export default function Page() {
    return (
        <main className="flex flex-col items-center">
            <form
                className="flex flex-col gap-[0.5em] m-4 auth-form bg-(--color-surface) p-4 rounded-(--radius-lg)"
                action=""
                method="post"
            >
                <h1 className=" text-center ">Login</h1>
                <label htmlFor="email">Email</label>
                <input
                    className="p-[0.5em] bg-(--color-bg) outline-0 text-(--color-text) rounded-md"
                    type="email"
                    name="email"
                    id="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="p-[0.5em] bg-(--color-bg) outline-0 text-(--color-text) rounded-md"
                    type="password"
                    name="password"
                    id="password"
                />

                <button
                    className="self-center auth-submit-button"
                    type="submit"
                >
                    Login
                </button>
                <p className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link
                        className={
                            "border-b-(--color-accent) border-bottom-animation"
                        }
                        href={"/register"}
                    >
                        Register
                    </Link>
                </p>
            </form>
        </main>
    );
}
