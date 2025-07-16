import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../../lib/Services/apis";
import { Edit3, Trash2, Save, X } from "lucide-react";
import "../../../css/app.css";
import EditUrlModal from "./EditUrl";

const ShowUrls = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [editUrl, setEditUrl] = useState("");

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const response = await ApiService.index();
            setUrls(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch URLs");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (url) => {
         setCurrentUrl(url);
    setIsModalOpen(true);
    };

    const handleUpdate = async (short_code, newUrl) => {
        const shortCode = short_code.split("/").pop();
    try {
      const response = await ApiService.update(shortCode, {url: newUrl});
      toast.success("URL updated successfully");
      fetchUrls();
    } catch (error) {
      toast.error("Failed to update URL");
    }
  };

    const handleDelete = async (short_code) => {
        const shortCode = short_code.split("/").pop();
        if (window.confirm("Are you sure you want to delete this URL?")) {
            try {
                const response = await ApiService.delete(shortCode);

                toast.success("URL deleted successfully");

                fetchUrls();
            } catch (error) {
                toast.error("Something went wront");
            }
        }
    };

    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <>
        <div className="rounded-md shadow-md overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="w-2/5 thColumns">Original URL</th>
                        <th className="w-1/4 thColumns">Short URL</th>
                        <th className="w-1/6 thColumns">Clicks</th>
                        <th className="w-1/6 thColumns">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {urls?.map((url) => (
                        <tr key={url?.id}>
                            <td className="tdColumns">
                                {editingId === url?.id ? (
                                    <input
                                        type="text"
                                        value={editUrl}
                                        onChange={(e) =>
                                            setEditUrl(e.target.value)
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <a
                                        href={url?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline block truncate"
                                    >
                                        {url?.url}
                                    </a>
                                )}
                            </td>
                            <td className="tdColumns">
                                <a
                                    href={url?.short_code}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline block truncate"
                                >
                                    {url?.short_code}
                                </a>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-left">
                                {url?.access_count}
                            </td>
                             <td className="px-4 py-4 whitespace-nowrap flex gap-2 items-center text-left">
                  <button
                    onClick={() => handleEdit(url)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(url?.short_code)}
                    className="text-red-600 hover:text-red-800 hover:cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Edit URL Modal */}
      <EditUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUrl={currentUrl}
        onUpdate={handleUpdate}
      />
      </>
    );
};

export default ShowUrls;
