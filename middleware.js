import { authMiddleware } from "@clerk/nextjs"
 
export default authMiddleware({
  publicRoutes: ["/", "/api/check-cap", "/sign-in", "/sign-up"]
})
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
}