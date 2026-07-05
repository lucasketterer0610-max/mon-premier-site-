const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
app.use(cors());
app.use(express.json());
app.post('/inscription', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ erreur: 'Email manquant' });
    }

    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'lucasketterer0610@gmail.com',
        subject: '🔥 Nouvelle inscription sur LucasApp !',
        html: `<h1>Nouveau inscrit !</h1><p>Email : ${email}</p>`
    });

    res.json({ succès: true });
});
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
