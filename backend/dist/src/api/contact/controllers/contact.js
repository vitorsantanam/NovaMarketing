"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = {
    async send(ctx) {
        const { name, email, url, phone, msg } = ctx.request.body;
        if (!name || !email) {
            ctx.status = 400;
            ctx.body = { error: 'Name and email are required' };
            return;
        }
        const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
        const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465');
        const SMTP_USER = process.env.SMTP_USER || '';
        const SMTP_PASS = process.env.SMTP_PASS || '';
        const CONTACT_TO = process.env.CONTACT_TO || 'hola@novamarketing.es';
        const transporter = nodemailer_1.default.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: true,
            auth: { user: SMTP_USER, pass: SMTP_PASS },
        });
        // Email interno a Nova Marketing
        const internalHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
        <h2 style="font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:-0.02em;margin-bottom:24px;">
          Nueva consulta de contacto
        </h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:700;width:120px;">Nombre</td><td style="padding:8px 0;">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;">Email</td><td style="padding:8px 0;">${email}</td></tr>
          ${url ? `<tr><td style="padding:8px 0;font-weight:700;">Web</td><td style="padding:8px 0;">${url}</td></tr>` : ''}
          ${phone ? `<tr><td style="padding:8px 0;font-weight:700;">Teléfono</td><td style="padding:8px 0;">${phone}</td></tr>` : ''}
          ${msg ? `<tr><td style="padding:8px 0;font-weight:700;vertical-align:top;">Mensaje</td><td style="padding:8px 0;">${msg}</td></tr>` : ''}
        </table>
      </div>
    `;
        // Email de confirmación al usuario
        const confirmationHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#000;padding:32px 40px;">
          <h1 style="color:#fff;font-size:28px;font-weight:900;text-transform:uppercase;letter-spacing:-0.03em;margin:0;">
            NOVA<span style="color:#f97316;">MARKETING</span>
          </h1>
        </div>
        <div style="padding:40px;background:#fff;">
          <h2 style="font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:-0.02em;margin-bottom:16px;">
            ¡Hemos recibido tu consulta!
          </h2>
          <p style="color:#71717a;font-size:16px;line-height:1.6;margin-bottom:24px;">
            Hola <strong>${name}</strong>, gracias por contactar con nosotros.
            En breve uno de nuestros especialistas se pondrá en contacto contigo.
          </p>
          <div style="background:#f4f4f5;border-radius:8px;padding:24px;margin-bottom:32px;">
            <p style="margin:0;font-size:14px;color:#52525b;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px;">Tu mensaje</p>
            <p style="margin:0;color:#3f3f46;font-size:15px;line-height:1.6;">${msg || 'Sin mensaje adicional'}</p>
          </div>
          <a href="https://novamarketing.es" style="display:inline-block;background:#f97316;color:#fff;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;font-size:12px;padding:16px 32px;text-decoration:none;border-radius:4px;">
            VISITAR LA WEB →
          </a>
        </div>
        <div style="background:#f4f4f5;padding:24px 40px;">
          <p style="margin:0;font-size:12px;color:#a1a1aa;">
            © Nova Marketing · hola@novamarketing.es
          </p>
        </div>
      </div>
    `;
        try {
            await Promise.all([
                transporter.sendMail({
                    from: `"Nova Marketing Web" <${SMTP_USER}>`,
                    to: CONTACT_TO,
                    subject: `Nueva consulta de ${name}`,
                    html: internalHtml,
                    replyTo: email,
                }),
                transporter.sendMail({
                    from: `"Nova Marketing" <${SMTP_USER}>`,
                    to: email,
                    subject: '¡Hemos recibido tu consulta! - Nova Marketing',
                    html: confirmationHtml,
                }),
            ]);
            ctx.status = 200;
            ctx.body = { ok: true };
        }
        catch (err) {
            console.error('[Contact] Email error:', err.message);
            ctx.status = 500;
            ctx.body = { error: 'Failed to send email' };
        }
    },
};
