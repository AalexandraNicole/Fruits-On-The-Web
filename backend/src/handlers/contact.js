const { getBody } = require("../utils/utils");
const nodemailer = require("nodemailer");

async function sendEmail(senderEmail, message) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "taneagrozea2003@gmail.com",
        pass: "oqnp lheg wptt vgxh ",
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: "frowfrowcontact@gmail.com",
      subject: "Contact Form Submission FrOW",
      text: typeof message === "string" ? message : JSON.stringify(message),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Error sending email" };
  }
}

async function contactHandler(req, res, services, query) {
  if (!req.session.isAuthenticated) {
    res.writeHead(401, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });
    res.end("Unauthorized");
    return;
  }

  const email = req.session.user;
  const message = await getBody(req);

  const result = await sendEmail(email, message);

  if (result.success) {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify({ success: true }));
  } else {
    res.writeHead(500, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify({ success: false, message: result.message }));
  }
}

module.exports = contactHandler;
