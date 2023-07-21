// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

// ** ThemeConfig Import
import themeConfig from "@configs/themeConfig";

const initialMenuCollapsed = () => {
  const item = window.sessionStorage.getItem("menuCollapsed");
  //** Parse stored json or if none return initialValue
  //** Parse stored json or if none return initialValue

  return item ? JSON.parse(item) : themeConfig.layout.menu.isCollapsed;
};

const initialDirection = () => {
  const item = window.sessionStorage.getItem("direction");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.isRTL;
};

const initialSkin = () => {
  const item = window.sessionStorage.getItem("skin");
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : themeConfig.layout.skin;
};

// const initialReportTable = () => {
//   const item = window.sessionStorage.getItem("reportTable");
//   return item ? JSON.parse(item) : themeConfig.layout.reportTable;
// };

// const initialBrandName = () => {
//   const item = window.sessionStorage.getItem("brandName");
//   return item ? JSON.parse(item) : themeConfig.layout.brandName;
// };
export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    skin: initialSkin(),
    isRTL: initialDirection(),
    layout: themeConfig.layout.type,
    lastLayout: themeConfig.layout.type,
    menuCollapsed: initialMenuCollapsed(),
    footerType: themeConfig.layout.footer.type,
    navbarType: themeConfig.layout.navbar.type,
    menuHidden: themeConfig.layout.menu.isHidden,
    contentWidth: themeConfig.layout.contentWidth,
    navbarColor: themeConfig.layout.navbar.backgroundColor,
    reportTable: "",
    reportChart: [],
    brandName: "",
  },
  reducers: {
    handleRTL: (state, action) => {
      state.isRTL = action.payload;
      window.sessionStorage.setItem("direction", JSON.stringify(action.payload));
    },
    handleSkin: (state, action) => {
      state.skin = action.payload;
      window.sessionStorage.setItem("skin", JSON.stringify(action.payload));
    },
    handleLayout: (state, action) => {
      state.layout = action.payload;
    },
    handleFooterType: (state, action) => {
      state.footerType = action.payload;
    },
    handleNavbarType: (state, action) => {
      state.navbarType = action.payload;
    },
    handleMenuHidden: (state, action) => {
      state.menuHidden = action.payload;
    },
    handleLastLayout: (state, action) => {
      state.lastLayout = action.payload;
    },
    handleNavbarColor: (state, action) => {
      state.navbarColor = action.payload;
    },
    handleContentWidth: (state, action) => {
      state.contentWidth = action.payload;
    },
    handleMenuCollapsed: (state, action) => {
      state.menuCollapsed = action.payload;
      window.sessionStorage.setItem(
        "menuCollapsed",
        JSON.stringify(action.payload)
      );
    },

    handleReportChart: (state, action) => {
      state.reportChart = [...state.reportChart, action.payload];
    },
    handleReportTable: (state, action) => {
      state.reportTable = [...state.reportTable, action.payload];
    },

    // handleReportTable: (state, action) => {
    //   state.reportTable = action.payload;
    //   window.sessionStorage.setItem(
    //     "reportTable",
    //     JSON.stringify(action.payload)
    //   );
    // },

    handleBrandName: (state, action) => {
      state.brandName = action.payload;
      // window.sessionStorage.setItem("brandName", JSON.stringify(action.payload));
    },
  },
});

export const {
  handleRTL,
  handleSkin,
  handleLayout,
  handleLastLayout,
  handleMenuHidden,
  handleNavbarType,
  handleFooterType,
  handleNavbarColor,
  handleContentWidth,
  handleMenuCollapsed,
  handleReportTable,
  handleReportChart,
  handleBrandName,
} = layoutSlice.actions;

export default layoutSlice.reducer;
