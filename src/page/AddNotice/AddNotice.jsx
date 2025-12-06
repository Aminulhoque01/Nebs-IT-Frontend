import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
import { useCreateNoticeMutation } from "../../redux/notice/noticeApi";
import toast from "react-hot-toast";
import SuccessModal from "../SuccessModal/SuccessModal";

const CreateNotice = () => {
  const navigate = useNavigate();
  const [createNotice, { isLoading }] = useCreateNoticeMutation();
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

  const [successOpen, setSuccessOpen] = useState(false);
  const [createdId, setCreatedId] = useState(null);
  const [statusType, setStatusType] = useState(""); // For modal title

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit notice
  const handleSubmit = async (type) => {
    try {
      const payload = { ...formData, status: type, file };
      const res = await createNotice(payload).unwrap();

      toast.success(
        `Notice ${type === "Published" ? "Published" : "Saved as Draft"} Successfully!`
      );

      setCreatedId(res.data._id);
      setStatusType(type);
      setSuccessOpen(true); // show modal
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create notice");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
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
    setFile(null);
  };

  return (
    <div className="w-full justify-center py-2 px-4">
      <Link to="/">
        <div className="flex">
          <span className="pt-1 text-[20px]">
            <IoCaretBack />
          </span>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Create a Notice
          </h2>
        </div>
      </Link>

      <div className="w-full container bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-200">
        <div className="space-y-6">
          {/* Target */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">
              Target Department(s) or Individual
            </label>
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

          {/* Notice Title */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Notice Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 bg-gray-50"
              placeholder="Write the Title of Notice"
            />
          </div>

          {/* Employee Inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Employee ID</label>
              <input
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
                placeholder="Enter Employee ID"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Employee Name</label>
              <input
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
                placeholder="Enter employee full name"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Position</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
                placeholder="Employee Position"
              />
            </div>
          </div>

          {/* Notice Type + Publish Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Notice Type</label>
              <select
                name="noticeType"
                value={formData.noticeType}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              >
                <option value="">Select Notice Type</option>
                <option value="Warning">Warning / Disciplinary</option>
                <option value="PIP">Performance Improvement</option>
                <option value="Appreciation">Appreciation / Recognition</option>
                <option value="Leave Issue">Attendance / Leave Issue</option>
                <option value="Payroll">Payroll / Compensation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Publish Date</label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 bg-gray-50"
              />
            </div>
          </div>

          {/* Notice Body */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Notice Body</label>
            <textarea
              rows={4}
              name="notice_body"
              value={formData.notice_body}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 bg-gray-50"
              placeholder="Write the details about notice"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Attachments (optional)
            </label>

            <div className="border-2 border-dashed rounded-xl p-6 bg-gray-50">
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer text-blue-600 font-medium"
              >
                Upload or drag and drop.
              </label>
            </div>

            {file && (
              <div className="mt-3 flex items-center justify-between bg-gray-100 rounded-lg p-3">
                <span className="text-gray-700">{file.name}</span>
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => setFile(null)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="md:flex justify-between pt-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-[100px] bg-gray-200"
            >
              Cancel
            </button>

            <div className="md:flex gap-3">
              <button
                disabled={isLoading}
                onClick={() => handleSubmit("Draft")}
                className="px-6 py-2 rounded-[100px] bg-blue-100 text-blue-700"
              >
                Save as Draft
              </button>

              <button
                disabled={isLoading}
                onClick={() => handleSubmit("Published")}
                className="px-6 py-2 rounded-[100px] bg-[#F95524] text-white"
              >
                Publish Notice
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        noticeId={createdId}
        statusType={statusType}
        onCreateAnother={() => {
          resetForm();
          setSuccessOpen(false);
        }}
      />
    </div>
  );
};

export default CreateNotice;
