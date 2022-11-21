import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.layout === undefined ? (
                <route.component />
              ) : (
                <route.layout>
                  <route.component />
                </route.layout>
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
