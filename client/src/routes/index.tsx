import LeftBar from "@/components/LeftBar";
import Container from "@/pages/dashboard/Container";
import { Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";
import StoreInit from "../pages/StoreInit";
import DashBoard from "../pages/dashboard";
import List from "../pages/dashboard/List";

const Routes = () => {
  return useRoutes([
    {
      element: (
        <Suspense>
          <StoreInit>
            <LeftBar>
              <Outlet />
            </LeftBar>
          </StoreInit>
        </Suspense>
      ),
      children: [
        { path: "/", element: <DashBoard /> },
        { path: "/list/:listId", element: <List /> },
        { path: "/container", element: <Container /> },
      ],
    },
  ]);
};

export default Routes;
