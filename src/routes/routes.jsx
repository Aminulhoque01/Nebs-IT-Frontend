import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import NoticeManagement from "../page/Notice/Notice";
import CreateNotice from "../page/AddNotice/AddNotice";
 
 
 
 

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      
      <MainLayout />
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <NoticeManagement />,
      },
      {
        path:"/add-notice",
        element: <CreateNotice />,
      },
     
      
      
      
      ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
     
  },
]);

export default router;
