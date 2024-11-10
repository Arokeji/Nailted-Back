import puppeteer from "puppeteer";

import * as fs from "fs";

import path from "path";

const convertImageToBase64 = (imagePath: string): string => {
  const image = fs.readFileSync(imagePath);
  return "data:image/png;base64," + Buffer.from(image).toString("base64");
};

const badgeImagePath = path.join(__dirname, "imgPdf/badge.png");
const signatureImagePath = path.join(__dirname, "imgPdf/firma.png");
const logoImagePath = path.join(__dirname, "imgPdf/nailtedlogo.png");

const badgeImageBase64 = convertImageToBase64(badgeImagePath);
const signatureImageBase64 = convertImageToBase64(signatureImagePath);
const logoImageBase64 = convertImageToBase64(logoImagePath);

interface DataResults {
  globalScore: number;
  categoryScore: {
    category: {
      name: string;
    };
    score: number;
  }[];
}

const generateDataResultsPdf = async (dataResults: DataResults, companyName: string): Promise<Buffer> => {
  const getFormattedDate = (): string => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const generateCategoryListPdf = (categoryScoreWithColors: any): string => {
    return categoryScoreWithColors.map((category: any) => generateSingleRowPdf(category.score, category.category.name, category.color)).join("");
  };

  const generateSingleRowPdf = (score: number, name: string, color: string): string => {
    return `
        
            <div class="bee-col bee-col-4 bee-col-w2">
                <div class="bee-block bee-block-1 bee-heading">
                  <p style="color: #0787c3; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;font-size: 20px "><span class="tinyMce-placeholder">${name}</span></p>
                </div>
                <div>
                  <div style="background-color: #0787c3; color: white; border-radius: 100%; border: solid 2px; border-color:black; width: 80px; padding: 15px; height: 80px; line-height: 40px; margin: 0px auto; font-weight: bold; font-size: 20px">${Math.ceil(score)}%</div>
                </div>
            </div>
      
      `;
  };
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  
  <head>
    <title></title>
    <meta content="summary_large_image" name="twitter:card" />
    <meta content="website" property="og:type" />
    <meta content="" property="og:description" />
    <meta content="https://voeck1gs54.preview-postedstuff.com/V2-9aNC-ZZlhU-Ju9P-1WCg/" property="og:url" />
    <meta content="https://pro-bee-beepro-thumbnail.getbee.io/messages/1026257/1011227/1959645/9632556_large.jpg" property="og:image" />
    <meta content="" property="og:title" />
    <meta content="" name="description" />
    <meta charset="utf-8" />
    <meta content="width=device-width" name="viewport" />
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css" />
    <style>
      body {
        color: #000;
        background-color: #bceffc;
        font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif;
      }

      a {
        color: #8a3c90;
      }

      * {
        box-sizing: border-box;
      }

      body,
      p {
        margin: 0;
      }

      .bee-row {
        position: relative;
      }

      .bee-row-content {
        max-width: 1280px;
        margin: 0 auto;
      }

      .bee-row-content {
        display: flex;
        position: relative;
      }

      .bee-row-content .bee-col-w2 {
        flex-basis: 17%;
      }

      .bee-row-content .bee-col-w4 {
        flex-basis: 33%;
      }

      .bee-row-content .bee-col-w12 {
        flex-basis: 100%;
      }

      .bee-html-block {
        text-align: center;
      }

      .bee-icon {
        vertical-align: middle;
        display: inline-block;
      }

      .bee-icon .bee-content {
        align-items: center;
        display: flex;
      }

      .bee-icon .bee-icon-label-right a {
        text-decoration: none;
      }

      .bee-image img {
        width: 100%;
        display: block;
      }

      .bee-image {
        overflow: auto;
      }

      .bee-image .bee-center {
        margin: 20px auto 1px auto;
      }

      h1,
      h3 {
        margin: 0;
      }

      .bee-paragraph {
        overflow-wrap: anywhere;
        margin-top: 2px;
      }

      .bee-row-1 {
        background-repeat: no-repeat;
      }

      .bee-row-1 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
      }

      .bee-row-1 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-1 .bee-col-1 .bee-block-1 {
        width: 100%;
        padding: 30px;
      }

      .bee-row-1 .bee-col-1 .bee-block-3 {
        text-align: center;
        width: 100%;
      }

      .bee-row-2 {
        background-repeat: no-repeat;
      }

      .bee-row-2 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
      }

      .bee-row-2 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-2 .bee-col-1 .bee-block-1 {
        text-align: center;
        width: 100%;
        padding: 10px;
      }

      .bee-row-3 {
        background-repeat: no-repeat;
      }

      .bee-row-3 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
        border-radius: 0;
      }

      .bee-row-3 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-3 .bee-col-1 .bee-block-1 {
        text-align: center;
        width: 100%;
        padding: 10px;
      }

      .bee-row-3 .bee-col-2 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-3 .bee-col-2 .bee-block-1 {
        text-align: center;
        width: 100%;
        padding: 10px;
      }

      .bee-row-3 .bee-col-3 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-3 .bee-col-3 .bee-block-1 {
        text-align: center;
        width: 100%;
        padding: 10px;
      }

      .bee-row-3 .bee-col-4 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-3 .bee-col-4 .bee-block-1 {
        text-align: center;
        width: 100%;
        padding: 10px;
      }

      .bee-row-3 .bee-col-5 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-3 .bee-col-5 .bee-block-1 {
        text-align: center;
        width: 100%;
        padding: 10px;
      }

      .bee-row-4 {
        background-repeat: no-repeat;
      }

      .bee-row-4 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
        border-radius: 0;
      }

      .bee-row-4 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-4 .bee-col-1 .bee-block-1 {
        padding-top: 60px;
      }

      .bee-row-4 .bee-col-2 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-4 .bee-col-2 .bee-block-1 {
        width: 100%;
      }

      .bee-row-4 .bee-col-3 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-4 .bee-col-3 .bee-block-1 {
        padding-top: 60px;
      }

      .bee-row-5 {
        background-repeat: no-repeat;
      }

      .bee-row-5 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
        border-radius: 0;
      }

      .bee-row-5 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-5 .bee-col-1 .bee-block-1 {
        padding-left: 10px;
        padding-right: 10px;
      }

      .bee-row-5 .bee-col-2,
      .bee-row-5 .bee-col-3 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-5 .bee-col-3 .bee-block-1 {
        width: 100%;
      }

      .bee-row-6 {
        background-repeat: no-repeat;
      }

      .bee-row-6 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
        border-radius: 0;
      }

      .bee-row-6 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-6 .bee-col-1 .bee-block-1 {
        padding: 10px;
      }

      .bee-row-7 {
        background-repeat: no-repeat;
      }

      .bee-row-7 .bee-row-content {
        color: #000;
        background-repeat: no-repeat;
      }

      .bee-row-7 .bee-col-1 {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .bee-row-7 .bee-col-1 .bee-block-1 {
        color: #9d9d9d;
        text-align: center;
        padding-top: 5px;
        padding-bottom: 5px;
        font-family: inherit;
        font-size: 15px;
      }

      .bee-row-1 .bee-col-1 .bee-block-4 {
        color: #101112;
        direction: ltr;
        letter-spacing: 0;
        text-align: center;
        font-family: Ubuntu, Tahoma, Verdana, Segoe, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 120%;
      }

      .bee-row-1 .bee-col-1 .bee-block-4 a {
        color: #8a3c90;
      }

      .bee-row-1 .bee-col-1 .bee-block-4 p:not(:last-child) {
        margin-bottom: 16px;
      }

      .bee-row-1 .bee-col-1 .bee-block-2 {
        color: #bcbfc1;
        direction: ltr;
        letter-spacing: 0;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        line-height: 120%;
      }

      .bee-row-1 .bee-col-1 .bee-block-2 a {
        color: #8a3c90;
      }

      .bee-row-1 .bee-col-1 .bee-block-2 p:not(:last-child) {
        margin-bottom: 16px;
      }

      .bee-row-4 .bee-col-3 .bee-block-1 {
        color: #101112;
        direction: ltr;
        letter-spacing: 0;
        text-align: center;
        font-size: 26px;
        font-weight: 400;
        line-height: 120%;
      }

      .bee-row-4 .bee-col-3 .bee-block-1 a {
        color: #8a3c90;
      }

      .bee-row-4 .bee-col-3 .bee-block-1 p:not(:last-child) {
        margin-bottom: 16px;
      }

      .bee-row-6 .bee-col-1 .bee-block-1 {
        color: #101112;
        direction: ltr;
        letter-spacing: 0;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 120%;
      }

      .bee-row-6 .bee-col-1 .bee-block-1 a {
        color: #8a3c90;
      }

      .bee-row-6 .bee-col-1 .bee-block-1 p:not(:last-child) {
        margin-bottom: 16px;
      }

      .bee-row-4 .bee-col-1 .bee-block-1 {
        color: #101112;
        direction: ltr;
        letter-spacing: 0;
        text-align: center;
        font-size: 26px;
        font-weight: 400;
        line-height: 120%;
      }

      .bee-row-4 .bee-col-1 .bee-block-1 a {
        color: #8a3c90;
      }

      .bee-row-4 .bee-col-1 .bee-block-1 p:not(:last-child) {
        margin-bottom: 16px;
      }

      .bee-row-5 .bee-col-1 .bee-block-1 {
        color: #101112;
        direction: ltr;
        letter-spacing: 0;
        text-align: center;
        font-size: 23px;
        font-weight: 400;
        line-height: 120%;
      }

      .bee-row-5 .bee-col-1 .bee-block-1 a {
        color: #8a3c90;
      }

      .bee-row-5 .bee-col-1 .bee-block-1 p:not(:last-child) {
        margin-bottom: 15px;
      }

      .bee-row-7 .bee-col-1 .bee-block-1 .bee-icon-image {
        padding: 5px 6px 5px 5px;
      }

      .bee-row-7 .bee-col-1 .bee-block-1 .bee-icon:not(.bee-icon-first) .bee-content {
        margin-left: 0;
      }

      .bee-row-7 .bee-col-1 .bee-block-1 .bee-icon::not(.bee-icon-last) .bee-content {
        margin-right: 0;
      }
    </style>
  </head>

  <body>
  <div style="background-color: #eddebb">
    <div class="bee-page-container">
      <div class="bee-row bee-row-1">
        <div class="bee-row-content">
          <div class="bee-col bee-col-1 bee-col-w12">
            <div class="bee-block bee-block-1 bee-image"><img alt="" class="bee-center bee-fixedwidth" src="${logoImageBase64}" style="max-width: 270px" /></div>
            <div class="bee-block bee-block-2 bee-paragraph">
              <p style="font-style: italic">Más que una herramienta, una manera de hacer las cosas</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div style="border-color: #4294e3; border-width: 4px; border-style: solid; border-radius: 20px; margin: 20px; background-color: white">
        <div class="bee-block bee-block-3 bee-heading">
          <h1 style="color: #000000; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 50px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 20px; margin-bottom: 0"><span class="tinyMce-placeholder">Certificado</span></h1>
        </div>
        <div style="align-items: center; display: flex; justify-content: center">
          <p style="text-align: center">Este documento certifica que ha realizado con éxito nuestro formulario de madurez cultural</p>
        </div>
        <div style="align-items: center; display: flex; justify-content: center">
          <h2 "color: #000000; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 50px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 20px; margin-bottom: 0">${companyName}</h2>
        </div>

        <div class="bee-row bee-row-2">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w12">
              <div class="bee-block bee-block-1 bee-heading">
                <h3 style="color: #0787c3; direction: ltr; font-family: 'Ubuntu', Tahoma, Verdana, Segoe, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 20px; margin-bottom: 0"><span class="tinyMce-placeholder">Resultado General</span></h3>
              </div>
              <div >
                <div style="background-color: #0787c3; color: white; border-radius: 100%; border: solid 2px; border-color:black; width: 80px; padding: 15px; height: 80px; line-height: 40px; margin: 0px auto; font-weight: bold; font-size: 20px">${Math.ceil(dataResults.globalScore)}%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-3">
          <div class="bee-row-content" style="display: flex; flex-direction: row; justify-content: space-around">${generateCategoryListPdf(dataResults.categoryScore)}</div>
        </div>
        <div class="bee-row bee-row-4">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w4">
              <div class="bee-block bee-block-1 bee-paragraph" style="display: flex; flex-direction: column">
                <p>Fecha</p>
                <p style="margin-top: 15px">${getFormattedDate()}</p>
              </div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w4">
              <div class="bee-block bee-block-1 bee-image"><img alt="" class="bee-center bee-fixedwidth" src="${badgeImageBase64}" style="max-width: 149px" /></div>
            </div>
            <div class="bee-col bee-col-3 bee-col-w4">
              <div class="bee-block bee-block-1 bee-paragraph" style="display: flex; flex-direction: column; align-items: center">
                <p>Firma</p>
                <img alt="" class="bee-center bee-autowidth" src="${signatureImageBase64}" style="max-width: 198px" />
              </div>
            </div>
          </div>
        </div>
        <div class="bee-row bee-row-5">
          <div class="bee-row-content">
            <div class="bee-col bee-col-1 bee-col-w4">
              <div class="bee-block bee-block-1 bee-paragraph"></div>
            </div>
            <div class="bee-col bee-col-2 bee-col-w4">
              <div class="bee-block bee-block-1 bee-spacer">
                <div class="spacer" style="height: 60px"></div>
              </div>
            </div>
            <div class="bee-col bee-col-3 bee-col-w4">
              <div class="bee-block bee-block-1 bee-image"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</html>
`;

  const browser = await puppeteer.launch({
    headless: "new",
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 750,
      height: 500,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: false,
      isLandscape: false,
    },
  });
  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "domcontentloaded",
  });

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  return pdfBuffer;
};

export default generateDataResultsPdf;
