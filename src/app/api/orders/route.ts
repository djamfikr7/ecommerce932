import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // In a real app, this would write to Sanity or a database
    // For now, we'll just return success
    // The order data is structured for Sanity document creation
    console.log("Order created:", body.orderNumber);

    return NextResponse.json({
      success: true,
      orderNumber: body.orderNumber,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
