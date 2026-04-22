import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    const error = useRouteError();

    return (
        <main className="flex text-center  flex-col justify-center items-center gap-[1rem]">
            <h1 className="text-red-600">Page not found</h1>
            <p className="text-red-600">{error.data}</p>
            <button onClick={() => navigate("/")}>
                Go back to the homepage
            </button>
        </main>
    );
}
