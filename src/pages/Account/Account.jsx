import React from "react";
import AcccountSection from "../../components/accountSection/AcccountSection";
import ProtectedRoute from "../../utils/ProtectedRoute";

const Account = () => {
  return (
    <ProtectedRoute>
      <AcccountSection />
    </ProtectedRoute>
  );
};

export default Account;
