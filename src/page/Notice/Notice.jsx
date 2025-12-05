import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";

const notices = [
  {
    title: "Office closed on Friday for maintenance.",
    type: "General / Company-W",
    dept: "All Department",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    title: "Eid al-Fitr holiday schedule.",
    type: "Holiday & Event",
    dept: "Finance",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    title: "Updated code of conduct policy",
    type: "HR & Policy Update",
    dept: "Sales Team",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    title: "Payroll for October processed on 28th",
    type: "Finance & Payroll",
    dept: "Web Team",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    title: "System update for 30 Oct",
    type: "IT / System Maintenance",
    dept: "Database Team",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    title: "Design team sprint review moved to Tuesday.",
    type: "Department / Team",
    dept: "Admin",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    title: "Unauthorized absence recorded on 18 Oct",
    type: "Warning / Disciplinary",
    dept: "Individual",
    publishedOn: "15-Jun-2025",
    status: "Unpublished",
  },
  {
    title: "Office closed due to severe weather",
    type: "Emergency / Urgent",
    dept: "HR",
    publishedOn: "15-Jun-2025",
    status: "Draft",
  },
];

const NoticeManagement = () => {
  return (
    <div className="w-full p-4 md:p-6 min-h-screen">
      {/* Header */}
      <div className="md:flex justify-between items-center mb-6">
        <div className="mb-3 md:mb-0">
          <h2 className="text-xl font-semibold">Notice Management</h2>
          <p className="text-sm text-gray-600">
            Active Notices:{" "}
            <span className="text-green-600 font-semibold">08</span> &nbsp; |
            &nbsp; Draft Notice:{" "}
            <span className="text-[#F95524] font-semibold">04</span>
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/add-notice">
            <button className="bg-[#F95524] text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              + Create Notice
            </button>
          </Link>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#F59E0B]">
            All Draft Notice
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5 justify-end">
        <p className="flex items-center justify-center text-sm">Sort by:</p>

        <select className="border p-2 rounded-lg text-sm w-full md:w-52">
          <option>Departments or individuals</option>
        </select>
        <select className="border p-2 rounded-lg text-sm w-full md:w-40">
          <option>Employee Id or Name</option>
        </select>
        <select className="border p-2 rounded-lg text-sm w-full md:w-36">
          <option>Status</option>
          <option>Published</option>
          <option>Unpublished</option>
          <option>Draft</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded-lg text-sm w-full md:w-auto"
        />

        <button className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 w-full md:w-auto">
          Reset Filters
        </button>
      </div>

      {/* Desktop Table */}
      <div className="bg-white rounded-xl shadow-sm border hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-600">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Notice Type</th>
              <th className="py-3 px-4">Departments/Individual</th>
              <th className="py-3 px-4">Published On</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((item, i) => (
              <tr key={i} className="border-t text-sm hover:bg-gray-50">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4 text-gray-600">{item.type}</td>
                <td className="py-3 px-4 text-blue-500">{item.dept}</td>
                <td className="py-3 px-4">{item.publishedOn}</td>

                <td className="py-3 px-4">
                  {item.status === "Published" ? (
                    <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
                      Published
                    </span>
                  ) : item.status === "Draft" ? (
                    <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
                      Draft
                    </span>
                  ) : (
                    <span className="text-gray-700 bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                      Unpublished
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 flex items-center gap-3 text-gray-600">
                  <FiEye className="cursor-pointer hover:text-black" />
                  <FiEdit2 className="cursor-pointer hover:text-black" />
                  <FiMoreVertical className="cursor-pointer hover:text-black" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4 mt-3">
        {notices.map((item, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-white shadow-sm text-sm"
          >
            <p className="font-semibold">{item.title}</p>

            <div className="mt-2 text-gray-600">
              <p>
                <strong>Type:</strong> {item.type}
              </p>
              <p>
                <strong>Department:</strong> {item.dept}
              </p>
              <p>
                <strong>Published:</strong> {item.publishedOn}
              </p>
            </div>

            <div className="mt-2">
              {item.status === "Published" ? (
                <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
                  Published
                </span>
              ) : item.status === "Draft" ? (
                <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
                  Draft
                </span>
              ) : (
                <span className="text-gray-700 bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                  Unpublished
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-3 flex justify-end gap-4 text-lg text-gray-600">
              <FiEye className="cursor-pointer hover:text-black" />
              <FiEdit2 className="cursor-pointer hover:text-black" />
              <FiMoreVertical className="cursor-pointer hover:text-black" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-4 gap-2">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-lg border ${
              page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeManagement;
