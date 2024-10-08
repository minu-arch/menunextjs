import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const fontData = await fetch(
      new URL("../../fonts/Blinker-Regular.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            fontSize: 20,
            fontWeight: 600,
            gap: 0,
            padding: 0,
            margin: 0,
            background: "linear-gradient(90deg, #FFC593 0%, #BC7198 100%)",
          }}
        >
          <div
            style={{
              left: 42,
              top: 42,
              position: "absolute",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "black",
                    borderTopLeftRadius: 10,
                  }}
                />
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "black",
                    borderTopRightRadius: 10,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "black",
                    borderBottomLeftRadius: 10,
                  }}
                />
                <span
                  style={{
                    width: 15,
                    height: 15,
                    background: "black",
                    borderBottomRightRadius: 10,
                  }}
                />
              </div>
            </div>

            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
              }}
            >
              minufy.site
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontFamily: "Blinker",
                width: 500,
                height: 180,
                textAlign: "center",
                fontSize: 55,
                fontWeight: 600,
                padding: "10px 20px",
                borderRadius: 10,
                background: "#FFC593",
                color: "#000",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              Highly customizable dashboard
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 500,
        fonts: [
          {
            name: "Blinker",
            data: fontData,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: unknown) {
    console.error(
      `Error generating image: ${e instanceof Error ? e.message : "Unknown error"}`,
    );
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
