import { getTweet } from "react-tweet/api"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const tweet = await getTweet(id)
    if (!tweet) {
      return NextResponse.json({ error: "Tweet not found" }, { status: 404 })
    }
    return NextResponse.json(tweet)
  } catch (error) {
    console.error("Error fetching tweet:", error)
    return NextResponse.json({ error: "Failed to fetch tweet" }, { status: 500 })
  }
}