import { type NextRequest, NextResponse } from "next/server"

const bookings: { id: string; name: string; email: string; service: string; date: string; message?: string }[] = [
  {
    id: "1",
    name: "أحمد محمد",
    email: "ahmed@example.com",
    service: "IT Solutions",
    date: "2024-01-15",
    message: "استشارة عن حلول تكنولوجيا المعلومات",
  },
  {
    id: "2",
    name: "فاطمة علي",
    email: "fatima@example.com",
    service: "Automation",
    date: "2024-01-20",
    message: "استفسار عن خدمات الأتمتة",
  },
]

export async function GET() {
  return NextResponse.json(bookings)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newBooking = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      service: body.service,
      date: body.date,
      message: body.message || "",
    }
    bookings.push(newBooking)
    return NextResponse.json(newBooking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "فشل في إضافة الحجز" }, { status: 400 })
  }
}
