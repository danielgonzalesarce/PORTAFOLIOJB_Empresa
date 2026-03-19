import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// API route for contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, company, message } = req.body;

  // Basic backend validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de correo electrónico inválido." });
  }

  try {
    // Configure Nodemailer transporter
    // Note: For Gmail, you might need an App Password if 2FA is enabled
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "consultoriayasesoriajb@gmail.com",
      subject: "Nueva solicitud de contacto",
      text: `
        Nueva solicitud de contacto recibida:

        - Nombre: ${name}
        - Correo: ${email}
        - Teléfono: ${phone}
        - Empresa: ${company || "No especificada"}
        - Mensaje: ${message}
      `,
      html: `
        <h3>Nueva solicitud de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Empresa:</strong> ${company || "No especificada"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Solicitud enviada con éxito." });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ error: "Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde." });
  }
});

// Setup Vite or static files
async function setup() {
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    // Dynamic import to avoid vite in production bundle
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

// Only start the server if not on Vercel
if (!process.env.VERCEL) {
  setup().then(() => {
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
}

export default app;
