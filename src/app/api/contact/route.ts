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

    const formId = process.env.GRAVITY_FORMS_FORM_ID
    const wpBaseUrl =
      process.env.GRAVITY_FORMS_BASE_URL ||
      process.env.WORDPRESS_BASE_URL ||
      (process.env.WORDPRESS_API_URL
        ? process.env.WORDPRESS_API_URL.replace(/\/graphql\/?$/, '')
        : undefined)

    const gfUsername = process.env.GRAVITY_FORMS_API_USERNAME
    const gfPassword = process.env.GRAVITY_FORMS_API_PASSWORD

    if (!formId || !wpBaseUrl || !gfUsername || !gfPassword) {
      return NextResponse.json(
        {
          error:
            'Gravity Forms integration is not configured. Please set GRAVITY_FORMS_FORM_ID, GRAVITY_FORMS_BASE_URL (or WORDPRESS_API_URL), GRAVITY_FORMS_API_USERNAME, GRAVITY_FORMS_API_PASSWORD.',
        },
        { status: 500 }
      )
    }

    // Field ID mapping (configure to match your Gravity Form field IDs)
    // Defaults match your provided GF field IDs, but can be overridden via env vars.
    const fieldName = process.env.GRAVITY_FORMS_FIELD_NAME_ID || '1'
    const fieldEmail = process.env.GRAVITY_FORMS_FIELD_EMAIL_ID || '3'
    const fieldPhone = process.env.GRAVITY_FORMS_FIELD_PHONE_ID || '4'
    const fieldEnquiry = process.env.GRAVITY_FORMS_FIELD_ENQUIRY_ID || '5'

    const endpoint = `${wpBaseUrl.replace(/\/+$/, '')}/wp-json/gf/v2/forms/${formId}/submissions`
    const auth = Buffer.from(`${gfUsername}:${gfPassword}`).toString('base64')

    const toGfInputKey = (fieldId: string) => {
      const trimmed = String(fieldId).trim()
      // Gravity Forms expects keys like "input_1" or "input_1.3" (for multi-input fields).
      return trimmed.startsWith('input_') ? trimmed : `input_${trimmed}`
    }

    const gfResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        input_values: {
          [toGfInputKey(fieldName)]: String(name),
          [toGfInputKey(fieldEmail)]: String(email),
          [toGfInputKey(fieldPhone)]: String(phone || ''),
          [toGfInputKey(fieldEnquiry)]: String(enquiry),
        },
      }),
    })

    const gfJson = await gfResponse.json().catch(() => null)

    if (!gfResponse.ok) {
      return NextResponse.json(
        {
          error: 'Failed to save submission to Gravity Forms',
          details: gfJson,
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
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', gravityForms: gfJson },
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