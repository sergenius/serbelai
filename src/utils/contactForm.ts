const CONTACT_EMAIL = 'serbelcloud@gmail.com';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key] ?? '')}`
    )
    .join('&');

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function openMailtoFallback(payload: ContactPayload) {
  const subject = encodeURIComponent('Contact from serbelAI website');
  const mailBody = encodeURIComponent(
    `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${mailBody}`;
}

/**
 * Submit via Netlify Forms (no API keys / EmailJS config).
 * If Netlify isn't available (local Vite), falls back to mailto.
 */
export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const body = encode({
    'form-name': 'contact',
    name: payload.name,
    email: payload.email,
    message: payload.message,
    'bot-field': '',
  });

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (response.ok) {
      return;
    }
  } catch (error) {
    console.warn('Netlify Forms submit failed, using mailto fallback', error);
  }

  openMailtoFallback(payload);
}
