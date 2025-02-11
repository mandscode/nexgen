import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import routes from './auth/Routes';
import Header from './components/common/Header';
import { store } from './redux/store';
import HeaderMobile from './components/mobile/HeaderMobile';
import NavBottomMobile from './components/mobile/NavBottomMobile';
// import NotFound from './pages/NotFound';

interface RouteType {
  path: string;
  element: React.ReactNode;
  children?: RouteType[];
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Header />
      <HeaderMobile />
      <NavBottomMobile />
      <Routes>
        {routes.map((route: RouteType, index: number) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children && route.children.map((child: RouteType, childIndex: number) => (
              <Route key={childIndex} path={child.path} element={child.element} />
            ))}
          </Route>
        ))}
        {/* <Route path='*' exact={true} element={<NotFound />} /> */}
      </Routes>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
