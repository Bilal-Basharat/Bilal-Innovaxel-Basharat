import React from "react";
import { toast } from "react-toastify";
import ApiService from "../../lib/Services/apis";
import ShowUrls from "./Show";

const Create = () => {
    const [url, setUrl] = React.useState("");
    const [shortUrl, setShortUrl] = React.useState("");

    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const payLoad = {
                url: url,
            };

            const response = await ApiService.create(payLoad);

            if (response.data.success) {
                toast.success(response.data.message || "Short url created successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                });
                setShortUrl(response.data.short_url);
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        alert("Copied to clipboard!");
    };

    return (
        <div className="max-w-screen-xl mx-auto">

        <div className="mx-auto p-6 mt-10 min-h-48 bg-gray-50 rounded-lg shadow-md mb-8">
            <h1 className="text-2xl font-bold text-center mb-6">
                Snip URL Shortener
            </h1>

            <form onSubmit={handleSubmit} className="space-y-2">
                    <label
                        htmlFor="url"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Enter your long URL
                    </label>
                    <div className="flex items-center justify-between">

                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/very/long/url"
                        className=" mr-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-600"
                        required
                    />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-48 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {loading ? "Shortening..." : "Shorten URL"}
                </button>
                    </div>

            </form>

            {error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {shortUrl && (
                <div className="mt-6 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700">
                        {" "}
                        Your short URL:
                    </p>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="text"
                            readOnly
                            value={shortUrl}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:outline-none focus:ring-blue-600 focus:border-blue-600"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="text-center">
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-sm text-blue-800 hover:text-blue-700"
                        >
                            Click here to go to the link
                        </a>
                    </div>
                </div>
            )}
        </div>
            <ShowUrls />
        </div>
    );
};

export default Create;
