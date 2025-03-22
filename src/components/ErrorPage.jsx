import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <main className="flex flex-col justify-center items-center gap-[1rem]">
            <h1>Oops, it seems there was an error...</h1>
            <p>{error.data}</p>
            <button onClick={() => navigate("/")}>
                Go back to the homepage
            </button>
        </main>
    );
}
