import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, enquiry, captchaToken } = body

    // Validate required fields
    if (!name || !email || !enquiry) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      )
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || '6LcSTUwsAAAAANhyoETUhuqj6LmOiycP1V8iSXG2'
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${recaptchaSecret}&response=${captchaToken}`,
      }
    )

    const recaptchaData = await recaptchaResponse.json()

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
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

    // Format phone to (###) ###-#### as required by GF "standard" phone format
    const digits = String(phone || '').replace(/\D/g, '')
    const formattedPhone = digits.length === 10
      ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      : digits.length === 11 && digits[0] === '1'
        ? `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
        : String(phone || '')

    // Per Gravity Forms REST API v2 documentation:
    // https://docs.gravityforms.com/submitting-forms-with-rest-api-v2/
    // Payload should contain flat input_X keys (e.g. input_1, input_3, etc.)
    const gfPayload: Record<string, string> = {
      [`input_${fieldName}`]: String(name),
      [`input_${fieldEmail}`]: String(email),
      [`input_${fieldPhone}`]: formattedPhone,
      [`input_${fieldEnquiry}`]: String(enquiry),
    }

    console.log('Submitting to Gravity Forms:', {
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