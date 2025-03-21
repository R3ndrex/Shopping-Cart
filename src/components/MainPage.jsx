import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <main>
            <h1 className="image-slider"> This is home page</h1>
            <button onClick={() => navigate("/store")}>Go to Store </button>
        </main>
    );
}
