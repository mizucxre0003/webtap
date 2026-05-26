import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Home,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react';

import heroImage from './assets/images/hero-editorial-beauty.webp';
import interiorImage from './assets/images/salon-interior-warm.jpg';
import masterImage from './assets/images/beauty-master-process.jpg';
import nailsImage from './assets/images/nails-detail.jpg';
import hairImage from './assets/images/hair-styling-soft.jpg';
import browsImage from './assets/images/brows-lashes-detail.webp';
import makeupImage from './assets/images/makeup-natural-glow.webp';
import skincareImage from './assets/images/skincare-treatment.jpg';
import bridalImage from './assets/images/bridal-beauty-look.jpg';
import resultImage from './assets/images/gallery-beauty-result-01.webp';
import detailImage from './assets/images/gallery-salon-detail-02.webp';
import processImage from './assets/images/gallery-process-03.webp';

const whatsappUrl =
  'https://wa.me/77000000000?text=Здравствуйте!%20Хочу%20записаться%20в%20beauty.webtap';
const mainSiteUrl = '/';

const navItems = [
  { label: 'О салоне', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Работы', href: '#works' },
  { label: 'Запись', href: '#booking' },
  { label: 'Контакты', href: '#contacts' },
];

const designThemes = {
  soft: {
    key: 'soft',
    label: 'Soft Luxury',
    className: 'theme-soft',
    hero: 'split',
    gallery: 'soft-grid',
    card: 'soft-card',
    button: 'btn-soft',
    outlineButton: 'btn-soft-outline',
    eyebrow: 'champagne calm luxury',
  },
  editorial: {
    key: 'editorial',
    label: 'Editorial Black',
    className: 'theme-editorial',
    hero: 'editorial',
    gallery: 'editorial-masonry',
    card: 'editorial-card',
    button: 'btn-editorial',
    outlineButton: 'btn-editorial-outline',
    eyebrow: '01 / beauty editorial',
  },
  clean: {
    key: 'clean',
    label: 'Clean Minimal',
    className: 'theme-clean',
    hero: 'minimal',
    gallery: 'clean-modular',
    card: 'clean-card',
    button: 'btn-clean',
    outlineButton: 'btn-clean-outline',
    eyebrow: 'clean care studio',
  },
  glam: {
    key: 'glam',
    label: 'Glam Rose',
    className: 'theme-glam',
    hero: 'glam',
    gallery: 'glam-overlay',
    card: 'glam-card',
    button: 'btn-glam',
    outlineButton: 'btn-glam-outline',
    eyebrow: 'rose pearl ritual',
  },
};

const services = [
  {
    title: 'Nails',
    image: nailsImage,
    description:
      'Маникюр, педикюр и аккуратное покрытие с вниманием к форме, стойкости и деталям.',
  },
  {
    title: 'Hair',
    image: hairImage,
    description:
      'Стрижки, укладки и окрашивания, которые подчёркивают индивидуальность и выглядят естественно.',
  },
  {
    title: 'Brows & Lashes',
    image: browsImage,
    description:
      'Оформление бровей и ресниц для выразительного, но деликатного образа.',
  },
  {
    title: 'Makeup',
    image: makeupImage,
    description:
      'Макияж для событий, съёмок и особых дней — без перегруза, с акцентом на вашу внешность.',
  },
  {
    title: 'Skin Care',
    image: skincareImage,
    description:
      'Уходовые процедуры для свежести, ровного тона и ощущения обновления кожи.',
  },
  {
    title: 'Bridal Beauty',
    image: bridalImage,
    description:
      'Комплексная подготовка образа для важного дня: макияж, укладка и финальные детали.',
  },
];

const experience = [
  'Консультация перед процедурой',
  'Подбор услуги под внешность, стиль и состояние волос, кожи или ногтей',
  'Стерильность и профессиональные материалы',
  'Спокойная атмосфера без спешки',
  'Финальный результат, который выглядит естественно и дорого',
];

const galleryImages = [
  { image: resultImage, label: 'Natural glow result' },
  { image: detailImage, label: 'Salon detail' },
  { image: processImage, label: 'Master process' },
  { image: heroImage, label: 'Editorial portrait' },
  { image: nailsImage, label: 'Nails detail' },
  { image: hairImage, label: 'Soft styling' },
  { image: skincareImage, label: 'Skin care' },
  { image: bridalImage, label: 'Bridal beauty' },
];

const reviews = [
  'Очень спокойное и красивое место. Понравилось, что мастер сначала уточнила все пожелания, а не просто начала делать процедуру.',
  'Результат получился именно таким, как я хотела: аккуратно, нежно и без лишнего перегруза.',
  'Салон ощущается очень уютно. Красивый интерьер, приятное общение и действительно внимательное отношение.',
];

const inputClass =
  'w-full border border-current/10 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-current/30 focus:bg-white';

function useReveal(dependency) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [dependency]);
}

function scrollToBooking() {
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
}

function App() {
  const [themeKey, setThemeKey] = useState('soft');
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const theme = designThemes[themeKey];

  useReveal(themeKey);

  useEffect(() => {
    const savedTheme = localStorage.getItem('beauty.webtap.theme');
    if (savedTheme && designThemes[savedTheme]) {
      setThemeKey(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('beauty.webtap.theme', themeKey);
  }, [themeKey]);

  const heroProps = useMemo(() => ({ theme, themeKey }), [theme, themeKey]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 5200);
  }

  return (
    <div className={`site-shell ${theme.className}`}>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setThemeKey={setThemeKey}
        theme={theme}
        themeKey={themeKey}
      />

      <main>
        <Hero {...heroProps} />
        <About theme={theme} themeKey={themeKey} />
        <Services theme={theme} themeKey={themeKey} />
        <Signature theme={theme} themeKey={themeKey} />
        <Works theme={theme} themeKey={themeKey} />
        <Reviews theme={theme} />
        <Booking
          handleSubmit={handleSubmit}
          submitted={submitted}
          theme={theme}
          themeKey={themeKey}
        />
        <Contacts theme={theme} themeKey={themeKey} />
      </main>

      <Footer setMenuOpen={setMenuOpen} theme={theme} />

      <a
        aria-label="Написать в WhatsApp"
        className="floating-whatsapp"
        href={whatsappUrl}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, setThemeKey, theme, themeKey }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
        beauty.webtap
      </a>

      <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
        {navItems.map(item => (
          <a className="nav-link" href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto hidden items-center gap-3 lg:flex">
        <a className="back-to-webtap" href={mainSiteUrl}>
          <Home size={16} />
          WebTap
        </a>
        <ThemeSelect setThemeKey={setThemeKey} themeKey={themeKey} />
        <button className={`btn-base ${theme.button}`} onClick={scrollToBooking} type="button">
          <CalendarDays size={17} />
          Записаться
        </button>
      </div>

      <button
        aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        className="icon-button lg:hidden"
        onClick={() => setMenuOpen(value => !value)}
        type="button"
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {menuOpen && (
        <div className="mobile-menu lg:hidden">
          <ThemeSelect setThemeKey={setThemeKey} themeKey={themeKey} />
          <a className="mobile-back-to-webtap" href={mainSiteUrl} onClick={() => setMenuOpen(false)}>
            <Home size={17} />
            Вернуться на WebTap
          </a>
          {navItems.map(item => (
            <a
              className="mobile-nav-link"
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            className={`btn-base w-full justify-center ${theme.button}`}
            onClick={() => {
              setMenuOpen(false);
              scrollToBooking();
            }}
            type="button"
          >
            <CalendarDays size={17} />
            Записаться
          </button>
        </div>
      )}
    </header>
  );
}

function ThemeSelect({ setThemeKey, themeKey }) {
  const options = Object.values(designThemes).map(item => ({
    label: item.label,
    value: item.key,
  }));

  return (
    <div className="theme-select-wrap">
      <span>Design style</span>
      <CustomDropdown
        ariaLabel="Design style"
        onChange={setThemeKey}
        options={options}
        value={themeKey}
        variant="theme"
      />
    </div>
  );
}

function CustomDropdown({
  ariaLabel,
  className = '',
  error = false,
  name,
  onChange,
  options,
  placeholder = 'Выберите',
  value,
  variant = 'form',
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handlePointerDown(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleSelect(optionValue) {
    onChange(optionValue);
    setOpen(false);
  }

  return (
    <div
      className={`custom-dropdown custom-dropdown-${variant} ${open ? 'is-open' : ''} ${
        error ? 'has-error' : ''
      } ${className}`}
      ref={dropdownRef}
    >
      {name && <input name={name} type="hidden" value={value} />}
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="dropdown-button"
        onClick={() => setOpen(state => !state)}
        type="button"
      >
        <span className={selectedOption ? '' : 'dropdown-placeholder'}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className="dropdown-chevron" size={15} />
      </button>
      {open && (
        <div aria-label={ariaLabel} className="dropdown-menu" role="listbox">
          {options.map(option => (
            <button
              aria-selected={option.value === value}
              className="dropdown-option"
              key={option.value}
              onClick={() => handleSelect(option.value)}
              role="option"
              type="button"
            >
              {option.label}
              {option.value === value && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Hero({ theme, themeKey }) {
  if (theme.hero === 'editorial') {
    return (
      <section className="hero hero-editorial" id="top">
        <img
          alt=""
          className="hero-editorial-image"
          decoding="async"
          fetchPriority="high"
          src={heroImage}
        />
        <div className="hero-editorial-panel" data-reveal>
          <p className="eyebrow">{theme.eyebrow}</p>
          <h1>Beauty-пространство для тех, кто выбирает себя</h1>
          <p className="hero-copy">
            Деликатный уход, точная работа мастеров и атмосфера, в которую хочется возвращаться.
          </p>
          <HeroActions theme={theme} />
          <HeroNotes />
        </div>
        <div className="editorial-index">beauty.webtap / 2026</div>
      </section>
    );
  }

  if (theme.hero === 'minimal') {
    return (
      <section className="hero hero-minimal" id="top">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <p className="eyebrow">{theme.eyebrow}</p>
          <h1>Beauty-пространство для тех, кто выбирает себя</h1>
          <p className="hero-copy mx-auto">
            Деликатный уход, точная работа мастеров и атмосфера, в которую хочется возвращаться.
          </p>
          <HeroActions centered theme={theme} />
        </div>
        <div className="minimal-collage" data-reveal>
          <img
            alt="Премиальный интерьер салона beauty.webtap"
            decoding="async"
            fetchPriority="high"
            src={interiorImage}
          />
          <img
            alt="Аккуратный beauty-процесс"
            decoding="async"
            fetchPriority="high"
            src={masterImage}
          />
          <img
            alt="Натуральный beauty-результат"
            decoding="async"
            fetchPriority="high"
            src={resultImage}
          />
        </div>
        <HeroNotes centered />
      </section>
    );
  }

  if (theme.hero === 'glam') {
    return (
      <section className="hero hero-glam" id="top">
        <div className="hero-glam-content" data-reveal>
          <p className="eyebrow">{theme.eyebrow}</p>
          <h1>Beauty-пространство для тех, кто выбирает себя</h1>
          <p className="hero-copy">
            Деликатный уход, точная работа мастеров и атмосфера, в которую хочется возвращаться.
          </p>
          <HeroActions theme={theme} />
          <HeroNotes />
        </div>
        <div className="glam-collage" data-reveal>
          <img
            alt="Премиальный beauty-образ"
            className="glam-main"
            decoding="async"
            fetchPriority="high"
            src={heroImage}
          />
          <img
            alt="Деталь макияжа"
            className="glam-small glam-one"
            decoding="async"
            fetchPriority="high"
            src={makeupImage}
          />
          <img
            alt="Свадебный образ"
            className="glam-small glam-two"
            decoding="async"
            fetchPriority="high"
            src={bridalImage}
          />
          <span className="glam-line glam-line-top" />
          <span className="glam-line glam-line-bottom" />
        </div>
      </section>
    );
  }

  return (
    <section className="hero hero-split" id="top">
      <div className="hero-text" data-reveal>
        <p className="eyebrow">{theme.eyebrow}</p>
        <h1>Beauty-пространство для тех, кто выбирает себя</h1>
        <p className="hero-copy">
          Деликатный уход, точная работа мастеров и атмосфера, в которую хочется возвращаться.
        </p>
        <HeroActions theme={theme} />
        <HeroNotes />
      </div>
      <div className="hero-photo-wrap" data-reveal>
        <img
          alt="Девушка в мягком свете premium beauty studio"
          decoding="async"
          fetchPriority="high"
          src={heroImage}
        />
        <div className="hero-photo-caption">
          <span>personal care</span>
          <strong>10:00 - 20:00</strong>
        </div>
      </div>
    </section>
  );
}

function HeroActions({ centered = false, theme }) {
  return (
    <div className={`hero-actions ${centered ? 'justify-center' : ''}`}>
      <button className={`btn-base ${theme.button}`} onClick={scrollToBooking} type="button">
        Записаться на визит
        <ArrowRight size={17} />
      </button>
      <a className={`btn-base ${theme.outlineButton}`} href={whatsappUrl} rel="noreferrer" target="_blank">
        <MessageCircle size={17} />
        Написать в WhatsApp
      </a>
    </div>
  );
}

function HeroNotes({ centered = false }) {
  return (
    <div className={`hero-notes ${centered ? 'justify-center' : ''}`}>
      {['Индивидуальная консультация', 'Удобная онлайн-запись', 'Мастера с опытом'].map(item => (
        <span key={item}>
          <Check size={15} />
          {item}
        </span>
      ))}
    </div>
  );
}

function About({ theme, themeKey }) {
  return (
    <section className="section about-section" id="about">
      <div className={`section-grid ${themeKey === 'editorial' ? 'items-end' : ''}`}>
        <div data-reveal>
          <p className="eyebrow">{themeKey === 'editorial' ? '02 / about' : 'О beauty.webtap'}</p>
          <h2>Не просто салон. Пространство бережного ухода.</h2>
          <p className="lead">
            Мы создали beauty.webtap как место, где каждая деталь работает на ощущение комфорта:
            от консультации перед процедурой до финального результата. Здесь важны не поток и
            скорость, а качество, эстетика и внимательное отношение к каждому клиенту.
          </p>
          <div className="accent-list">
            {['Персональный подход', 'Эстетика в деталях', 'Профессиональная команда'].map(
              (item, index) => (
                <div className="accent-item" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ),
            )}
          </div>
        </div>
        <div className="about-visual" data-reveal>
          <img
            alt={themeKey === 'clean' ? 'Мастер во время процедуры' : 'Тёплый интерьер beauty.webtap'}
            decoding="async"
            loading="lazy"
            src={themeKey === 'clean' || themeKey === 'editorial' ? masterImage : interiorImage}
          />
          <div className="about-mini">
            <Sparkles size={18} />
            <span>quiet luxury care</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ theme, themeKey }) {
  return (
    <section className="section" id="services">
      <SectionHead
        eyebrow={themeKey === 'editorial' ? '03 / services' : 'Услуги'}
        subtitle="Премиальные процедуры для образа, который выглядит ухоженно, спокойно и точно."
        title="Уход, собранный вокруг вас"
      />

      <div className={`services-grid services-${themeKey}`}>
        {services.map((service, index) => (
          <article className={`service-card ${theme.card}`} data-reveal key={service.title}>
            <div className="service-image">
              <img alt={service.title} decoding="async" loading="lazy" src={service.image} />
              {themeKey === 'editorial' && <span>{String(index + 1).padStart(2, '0')}</span>}
            </div>
            <div className="service-body">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="text-link" onClick={scrollToBooking} type="button">
                Записаться
                <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Signature({ theme, themeKey }) {
  return (
    <section className="section signature-section">
      <div className={`signature-wrap signature-${themeKey}`} data-reveal>
        <div>
          <p className="eyebrow">{themeKey === 'editorial' ? '04 / ritual' : 'Signature experience'}</p>
          <h2>Каждый визит — это продуманный beauty-ритуал</h2>
        </div>
        <div className="signature-list">
          {experience.map((item, index) => (
            <div className="signature-item" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works({ themeKey }) {
  return (
    <section className="section works-section" id="works">
      <SectionHead
        eyebrow={themeKey === 'editorial' ? '05 / portfolio' : 'Работы'}
        subtitle="Фрагменты работ, интерьера и атмосферы beauty.webtap."
        title="Эстетика, которую видно в деталях"
      />
      <div className={`gallery gallery-${themeKey}`}>
        {galleryImages.map((item, index) => (
          <figure className="gallery-item" data-reveal key={`${item.label}-${index}`}>
            <img alt={item.label} decoding="async" loading="lazy" src={item.image} />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Reviews({ theme }) {
  return (
    <section className="section reviews-section">
      <SectionHead
        eyebrow="Отзывы"
        subtitle="Короткие впечатления клиенток после визитов в beauty.webtap."
        title="Когда внимание чувствуется сразу"
      />
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <article className="review-card" data-reveal key={review}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>“{review}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Booking({ handleSubmit, submitted, theme, themeKey }) {
  const [selectedService, setSelectedService] = useState('');
  const [serviceError, setServiceError] = useState(false);
  const serviceOptions = services.map(service => ({
    label: service.title,
    value: service.title,
  }));

  function submitBooking(event) {
    if (!selectedService) {
      event.preventDefault();
      setServiceError(true);
      return;
    }

    handleSubmit(event);
  }

  return (
    <section className="section booking-section" id="booking">
      <div className={`booking-wrap booking-${themeKey}`}>
        <div data-reveal>
          <p className="eyebrow">{themeKey === 'editorial' ? '06 / appointment' : 'Запись'}</p>
          <h2>Запланируйте свой визит</h2>
          <p className="lead">
            Оставьте заявку — мы уточним удобное время и поможем выбрать подходящую услугу.
          </p>
          <a className={`btn-base ${theme.outlineButton}`} href={whatsappUrl} rel="noreferrer" target="_blank">
            <MessageCircle size={17} />
            Быстрая запись в WhatsApp
          </a>
        </div>

        <form className="booking-form" data-reveal onSubmit={submitBooking}>
          <div className="form-grid">
            <input className={inputClass} name="name" placeholder="Имя" required />
            <input className={inputClass} name="phone" placeholder="Телефон" required type="tel" />
            <CustomDropdown
              ariaLabel="Услуга"
              error={serviceError}
              name="service"
              onChange={value => {
                setSelectedService(value);
                setServiceError(false);
              }}
              options={serviceOptions}
              placeholder="Услуга"
              value={selectedService}
            />
            <input className={inputClass} name="date" placeholder="Желаемая дата" type="date" />
          </div>
          {serviceError && <p className="form-error">Выберите услугу для записи.</p>}
          <textarea className={`${inputClass} min-h-32 resize-none`} name="comment" placeholder="Комментарий" />
          <button className={`btn-base w-full justify-center ${theme.button}`} type="submit">
            Отправить заявку
            <ArrowRight size={17} />
          </button>
          {submitted && (
            <div className="success-message" role="status">
              Спасибо! Мы свяжемся с вами, чтобы подтвердить запись.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Contacts({ themeKey }) {
  return (
    <section className="section contacts-section" id="contacts">
      <div className="contacts-grid">
        <div data-reveal>
          <p className="eyebrow">{themeKey === 'editorial' ? '07 / contacts' : 'Контакты'}</p>
          <h2>Контакты</h2>
          <div className="contact-list">
            <a href={whatsappUrl} rel="noreferrer" target="_blank">
              <MessageCircle size={18} />
              WhatsApp: +7 700 000 00 00
            </a>
            <a href="https://instagram.com/webtap.kz" rel="noreferrer" target="_blank">
              <Instagram size={18} />
              Instagram: @webtap.kz
            </a>
            <span>
              <MapPin size={18} />
              Адрес: Туран 103
            </span>
            <span>
              <CalendarDays size={18} />
              График: ежедневно с 10:00 до 20:00
            </span>
          </div>
        </div>
        <div className="map-placeholder" data-reveal>
          <span>Здесь будет карта</span>
        </div>
      </div>
    </section>
  );
}

function Footer({ setMenuOpen, theme }) {
  return (
    <footer className="footer">
      <div>
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          beauty.webtap
        </a>
        <p>Премиальное beauty-пространство для бережного ухода.</p>
      </div>
      <nav aria-label="Навигация в футере">
        {navItems.map(item => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="footer-links">
        <a href={mainSiteUrl}>
          WebTap
        </a>
        <a href={whatsappUrl} rel="noreferrer" target="_blank">
          WhatsApp
        </a>
        <a href="https://instagram.com/webtap.kz" rel="noreferrer" target="_blank">
          Instagram
        </a>
      </div>
      <span className="copyright">© 2026 beauty.webtap</span>
    </footer>
  );
}

function SectionHead({ eyebrow, subtitle, title }) {
  return (
    <div className="section-head" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default App;
export { designThemes };
