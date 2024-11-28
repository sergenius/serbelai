import emailjs from 'emailjs-com';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: EmailData) => {
  if (!import.meta.env.VITE_EMAILJS_SERVICE_ID || 
      !import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 
      !import.meta.env.VITE_EMAILJS_USER_ID) {
    throw new Error('EmailJS configuration is missing');
  }

  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'serbelcloud@gmail.com',
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }

    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};