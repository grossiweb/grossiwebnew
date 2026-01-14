import { NextRequest, NextResponse } from 'next/server'

/**
 * Test endpoint to verify Gravity Forms field IDs
 * Access: GET /api/test-gf
 * This will fetch the form structure to help you verify the correct field IDs
 */
export async function GET(request: NextRequest) {
  try {
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
          error: 'Gravity Forms integration is not configured.',
        },
        { status: 500 }
      )
    }

    const endpoint = `${wpBaseUrl.replace(/\/+$/, '')}/wp-json/gf/v2/forms/${formId}`
    const auth = Buffer.from(`${gfUsername}:${gfPassword}`).toString('base64')

    console.log('Fetching form structure from:', endpoint)

    const gfResponse = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
    })

    const gfJson = await gfResponse.json()

    console.log('Form structure response:', {
      status: gfResponse.status,
      ok: gfResponse.ok,
    })

    if (!gfResponse.ok) {
      return NextResponse.json(
        {
          error: 'Failed to fetch form structure',
          details: gfJson,
        },
        { status: gfResponse.status }
      )
    }

    // Extract field information for easier debugging
    const fields = gfJson.fields?.map((field: any) => ({
      id: field.id,
      label: field.label,
      type: field.type,
      inputs: field.inputs?.map((input: any) => ({
        id: input.id,
        label: input.label,
      })),
    }))

    return NextResponse.json(
      {
        formId: gfJson.id,
        title: gfJson.title,
        fields: fields,
        notifications: gfJson.notifications,
        hasNotifications: Object.keys(gfJson.notifications || {}).length > 0,
        rawForm: gfJson, // Full form data for detailed inspection
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching form structure:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    )
  }
}
