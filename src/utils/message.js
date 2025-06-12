import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, name) => {
  try {
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: to,
      html: `
          <div style="font-family: Arial, sans-serif;">
          <h2>Hello 👋</h2>
          <p>This is a <strong>custom HTML</strong> email from your Express app.</p>
          <a href="https://yourwebsite.com" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Visit Site</a>
        </div>
`,
    });

    console.log(`Mail sent successfully: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
};

export default sendMail;
