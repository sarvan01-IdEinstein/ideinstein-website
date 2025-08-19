import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Dynamic import to prevent build-time execution
const getZohoCRM = async () => {
  const { zohoCRM } = await import('@/lib/zoho/index');
  return zohoCRM;
};

// Consultation request validation schema
const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().optional(),
  serviceType: z.enum([
    'research-development',
    'cad-modeling',
    'machine-design',
    'biw-design',
    'finite-element-cfd',
    'gdt-tolerance',
    '3d-printing',
    'supplier-sourcing',
    'technical-documentation'
  ]),
  projectDescription: z.string().min(20, 'Please provide more details about your project'),
  timeline: z.enum(['urgent', '1-2-weeks', '1-month', '2-3-months', 'flexible']),
  budget: z.enum(['under-5k', '5k-15k', '15k-50k', '50k-plus', 'discuss']),
  preferredContactMethod: z.enum(['email', 'phone', 'video-call']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check if Zoho is configured
    if (!process.env.ZOHO_CLIENT_ID || !process.env.ZOHO_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'Zoho configuration not available' },
        { status: 503 }
      )
    }

    const zohoCRM = await getZohoCRM();
    
    const body = await request.json();
    
    // Validate input
    const validatedData = consultationSchema.parse(body);
    
    // Create lead in Zoho CRM for consultation request
    console.log('📝 Creating consultation lead in Zoho CRM...')
    
    const [firstName, ...lastNameParts] = validatedData.name.split(' ')
    const lastName = lastNameParts.join(' ') || ''
    
    // Map service types to readable names
    const serviceTypeMap = {
      'research-development': 'Research & Development',
      'cad-modeling': 'CAD Modeling',
      'machine-design': 'Machine Design',
      'biw-design': 'BIW Design',
      'finite-element-cfd': 'FEA & CFD Analysis',
      'gdt-tolerance': 'GD&T and Tolerance Analysis',
      '3d-printing': '3D Printing Services',
      'supplier-sourcing': 'Supplier Sourcing',
      'technical-documentation': 'Technical Documentation'
    }
    
    const serviceTypeName = serviceTypeMap[validatedData.serviceType] || validatedData.serviceType
    
    // Create lead in Zoho CRM
    const zohoLead = await zohoCRM.createLead({
      first_name: firstName,
      last_name: lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      lead_source: 'Website Consultation Request',
      lead_status: 'New',
      industry: 'Engineering Services',
      description: `Consultation Request for ${serviceTypeName}
      
Project Description: ${validatedData.projectDescription}
Timeline: ${validatedData.timeline}
Budget: ${validatedData.budget}
Preferred Contact: ${validatedData.preferredContactMethod || 'Not specified'}

Submitted via website consultation form.`
    })
    
    console.log('✅ Consultation lead created in Zoho CRM:', zohoLead.id)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consultation request submitted successfully! Our team will contact you within 24 hours.',
        leadId: zohoLead.id,
        serviceType: serviceTypeName
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

    console.error('Consultation request error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}// 
Prevent this route from being statically analyzed during build
export const dynamic = 'force-dynamic'