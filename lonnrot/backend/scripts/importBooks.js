/* const mongoose = require('mongoose');
const fetch = require('node-fetch');
const AdmZip = require('adm-zip');
const iconv = require('iconv-lite');
const Book = require('../models/Book');

const connectDB = require('../db'); 


// Luodaan taulukko URLeista, ja käydään kaikki läpi tämänhetkiseen viimeiseen kirjaan(3432) || testaus mielessä testataan ensimmäiset 10
function generateBookUrls() {
    const bookUrls = [];
    for (let i = 1; i <= 10; i++) { // 3432; i++) {
        // lisätään tarvittaessa nollat url:iin
        const paddedIndex = String(i).padStart(4, '0');
        bookUrls.push(`http://www.lonnrot.net/kirjat/${paddedIndex}.zip`);
    }
    return bookUrls;
}

// ladataan zip tiedostot ja puretaan ne
async function processAndSaveBook(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch ${url}: ${response.statusText}`);
            return;
        }

        const buffer = await response.buffer();
        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();

        for (const entry of zipEntries) {
            if (entry.entryName.endsWith('.txt')) {
                const rawText = iconv.decode(entry.getData(), 'latin1');
                const { title, author, content } = parseText(rawText);

                //tarkistetaan ettei tietokannassa ole jo samannimistä samalla tekijällä
                const existing = await Book.findOne({ title, author });
                if (existing) {
                    console.log(`Ohitetaan duplikaatti: ${title} (${author})`);
                    return;
                }


                const newBook = new Book({
                    title,
                    author,
                    content,
                    url,
                });

                await newBook.save();
                console.log(`Tallennettu: ${title}`);
                return;
            }
        }
        //jos ei löydykkään tiedostoa
        console.log('Ei txt-tiedostoa: ', url);

    } catch (error) {
        console.log(`Error processing ${url}: ${error.message}`);
    }
}

function parseText(text) {
    const lines = text.split('\n').map(l => l.trim());
    let title = '';
    let author = '';
    let content = '';

    // etsitään mahdolliset otsikot
    for (let i = 1; i < lines.length - 1; i++) {
        if (
            lines[i - 1] === '' &&
            lines[i + 1] === '' &&
            lines[i] === lines[i].toUpperCase() &&
            lines[i].length > 3
        ) {
            title = lines[i];

            for (let j = i + 1; j < i + 10 && j < lines.length; j++) {
                const line = lines[j];
                if (/^(Kertonut|Koonnut|Kirj\.?|Kirjoittanut)/i.test(line)) {
                    author = line.replace(/^(Kertonut|Koonnut|Kirj\.?|Kirjoittanut)/i, '').trim();
                    break;
                }
                if (line === line.toUpperCase() && line.length > 3 && !title.includes(line)) {
                    author = line;
                    break;
                }
            }
            content = lines.slice(i + 1).join('\n').trim();
            break;
        }

    }
   

    return {
        title: title || 'Tuntematon nimi',
        author: author || 'Tuntematon tekijä',
        content: formatContent(content),
    };
}

//korjaillaan formatointia
function formatContent(content) {
    return content
        .replace(/\r/g, '')
        .replace(/\n{2,}/g, '\n\n')
        .replace(/[ ]{2,}/g, ' ')
        .trim();
}

async function importBooks() {
    await connectDB(); // tietokanta yhdistys
    const urls = generateBookUrls();
    for (let i = 0; i < urls.length; i++) {
        console.log(`(${i + 1}/${urls.length}) Käsitellään ${urls[i]}`);
        await processAndSaveBook(urls[i]);
    }
}

importBooks().then(() => {
    console.log('Valmis!');
    mongoose.disconnect();
}); */

import mongoose from 'mongoose';
import fetch from 'node-fetch';
import AdmZip from 'adm-zip';
import iconv from 'iconv-lite';
//import Book from '../models/Book.js';  // Muista lisätä `.js`, jos käytät ESM:ää
import pkg from '../models/Book.js';
const Book = pkg;
import { connectDB } from '../db.js';  // Muista lisätä `.js`
import { JSDOM } from 'jsdom';



// Luodaan taulukko URLeista, ja käydään kaikki läpi tämänhetkiseen viimeiseen kirjaan(3432) || testaus mielessä testataan ensimmäiset 10
function generateBookUrls() {
    const bookUrls = [];
    for (let i = 1; i <= 3432; i++) { // 3432; i++) tähän vaihdetaan haluttu määrä 
        // lisätään tarvittaessa nollat url:iin
        const paddedIndex = String(i).padStart(4, '0');
        bookUrls.push(`http://www.lonnrot.net/kirjat/${paddedIndex}.zip`);
    }
    return bookUrls;
}

// ladataan zip tiedostot ja puretaan ne
async function processAndSaveBook(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch ${url}: ${response.statusText}`);
            return;
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();

        let foundTxt = false;

        for (const entry of zipEntries) {
            if (entry.entryName.endsWith('.txt')) {
                foundTxt = true;

                const rawText = iconv.decode(entry.getData(), 'latin1');
                const bookNumber = parseInt(url.match(/\d+/)[0]); // kirjan numero urlista
                //const { title, author, content } = parseText(rawText);

                // haetaan title ja author
                const { title, author } = await getBookDetails(bookNumber);

                const content = rawText.trim();

                // Tarkistetaan, ettei sisältö ole tyhjä ennen tallennusta
                if (!content) {
                    console.log(`Kirjalla "${title || '(tuntematon)'}" ei ole sisältöä! Ohitetaan tallennus.`);
                    return;
                }

                //tarkistetaan ettei tietokannassa ole jo samannimistä samalla tekijällä
                const existing = await Book.findOne({ title, author });
                if (existing) {
                    console.log(`Ohitetaan duplikaatti: ${title} (${author})`);
                    return;
                }

                const newBook = new Book({
                    title,
                    author,
                    content,
                    url,
                });

                try {

                    await newBook.save();
                    console.log(`Tallennettu: ${title}`);
                } catch (saveError) {
                    console.error(`Virhe tallennettaessa kirjaa "${title}":`, saveError.message)
                }

                break;

            }
        }
        //jos ei löydykkään tiedostoa
        if (!foundTxt) {
            console.log('Ei txt-tiedostoa: ', url);
        }

    } catch (error) {
        console.log(`Error processing ${url}: ${error.message}`);
    }
}

async function getBookDetails(bookNumber) {
    const response = await fetch('http://www.lonnrot.net/valmiit.html');
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;

    // otetaan koko HTML-body ja splitataan <br> tageista
    const rawHtml = document.body.innerHTML;
    const lines = rawHtml.split(/<br\s*\/?>/i);

    for (const line of lines) {
        // Poistetaan mahdolliset HTML-tagit ennen <a> ja trimmataan
        const cleanedLine = line.replace(/<[^>]*>/g, '').trim();

        // Etsitään muotoa: numero. Tekijä, Etunimi: Otsikko
        const match = cleanedLine.match(/^(\d+)\.\s*(.+?):\s*(.+)$/);
        if (match) {
            const currentNumber = parseInt(match[1]);
            const author = match[2].trim();
            const title = match[3].trim();

            if (currentNumber === bookNumber) {
                return { title, author };
            }
        }
    }

    console.warn(`Kirjan numeroa ${bookNumber} ei löytynyt valmiit.html-sivulta.`);
    return { title: '', author: '' };
}

/* async function getBookDetails(bookNumber){
    const response = await fetch('http://www.lonnrot.net/valmiit.html');
    const text = await response.text();

    const dom = new JSDOM(text);
    const document = dom.window.document;
    
    //etsitään tiedot
    const books = document.querySelectorAll('li');

    let title = '';
    let author = '';

    books.forEach((book) => {

        console.log(">> kirja:", book.textContent); // Lisää tämä ja aja uudestaan
        // Tarkistetaan, että kirjan numero vastaa haluttua
        const bookText = book.textContent.trim();
        const match = bookText.match(/^(\d+)\.\s*(.*)/); // Etsitään numero ja tekijä+otsikko

        if (match) {
            const currentNumber = parseInt(match[1]);
            if (currentNumber === bookNumber) {
                const authorTitle = match[2].split(':');
                author = authorTitle[0].trim();
                title = authorTitle[1].trim();
            }
        }
    });

    return { title, author };
} */

// function parseText(text) {
//     const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
//     let title = '';
//     let author = '';
//     let content = '';

//     const titleMatch = text.match(/'([^']+)'/);
//     if (titleMatch) {
//         title = titleMatch[1].trim();
//         console.log("Detected title:", title); // tulostetaan löydetty otsikko
//     }

//     // etsitään mahdolliset otsikot
//     for (let i = 1; i < lines.length - 1; i++) {
//         if (
//             /* lines[i] === lines[i].toUpperCase() && // Otsikko on suurilla kirjaimilla
//             lines[i].length > 3 && // Otsikon pituus riittävä
//             (lines[i + 1] === '' || i === lines.length - 2) */
//             lines[i - 1] === '' &&
//             lines[i + 1] === '' &&
//             lines[i] === lines[i].toUpperCase() &&
//             lines[i].length > 3
//         ) {
//             title = lines[i];
//             console.log("detected title:", title); // tulostetaan löydetty otsikko

//             // etsitään tekijä
//             /* for (let j = i + 1; j < i + 5 && j < lines.length; j++) {
//                 const line = lines[j];
    
//                 // Etsitään tekijämuotoja kuten "Koonnut", "Kirj.", "Kirjoittanut"
//                 if (/^(Kertonut|Koonnut|Kirj\.?|Kirjoittanut)/i.test(line)) {
//                     author = line.replace(/^(Kertonut|Koonnut|Kirj\.?|Kirjoittanut)/i, '').trim();
//                     console.log("Detected author:", author);  // Tulostetaan löydetty tekijä
//                     break;
//                 }
    
//                 // Jos löytyy täysin isoilla kirjaimilla kirjoitettu nimi, voidaan olettaa tekijäksi
//                 if (line === line.toUpperCase() && line.length > 3 && !title.includes(line)) {
//                     author = line;
//                     break;
//                 }
//             } */
//             content = lines.slice(i + 1).join('\n').trim();
//             console.log("Content detected:", content.slice(0, 200));  // Tulostetaan sisältöä alkuun
//             break;
//         }


//     };

//     console.log('Parsed book:', { title, author, content }); // Lisää tämä debug-tulostus

//     return {
//         title: title || 'Tuntematon nimi', // Jos otsikkoa ei löydy, käytetään oletusta
//         author: author || 'Tuntematon tekijä', // Jos tekijää ei löydy, käytetään oletusta
//         content: formatContent(content), // Muotoillaan sisältö
//     };
// }

/* function parseText(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log('Lines:', lines); // Debug: tulostetaan käsiteltävät rivit

    let title = '';
    let author = '';
    let content = '';

    // Etsitään mahdollinen otsikko (yksittäisistä lainausmerkeistä)
    const titleMatch = text.match(/'([^']+)'/);  // Etsitään otsikko yksittäisistä lainausmerkeistä
    if (titleMatch) {
        title = titleMatch[1]; // Otsikko on ensimmäinen löytynyt osuus
        console.log("Detected title:", title); // Debug: tulostetaan löydetty otsikko
    }

    // Etsitään tekijä seuraavista riveistä
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Etsitään tekijämuotoja kuten "Kertonut", "Koonnut", "Kirj.", "Kirjoittanut"
        if (/^(Kertonut|Koonnut|Kirj\.?|Kirjoittanut)/i.test(line)) {
            author = line.replace(/^(Kertonut|Koonnut|Kirj\.?|Kirjoittanut)/i, '').trim();
            console.log("Detected author:", author);  // Debug: tulostetaan löydetty tekijä
            break;
        }
        // Jos löytyy täysin isoilla kirjaimilla kirjoitettu nimi, voidaan olettaa tekijäksi
        if (line === line.toUpperCase() && line.length > 3 && !title.includes(line)) {
            author = line;
            break;
        }
        // Erityisesti suomentaja: "suomentanut"
        if (/suomentanut/i.test(line)) {
            author = line.replace(/suomentanut/i, '').trim();
            break;
        }
    }

    // Sisältö alkaa aina otsikon jälkeen
    const contentStartIndex = text.indexOf(title) + title.length;
    content = text.slice(contentStartIndex).trim();

    console.log("Content detected:", content.slice(0, 200));  // Debug: tulostetaan sisältöä alkuun

    return {
        title: title || 'Tuntematon nimi',  // Jos otsikkoa ei löydy, käytetään oletusta
        author: author || 'Tuntematon tekijä',  // Jos tekijää ei löydy, käytetään oletusta
        content: formatContent(content),  // Muotoillaan sisältö
    };
} */


/* //korjaillaan formatointia
function formatContent(content) {
    return content
        .replace(/\r/g, '') // poistaa CR-merkit
        .replace(/\n{2,}/g, '\n\n') // poistaa ylimääräiset rivinvaihdot
        .replace(/[ ]{2,}/g, ' ') // poistaa ylimääräiset välilyönnit
        .trim();
} */
function formatContent(content) {
    const formattedContent = content
        .replace(/\r/g, '') // Poistaa CR-merkit
        .replace(/\n{2,}/g, '\n\n') // Poistaa ylimääräiset rivinvaihdot
        .replace(/[ ]{2,}/g, ' ') // Poistaa ylimääräiset välilyönnit
        .trim();

    console.log('Formatted content:', formattedContent); // Lisää tämä debug-tulostus

    return formattedContent;
}


async function importBooks() {
    await connectDB(); // tietokanta yhdistys
    const urls = generateBookUrls();
    for (let i = 0; i < urls.length; i++) {
        console.log(`(${i + 1}/${urls.length}) Käsitellään ${urls[i]}`);
        await processAndSaveBook(urls[i]);
    }
}

importBooks().then(() => {
    console.log('Valmis!');
    mongoose.disconnect();
});
