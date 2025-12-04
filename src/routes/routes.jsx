import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import OverviewPage from "../page/Dashboard/OverviewPage";
 
 
 
 

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
        element: <OverviewPage />,
      },
     
      
      
      
      ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
     
  },
]);

export default router;
