/* eslint-disable react/prop-types */


import { useParams, Link } from "react-router-dom";
import { useSingNoticeQuery } from "../../redux/notice/noticeApi";

const SingleNotice = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSingNoticeQuery(id);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading notice</p>;

  const notice = data?.data?.attributes;
  if (!notice) return <p className="text-center mt-10">Notice not found</p>;

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <Link to="/" className="text-blue-500 hover:underline text-sm">Back</Link>

      <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-6">{notice.title}</h2>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Info label="Target" value={notice.target} />
        <Info label="Notice Type" value={notice.noticeType} />
        <Info label="Employee Name" value={notice.employeeName || "-"} />
        <Info label="Position" value={notice.position || "-"} />
        <Info label="Employee ID" value={notice.employeeId || "-"} />
        <Info
          label="Publish Date"
          value={new Date(notice.publishDate).toLocaleDateString()}
        />
        <Info
          label="Status"
          value={notice.status}
        />
      </div>

      {/* Description */}
      <div className="flex gap-3 mb-6">
        <p className="text-gray-600 font-medium mb-1">notice_body:</p>
        <p className="text-gray-800 whitespace-pre-line">{notice.notice_body}</p>
      </div>

      {/* PDF Preview + Download */}
      {notice.file && (
        <div className="mt-6">
          <p className="text-gray-600 font-medium mb-2">Attachment (PDF):</p>

          {/* PDF Preview */}
          <iframe
            src={"http://localhost:5000/uploads/users/attachment"}
            className="w-full h-[600px] border rounded-lg mb-4"
          />

          {/* Download Button */}
          <a
            href={notice.attachment}
            download
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

/* SMALL COMPONENT FOR LABEL + VALUE */
const Info = ({ label, value }) => (
  <div className="flex gap-2">
    <p className="text-gray-600 font-medium">{label}:</p>
    <p className="text-gray-800">{value}</p>
  </div>
);

export default SingleNotice;
