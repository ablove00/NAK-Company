import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashbord";
import { AttributeAdd } from "../pages/AttributeAdd";
import { Attributes } from "../pages/Attributes";
import { Products } from "../pages/Products";
import { ProductAdd } from "../pages/ProductAdd";
import { SignIn } from "../pages/auth/SignIn";
import { SignUp } from "../pages/auth/SignUp";
import { AuthRoute } from "./AuthRoute"; 

export function AppRouter() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute requireAuth={true}>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path="/attributes"
        element={
          <AuthRoute requireAuth={true}>
            <Attributes />
          </AuthRoute>
        }
      />
      <Route
        path="/attributes/add"
        element={
          <AuthRoute requireAuth={true}>
            <AttributeAdd />
          </AuthRoute>
        }
      />
            <Route
        path="/products"
        element={
          <AuthRoute requireAuth={true}>
            <Products />
          </AuthRoute>
        }
      />
      <Route
        path="/products/add"
        element={
          <AuthRoute requireAuth={true}>
            <ProductAdd />
          </AuthRoute>
        }
      />
      <Route
        path="/signin"
        element={
          <AuthRoute requireAuth={false}>
            <SignIn />
          </AuthRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthRoute requireAuth={false}>
            <SignUp />
          </AuthRoute>
        }
      />
      {/* هر مسیر دیگه که داری */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
