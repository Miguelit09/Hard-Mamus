const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const BASE_DIR = path.dirname(path.dirname(path.resolve(__filename)));
const FONT_PATH = path.join(BASE_DIR, "static", "fonts", "TextaLight.ttf");

async function splitTextIntoLines(text, maxCharactersPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length <= maxCharactersPerLine) {
      currentLine += word + ' ';
    } else {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    }
  }

  if (currentLine.trim() !== '') {
    lines.push(currentLine.trim());
  }

  return lines;
}

async function generateImageWithText(imagePath, text, id, description) {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);

  const mainFont = await loadImage(FONT_PATH);
  const dateFont = await loadImage(FONT_PATH);
  const idFont = await loadImage(FONT_PATH);
  const descriptionFont = await loadImage(FONT_PATH);

  const width = image.width;
  const height = image.height;

  const centeredText = text;
  const idText = `No. ${id}`;
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Dibujar solo el texto principal
  ctx.font = `40px ${mainFont}`;
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(centeredText, width / 2, height / 2);

  // Agregar la cédula
  ctx.font = `10px ${idFont}`;
  ctx.fillText(idText, width / 2, height / 2 + 40);

  // Configuración del texto de la descripción
  const maxCharactersPerLine = 70;
  const descriptionLines = await splitTextIntoLines(description, maxCharactersPerLine);

  // Calcular la altura total ocupada por el texto de la descripción
  const lineHeight = 20;
  const totalHeight = descriptionLines.length * lineHeight;
  // Ajustar la posición y para centrar el bloque de texto completo
  const yDescription = height / 2 + 120;

  for (let i = 0; i < descriptionLines.length; i++) {
    const line = descriptionLines[i];
    ctx.font = `40px ${descriptionFont}`;
    ctx.fillText(line, width / 2, yDescription + (i * lineHeight));
  }

  // Agregar la fecha actual
  ctx.font = `40px ${dateFont}`;
  ctx.fillText(currentDate, width / 2, yDescription + totalHeight + 20);

  return canvas.toBuffer();
}

module.exports = {
  splitTextIntoLines,
  generateImageWithText,
};