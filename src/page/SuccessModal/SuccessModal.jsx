/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const SuccessModal = ({ open, onClose, noticeId, statusType, onCreateAnother }) => {
  if (!open) return null;

  const title =
    statusType === "Published" ? "Notice Published Successfully" : "Draft Saved Successfully";

  const description =
    statusType === "Published"
      ? "Your notice has been published and is now visible to all selected departments."
      : "Your notice has been saved as draft. You can edit and publish it later.";

  // Optional: change modal color/icon for Draft
  const iconColor = statusType === "Published" ? "text-green-600" : "text-blue-600";
  const iconBg = statusType === "Published" ? "bg-green-100" : "bg-blue-100";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[95%] max-w-md shadow-xl">

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className={`h-16 w-16 ${iconBg} rounded-full flex items-center justify-center`}>
            <svg
              className={`h-10 w-10 ${iconColor}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold">{title}</h2>

        {/* Description */}
        <p className="text-center text-gray-600 mt-2 text-sm">{description}</p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">
          {statusType === "Published" && (
            <Link
              to={`/notice/${noticeId}`}
              className="px-5 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
            >
              View Notice
            </Link>
          )}

          <button
            onClick={onCreateAnother}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            + Create Another
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
