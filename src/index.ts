import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { env } from "./env.js";

const app = new Hono();

const authorizationUrl = env.AUTHORIZATION_URL?.replace(
  "${YOUR_USER_BOUND_VALUE}",
  env.APP_SECRET
);

app.get("/callback", async (ctx) => {
  const { code, state } = ctx.req.query();

  const res = await fetch("https://auth.atlassian.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: env.CLIENT_ID,
      client_secret: env.CLIENT_SECRET,
      code: code,
      redirect_uri: "http://localhost:52225/callback",
    }),
  });

  if (!res.ok) {
    return ctx.text(
      JSON.stringify(
        {
          status: res.status,
          statusText: res.statusText,
          queryParams: ctx.req.query(),
        },
        null,
        2
      ),
      500
    );
  }

  return ctx.text(JSON.stringify(ctx.req.query(), null, 2));
});

serve(
  {
    fetch: app.fetch,
    port: 52225,
  },
  () => {
    console.log(`Visit ${authorizationUrl}`);
  }
);
