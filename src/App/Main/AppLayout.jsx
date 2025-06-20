import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PageTitleUpdater from "./TitleUpdater";
import { createToolpadRouter } from "./toolpadRouter";
import React from "react";
import { customTheme } from "../../Theme";
import ToolbarActionsMenu from "./ToolbarActionsMenu";
import { useMediaQuery } from "@mui/material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import {Box} from "@mui/material";
import navigation from "../AICHAT/ChatNavigation"
import TastyMundoLogo from "../../assets/TastyMundo.png"

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const router = createToolpadRouter(navigate, location);

  const isSmallScreen = useMediaQuery("(max-width:380px)");

  return (
    <AppProvider
      theme={customTheme}
      router={router}
      branding={{
        title: !isSmallScreen && "TASTY MUNDO",
        logo: <img src={TastyMundoLogo} alt="logo" className="w-8 h-8" />,
      }}
      navigation={navigation}
      currentPathname={location.pathname}
      onNavigate={(pathname) => {
        if (location.pathname !== pathname) {
          navigate(pathname);
        }
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActionsMenu,
        }}
      >
        <PageTitleUpdater />
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
};

export default AppLayout;
