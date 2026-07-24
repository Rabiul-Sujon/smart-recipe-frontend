import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("http://localhost:3000/login?error=no_code");
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: "http://localhost:3000/api/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Google OAuth token error:", tokenData);
      return NextResponse.redirect("http://localhost:3000/login?error=google_token_failed");
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();

    if (!googleUser.email) {
      console.error("Google OAuth userinfo error:", googleUser);
      return NextResponse.redirect("http://localhost:3000/login?error=google_userinfo_failed");
    }

    const backendRes = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: googleUser.name || googleUser.email.split("@")[0], email: googleUser.email }),
    });

    const backendData = await backendRes.json();

    if (!backendRes.ok || !backendData.token) {
      console.error("Backend auth error:", backendData);
      return NextResponse.redirect("http://localhost:3000/login?error=backend_auth_failed");
    }

    const redirectUrl = new URL("http://localhost:3000/auth/google-success");
    redirectUrl.searchParams.set("token", backendData.token);
    redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(backendData.user)));

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Google OAuth callback exception:", error);
    return NextResponse.redirect("http://localhost:3000/login?error=google_failed");
  }
}