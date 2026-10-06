"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

const mapUrl = "https://go.2gis.com/5JbUm";
const instagramUrl = "https://www.instagram.com/luxestone_studio/";

const scenes = [
  {
    code: "01",
    label: "Силуэт",
    note: "Точность в каждой линии",
    desktop: "https://images.unsplash.com/photo-1657963081505-005f190018b3?auto=format&fit=crop&w=1800&q=88",
    mobile: "https://images.unsplash.com/photo-1749214487016-6911b7a543ee?auto=format&fit=crop&w=1000&h=1300&q=86",
    position: "center 56%",
  },
  {
    code: "02",
    label: "Отражение",
    note: "Свет раскрывает поверхность",
    desktop: "https://images.unsplash.com/photo-1715733965804-88ae4496f29a?auto=format&fit=crop&w=1800&q=88",
    mobile: "https://images.unsplash.com/photo-1715733965804-88ae4496f29a?auto=format&fit=crop&w=1000&h=1300&q=86",
    position: "center 53%",
  },
  {
    code: "03",
    label: "Фактура",
    note: "Характер — в деталях",
    desktop: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=88",
    mobile: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&h=1300&q=86",
    position: "center 58%",
  },
];

const offers = [
  {
    n: "01",
    title: "Кузовное ателье",
    en: "BODY ATELIER",
    description: "Работы с внешними поверхностями кузова. Конкретную задачу можно обсудить с мастером.",
    image: "https://images.unsplash.com/photo-1657963081505-005f190018b3?auto=format&fit=crop&w=1500&q=86",
    mobile: "https://images.unsplash.com/photo-1749214487016-6911b7a543ee?auto=format&fit=crop&w=1000&h=1250&q=84",
    position: "center 53%",
  },
  {
    n: "02",
    title: "Покраска",
    en: "PAINTWORK",
    description: "Работа с цветом и покрытием кузова. Детали и объём обсуждаются после осмотра.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1500&q=86",
    mobile: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&h=1250&q=84",
    position: "center 56%",
  },
  {
    n: "03",
    title: "Полировка",
    en: "POLISHING",
    description: "Полировка кузова, чтобы вернуть поверхности ясные отражения и глубину цвета.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1500&q=86",
    mobile: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&h=1250&q=84",
    position: "center 56%",
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(heroProgress, [0, 1], [0, 42]);
  const scene = scenes[sceneIndex];
  const offer = offers[offerIndex];

  const advanceScene = (direction: number) => {
    setSceneIndex((current) => (current + direction + scenes.length) % scenes.length);
  };

  return (
    <main>
      <motion.div aria-hidden className="reading-progress" style={{ scaleX: progress }} />
      <header className="header">
        <a className="brand" href="#home" aria-label="LuxeStone — главная">
          <span className="brand-monogram">L<span>.</span></span>
          <span className="brand-name">LUXESTONE<small>BODYWORK ATELIER</small></span>
        </a>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Основная навигация">
          <a href="#about" onClick={() => setMenuOpen(false)}>Концепция</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Направления</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a>
        </nav>
        <a className="header-link" href={mapUrl} target="_blank" rel="noreferrer">На карте <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title" ref={heroRef}>
        <div className="hero-grid">
          <div className="hero-copy">
            <Reveal className="hero-kicker"><span className="kicker-dash" /> АЛМАТЫ <span className="kicker-dot">/</span> КУЗОВНОЕ АТЕЛЬЕ</Reveal>
            <motion.h1 id="hero-title" initial={reduceMotion ? false : { opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}>
              Форма —<br /><em>это</em> чувство.
            </motion.h1>
            <Reveal delay={0.18} className="hero-description">
              <p>Кузовные работы, покраска и полировка в LuxeStone.</p>
              <a href="#services" className="hero-cta">Открыть направления <ArrowDown size={15} /></a>
            </Reveal>
            <div className="hero-edition"><span>LS</span><span>STUDIO IN ALMATY<br />AUTOMOTIVE CARE</span></div>
          </div>

          <div className="hero-visual" aria-roledescription="карусель изображений">
            <motion.div className="hero-photo-motion" style={reduceMotion ? undefined : { y: imageY }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={scene.code}
                  className="hero-photo"
                  role="img"
                  aria-label={scene.note}
                  style={{
                    "--photo-desktop": `url("${scene.desktop}")`,
                    "--photo-mobile": `url("${scene.mobile}")`,
                    "--photo-position": scene.position,
                  } as React.CSSProperties}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.035 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            </motion.div>
            <div className="photo-topline"><span>КАДР {scene.code} <i>—</i> 03</span><span>LS / VISUAL STUDY</span></div>
            <div className="hero-photo-bottom">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={scene.label} className="photo-title" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <small>СВЕТ НАХОДИТ ФОРМУ</small><span>{scene.label}</span>
                </motion.div>
              </AnimatePresence>
              <div className="scene-controls" aria-label="Переключение фотографий">
                <button onClick={() => advanceScene(-1)} aria-label="Предыдущий кадр"><ArrowLeft size={17} /></button>
                <span><b>{scene.code}</b><i>/</i>03</span>
                <button onClick={() => advanceScene(1)} aria-label="Следующий кадр"><ArrowRight size={17} /></button>
              </div>
            </div>
            <span className="visual-side-label">LUXESTONE — ALMATY</span>
          </div>
        </div>
        <div className="hero-scroll"><span>ЛИСТАЙТЕ</span><span className="scroll-line" /></div>
      </section>

      <section className="marquee" aria-label="Направления LuxeStone">
        <div className="marquee-track"><span>КУЗОВНОЕ АТЕЛЬЕ</span><b>✳</b><span>ПОКРАСКА</span><b>✳</b><span>ПОЛИРОВКА</span><b>✳</b><span>КУЗОВНОЕ АТЕЛЬЕ</span><b>✳</b><span>ПОКРАСКА</span><b>✳</b><span>ПОЛИРОВКА</span><b>✳</b></div>
      </section>

      <section className="about" id="about">
        <Reveal className="about-meta"><span>01 / НАСТРОЕНИЕ</span><span>НЕ ПРОСТО БЛЕСК</span></Reveal>
        <div className="about-grid">
          <Reveal className="about-aside"><span className="orbit-seal" aria-hidden><svg viewBox="0 0 120 120"><defs><path id="sealPath" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" /></defs><text><textPath href="#sealPath">LUXESTONE · ФОРМА И ДЕТАЛЬ · </textPath></text></svg><i>✳</i></span><span className="aside-label">DETAIL IS A<br />STATE OF MIND</span></Reveal>
          <Reveal className="about-copy" delay={0.1}>
            <h2>Не добавлять<br />лишнего.<br /><em>Раскрыть своё.</em></h2>
            <p>У каждого автомобиля свой характер. LuxeStone работает с кузовом, цветом и отражением — тем, что формирует первое впечатление.</p>
          </Reveal>
        </div>
      </section>

      <section className="services" id="services">
        <Reveal className="services-heading">
          <div><span className="section-index">02 / НАПРАВЛЕНИЯ</span><h2>Выберите,<br /><em>что важно.</em></h2></div>
          <p>Кузовное ателье<br />LuxeStone · Алматы</p>
        </Reveal>
        <div className="service-explorer">
          <div className="service-switcher" role="tablist" aria-label="Направления работ">
            {offers.map((item, index) => (
              <button className={offerIndex === index ? "service-tab active" : "service-tab"} role="tab" aria-selected={offerIndex === index} aria-controls="service-detail" key={item.n} onClick={() => setOfferIndex(index)}>
                <span className="tab-index">{item.n}</span><span className="tab-title">{item.title}<small>{item.en}</small></span><ArrowUpRight className="tab-arrow" size={17} />
              </button>
            ))}
            <a href={mapUrl} target="_blank" rel="noreferrer" className="service-more">Уточнить детали <ArrowUpRight size={15} /></a>
          </div>
          <div className="service-display" id="service-detail" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={offer.n}
                className="service-image"
                role="img"
                aria-label={offer.title}
                style={{
                  "--offer-desktop": `url("${offer.image}")`,
                  "--offer-mobile": `url("${offer.mobile}")`,
                  "--offer-position": offer.position,
                } as React.CSSProperties}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.025 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            <div className="service-image-wash" />
            <div className="service-image-caption"><span>{offer.en} <i>·</i> LUXESTONE</span><b>{offer.n}</b></div>
            <div className="service-description"><p>{offer.description}</p><a href={mapUrl} target="_blank" rel="noreferrer" aria-label={`Уточнить про направление «${offer.title}» в 2ГИС`}><ArrowUpRight size={18} /></a></div>
          </div>
        </div>
      </section>

      <section className="interlude">
        <div className="interlude-photo" role="img" aria-label="Свет отражается на силуэте автомобиля" />
        <div className="interlude-copy"><span className="section-index">03 / ФОРМА В ДВИЖЕНИИ</span><h2>Уверенность<br />в каждом <em>отражении.</em></h2><span className="interlude-mark">L<span>.</span></span></div>
        <span className="interlude-coordinate">LUXESTONE · АЛМАТЫ</span>
      </section>

      <section className="contact" id="contact">
        <Reveal className="contact-inner">
          <div className="contact-top"><span className="section-index">04 / LUXESTONE · АЛМАТЫ</span><span className="contact-star">✳</span></div>
          <div className="contact-layout"><h2>Давайте<br /><em>знакомиться.</em></h2><div className="contact-actions"><p>За деталями, маршрутом и актуальной информацией — в 2ГИС или Instagram.</p><a className="contact-address" href={mapUrl} target="_blank" rel="noreferrer"><span>Алматы, ул. Зейна Шашкина, 29</span><ArrowUpRight size={19} /></a><div className="contact-buttons"><a className="button primary-button" href={mapUrl} target="_blank" rel="noreferrer">Маршрут в 2ГИС <ArrowUpRight size={16} /></a><a className="button secondary-button" href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={16} /></a></div></div></div>
          <div className="contact-bottom"><span>ФОРМА. ЧУВСТВО. LUXESTONE.</span><a href="#home">В НАЧАЛО ↑</a></div>
        </Reveal>
      </section>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-monogram">L<span>.</span></span><span className="brand-name">LUXESTONE<small>BODYWORK ATELIER</small></span></a><span>КУЗОВНОЕ АТЕЛЬЕ · АЛМАТЫ</span><a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><small>© LUXESTONE</small></footer>
    </main>
  );
}


