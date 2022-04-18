const MailSlurp = require("mailslurp-client").default;
require("dotenv").config("variables.env");


const sendMailToValidateEmail = async (inboxPageid, clave, correo) => {
  try {
    const mailslurp = new MailSlurp({
      apiKey: process.env.APIKEY,
    });
    await mailslurp.sendEmail(inboxPageid, {
      to: [correo],
      subject: "Validación de Correo Electrónico",
      body: `
      <article >
        <h1>Seven Eleven Super App</h1>
        <div>
        </div>
        <img  src="../assets/img/sevenLogo.jpg" alt="Seven Logo"  width="300"
        height="250">
        <h2>Validación de correo electrónico</h2>
        <p>Este es su número de validación, ingrese este número en el campo OTP de su aplicación móvil.</p>
        <p>Clave temporal: <b>${clave}</b></p>
        <p>Le deseamos un buen día</p>
      </article>`,
      charset: "utf8",
      html: true,
    });
    console.log("Correo enviado con Éxito a " + correo);
  } catch (error) {
    console.log("No funciona enviar el correo");
    console.log(error);
  }
};

module.exports = sendMailToValidateEmail;
