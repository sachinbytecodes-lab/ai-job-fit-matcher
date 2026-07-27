import { withAuth } from "next-auth/middleware";

export default withAuth(function proxy(req) {
  return;
});

export const config = {
  matcher: ["/dashboard/:path*", "/analyze/:path*", "/results/:path*"],
};
