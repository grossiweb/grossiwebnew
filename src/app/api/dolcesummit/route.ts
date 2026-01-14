import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, businessName, websiteUrl } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !businessName || !websiteUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate URL format
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    if (!urlRegex.test(websiteUrl)) {
      return NextResponse.json(
        { error: 'Invalid website URL format' },
        { status: 400 }
      )
    }

    const formId = '3' // Dolce Summit form ID
    const wpBaseUrl =
      process.env.GRAVITY_FORMS_BASE_URL ||
      process.env.WORDPRESS_BASE_URL ||
      (process.env.WORDPRESS_API_URL
        ? process.env.WORDPRESS_API_URL.replace(/\/graphql\/?$/, '')
        : undefined)

    const gfUsername = process.env.GRAVITY_FORMS_API_USERNAME
    const gfPassword = process.env.GRAVITY_FORMS_API_PASSWORD

    if (!wpBaseUrl || !gfUsername || !gfPassword) {
      return NextResponse.json(
        {
          error:
            'Gravity Forms integration is not configured. Please set GRAVITY_FORMS_BASE_URL (or WORDPRESS_API_URL), GRAVITY_FORMS_API_USERNAME, GRAVITY_FORMS_API_PASSWORD.',
        },
        { status: 500 }
      )
    }

    // Field ID mapping for Dolce Summit form (Form ID: 3)
    // Field 1: Name (with first and last name sub-fields)
    // Field 2: Email
    // Field 4: Phone
    // Field 5: Business Name
    // Field 6: Website URL
    const endpoint = `${wpBaseUrl.replace(/\/+$/, '')}/wp-json/gf/v2/forms/${formId}/submissions`
    const auth = Buffer.from(`${gfUsername}:${gfPassword}`).toString('base64')

    // Build payload with proper field structure
    // For Name field (compound field), use input_1.3 for first name and input_1.6 for last name
    const gfPayload: Record<string, string> = {
      'input_1.3': String(firstName), // First Name subfield
      'input_1.6': String(lastName),  // Last Name subfield
      'input_2': String(email),
      'input_4': String(phone || ''),
      'input_5': String(businessName),
      'input_6': String(websiteUrl),
    }

    console.log('Submitting to Gravity Forms (Dolce Summit):', {
      endpoint,
      payload: gfPayload,
    })

    const gfResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(gfPayload),
    })

    const gfJson = await gfResponse.json().catch(() => null)

    console.log('Gravity Forms response:', {
      status: gfResponse.status,
      ok: gfResponse.ok,
      body: gfJson,
    })

    if (!gfResponse.ok) {
      return NextResponse.json(
        {
          error: 'Failed to save submission to Gravity Forms',
          details: gfJson,
          status: gfResponse.status,
        },
        { status: 502 }
      )
    }

    // GF can return 200 with is_valid=false when validation fails.
    if (gfJson && gfJson.is_valid === false) {
      return NextResponse.json(
        {
          error: 'Gravity Forms validation failed',
          details: gfJson,
          message: 'Check that field IDs match your Gravity Form configuration',
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Form submitted successfully', gravityForms: gfJson },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting Dolce Summit form:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
