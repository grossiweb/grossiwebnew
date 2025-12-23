import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, enquiry } = body

    // Validate required fields
    if (!name || !email || !enquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the submission for now (you can integrate with email service or database later)
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      enquiry,
      submittedAt: new Date().toISOString()
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 