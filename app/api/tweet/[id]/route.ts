import { getTweet } from "react-tweet/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tweet = await getTweet(params.id)
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 })
    }
    return NextResponse.json(tweet)
  } catch (error) {
    console.error("Error fetching tweet:", error)
    return NextResponse.json({ error: "Failed to fetch tweet" }, { status: 500 })
  }
}