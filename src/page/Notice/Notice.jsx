// import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useGetAllNoticeQuery } from "../../redux/notice/noticeApi";
// import dayjs from "dayjs";

// const NoticeManagement = () => {
//   const { data: notice, isLoading } = useGetAllNoticeQuery({
//     page: 1,
//     limit: 10,
//     searchTerm: "",
//     status: "",
//   });

//   const notices = notice?.data?.attributes?.data || [];

//   console.log(notices);
//   return (
//     <div className="w-full p-4 md:p-6 min-h-screen">
//       {/* Header */}
//       <div className="md:flex justify-between items-center mb-6">
//         <div className="mb-3 md:mb-0">
//           <h2 className="text-xl font-semibold">Notice Management</h2>
//           <p className="text-sm text-gray-600">
//             Active Notices:{" "}
//             <span className="text-green-600 font-semibold">08</span> &nbsp; |
//             &nbsp; Draft Notice:{" "}
//             <span className="text-[#F95524] font-semibold">04</span>
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Link to="/add-notice">
//             <button className="bg-[#F95524] text-white px-4 py-2 rounded-lg hover:bg-orange-600">
//               + Create Notice
//             </button>
//           </Link>
//           <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#F59E0B]">
//             All Draft Notice
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-5 justify-end">
//         <p className="flex items-center justify-center text-sm">Sort by:</p>

//         <select className="border p-2 rounded-lg text-sm w-full md:w-52">
//           <option>Departments or individuals</option>
//         </select>
//         <select className="border p-2 rounded-lg text-sm w-full md:w-40">
//           <option>Employee Id or Name</option>
//         </select>
//         <select className="border p-2 rounded-lg text-sm w-full md:w-36">
//           <option>Status</option>
//           <option>Published</option>
//           <option>Unpublished</option>
//           <option>Draft</option>
//         </select>

//         <input
//           type="date"
//           className="border p-2 rounded-lg text-sm w-full md:w-auto"
//         />

//         <button className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 w-full md:w-auto">
//           Reset Filters
//         </button>
//       </div>

//       {/* Desktop Table */}
//       <div className="bg-white rounded-xl shadow-sm border hidden md:block">
//         <table className="w-full">
//           <thead>
//             <tr className="text-left bg-gray-100 text-sm text-gray-600">
//               <th className="py-3 px-4">Title</th>
//               <th className="py-3 px-4">Notice Type</th>
//               <th className="py-3 px-4">Departments/Individual</th>
//               <th className="py-3 px-4">Published On</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {notices?.map((item, i) => (
//               <tr key={i} className="border-t text-sm hover:bg-gray-50">
//                 <td className="py-3 px-4">{item.title}</td>
//                 <td className="py-3 px-4 text-gray-600">{item.noticeType}</td>
//                 <td className="py-3 px-4 text-blue-500">{item.target}</td>

//                 <td className="py-3 px-4">
//                   {dayjs(item.publishDate).format("DD-MMM-YYYY h:mm A")}
//                 </td>
//                 <td className="py-3 px-4">
//                   {item.status === "Published" ? (
//                     <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
//                       Published
//                     </span>
//                   ) : item.status === "Draft" ? (
//                     <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
//                       Draft
//                     </span>
//                   ) : (
//                     <span className="text-gray-700 bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
//                       Unpublished
//                     </span>
//                   )}
//                 </td>
//                 <td className="py-3 px-4 flex items-center gap-3 text-gray-600">
//                   <FiEye className="cursor-pointer hover:text-black" />
//                   <FiEdit2 className="cursor-pointer hover:text-black" />
//                   <FiMoreVertical className="cursor-pointer hover:text-black" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden flex flex-col gap-4 mt-3">
//         {notices.map((item, i) => (
//           <div
//             key={i}
//             className="border rounded-xl p-4 bg-white shadow-sm text-sm"
//           >
//             <p className="font-semibold">{item.title}</p>

//             <div className="mt-2 text-gray-600">
//               <p>
//                 <strong>Type:</strong> {item.type}
//               </p>
//               <p>
//                 <strong>Department:</strong> {item.dept}
//               </p>
//               <p>
//                 <strong>Published:</strong> {item.publishedOn}
//               </p>
//             </div>

//             <div className="mt-2">
//               {item.status === "Published" ? (
//                 <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium">
//                   Published
//                 </span>
//               ) : item.status === "Draft" ? (
//                 <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
//                   Draft
//                 </span>
//               ) : (
//                 <span className="text-gray-700 bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
//                   Unpublished
//                 </span>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="mt-3 flex justify-end gap-4 text-lg text-gray-600">
//               <FiEye className="cursor-pointer hover:text-black" />
//               <FiEdit2 className="cursor-pointer hover:text-black" />
//               <FiMoreVertical className="cursor-pointer hover:text-black" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center py-4 gap-2">
//         {[1, 2, 3, 4, 5].map((page) => (
//           <button
//             key={page}
//             className={`px-3 py-1 rounded-lg border ${
//               page === 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoticeManagement;

import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetAllNoticeQuery } from "../../redux/notice/noticeApi";
import dayjs from "dayjs";

const NoticeManagement = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    status: "",
    target: "",
    employee: "",
    publishDate: "",
  });

 
  const { data: notice, isLoading } = useGetAllNoticeQuery(filters);

  const notices = notice?.data?.attributes?.data || [];
  const meta = notice?.meta;

  const handlePageChange = (p) => {
    setFilters({ ...filters, page: p });
  };

  return (
    <div className="w-full p-4 md:p-6 min-h-screen">
      {/* Top Section: Left Notice Text + Right Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        {/* Left Content */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Notice Management</h2>

          <p className="text-sm text-gray-600">
            Active Notices:{" "}
            <span className="text-green-600 font-semibold">
              {notices.filter((n) => n.status === "Published").length}
            </span>{" "}
            &nbsp; | &nbsp; Draft Notice:{" "}
            <span className="text-orange-600 font-semibold">
              {notices.filter((n) => n.status === "Draft").length}
            </span>
          </p>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-3">
          <Link to="/add-notice">
            <button className="bg-[#F95524] text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              + Create Notice
            </button>
          </Link>

          <Link to="/draft-notice">
            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#F59E0B]">
              All Draft Notice
            </button>
          </Link>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-5 justify-end">
        <input
          type="text"
          placeholder="Search Notice..."
          className="border p-2 rounded-lg text-sm"
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />

        <select
          className="border p-2 rounded-lg text-sm"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Published">Published</option>
          <option value="Unpublished">Unpublished</option>
          <option value="Draft">Draft</option>
        </select>

        <select
          className="border p-2 rounded-lg text-sm"
          onChange={(e) => setFilters({ ...filters, target: e.target.value })}
        >
          <option value="">Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Individual">Individual</option>
          <option value="sells">Sells</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded-lg text-sm"
          onChange={(e) =>
            setFilters({ ...filters, publishDate: e.target.value })
          }
        />

        <button
          className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
          onClick={() =>
            setFilters({
              page: 1,
              limit: 10,
              searchTerm: "",
              status: "",
              dept: "",
              employee: "",
              date: "",
            })
          }
        >
          Reset Filters
        </button>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-100 text-sm text-gray-600">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Notice Type</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Published On</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {notices.map((item, i) => (
              <tr key={i} className="border-t text-sm hover:bg-gray-50">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.noticeType}</td>
                <td className="py-3 px-4">{item.target}</td>

                <td className="py-3 px-4">
                  {dayjs(item.publishDate).format("DD-MMM-YYYY h:mm A")}
                </td>

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

      {/* PAGINATION */}
      <div className="flex justify-center py-4 gap-2">
        {Array.from({ length: meta?.totalPages || 1 }, (_, i) => i + 1).map(
          (pageNo) => (
            <button
              key={pageNo}
              onClick={() => handlePageChange(pageNo)}
              className={`px-3 py-1 rounded-lg border ${
                filters.page === pageNo
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageNo}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default NoticeManagement;
