// // /* eslint-disable no-unused-vars */

// // import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
// // import { Link, useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import {
// //   useGetAllNoticeQuery,
// //   useSingNoticeQuery,
// //   useToggleStatusMutation,
// // } from "../../redux/notice/noticeApi";
// // import dayjs from "dayjs";
// // import { toast } from "sonner";

// // const NoticeManagement = () => {
// //   const [filters, setFilters] = useState({
// //     page: 1,
// //     limit: 10,
// //     searchTerm: "",
// //     status: "",
// //     target: "",
// //     employee: "",
// //     publishDate: "",
// //   });

// //   const { data: notice, isLoading } = useGetAllNoticeQuery(filters);

// //   const notices = notice?.data?.attributes?.data || [];
// //   const meta = notice?.meta;
// //   console.log(notice);

// //   const handlePageChange = (p) => {
// //     setFilters({ ...filters, page: p });
// //   };

// //   const [localNotices, setLocalNotices] = useState([]);

// //   useEffect(() => {
// //     if (notices) setLocalNotices(notices);
// //   }, [notices]);

// //   const [toggleStatus] = useToggleStatusMutation();

// //   const handleToggle = async (item) => {
// //     if (item.status === "Draft") return;

// //     // Optimistically update UI
// //     setLocalNotices((prev) =>
// //       prev.map((n) =>
// //         n._id === item._id
// //           ? {
// //               ...n,
// //               status: n.status === "Published" ? "Unpublished" : "Published",
// //             }
// //           : n
// //       )
// //     );

// //     try {
// //       await toggleStatus(item._id).unwrap(); // backend update
// //       toast.success("Status toggled successfully");
// //     } catch (error) {
// //       // Revert UI on error
// //       setLocalNotices((prev) =>
// //         prev.map((n) =>
// //           n._id === item._id ? { ...n, status: item.status } : n
// //         )
// //       );
// //       toast.error("Failed to toggle status");
// //     }
// //   };

// //   return (
// //     <div className="w-full p-4 md:p-6 min-h-screen">
// //       {/* Top Section: Left Notice Text + Right Buttons */}
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
// //         {/* Left Content */}
// //         <div className="mb-4 md:mb-0">
// //           <h2 className="text-xl font-semibold">Notice Management</h2>

// //           <p className="text-sm text-gray-600">
// //             Active Notices:{" "}
// //             <span className="text-green-600 font-semibold">
// //               {notices.filter((n) => n.status === "Published").length}
// //             </span>{" "}
// //             &nbsp; | &nbsp; Draft Notice:{" "}
// //             <span className="text-orange-600 font-semibold">
// //               {notices.filter((n) => n.status === "Draft").length}
// //             </span>
// //           </p>
// //         </div>

// //         {/* Right Buttons */}
// //         <div className="flex gap-3">
// //           <Link to="/add-notice">
// //             <button className="bg-[#F95524] text-white px-4 py-2 rounded-lg hover:bg-orange-600">
// //               + Create Notice
// //             </button>
// //           </Link>

// //           <button
// //             onClick={() => setFilters({ ...filters, status: "Draft", page: 1 })}
// //             className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#F59E0B]"
// //           >
// //             All Draft Notice
// //           </button>
// //         </div>
// //       </div>

// //       {/* FILTER BAR */}
// //       <div className="flex flex-wrap gap-3 mb-5 justify-end">
// //         <input
// //           type="text"
// //           placeholder="Search Notice..."
// //           className="border p-2 rounded-lg text-sm"
// //           onChange={(e) =>
// //             setFilters({ ...filters, searchTerm: e.target.value })
// //           }
// //         />

// //         <select
// //           className="border p-2 rounded-lg text-sm"
// //           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
// //         >
// //           <option value="">Status</option>
// //           <option value="Published">Published</option>
// //           <option value="Unpublished">Unpublished</option>
// //           <option value="Draft">Draft</option>
// //         </select>

// //         <select
// //           className="border p-2 rounded-lg text-sm"
// //           onChange={(e) => setFilters({ ...filters, target: e.target.value })}
// //         >
// //           <option value="">Department</option>
// //           <option value="HR">HR</option>
// //           <option value="IT">IT</option>
// //           <option value="Individual">Individual</option>
// //           <option value="sells">Sells</option>
// //         </select>

// //         <input
// //           type="date"
// //           className="border p-2 rounded-lg text-sm"
// //           onChange={(e) =>
// //             setFilters({ ...filters, publishDate: e.target.value })
// //           }
// //         />

// //         <button
// //           className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
// //           onClick={() =>
// //             setFilters({
// //               page: 1,
// //               limit: 10,
// //               searchTerm: "",
// //               status: "",
// //               dept: "",
// //               employee: "",
// //               date: "",
// //             })
// //           }
// //         >
// //           Reset Filters
// //         </button>
// //       </div>

// //       {/* TABLE SECTION */}
// //       <div className="bg-white rounded-xl shadow-sm border hidden md:block">
// //         <table className="w-full">
// //           <thead>
// //             <tr className="text-left bg-gray-100 text-sm text-gray-600">
// //               <th className="py-3 px-4">Title</th>
// //               <th className="py-3 px-4">Notice Type</th>
// //               <th className="py-3 px-4">Department</th>
// //               <th className="py-3 px-4">Published On</th>
// //               <th className="py-3 px-4">Status</th>
// //               <th className="py-3 px-4">Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {notices.map((item, i) => (
// //               <tr key={i} className="border-t text-sm hover:bg-gray-50">
// //                 <td className="py-3 px-4">{item.title}</td>
// //                 <td className="py-3 px-4">{item.noticeType}</td>
// //                 <td className="py-3 px-4">{item.target}</td>

// //                 <td className="py-3 px-4">
// //                   {dayjs(item.publishDate).format("DD-MMM-YYYY h:mm A")}
// //                 </td>
              
// //                 <td className="py-3 px-4">
// //                   {item.status === "Draft" ? (
// //                     <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
// //                       Draft
// //                     </span>
// //                   ) : (
// //                     <div className="flex items-center gap-2">
// //                       <label className="relative inline-flex items-center cursor-pointer">
// //                         <input
// //                           type="checkbox"
// //                           className="sr-only peer"
// //                           checked={item.status === "Published"} // checked if Published
// //                           onChange={() => handleToggle(item)} // toggle Published <-> Unpublished
// //                         />

// //                         {/* Background */}
// //                         <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>

// //                         {/* Knob */}
// //                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
// //                       </label>

// //                       <span className="text-sm font-medium">{item.status}</span>
// //                     </div>
// //                   )}
// //                 </td>

// //                 <td className="py-3 px-4 flex items-center gap-3 text-gray-600">
// //                   <Link to={`/notice/${item._id}`}>
// //                     <FiEye className="cursor-pointer hover:text-black" />
// //                   </Link>

// //                   <Link to={`/edit/${item._id}`}>
// //                     <FiEdit2 className="cursor-pointer hover:text-black" />
// //                   </Link>
// //                   <FiMoreVertical className="cursor-pointer hover:text-black" />
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* PAGINATION */}
// //       <div className="flex justify-center py-4 gap-2">
// //         {Array.from({ length: meta?.totalPages || 1 }, (_, i) => i + 1).map(
// //           (pageNo) => (
// //             <button
// //               key={pageNo}
// //               onClick={() => handlePageChange(pageNo)}
// //               className={`px-3 py-1 rounded-lg border ${
// //                 filters.page === pageNo
// //                   ? "bg-blue-600 text-white"
// //                   : "hover:bg-gray-100"
// //               }`}
// //             >
// //               {pageNo}
// //             </button>
// //           )
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NoticeManagement;




// /* eslint-disable no-unused-vars */

// import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   useGetAllNoticeQuery,
//   useToggleStatusMutation,
// } from "../../redux/notice/noticeApi";
// import dayjs from "dayjs";
// import { toast } from "sonner";

// const NoticeManagement = () => {
//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 10,
//     searchTerm: "",
//     status: "",
//     target: "",
//     employee: "",
//     publishDate: "",
//   });

//   const { data: notice, isLoading } = useGetAllNoticeQuery(filters);

//   const notices = notice?.data?.attributes?.data || [];
//   const meta = notice?.meta;

//   // Local state for optimistic UI
//   const [localNotices, setLocalNotices] = useState([]);

//   useEffect(() => {
//     if (notices) setLocalNotices(notices);
//   }, [notices]);

//   const handlePageChange = (p) => {
//     setFilters({ ...filters, page: p });
//   };

//   const [toggleStatus] = useToggleStatusMutation();

//   const handleToggle = async (item) => {
//     if (item.status === "Draft") return; // never toggle Draft

//     // Optimistically update UI
//     setLocalNotices((prev) =>
//       prev.map((n) =>
//         n._id === item._id
//           ? {
//               ...n,
//               status: n.status === "Published" ? "Unpublished" : "Published",
//             }
//           : n
//       )
//     );

//     try {
//       await toggleStatus(item._id).unwrap(); // backend toggles
//       toast.success("Status toggled successfully");
//     } catch (error) {
//       // Revert UI on error
//       setLocalNotices((prev) =>
//         prev.map((n) =>
//           n._id === item._id ? { ...n, status: item.status } : n
//         )
//       );
//       toast.error("Failed to toggle status");
//     }
//   };

//   return (
//     <div className="w-full p-4 md:p-6 min-h-screen">
//       {/* Top Section: Left Notice Text + Right Buttons */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         {/* Left Content */}
//         <div className="mb-4 md:mb-0">
//           <h2 className="text-xl font-semibold">Notice Management</h2>

//           <p className="text-sm text-gray-600">
//             Active Notices:{" "}
//             <span className="text-green-600 font-semibold">
//               {localNotices.filter((n) => n.status === "Published").length}
//             </span>{" "}
//             &nbsp; | &nbsp; Draft Notice:{" "}
//             <span className="text-orange-600 font-semibold">
//               {localNotices.filter((n) => n.status === "Draft").length}
//             </span>
//           </p>
//         </div>

//         {/* Right Buttons */}
//         <div className="flex gap-3">
//           <Link to="/add-notice">
//             <button className="bg-[#F95524] text-white px-4 py-2 rounded-lg hover:bg-orange-600">
//               + Create Notice
//             </button>
//           </Link>

//           <button
//             onClick={() => setFilters({ ...filters, status: "Draft", page: 1 })}
//             className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#F59E0B]"
//           >
//             All Draft Notice
//           </button>
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="flex flex-wrap gap-3 mb-5 justify-end">
//         <input
//           type="text"
//           placeholder="Search Notice..."
//           className="border p-2 rounded-lg text-sm"
//           onChange={(e) =>
//             setFilters({ ...filters, searchTerm: e.target.value })
//           }
//         />

//         <select
//           className="border p-2 rounded-lg text-sm"
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         >
//           <option value="">Status</option>
//           <option value="Published">Published</option>
//           <option value="Unpublished">Unpublished</option>
//           <option value="Draft">Draft</option>
//         </select>

//         <select
//           className="border p-2 rounded-lg text-sm"
//           onChange={(e) => setFilters({ ...filters, target: e.target.value })}
//         >
//           <option value="">Department</option>
//           <option value="HR">HR</option>
//           <option value="IT">IT</option>
//           <option value="Individual">Individual</option>
//           <option value="sells">Sells</option>
//         </select>

//         <input
//           type="date"
//           className="border p-2 rounded-lg text-sm"
//           onChange={(e) =>
//             setFilters({ ...filters, publishDate: e.target.value })
//           }
//         />

//         <button
//           className="border border-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
//           onClick={() =>
//             setFilters({
//               page: 1,
//               limit: 10,
//               searchTerm: "",
//               status: "",
//               target: "",
//               employee: "",
//               publishDate: "",
//             })
//           }
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="bg-white rounded-xl shadow-sm border hidden md:block">
//         <table className="w-full">
//           <thead>
//             <tr className="text-left bg-gray-100 text-sm text-gray-600">
//               <th className="py-3 px-4">Title</th>
//               <th className="py-3 px-4">Notice Type</th>
//               <th className="py-3 px-4">Department</th>
//               <th className="py-3 px-4">Published On</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {localNotices.map((item, i) => (
//               <tr key={i} className="border-t text-sm hover:bg-gray-50">
//                 <td className="py-3 px-4">{item.title}</td>
//                 <td className="py-3 px-4">{item.noticeType}</td>
//                 <td className="py-3 px-4">{item.target}</td>

//                 <td className="py-3 px-4">
//                   {dayjs(item.publishDate).format("DD-MMM-YYYY h:mm A")}
//                 </td>

//                 <td className="py-3 px-4">
//                   {item.status === "Draft" ? (
//                     <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
//                       Draft
//                     </span>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           className="sr-only peer"
//                           checked={item.status === "Published"} // checked if Published
//                           onChange={() => handleToggle(item)} // toggle Published <-> Unpublished
//                         />

//                         {/* Background */}
//                         <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>

//                         {/* Knob */}
//                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
//                       </label>

//                       <span className="text-sm font-medium">{item.status}</span>
//                     </div>
//                   )}
//                 </td>

//                 <td className="py-3 px-4 flex items-center gap-3 text-gray-600">
//                   <Link to={`/notice/${item._id}`}>
//                     <FiEye className="cursor-pointer hover:text-black" />
//                   </Link>

//                   <Link to={`/edit/${item._id}`}>
//                     <FiEdit2 className="cursor-pointer hover:text-black" />
//                   </Link>
//                   <FiMoreVertical className="cursor-pointer hover:text-black" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center py-4 gap-2">
//         {Array.from({ length: meta?.totalPages || 1 }, (_, i) => i + 1).map(
//           (pageNo) => (
//             <button
//               key={pageNo}
//               onClick={() => handlePageChange(pageNo)}
//               className={`px-3 py-1 rounded-lg border ${
//                 filters.page === pageNo
//                   ? "bg-blue-600 text-white"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {pageNo}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default NoticeManagement;





/* eslint-disable no-unused-vars */

import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  useGetAllNoticeQuery,
  useToggleStatusMutation,
  useDeleteNoticeMutation,
} from "../../redux/notice/noticeApi";
import dayjs from "dayjs";
import { toast } from "sonner";

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

  // Local state for optimistic UI
  const [localNotices, setLocalNotices] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null); // track which row's menu is open

  useEffect(() => {
    if (notices) setLocalNotices(notices);
  }, [notices]);

  const handlePageChange = (p) => {
    setFilters({ ...filters, page: p });
  };

  const [toggleStatus] = useToggleStatusMutation();
  const [deleteNotice] = useDeleteNoticeMutation();

  const handleToggle = async (item) => {
    if (item.status === "Draft") return;

    // Optimistically update UI
    setLocalNotices((prev) =>
      prev.map((n) =>
        n._id === item._id
          ? {
              ...n,
              status: n.status === "Published" ? "Unpublished" : "Published",
            }
          : n
      )
    );

    try {
      await toggleStatus(item._id).unwrap(); // backend toggles
      toast.success("Status toggled successfully");
    } catch (error) {
      // Revert UI on error
      setLocalNotices((prev) =>
        prev.map((n) =>
          n._id === item._id ? { ...n, status: item.status } : n
        )
      );
      toast.error("Failed to toggle status");
    }
  };

  const handleDelete = async (item) => {
    // Optimistically remove from UI
    const prevNotices = [...localNotices];
    setLocalNotices((prev) => prev.filter((n) => n._id !== item._id));
    setOpenMenuId(null);

    try {
      await deleteNotice(item._id).unwrap();
      toast.success("Notice deleted successfully");
    } catch (error) {
      // Revert on error
      setLocalNotices(prevNotices);
      toast.error("Failed to delete notice");
    }
  };

  return (
    <div className="w-full p-4 md:p-6 min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Notice Management</h2>
          <p className="text-sm text-gray-600">
            Active Notices:{" "}
            <span className="text-green-600 font-semibold">
              {localNotices.filter((n) => n.status === "Published").length}
            </span>{" "}
            &nbsp; | &nbsp; Draft Notice:{" "}
            <span className="text-orange-600 font-semibold">
              {localNotices.filter((n) => n.status === "Draft").length}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/add-notice">
            <button className="bg-[#F95524] text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              + Create Notice
            </button>
          </Link>
          <button
            onClick={() =>
              setFilters({ ...filters, status: "Draft", page: 1 })
            }
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 text-[#F59E0B]"
          >
            All Draft Notice
          </button>
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
              target: "",
              employee: "",
              publishDate: "",
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
            {localNotices.map((item, i) => (
              <tr key={i} className="border-t text-sm hover:bg-gray-50">
                <td className="py-3 px-4">{item.title}</td>
                <td className="py-3 px-4">{item.noticeType}</td>
                <td className="py-3 px-4">{item.target}</td>
                <td className="py-3 px-4">
                  {dayjs(item.publishDate).format("DD-MMM-YYYY h:mm A")}
                </td>

                <td className="py-3 px-4">
                  {item.status === "Draft" ? (
                    <span className="text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-xs font-medium">
                      Draft
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.status === "Published"}
                          onChange={() => handleToggle(item)}
                        />
                        <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                      </label>
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                  )}
                </td>

                <td className="py-3 px-4 relative flex items-center gap-3 text-gray-600">
                  <Link to={`/notice/${item._id}`}>
                    <FiEye className="cursor-pointer hover:text-black" />
                  </Link>
                  <Link to={`/edit/${item._id}`}>
                    <FiEdit2 className="cursor-pointer hover:text-black" />
                  </Link>

                  {/* 3-dot menu */}
                  <div className="relative">
                    <FiMoreVertical
                      className="cursor-pointer hover:text-black"
                      onClick={() =>
                        setOpenMenuId(openMenuId === item._id ? null : item._id)
                      }
                    />
                    {openMenuId === item._id && (
                      <div className="absolute right-0 top-6 bg-white border shadow-lg rounded-md z-10">
                        <button
                          className="px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
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
