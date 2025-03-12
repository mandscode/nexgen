import emailjs from "@emailjs/browser";

// Your EmailJS configuration (replace with your actual keys)
const SERVICE_ID = "service_ue2vypj";
const TEMPLATE_ID = "template_lpi6rer";
const USER_ID = "FGPT6kgkOGtLZOph9";

export const sendEmail = async (to: string, subject: string, message: string) => {
  try {
    const templateParams = {
      to_email: to,
      subject: subject,
      message: message,
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
