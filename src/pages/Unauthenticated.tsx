import { Link } from "react-router-dom";

export const Unauthenticated = () => (
  <div className="text-center mt-20 text-2xl text-red-600">
    <p>You're not authorized to view this page.</p>
    <Link to="/login" className="text-blue-600 underline mt-4 block">
      Go to Login
    </Link>
  </div>
);
