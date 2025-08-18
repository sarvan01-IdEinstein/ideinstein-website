// Email configuration (nodemailer will be installed during backend development)
// import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Create transporter (will be implemented during backend development)
// const transporter = nodemailer.createTransporter(emailConfig);

// Email templates
export const emailTemplates = {
  contactNotification: (data: any) => ({
    from: process.env.SMTP_FROM || 'noreply@ideinstein.com',
    to: 'info@ideinstein.com',
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E40AF;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #1E40AF;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  }),

  consultationNotification: (data: any) => ({
    from: process.env.SMTP_FROM || 'noreply@ideinstein.com',
    to: 'info@ideinstein.com',
    subject: `New Consultation Request - ${data.serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1E40AF;">New Consultation Request</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Service Type:</strong> ${data.serviceType}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          ${data.preferredContactMethod ? `<p><strong>Preferred Contact:</strong> ${data.preferredContactMethod}</p>` : ''}
          <p><strong>Project Description:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #1E40AF;">
            ${data.projectDescription.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          Submitted at: ${new Date().toLocaleString()}
        </p>
      </div>
    `,
  }),

  consultationConfirmation: (data: any) => ({
    from: process.env.SMTP_FROM || 'noreply@ideinstein.com',
    to: data.email,
    subject: 'Consultation Request Received - IdEinstein',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #1E40AF;">IdEinstein</h1>
          <p style="color: #64748b;">Where Ideas Take Shape</p>
        </div>
        
        <h2 style="color: #1E40AF;">Thank you for your consultation request!</h2>
        
        <p>Dear ${data.name},</p>
        
        <p>We have received your consultation request for <strong>${data.serviceType}</strong> and our team will review it shortly.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1E40AF; margin-top: 0;">Request Summary:</h3>
          <p><strong>Service:</strong> ${data.serviceType}</p>
          <p><strong>Timeline:</strong> ${data.timeline}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
        </div>
        
        <p>Our engineering experts will contact you within 24 hours to discuss your project requirements and schedule a consultation.</p>
        
        <p>If you have any urgent questions, please don't hesitate to contact us at:</p>
        <ul>
          <li>Email: info@ideinstein.com</li>
          <li>Phone: +49 (151) 4222-7760</li>
        </ul>
        
        <p>Best regards,<br>
        The IdEinstein Team</p>
        
        <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; color: #64748b; font-size: 14px;">
          <p>IdEinstein - Professional Engineering Services<br>
          Walter-Petri-Ring 49, 65232 Taunusstein, Germany</p>
        </div>
      </div>
    `,
  }),

  welcomeNewsletter: (data: any) => ({
    from: process.env.SMTP_FROM || 'noreply@ideinstein.com',
    to: data.email,
    subject: 'Welcome to IdEinstein Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #1E40AF;">Welcome to IdEinstein!</h1>
          <p style="color: #64748b;">Where Ideas Take Shape</p>
        </div>
        
        <p>Dear ${data.name || 'Subscriber'},</p>
        
        <p>Thank you for subscribing to the IdEinstein newsletter! You'll now receive:</p>
        
        <ul>
          <li>Latest engineering insights and industry trends</li>
          <li>Case studies from our successful projects</li>
          <li>Technical tips and best practices</li>
          <li>Updates on new services and capabilities</li>
          <li>Exclusive content for our community</li>
        </ul>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h3 style="color: #1E40AF; margin-top: 0;">Ready to start your next project?</h3>
          <p>Our engineering experts are here to help transform your ideas into reality.</p>
          <a href="https://ideinstein.com/contact" style="background: #1E40AF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Get in Touch</a>
        </div>
        
        <p>Best regards,<br>
        The IdEinstein Team</p>
        
        <div style="border-top: 1px solid #e2e8f0; margin-top: 30px; padding-top: 20px; color: #64748b; font-size: 14px;">
          <p>You can <a href="https://ideinstein.com/unsubscribe?email=${data.email}">unsubscribe</a> at any time.</p>
          <p>IdEinstein - Professional Engineering Services<br>
          Walter-Petri-Ring 49, 65232 Taunusstein, Germany</p>
        </div>
      </div>
    `,
  }),
};

// Send email function (will be implemented during backend development)
export async function sendEmail(template: any) {
  try {
    // TODO: Implement with nodemailer during backend development
    // const result = await transporter.sendMail(template);
    console.log('Email would be sent:', template.subject);
    return { success: true, messageId: 'mock-id' };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Specific email functions
export const sendContactNotification = (data: any) => 
  sendEmail(emailTemplates.contactNotification(data));

export const sendConsultationNotification = (data: any) => 
  sendEmail(emailTemplates.consultationNotification(data));

export const sendConsultationConfirmation = (data: any) => 
  sendEmail(emailTemplates.consultationConfirmation(data));

export const sendWelcomeEmail = (data: any) => 
  sendEmail(emailTemplates.welcomeNewsletter(data));