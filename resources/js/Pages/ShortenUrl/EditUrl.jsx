import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Save, X } from "lucide-react";
import "../../../css/app.css";

const EditUrlModal = ({ 
  isOpen, 
  onClose, 
  currentUrl, 
  onUpdate 
}) => {
  const [newUrl, setNewUrl] = useState(currentUrl?.url || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const modelRef = useRef(null);

  // Set initial URL value when modal opens
  useEffect(() => {
    if (isOpen && currentUrl) {
      setNewUrl(currentUrl.url);
    }
  }, [isOpen, currentUrl]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUrl) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(currentUrl.short_code, newUrl);
      onClose();
    } catch (error) {
      toast.error("Failed to update URL");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit URL</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              New URL
            </label>
            <input
              type="url"
              id="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="editUrlInput"
              required
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-1"
              disabled={isUpdating}
            >
               Cancel
            </button>
            <button
              type="submit"
              className="updateButton"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUrlModal;