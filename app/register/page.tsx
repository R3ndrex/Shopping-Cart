import Link from "next/link";

export default function Page() {
    return (
        <main className="flex flex-col items-center">
            <form
                className="flex flex-col gap-[0.5em] m-4 auth-form bg-(--color-surface) p-4 rounded-lg"
                action=""
                method="post"
            >
                <h1 className="text-center">Register</h1>
                <label htmlFor="username">Username</label>
                <input
                    className="p-[0.5em] bg-(--color-bg) outline-0 text-(--color-text) rounded-md"
                    type="text"
                    name="username"
                    id="username"
                />
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    className="p-[0.5em] bg-(--color-bg) outline-0 text-(--color-text) rounded-md"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                />
                <button
                    className="self-center auth-submit-button"
                    type="submit"
                >
                    Register
                </button>
                <p className="text-center">
                    Already have one?{" "}
                    <Link
                        className={
                            "border-b-(--color-accent) border-bottom-animation"
                        }
                        href={"/login"}
                    >
                        Login
                    </Link>
                </p>
            </form>
        </main>
    );
}
