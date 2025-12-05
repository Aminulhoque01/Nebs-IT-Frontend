import { useState } from "react";
import { Link } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";

const CreateNotice = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="w-full justify-center py-2 px-4">
      <Link to="/">
        <div className="flex  ">
           <span className="pt-1 text-[20px]"> <IoCaretBack /></span>
          <h2 className="text-xl font-semibold text-gray-800 mb-6 ">
            Create a Notice
          </h2>
          
        </div>
      </Link>
      <div className="w-full container bg-white rounded-xl shadow-sm p-6 md:p-10 border border-gray-200">
        {/* Header */}

        {/* Section box */}
        <div className="space-y-6">
          {/* Target Department */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">
              Target Department(s) or Individual
            </label>
            <select className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500">
              <option>Individual</option>
            </select>
          </div>

          {/* Notice Title */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Notice Title</label>
            <input
              className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500"
              placeholder="Write the Title of Notice"
            />
          </div>

          {/* Employee Inputs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">
                Select Employee ID
              </label>
              <select className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500">
                <option>Select employee designation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Employee Name</label>
              <input
                className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500"
                placeholder="Enter employee full name"
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Position</label>
              <select className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500">
                <option>Select employee department</option>
              </select>
            </div>
          </div>

          {/* Notice Type + Publish Date */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">Notice Type</label>
              <select className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500">
                <option>Select Notice Type</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">Publish Date</label>
              <input
                type="date"
                className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500"
              />
            </div>
          </div>

          {/* Notice Body */}
          <div className="space-y-2">
            <label className="font-medium text-gray-700">Notice Body</label>
            <textarea
              rows={4}
              className="w-full border rounded-lg p-3 bg-gray-50 focus:outline-blue-500"
              placeholder="Write the details about notice"
            />
          </div>

          {/* Upload Attachments */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Attachments (optional)
            </label>

            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50">
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
                Upload nominee profile image or drag and drop.
              </label>
              <p className="text-gray-500 text-sm">
                Accepted File Type: jpg, png
              </p>
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
            <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium">
              Cancel
            </button>

            <div className="md:flex gap-3  ">
              <button className="px-6 py-3 rounded-lg bg-blue-100 text-blue-700 font-medium hover:bg-blue-200">
                Save as Draft
              </button>
              <button className="px-6 py-3 rounded-lg bg-[#F95524] text-white font-semibold hover:bg-orange-600">
                Publish Notice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotice;
