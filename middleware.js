import { NextResponse } from "next/server"

export async function middleware(req) {
  // Add your middleware logic here
  try {
    const token = req.cookies.get("token")
    let response = await fetch(`${process.env.STRAPI_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!response.ok) {
      throw new Error("Unauthorized")
    }

    const responseJSON = await response.json()
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("user", JSON.stringify({ email: responseJSON.email }))

    console.log("responseJSON", responseJSON)

    return NextResponse.next({
      headers: requestHeaders,
    })
  } catch (error) {
    console.log("error", error)
    return NextResponse.redirect(new URL("/", req.url))
  }
}

export const config = {
  matcher: "/special-blogs/:path*",
}
