import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import theme from "./Style/theme";
import { privateRoutes } from "./Routes/GetPrivateRoutes";
import { publicRoutes } from "./Routes/PublicRoutes";
import { ThemeProvider } from "@mui/material";
import Loader from "./Components/Loader/Loader";

import { toast } from "react-toastify";
import Layout from "./Containers/Layout/Layout";

import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./PageNotFound/PageNotFound";
import useGoogleAnalytics from "./Hooks/googleAnalytics";

toast.configure();

const App = () => {
  // google analytics initiator
  useGoogleAnalytics()
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Loader />
        <BrowserRouter>
          <Suspense fallback={<Loader showLoader={true} />}>
            <Routes>
              {publicRoutes.map((privateRouteDetail, index) => {
                return (
                  <Route
                    key={index}
                    exact
                    path={privateRouteDetail.path}
                    element={privateRouteDetail.component}
                  />
                );
              })}
              {privateRoutes.map((privateRouteDetail, index) => {
                return (
                  <Route key={index} exact path="/" element={<PrivateRoute />}>
                    <Route
                      element={
                        privateRouteDetail.isLayoutNeeded ? (
                          <Layout privateRoutes={privateRoutes}>
                            <Suspense fallback={<Loader showLoader={true} />}>
                              <Outlet />
                            </Suspense>
                          </Layout>
                        ) : (
                          <Suspense fallback={<Loader showLoader={true} />}>
                            <Outlet />
                          </Suspense>
                        )
                      }
                    >
                      <Route
                        exact
                        path={privateRouteDetail.path}
                        element={
                          privateRouteDetail.children ? (
                            <Outlet />
                          ) : (
                            privateRouteDetail.component
                          )
                        }
                      >
                        {privateRouteDetail.children &&
                          privateRouteDetail.children.map(
                            (child, privateIndex) => {
                              return (
                                <Route
                                  key={privateIndex}
                                  exact
                                  path={child.path}
                                  element={
                                    child.children ? (
                                      <Outlet key={privateIndex} />
                                    ) : (
                                      child.component
                                    )
                                  }
                                >
                                  {child.children?.map(
                                    (nestedChild, nestedIndex) => (
                                      <Route
                                        key={nestedIndex}
                                        path={nestedChild.path}
                                        element={nestedChild.component}
                                      />
                                    )
                                  )}
                                </Route>
                              );
                            }
                          )}
                      </Route>
                    </Route>
                  </Route>
                );
              })}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
