// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { IoCaretBack } from "react-icons/io5";
// import toast from "react-hot-toast";
// import {
//   useSingNoticeQuery,
//   useUpdatedNoticeMutation,
// } from "../../redux/notice/noticeApi";
// import SuccessModal from "../SuccessModal/SuccessModal";

// const EditNotice = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { data, isLoading: singleLoading } = useSingNoticeQuery(id);
//   const oldData=data?.data?.attributes;

//   const [updatedNotice, { isLoading }] = useUpdatedNoticeMutation();

//   const [file, setFile] = useState(null);

//   const [formData, setFormData] = useState({
//     target: "",
//     title: "",
//     employeeId: "",
//     employeeName: "",
//     position: "",
//     noticeType: "",
//     publishDate: "",
//     description: "",
//     status: "",
//   });

//   const [successOpen, setSuccessOpen] = useState(false);
//   const [statusType, setStatusType] = useState("");

//   // ⬇️ Load notice data into form
//   useEffect(() => {
//     if (oldData) {
//       const n = data?.data?.attributes;
//          console.log("all data",n)
//       setFormData({
//         target: n.target || "",
//         title: n.title || "",
//         employeeId: n.employeeId || "",
//         employeeName: n.employeeName || "",
//         position: n.position || "",
//         noticeType: n.noticeType || "",
//         publishDate: n.publishDate?.split("T")[0] || "",
//         description: n.notice_body || "",
//         status: n.status || "",
//       });
//     }
//   }, [data]);

//   // Input handler
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Update handler
//   const handleUpdate = async () => {
//     try {
//       const payload = { ...formData, file };

//       await updatedNotice({ id, payload }).unwrap();

//       toast.success("Notice Updated Successfully!");
//       setStatusType("Updated");
//       setSuccessOpen(true);
//     } catch (error) {
//       toast.error(error?.data?.message || "Failed to update notice");
//     }
//   };

//   if (singleLoading) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="w-full justify-center py-2 px-4">
//       <Link to="/">
//         <div className="flex">
//           <span className="pt-1 text-[20px]"><IoCaretBack /></span>
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             Edit Notice
//           </h2>
//         </div>
//       </Link>

//       <div className="w-full container bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-200">
//         <div className="space-y-6">

//           {/* Target */}
//           <div className="space-y-2">
//             <label className="font-medium text-gray-700">Target</label>
//             <select
//               name="target"
//               value={formData.target}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 bg-gray-50"
//             >
//               <option value="">Select Target</option>
//               <option value="Individual">Individual</option>
//               <option value="HR">HR</option>
//               <option value="IT">IT</option>
//             </select>
//           </div>

//           {/* Title */}
//           <div className="space-y-2">
//             <label className="font-medium text-gray-700">Notice Title</label>
//             <input
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 bg-gray-50"
//             />
//           </div>

//           {/* Employee Inputs */}
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <label>Employee ID</label>
//               <input
//                 name="employeeId"
//                 value={formData.employeeId}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 bg-gray-50"
//               />
//             </div>

//             <div className="space-y-2">
//               <label>Employee Name</label>
//               <input
//                 name="employeeName"
//                 value={formData.employeeName}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 bg-gray-50"
//               />
//             </div>

//             <div className="space-y-2">
//               <label>Position</label>
//               <input
//                 name="position"
//                 value={formData.position}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 bg-gray-50"
//               />
//             </div>
//           </div>

//           {/* Notice Type + Date */}
//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label>Notice Type</label>
//               <select
//                 name="noticeType"
//                 value={formData.noticeType}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 bg-gray-50"
//               >
//                 <option value="">Select Type</option>
//                 <option value="Warning">Warning</option>
//                 <option value="PIP">PIP</option>
//                 <option value="Appreciation">Appreciation</option>
//                 <option value="Leave Issue">Leave Issue</option>
//                 <option value="Payroll">Payroll</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <label>Publish Date</label>
//               <input
//                 type="date"
//                 name="publishDate"
//                 value={formData.publishDate}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg p-3 bg-gray-50"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label>Notice Body</label>
//             <textarea
//               rows={4}
//               name="description"
//               value={formData.notice_body}   // FIXED
//               onChange={handleChange}
//               className="w-full border rounded-lg p-3 bg-gray-50"
//             />
//           </div>

//           {/* File Upload */}
//           <div>
//             <label className="font-medium text-gray-700">Attachment</label>

//             <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50">
//               <input
//                 type="file"
//                 id="fileUpload"
//                 className="hidden"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <label htmlFor="fileUpload" className="cursor-pointer text-blue-600">
//                 Upload or drag & drop
//               </label>
//             </div>

//             {file && (
//               <div className="mt-2 bg-gray-100 p-3 rounded-lg flex justify-between">
//                 <span>{file.name}</span>
//                 <button className="text-red-500" onClick={() => setFile(null)}>
//                   ✕
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between pt-4">
//             <button
//               onClick={() => navigate("/")}
//               className="px-6 py-2 bg-gray-200 rounded-full"
//             >
//               Cancel
//             </button>

//             <button
//               disabled={isLoading}
//               onClick={handleUpdate}
//               className="px-6 py-2 bg-[#F95524] text-white rounded-full"
//             >
//               Update Notice
//             </button>
//           </div>
//         </div>
//       </div>

//       <SuccessModal
//         open={successOpen}
//         onClose={() => setSuccessOpen(false)}
//         noticeId={id}
//         statusType={statusType}
//         onCreateAnother={() => navigate(`/notice/${id}`)}
//       />
//     </div>
//   );
// };

// export default EditNotice;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
import toast from "react-hot-toast";
import {
  useSingNoticeQuery,
  useUpdatedNoticeMutation,
} from "../../redux/notice/noticeApi";
 

const EditNotice = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading: singleLoading } = useSingNoticeQuery(id);

  const oldData = data?.data?.attributes;

  const [updateNotice, { isLoading }] = useUpdatedNoticeMutation();

  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    target: "",
    title: "",
    employeeId: "",
    employeeName: "",
    position: "",
    noticeType: "",
    publishDate: "",
    notice_body: "",
    status: "",
  });

 

  // Load notice in form
  useEffect(() => {
    if (oldData) {
      const n = oldData;

      setFormData({
        target: n.target || "",
        title: n.title || "",
        employeeId: n.employeeId || "",
        employeeName: n.employeeName || "",
        position: n.position || "",
        noticeType: n.noticeType || "",
        publishDate: n.publishDate?.split("T")[0] || "",
        description: n.notice_body || "",
        status: n.status || "",
      });
    }
  }, [oldData]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Notice
  const handleUpdate = async () => {
    try {
      const payload = {
        ...formData,
        file: file || undefined,
      };

      await updateNotice({ id, payload }).unwrap();

      toast.success("Notice Updated Successfully!");

      navigate(`/notice/${id}`)
      
    } catch (error) {
      toast.error(error?.data?.message || "Update failed!");
    }
  };

  if (singleLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="w-full justify-center py-2 px-4">
      <Link to="/">
        <div className="flex gap-2">
          <span className="pt-1 text-[20px]">
            <IoCaretBack />
          </span>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Edit Notice
          </h2>
        </div>
      </Link>

      <div className="w-full container bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-200">
        <div className="space-y-6">
          {/* Target */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Target</label>
            <select
              name="target"
              value={formData.target}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 bg-gray-50"
            >
              <option value="">Select Target</option>
              <option value="Individual">Individual</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Notice Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 bg-gray-50"
            />
          </div>

          {/* Employee Inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label>Employee ID</label>
              <input
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label>Employee Name</label>
              <input
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label>Position</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              />
            </div>
          </div>

          {/* Notice Type + Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Notice Type</label>
              <select
                name="noticeType"
                value={formData.noticeType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              >
                <option value="">Select Type</option>
                <option value="Warning">Warning</option>
                <option value="PIP">PIP</option>
                <option value="Appreciation">Appreciation</option>
                <option value="Leave Issue">Leave Issue</option>
                <option value="Payroll">Payroll</option>
              </select>
            </div>

            <div className="space-y-2">
              <label>Publish Date</label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label>status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50 "
              >
                <option value="">Select status</option>
                <option value="Published">Published</option>
                <option value="Unpublished">Unpublished</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label>Notice Body</label>
            <textarea
              rows={4}
              name="notice_body"
              value={formData.notice_body} // FIXED
              onChange={handleChange}
              className="w-full border rounded-lg p-3 bg-gray-50"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="font-medium text-gray-700">Attachment</label>

            <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50">
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-blue-600"
              >
                Upload or drag & drop
              </label>
            </div>

            {file && (
              <div className="mt-2 bg-gray-100 p-3 rounded-lg flex justify-between">
                <span>{file.name}</span>
                <button className="text-red-500" onClick={() => setFile(null)}>
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-gray-200 rounded-full"
            >
              Cancel
            </button>

            <button
              disabled={isLoading}
              onClick={handleUpdate}
              className="px-6 py-2 bg-[#F95524] text-white rounded-full"
            >
              Update Notice
            </button>
          </div>
        </div>
      </div>

       
    </div>
  );
};

export default EditNotice;
