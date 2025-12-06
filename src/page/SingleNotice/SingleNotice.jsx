import { useParams, Link } from "react-router-dom";
import { useSingNoticeQuery } from "../../redux/notice/noticeApi";

const SingleNotice = () => {
  const { id } = useParams(); // this is just the ID string
  const { data, isLoading, error } = useSingNoticeQuery(id); // fetch notice


  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error loading notice</p>;

  const notice = data?.data?.attributes; // your actual notice object
  console.log(notice)
  if (!notice) return <p className="text-center mt-10">Notice not found</p>;

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
     <Link to="/" className="text-blue-500 hover:underline text-sm">Back</Link>
     
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{notice.title}</h2>
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Target:</p>
          <p className="text-gray-800">{notice.target}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Notice Type:</p>
          <p className="text-gray-800">{notice.noticeType}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Employee Name:</p>
          <p className="text-gray-800">{notice.employeeName || "-"}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Position:</p>
          <p className="text-gray-800">{notice.position || "-"}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Employee ID:</p>
          <p className="text-gray-800">{notice.employeeId || "-"}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Publish Date:</p>
          <p className="text-gray-800">{new Date(notice.publishDate).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-gray-600 font-medium">Status:</p>
          <p className={`font-semibold ${notice.status === "Published" ? "text-green-600" : "text-blue-600"}`}>
            {notice.status}
          </p>
        </div>
      </div>

      <div className="flex mt-4">
        <p className="text-gray-600 font-medium mb-2">Description:</p>
        <p className="text-gray-800 whitespace-pre-line">{notice.notice_body}</p>
      </div>

      {notice.file && (
        <div className="mt-4">
          <p className="text-gray-600 font-medium mb-2">Attachment:</p>
          <a
            href={notice.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View / Download File
          </a>
        </div>
      )}
    </div>
  );
};

export default SingleNotice;
