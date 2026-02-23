import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PIXEL_ID = "1439493221188584";
const TEST_EVENT_CODE = "TEST10893";
const GRAPH_API_VERSION = "v21.0";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get("META_CAPI_ACCESS_TOKEN");
    if (!accessToken) {
      return new Response(
        JSON.stringify({ ok: false, reason: "no_token" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const {
      event_name,
      event_id,
      event_source_url,
      user_agent,
      fbp,
      fbc,
      custom_data,
    } = body;

    if (!event_name) {
      return new Response(
        JSON.stringify({ error: "event_name is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const eventData: Record<string, unknown> = {
      event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id,
      event_source_url,
      action_source: "website",
      user_data: {
        client_user_agent: user_agent,
        ...(fbp && { fbp }),
        ...(fbc && { fbc }),
      },
    };

    if (custom_data && Object.keys(custom_data).length > 0) {
      eventData.custom_data = custom_data;
    }

    const payload: Record<string, unknown> = {
      data: [eventData],
      test_event_code: TEST_EVENT_CODE,
    };

    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${accessToken}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    return new Response(
      JSON.stringify({ ok: true, result }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
