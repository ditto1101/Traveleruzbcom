import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-[#0F1F3D]/10 mb-4">404</div>
        <h1 className="text-[#0F1F3D] mb-3" style={{ fontSize: "1.8rem", fontWeight: 700 }}>
          Page Not Found
        </h1>
        <p className="text-[#5A6478] mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
