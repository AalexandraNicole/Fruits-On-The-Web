const { getBody } = require("../utils/utils");
const nodemailer = require("nodemailer");
const { gmailPas, gmailUser } = require("../environment");

async function sendEmail(senderEmail, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: gmailUser,
        pass: gmailPas,
      },
    });

    const content = {
      message: message.message,
      email: senderEmail,
    };

    const mailOptions = {
      from: senderEmail,
      to: "frowfrowcontact@gmail.com",
      subject: "Contact Form Submission FrOW",
      text: JSON.stringify(content),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
}

async function contactHandler(req, res) {
  const email = req.user.email;
  const message = await getBody(req);

  const result = await sendEmail(email, message);

  if (result.success) {
    res.writeHead(201, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end();
  } else {
    res.writeHead(500, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify({ success: false, message: result.message }));
  }
}

module.exports = contactHandler;
