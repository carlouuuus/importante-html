const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));
app.use(express.static(__dirname));

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message, website } = req.body || {};

        // Campo trampa para reducir el spam automático.
        if (website) {
            return res.status(400).json({
                error: "No se pudo procesar el mensaje."
            });
        }

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
        ) {
            return res.status(400).json({
                error: "Completa todos los campos correctamente."
            });
        }

        const datos = {
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim()
        };

        if (!datos.name || !datos.email || !datos.subject || !datos.message) {
            return res.status(400).json({
                error: "Completa todos los campos del formulario."
            });
        }

        if (
            datos.name.length > 80 ||
            datos.email.length > 160 ||
            datos.subject.length > 120 ||
            datos.message.length > 2000 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)
        ) {
            return res.status(400).json({
                error: "Revisa los datos: alguno no es válido o es demasiado largo."
            });
        }

        if (!DISCORD_WEBHOOK_URL) {
            console.error("Falta configurar DISCORD_WEBHOOK_URL en .env");
            return res.status(500).json({
                error: "El contacto no está configurado todavía. Inténtalo más tarde."
            });
        }

        let webhook;

        try {
            webhook = new URL(DISCORD_WEBHOOK_URL);
        } catch {
            return res.status(500).json({
                error: "La configuración del contacto no es válida."
            });
        }

        if (
            webhook.protocol !== "https:" ||
            webhook.hostname !== "discord.com" ||
            !webhook.pathname.startsWith("/api/webhooks/")
        ) {
            console.error("La URL del webhook de Discord no es válida.");
            return res.status(500).json({
                error: "La configuración del contacto no es válida."
            });
        }

        const discordResponse = await fetch(ISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                allowed_mentions: { parse: [] },
                embeds: [
                    {
                        title: "📩 Nuevo mensaje de Pingui Store",
                        color: 15429098,
                        fields: [
                            {
                                name: "Nombre",
                                value: datos.name,
                                inline: true
                            },
                            {
                                name: "Correo electrónico",
                                value: datos.email,
                                inline: true
                            },
                            {
                                name: "Asunto",
                                value: datos.subject
                            },
                            {
                                name: "Mensaje",
                                value: datos.message
                            }
                        ],
                        footer: {
                            text: "Formulario de contacto · Pingui Store"
                        },
                        timestamp: new Date().toISOString()
                    }
                ]
            })
        });

        if (!discordResponse.ok) {
            console.error("Discord rechazó el mensaje. Código:", discordResponse.status);
            return res.status(502).json({
                error: "No se pudo enviar el mensaje a Discord. Inténtalo de nuevo."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Mensaje enviado correctamente."
        });
    } catch (error) {
        console.error("Error en el formulario de contacto:", error.message);
        return res.status(500).json({
            error: "Ocurrió un error al enviar el mensaje. Inténtalo más tarde."
        });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "contacto.html"));
});

app.listen(PORT, () => {
    console.log(`Pingui Store disponible en http://localhost:${PORT}`);
});const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;