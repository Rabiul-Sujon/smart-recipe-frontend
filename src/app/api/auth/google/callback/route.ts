import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin || "http://localhost:3000";
  const redirectUri = `${origin}/api/auth/google/callback`;
  const backendApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      console.error("Google OAuth token error:", tokenData);
      return NextResponse.redirect(`${origin}/login?error=google_token_failed`);
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userRes.json();

    if (!googleUser.email) {
      console.error("Google OAuth userinfo error:", googleUser);
      return NextResponse.redirect(`${origin}/login?error=google_userinfo_failed`);
    }

    const backendRes = await fetch(`${backendApiUrl}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: googleUser.name || googleUser.email.split("@")[0], email: googleUser.email }),
    });

    const backendData = await backendRes.json();

    if (!backendRes.ok || !backendData.token) {
      console.error("Backend auth error:", backendData);
      return NextResponse.redirect(`${origin}/login?error=backend_auth_failed`);
    }

    const redirectUrl = new URL(`${origin}/auth/google-success`);
    redirectUrl.searchParams.set("token", backendData.token);
    redirectUrl.searchParams.set("user", encodeURIComponent(JSON.stringify(backendData.user)));

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Google OAuth callback exception:", error);
    return NextResponse.redirect(`${origin}/login?error=google_failed`);
  }
}