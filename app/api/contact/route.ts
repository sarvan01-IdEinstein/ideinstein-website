import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { zohoCRM } from '@/lib/zoho/index';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subject: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    
    // Create contact in Zoho CRM
    console.log('📝 Creating contact in Zoho CRM...')
    
    const [firstName, ...lastNameParts] = validatedData.name.split(' ')
    const lastName = lastNameParts.join(' ') || ''
    
    const zohoContact = await zohoCRM.createContact({
      email: validatedData.email,
      first_name: firstName,
      last_name: lastName,
      phone: validatedData.phone,
      company: validatedData.company
    })
    
    console.log('✅ Contact created in Zoho CRM:', zohoContact.id)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully. We will get back to you soon!',
        contactId: zohoContact.id 
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation error',
          errors: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}