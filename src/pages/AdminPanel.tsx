import { useState, type FormEvent } from "react";

type Entity = "color" | "category" | "size" | "product" | "user";
type Action = "create" | "delete" | "update";
type FormType = `${Entity}-${Action}`;

/// dogshit code fix needed

export default function AdminPanelPage() {
    const [activeForm, setActiveForm] = useState<FormType>();

    async function SubmitCreateSize(e: FormEvent<HTMLFormElement>) {
        SubmitSimple(e, "/size/", "POST");
    }
    async function SubmitCreateColor(e: FormEvent<HTMLFormElement>) {
        SubmitSimple(e, "/color/", "POST");
    }
    async function SubmitCreateCategory(e: FormEvent<HTMLFormElement>) {
        SubmitSimple(e, "/category/", "POST");
    }
    async function SubmitDeleteCategory(e: FormEvent<HTMLFormElement>) {
        SubmitSimple(e, "/category/", "DELETE");
    }
    async function SubmitSimple(
        e: FormEvent<HTMLFormElement>,
        url: string,
        method: "POST" | "DELETE" | "GET" | "PATCH",
    ) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}${url}`,
                {
                    method,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                    }),
                },
            );
            if (!response.ok) {
                throw new Error(
                    `Error while sending request, status:${response.status} ${response.statusText}`,
                );
            }
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <main>
            <div className="flex flex-col gap-2 m-2">
                <h2>Create</h2>
                <ul className="flex gap-4">
                    <li>
                        <button onClick={() => setActiveForm("size-create")}>
                            Create size
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("color-create")}>
                            Create color
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveForm("category-create")}
                        >
                            Create category
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("product-create")}>
                            Create product
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("user-create")}>
                            Create user
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2 m-2">
                <h2>Delete</h2>
                <ul className="flex gap-4">
                    <li>
                        <button onClick={() => setActiveForm("size-delete")}>
                            Delete size
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("color-delete")}>
                            Delete color
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveForm("category-delete")}
                        >
                            Delete category
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("product-delete")}>
                            Delete product
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("user-delete")}>
                            Delete user
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col gap-2 m-2">
                <h2>Update</h2>
                <ul className="flex gap-4">
                    <li>
                        <button onClick={() => setActiveForm("size-update")}>
                            Update size
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("color-update")}>
                            Update color
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveForm("category-update")}
                        >
                            Update category
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("product-update")}>
                            Update product
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setActiveForm("user-update")}>
                            Update user
                        </button>
                    </li>
                </ul>
            </div>

            {activeForm === "size-create" && (
                <form
                    className="flex flex-col gap-[0.5em] m-4 bg-(--color-surface) p-4 rounded-lg w-min"
                    onSubmit={(e) => SubmitCreateSize(e)}
                >
                    <label htmlFor="name">Size name</label>
                    <input
                        className="bg-(--color-bg) p-[0.5em] outline-0 text-(--color-text) rounded-md"
                        type="text"
                        id="name"
                        name="name"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            {activeForm === "color-create" && (
                <form
                    className="flex flex-col gap-[0.5em] m-4 bg-(--color-surface) p-4 rounded-lg w-min"
                    onSubmit={(e) => SubmitCreateColor(e)}
                >
                    <label htmlFor="name">Color name</label>
                    <input
                        className="bg-(--color-bg) p-[0.5em] outline-0 text-(--color-text) rounded-md"
                        type="text"
                        id="name"
                        name="name"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            {activeForm === "category-create" && (
                <form
                    className="flex flex-col gap-[0.5em] m-4 bg-(--color-surface) p-4 rounded-lg w-min"
                    onSubmit={(e) => SubmitCreateCategory(e)}
                >
                    <label htmlFor="name">Category name</label>
                    <input
                        className="bg-(--color-bg) p-[0.5em] outline-0 text-(--color-text) rounded-md"
                        type="text"
                        id="name"
                        name="name"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
            {activeForm === "category-delete" && (
                <form
                    className="flex flex-col gap-[0.5em] m-4 bg-(--color-surface) p-4 rounded-lg w-min"
                    onSubmit={(e) => SubmitDeleteCategory(e)}
                >
                    <label htmlFor="name">Category name</label>
                    <input
                        className="bg-(--color-bg) p-[0.5em] outline-0 text-(--color-text) rounded-md"
                        type="text"
                        id="name"
                        name="name"
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </main>
    );
}
