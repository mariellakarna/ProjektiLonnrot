import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">
      <div className="Container">
        
        <div className='leftSide'>
        <h3>Tavoite</h3>
        <p>
          Elias Lönnrot keräsi kansanrunoutta jälkipolville, me keräämme ja pelastamme tulevaisuudelle
          vanhaa, usein vaikeasti saatavaa ja tuhoutumisuhan alla olevaa kirjallisuuttamme. Digitoimme
          EU:n ns. 70+ säädösten mukaan tekijänoikeuksista vapautuneitta suomen- ja ruotsinkielisiä
          teoksia sähköisiksi e-kirjoiksi kaikkien saataville vapaaseen internet-jakeluun. Teokset ovat
          yleensä aina tarjolla puhtaina tekstitiedostoina, joten niiden monipuolinen käyttö ja tarvittaessa
          muuntelu toisiin tiedostomuotoihin on varsin helppoa. Olemme tiiviissä yhteistyössä
          Projekti Gutenbergin kanssa.
        </p>
        <h3>Miten toimitaan</h3>
        <p>
          Sähkökirjojen valmistus tapahtuu vapaaehtoisvoimin sekä etupäässä offline-työnä että oikoluvun osalta myös vain vähän
          aikaa kerrallaan vievänä online-toimintana www.pgdp.net. Tuotantoprosessiin kuuluu: kirjan valinta ja hankinta, copyright-
          selvitys, skannaus ja OCR-tunnistus, esikäsittely, oikoluku, jälkikäsittely ja tarkastus, teoksen sijoittaminen kotisivullemme
          sekä tekijänoikeuksien sallimissa puitteissa eri puolilla maailmaa oleville Project Gutenbergin palvelimille.
        </p>
      </div>

      <div className='rightSide'>
      <h3>Valmiit e-kirjat</h3>
      <p>
        Kirjailijoiden ja heidän kirjansa sivulta voit nähdä kunkin kirjailijan valmiiden teosten luettelon lähtemällä kirjailijoiden
        aakkosellisesta luettelosta.Valmiiden e-kirjojen sivulta näet valmistuneiden kirjojen luettelon järjestyksessä
        viimeksi julkaistu ensimmäisenä. Jommalta kummalta sivulta voit ladata teoksen kätevästi laitteellesi.
        Jos mielikirjaasi ei löydy kokoelmistamme ja se on copyright-vapaa, niin tee ehdotus kirjan tuottamisesta y.o. palaute-linkin kautta.
        </p>
      <h3>Yhteydenotto</h3>
      <p>
        Yhteydenotto käy sähköpostitse.
        Samalla voit miettiä, miten mahdollisesti voisit osallistua oikolukuun tai kulttuurityömme tukemiseen.
        </p>
      </div>
      </div>
    </div>
  )
}

export default Home