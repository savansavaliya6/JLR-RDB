import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import WebFont from "webfontloader";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    WebFont.load({
      custom: {
        families: ["LandRoverMedium"],
      },
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
