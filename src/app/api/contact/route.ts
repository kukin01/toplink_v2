
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


function getValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(", ");
  }

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let data: Record<string, unknown>;

    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      data = {};

      for (const key of new Set(formData.keys())) {
        const values = formData.getAll(key);
        data[key] = values.length > 1 ? values : values[0];
      }
    } else {
      data = await request.json();
    }

    const fullName = getValue(data.fullName);
    const email = getValue(data.email);

    if (!fullName || !email) {
      return NextResponse.json(
        { message: "Please provide your name and email address." },
        { status: 400 }
      );
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactTo = process.env.CONTACT_TO;

    if (!smtpHost || !smtpUser || !smtpPass || !contactTo) {
      console.error("Missing SMTP environment variables.");

      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const fields: [string, string][] = [
      ["Full name", fullName],
      ["Company", getValue(data.company)],
      ["Email", email],
      ["Client type", getValue(data.clientType)],
      ["Services", getValue(data.services)],
      ["Project idea", getValue(data.projectIdea)],
      ["Budget", getValue(data.budget)],
      ["Timeline", getValue(data.timeline)],
      ["Project status", getValue(data.projectStatus)],
      ["Phone", getValue(data.phone)],
      ["Preferred contact method", getValue(data.contactMethod)],
      ["Additional information", getValue(data.additionalInfo)],
    ];

    const textContent = fields
      .map(
        ([label, value]) =>
          `${label}:\n${value || "Not provided"}`
      )
      .join("\n\n");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #030912; max-width: 650px;">
        <h2 style="color: #030912;">New project enquiry</h2>
        <p>You have received a new enquiry through your website.</p>

        <table style="width: 100%; border-collapse: collapse;">
          ${fields
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">
                    ${escapeHtml(label)}
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">
                    ${escapeHtml(value || "Not provided")}
                  </td>
                </tr>
              `
            )
            .join("")}
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: `"Toplink Digital Website" <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: `New project enquiry from ${fullName}`,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json(
      { message: "Your enquiry has been sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form email error:", error);

    return NextResponse.json(
      { message: "Something went wrong while sending your enquiry." },
      { status: 500 }
    );
  }
}
