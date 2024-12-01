import nodemailer, { SentMessageInfo } from "nodemailer";
import generateDataResultsPdf from "./generateDataResultsPdf";

interface DataResults {
  globalScore: number;
  categoryScore: {
    category: {
      name: string;
    };
    score: number;
  }[];
  sessionId: string;
  owner: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false,
  auth: {
    user: "MS_dp5XC4@trial-pxkjn418vz0lz781.mlsender.net",
    pass: "2F8Rh8hEI4gSzHe8",
  },
});

const getScoreColor = (score: number): string => {
  let color: string = "grey";

  if (score <= 25) {
    color = "red";
  } else if (score > 25 && score <= 50) {
    color = "orange";
  } else if (score > 50 && score <= 75) {
    color = "darkkhaki";
  } else if (score > 75 && score <= 100) {
    color = "green";
  }

  return color;
};

const generateCategoryListHTML = (categoryScore: any): string => {
  return categoryScore.map((category: any) => generateSingleRow(category.score, category.category.name)).join("");
};

const generateSingleRow = (score: number, name: string): string => {
  return `
  <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
  <tbody>
    <tr>
      <td>
        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; border-radius: 0; width: 600.00px; margin: 0 auto;" width="600.00">
          <tbody>
            <tr>
              <td class="column column-1" width="66.66666666666667%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-left: 60px; padding-right: 60px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tr>
                    <td class="pad">
                      <h3 style="margin: 0; color: #199bf6; direction: ltr; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${name}</span></h3>
                    </td>
                  </tr>
                </table>
              </td>
              <td class="column column-2" width="33.333333333333336%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                <table class="html_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tr>
                    <td class="pad">
                      <div style="font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;text-align:center;" align="center">
                        <div style="
                          background-color: ${getScoreColor(score)};
                          color: white;
                          border-radius: 100%;
                          width: 65px;
                          padding: 10px;
                          height: 65px;
                          line-height: 45px;
                          margin: 15px auto;
                          font-weight: bold;
                          font-size: 20px;">
                          ${Math.ceil(score as any)}%
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
`;
};

export const sendResultsMail = async (email: string, dataResults: DataResults, companyName: string): Promise<void> => {
  try {
    const pdfBuffer = await generateDataResultsPdf(dataResults, companyName);
    const mailOptions = {
      from: "MS_dp5XC4@trial-pxkjn418vz0lz781.mlsender.net",
      to: email,
      subject: "Resultados de tu evaluación con Nailted.",
      text: "Aquí tienes los resultados de tu evaluación",
      html: `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

    <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
    <style>
    * {
    box-sizing: border-box;
    }

    body {
    margin: 0;
    padding: 0;
    }

    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: inherit !important;
    }

    #MessageViewBody a {
    color: inherit;
    text-decoration: none;
    }

    p {
    line-height: inherit
    }

    .desktop_hide,
    .desktop_hide table {
    mso-hide: all;
    display: none;
    max-height: 0px;
    overflow: hidden;
    }

    .image_block img+div {
    display: none;
    }

    @media (max-width:620px) {
    .desktop_hide table.icons-inner {
    display: inline-block !important;
    }

    .icons-inner {
    text-align: center;
    }

    .icons-inner td {
    margin: 0 auto;
    }

    .image_block img.fullWidth {
    max-width: 100% !important;
    }

    .row-content {
    width: 100% !important;
    }

    .stack .column {
    width: 100%;
    display: block;
    }

    .mobile_hide {
    max-width: 0;
    min-height: 0;
    max-height: 0;
    font-size: 0;
    display: none;
    overflow: hidden;
    }

    .desktop_hide,
    .desktop_hide table {
    max-height: none !important;
    display: table !important;
    }
    }
    </style>
    </head>

    <body style="text-size-adjust: none; background-color: #d4d4d4; margin: 0; padding: 0;"><div class="preheader" style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Aquí tienes los resultados de la evaluación que has realizado ${companyName}</div>
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d4d4d4; background-image: none; background-position: 0 0; background-repeat: no-repeat; background-size: auto;">
    <tbody>
    <tr>
    <td>
    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tbody>
    <tr>
    <td>
    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; width: 600.00px; margin: 0 auto;" width="600.00">
    <tbody>
    <tr>
    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    <div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
    <table class="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad" style="width:100%;">
    <div class="alignment" align="center" style="line-height:10px"><img src="https://0369f49397.imgdist.com/public/users/Integrators/BeeProAgency/1025703_1010669/NailtedLogo.png" style="height: auto; display: block; border: 0; max-width: 300px; width: 100%;" width="300"></div>
    </td>
    </tr>
    </table>
    <div class="spacer_block block-3" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
    <table class="image_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
    <div class="alignment" align="center" style="line-height:10px"><img class="fullWidth" src="https://0369f49397.imgdist.com/public/users/Integrators/BeeProAgency/1025703_1010669/home-img.a7d2b13d16187b45d287.png" style="height: auto; display: block; border: 0; max-width: 390px; width: 100%;" width="390"></div>
    </td>
    </tr>
    </table>
    <table class="divider_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad" style="padding-bottom:5px;padding-left:60px;padding-right:60px;padding-top:5px;">
    <div class="alignment" align="center">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 4px dotted #199BF6;"><span>&#8202;</span></td>
    </tr>
    </table>
    </div>
    </td>
    </tr>
    </table>
    <table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
    <tr>
    <td class="pad">
    <div style="color:#101112;direction:ltr;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
    <p style="margin: 0;">¡Es un placer comunicarte que ya están disponibles los resultados de la evaluación de la cultura empresarial realizada por Nailted!</p>
    </div>
    </td>
    </tr>
    </table>
    <table class="heading_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad">
    <h3 style="margin: 0; color: black; direction: ltr; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${companyName}</span></h3>
    </td>
    </tr>
    <tr>
    <td class="pad">
    <h1 style="margin: 0; color: #199bf6; direction: ltr; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Resultados</span></h1>
    </td>
    </tr>
    </table>
    <table class="heading_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad">
    <h3 style="margin: 0; color: #199bf6; direction: ltr; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">General</span></h3>
    </td>
    </tr>
    </table>
    <table class="html_block block-9" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad">
    <div style="font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;
                text-align:center;" align="center">
              <div style="background-color: ${getScoreColor(dataResults.globalScore)};
                color: white;
                border-radius: 100%;
                width: 100px;
                padding: 20px;
                height: 100px;
                line-height: 60px;
                margin: 0px auto;
                font-weight: bold;
                font-size: 30px;">
                ${Math.ceil(dataResults.globalScore)}%
              </div>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
      ${generateCategoryListHTML(dataResults.categoryScore)}
    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tbody>
    <tr>
    <td>
    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; border-radius: 0; width: 600.00px; margin: 0 auto;" width="600.00">
    <tbody>
    <tr>
    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    <table class="button_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad">
    <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${process.env.FRONT_END_URL as string}/#/results/?id=${dataResults.sessionId}&owner=${dataResults.owner}" style="height:42px;width:580px;v-text-anchor:middle;" arcsize="120%" stroke="false" fillcolor="#199bf6"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="${process.env.FRONT_END_URL as string}/#/results/?id=${
        dataResults.sessionId
      }&owner=${
        dataResults.owner
      }" target="_blank" style="text-decoration:none;display:block;color:#ffffff;background-color:#199bf6;border-radius:50px;width:100%;border-top:0px solid transparent;font-weight:700;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:2px;"><span style="word-break: break-word; line-height: 32px;">Ver más detalles</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
    </td>
    </tr>
    </table>
    <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
    <tr>
    <td class="pad">
    <div style="color:#101112;direction:ltr;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
    <p style="margin: 0;">Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos. Nuestro equipo estará encantado de brindarte el apoyo necesario para aprovechar al máximo estos resultados.<br><br>¡Saludos cordiales!</p>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tbody>
    <tr>
    <td>
    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; border-radius: 0; width: 600.00px; margin: 0 auto;" width="600.00">
    <tbody>
    <tr>
    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    <table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad">
    <div class="alignment" align="center">
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
    </tr>
    </table>
    </div>
    </td>
    </tr>
    </table>
    <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad">
    <h3 style="margin: 0; color: #199bf6; direction: ltr; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>Nailted - Todos los derechos reservados © 2023</strong></h3>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tbody>
    <tr>
    <td>
    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; border-radius: 0; width: 600.00px; margin: 0 auto;" width="600.00">
    <tbody>
    <tr>
    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
    <tr>
    <td class="pad">
    <div style="color:#939393;direction:ltr;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;font-size:10px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:12px;">
    <p style="margin: 0; margin-bottom: 16px;">El contenido de este sitio web, incluyendo pero no limitado a textos, imágenes, gráficos y logotipos, está protegido por las leyes de derechos de autor y propiedad intelectual. Todos los derechos están reservados y pertenecen al propietario del sitio web.</p>
    <p style="margin: 0; margin-bottom: 16px;">La información proporcionada en este sitio web es solo para fines informativos y no constituye asesoramiento legal, financiero o profesional. El titular de los derechos de autor no se hace responsable de cualquier acción tomada en base a la información aquí presentada.</p>
    <p style="margin: 0;">Gracias por visitar nuestro sitio web y respetar los derechos de autor y propiedad intelectual.</p>
    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <table class="row row-7" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tbody>
    <tr>
    <td>
    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; width: 600.00px; margin: 0 auto;" width="600.00">
    <tbody>
    <tr>
    <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; font-weight: 400; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
    <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
    <tr>
    <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
    <!--[if !vml]><!-->
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><!-- End -->
    </body>

    </html>
  `,
      attachments: [
        {
          filename: "resultados_evaluacion.pdf",
          content: pdfBuffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Correo electrónico enviado");
      }
    });
  } catch (error) {
    console.log("Error al generar el PDF:", error);
  }
};
