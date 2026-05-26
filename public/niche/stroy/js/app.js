/* js/app.js - Логика свитчера, калькуляторов и WhatsApp-интеграции */

document.addEventListener("DOMContentLoaded", () => {
    
    // Номер телефона строительной компании в WhatsApp (в формате 7XXXXXXXXXX без +)
    // В боевой версии здесь будет реальный номер компании.
    const COMPANY_WHATSAPP_NUMBER = "79001234567";

    // Инициализация масок для телефонов (простой обработчик ввода)
    initPhoneMasks();

    // Инициализация FAQ аккордеонов
    initFaqAccordions();

    // ==========================================
    // ЛОГИКА ДЕМО-ПЕРЕКЛЮЧАТЕЛЯ СТИЛЕЙ
    // ==========================================
    const switcherToggle = document.getElementById("switcher-toggle");
    const switcherDrawer = document.getElementById("switcher-drawer");
    const drawerClose = document.getElementById("drawer-close");
    const switcherCards = document.querySelectorAll(".switcher-card");
    const transitionOverlay = document.getElementById("transition-overlay");
    
    let isTransitioning = false;

    // Открыть панель вариантов
    switcherToggle.addEventListener("click", () => {
        switcherDrawer.classList.add("open");
    });

    // Закрыть панель
    drawerClose.addEventListener("click", () => {
        switcherDrawer.classList.remove("open");
    });

    // Закрытие кликом вне панели
    document.addEventListener("click", (e) => {
        if (!switcherDrawer.contains(e.target) && !switcherToggle.contains(e.target)) {
            switcherDrawer.classList.remove("open");
        }
    });

    // Переключение темы
    switcherCards.forEach(card => {
        card.addEventListener("click", () => {
            const targetTheme = card.getAttribute("data-theme");
            
            // Если уже активна или идет анимация — игнорируем
            if (card.classList.contains("active") || isTransitioning) return;

            isTransitioning = true;
            switcherDrawer.classList.remove("open");

            // Запускаем полноэкранный переход
            transitionOverlay.classList.add("animating");

            // Меняем тему в середине анимации (когда экран полностью закрыт)
            setTimeout(() => {
                // Удаляем старую активную тему
                document.body.className = targetTheme;

                // Переключаем активный блок контента
                document.querySelectorAll(".demo-site-container").forEach(site => {
                    site.classList.remove("active-site");
                });

                let targetSiteId = "";
                if (targetTheme === "theme-ecoframe") targetSiteId = "ecoframe-site";
                if (targetTheme === "theme-monolith") targetSiteId = "monolith-site";
                if (targetTheme === "theme-promstroy") targetSiteId = "promstroy-site";

                const targetSite = document.getElementById(targetSiteId);
                targetSite.classList.add("active-site");

                // Скролл наверх нового шаблона
                window.scrollTo(0, 0);

                // Обновляем активную карточку в свитчере
                switcherCards.forEach(c => c.classList.remove("active"));
                card.classList.add("active");

                // Дополнительная переинициализация калькуляторов при переключении
                recalculateAll();

            }, 600); // Совпадает со временем закрытия шторок

            // Убираем шторки после полной смены
            setTimeout(() => {
                transitionOverlay.classList.remove("animating");
                isTransitioning = false;
            }, 1200);
        });
    });


    // ==========================================
    // КАЛЬКУЛЯТОР 1: ECOFRAME (СКАНДИ)
    // ==========================================
    const ecoCalc = {
        currentStep: 1,
        totalSteps: 3,
        
        init() {
            const container = document.getElementById("ecoframe-site");
            if (!container) return;

            const nextBtn = container.querySelector(".btn-calc-next");
            const prevBtn = container.querySelector(".btn-calc-prev");
            const dots = container.querySelectorAll(".calc-progress-dots .dot");
            const steps = container.querySelectorAll(".calc-step");

            const updateNavigation = () => {
                // Активация/деактивация шагов
                steps.forEach(step => step.classList.remove("active"));
                container.querySelector(`.calc-step[data-step="${this.currentStep}"]`).classList.add("active");

                // Обновление точек
                dots.forEach((dot, idx) => {
                    if (idx + 1 <= this.currentStep) {
                        dot.classList.add("active");
                    } else {
                        dot.classList.remove("active");
                    }
                });

                // Блокировка кнопок
                prevBtn.disabled = this.currentStep === 1;
                
                if (this.currentStep === this.totalSteps) {
                    nextBtn.textContent = "Готово";
                    nextBtn.style.opacity = "0.5";
                    nextBtn.disabled = true;
                } else {
                    nextBtn.textContent = "Далее";
                    nextBtn.style.opacity = "1";
                    nextBtn.disabled = false;
                }
            };

            nextBtn.addEventListener("click", () => {
                if (this.currentStep < this.totalSteps) {
                    this.currentStep++;
                    updateNavigation();
                }
            });

            prevBtn.addEventListener("click", () => {
                if (this.currentStep > 1) {
                    this.currentStep--;
                    updateNavigation();
                }
            });

            // Обработка клика по карточкам-опциям
            container.querySelectorAll(".calc-option").forEach(option => {
                option.addEventListener("click", (e) => {
                    const radio = option.querySelector("input[type='radio']");
                    if (radio) {
                        // Снимаем выбор с соседних опций в этой группе
                        const siblings = option.parentNode.querySelectorAll(".calc-option");
                        siblings.forEach(s => s.classList.remove("active"));
                        
                        option.classList.add("active");
                        radio.checked = true;
                        
                        this.calculate();
                    }
                });
            });

            // Кнопка отправки в WhatsApp
            const submitBtn = document.getElementById("btn-eco-calc-submit");
            submitBtn.addEventListener("click", () => {
                this.sendToWhatsApp();
            });

            this.calculate();
        },

        calculate() {
            const container = document.getElementById("ecoframe-site");
            if (!container) return;

            // Выбранная площадь
            const areaRadio = container.querySelector("input[name='eco-area']:checked");
            const basePrice = areaRadio ? parseFloat(areaRadio.getAttribute("data-price")) : 0;

            // Множитель комплектации
            const compRadio = container.querySelector("input[name='eco-comp']:checked");
            const multiplier = compRadio ? parseFloat(compRadio.getAttribute("data-multiplier")) : 1.0;

            // Наценка фундамента
            const fundRadio = container.querySelector("input[name='eco-fund']:checked");
            const extraFund = fundRadio ? parseFloat(fundRadio.getAttribute("data-extra")) : 0;

            // Итого
            const total = (basePrice * multiplier) + extraFund;
            
            // Вывод цены
            const priceEl = document.getElementById("eco-total-price");
            if (priceEl) {
                priceEl.textContent = formatPrice(total);
            }
        },

        sendToWhatsApp() {
            const container = document.getElementById("ecoframe-site");
            const nameVal = document.getElementById("eco-calc-name").value.trim();
            const phoneVal = document.getElementById("eco-calc-phone").value.trim();

            if (!nameVal || !phoneVal) {
                alert("Пожалуйста, заполните Имя и Телефон для получения сметы.");
                return;
            }

            const area = container.querySelector("input[name='eco-area']:checked").value;
            const comp = container.querySelector("input[name='eco-comp']:checked").value;
            const fund = container.querySelector("input[name='eco-fund']:checked").value;
            const price = document.getElementById("eco-total-price").textContent;

            // Формируем текст
            const text = `Здравствуйте! Я рассчитал смету на скандинавский дом EcoFrame.\n\n` +
                         `*Данные расчета:*\n` +
                         `• Площадь: ${area}\n` +
                         `• Комплектация: ${comp}\n` +
                         `• Фундамент: ${fund}\n` +
                         `• Ориентировочная стоимость: *${price}*\n\n` +
                         `*Контакты:* ${nameVal}, ${phoneVal}\n` +
                         `Прошу прислать детальный расчет проекта на WhatsApp.`;

            sendWhatsAppMessage(text);
        }
    };


    // ==========================================
    // КАЛЬКУЛЯТОР 2: MONOLITH (ПРЕМИУМ)
    // ==========================================
    const monoCalc = {
        init() {
            const container = document.getElementById("monolith-site");
            if (!container) return;

            // Обработка клика по радио-кнопкам площади
            container.querySelectorAll(".mono-btn-radio").forEach(btn => {
                btn.addEventListener("click", () => {
                    const radio = btn.querySelector("input[type='radio']");
                    if (radio) {
                        container.querySelectorAll(".mono-btn-radio").forEach(b => b.classList.remove("active"));
                        btn.classList.add("active");
                        radio.checked = true;
                        this.calculate();
                    }
                });
            });

            // Изменение селекта
            const selectGlass = document.getElementById("mono-glass");
            selectGlass.addEventListener("change", () => this.calculate());

            // Чекбоксы доп.опций
            container.querySelectorAll(".mono-checkboxes input").forEach(cb => {
                cb.addEventListener("change", () => this.calculate());
            });

            // Отправка в WA
            const submitBtn = document.getElementById("btn-mono-calc-submit");
            submitBtn.addEventListener("click", () => {
                this.sendToWhatsApp();
            });

            this.calculate();
        },

        calculate() {
            const container = document.getElementById("monolith-site");
            if (!container) return;

            const areaRadio = container.querySelector("input[name='mono-area']:checked");
            const basePrice = areaRadio ? parseFloat(areaRadio.getAttribute("data-price")) : 0;

            const selectGlass = document.getElementById("mono-glass");
            const glassOpt = selectGlass.options[selectGlass.selectedIndex];
            const multiplier = parseFloat(glassOpt.getAttribute("data-multiplier")) || 1.0;

            let extraCost = 0;
            container.querySelectorAll(".mono-checkboxes input:checked").forEach(cb => {
                extraCost += parseFloat(cb.getAttribute("data-price")) || 0;
            });

            const total = (basePrice * multiplier) + extraCost;

            const priceEl = document.getElementById("mono-total-price");
            if (priceEl) {
                priceEl.textContent = formatPrice(total);
            }
        },

        sendToWhatsApp() {
            const container = document.getElementById("monolith-site");
            const nameVal = document.getElementById("mono-calc-name").value.trim();
            const phoneVal = document.getElementById("mono-calc-phone").value.trim();

            if (!nameVal || !phoneVal) {
                alert("Пожалуйста, заполните Имя владельца и Телефон для получения сметы.");
                return;
            }

            const area = container.querySelector("input[name='mono-area']:checked").value;
            
            const selectGlass = document.getElementById("mono-glass");
            const glass = selectGlass.options[selectGlass.selectedIndex].value;

            const extras = [];
            container.querySelectorAll(".mono-checkboxes input:checked").forEach(cb => {
                extras.push(cb.value);
            });
            const extrasText = extras.length > 0 ? extras.join(", ") : "нет дополнительных опций";

            const price = document.getElementById("mono-total-price").textContent;

            const text = `Приветствую. Меня интересует индивидуальная вилла Monolith.\n\n` +
                         `*Конфигурация проекта:*\n` +
                         `• Желаемая площадь: ${area}\n` +
                         `• Остекление: ${glass}\n` +
                         `• Премиум-опции: ${extrasText}\n` +
                         `• Предварительный бюджет: *${price}*\n\n` +
                         `*Клиент:* ${nameVal}, ${phoneVal}\n` +
                         `Прошу связать меня со старшим архитектором для разработки концепции.`;

            sendWhatsAppMessage(text);
        }
    };


    // ==========================================
    // КАЛЬКУЛЯТОР 3: PROMSTROY (ИНДУСТРИАЛЬНЫЙ)
    // ==========================================
    const promCalc = {
        init() {
            const container = document.getElementById("promstroy-site");
            if (!container) return;

            const areaRange = document.getElementById("prom-area-range");
            const selectType = document.getElementById("prom-type");
            const selectHeight = document.getElementById("prom-height");
            const gatesInput = document.getElementById("prom-gates");

            // При изменении ползунка площади обновляем текстовое значение
            areaRange.addEventListener("input", (e) => {
                document.getElementById("prom-area-val").textContent = e.target.value;
                this.calculate();
            });

            selectType.addEventListener("change", () => this.calculate());
            selectHeight.addEventListener("change", () => this.calculate());
            gatesInput.addEventListener("input", () => this.calculate());
            gatesInput.addEventListener("change", () => this.calculate());

            // Кнопка отправки
            const submitBtn = document.getElementById("btn-prom-calc-submit");
            submitBtn.addEventListener("click", () => {
                this.sendToWhatsApp();
            });

            this.calculate();
        },

        calculate() {
            const container = document.getElementById("promstroy-site");
            if (!container) return;

            const area = parseFloat(document.getElementById("prom-area-range").value) || 0;
            
            const selectType = document.getElementById("prom-type");
            const typeOpt = selectType.options[selectType.selectedIndex];
            const basePricePerM2 = parseFloat(typeOpt.getAttribute("data-base")) || 10000;

            const selectHeight = document.getElementById("prom-height");
            const heightOpt = selectHeight.options[selectHeight.selectedIndex];
            const heightMultiplier = parseFloat(heightOpt.getAttribute("data-multiplier")) || 1.0;

            const gates = parseInt(document.getElementById("prom-gates").value) || 0;
            const gateCost = gates * 180000; // 180 000 ₸ за ворота

            // Итоговая цена
            const total = (area * basePricePerM2 * heightMultiplier) + gateCost;

            // Расчет металлоемкости (условно 40 кг на 1 м2)
            const steelWeight = Math.round(area * 0.04);
            
            // Расчет примерного срока (условно 20 дней + 1.5 дня на каждые 100 кв.м. + 2 дня на каждые ворота)
            const days = Math.round(20 + (area / 100) * 1.5 + (gates * 2));

            // Запись в форму
            document.getElementById("prom-total-price").textContent = formatPrice(total);
            document.getElementById("prom-steel-weight").textContent = `~${steelWeight} тонн`;
            document.getElementById("prom-days").textContent = `${days} рабочих дней`;
        },

        sendToWhatsApp() {
            const nameVal = document.getElementById("prom-calc-name").value.trim();
            const phoneVal = document.getElementById("prom-calc-phone").value.trim();

            if (!nameVal || !phoneVal) {
                alert("Пожалуйста, заполните Контактное лицо и Телефон.");
                return;
            }

            const selectType = document.getElementById("prom-type");
            const type = selectType.options[selectType.selectedIndex].value;

            const area = document.getElementById("prom-area-range").value;

            const selectHeight = document.getElementById("prom-height");
            const height = selectHeight.options[selectHeight.selectedIndex].value;

            const gates = document.getElementById("prom-gates").value;
            const price = document.getElementById("prom-total-price").textContent;
            const steel = document.getElementById("prom-steel-weight").textContent;
            const days = document.getElementById("prom-days").textContent;

            const text = `Добрый день! Нам требуется коммерческое предложение на промышленное строительство PromStroy.\n\n` +
                         `*Технические параметры из калькулятора:*\n` +
                         `• Назначение здания: ${type}\n` +
                         `• Площадь: ${area} м²\n` +
                         `• Высота потолков: ${height}\n` +
                         `• Ворот: ${gates} шт.\n` +
                         `• Оценочный срок монтажа: ${days}\n` +
                         `• Примерный расход металла: ${steel}\n` +
                         `• Расчетный бюджет: *${price}*\n\n` +
                         `*Контакты:* ${nameVal}, ${phoneVal}\n` +
                         `Пожалуйста, свяжитесь с нами и подготовьте сметное предложение.`;

            sendWhatsAppMessage(text);
        }
    };

    // Функция пересчета всех калькуляторов (например, при смене тем)
    function recalculateAll() {
        ecoCalc.calculate();
        monoCalc.calculate();
        promCalc.calculate();
    }

    // Инициализация калькуляторов при загрузке
    ecoCalc.init();
    monoCalc.init();
    promCalc.init();


    // ==========================================
    // ЛОГИКА ФОРМ ОБРАТНОЙ СВЯЗИ (LEAD FORMS)
    // ==========================================
    
    // Форма EcoFrame (Сканди экскурсия)
    const ecoLeadForm = document.getElementById("eco-lead-form");
    if (ecoLeadForm) {
        ecoLeadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("eco-form-name").value.trim();
            const phone = document.getElementById("eco-form-phone").value.trim();
            const time = document.getElementById("eco-form-time").value;

            const text = `Здравствуйте! Я хочу записаться на экскурсию по строящимся объектам EcoFrame.\n\n` +
                         `*Контакты:* ${name}, ${phone}\n` +
                         `*Удобное время для звонка:* ${time}\n` +
                         `Пожалуйста, свяжитесь со мной для подтверждения даты экскурсии.`;

            sendWhatsAppMessage(text);
        });
    }

    // Форма Monolith VIP
    const monoLeadForm = document.getElementById("mono-lead-form");
    if (monoLeadForm) {
        monoLeadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("mono-form-name").value.trim();
            const phone = document.getElementById("mono-form-phone").value.trim();
            const budget = document.getElementById("mono-form-budget").value.trim() || "не указан";

            const text = `Добрый день. Хочу обсудить индивидуальный проект премиум-виллы Monolith.\n\n` +
                         `*Заявка на проектирование:*\n` +
                         `• Имя: ${name}\n` +
                         `• Контактный телефон: ${phone}\n` +
                         `• Ориентировочный бюджет: ${budget} млн ₸\n\n` +
                         `Прошу назначить встречу с главным архитектором.`;

            sendWhatsAppMessage(text);
        });
    }

    // Форма PromStroy B2B
    const promLeadForm = document.getElementById("prom-lead-form");
    if (promLeadForm) {
        promLeadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const company = document.getElementById("prom-form-company").value.trim() || "не указана";
            const name = document.getElementById("prom-form-name").value.trim();
            const phone = document.getElementById("prom-form-phone").value.trim();

            const text = `Приветствую. Нам требуется расчет строительства по ТЗ в компании PromStroy.\n\n` +
                         `*Заявка на расчет:*\n` +
                         `• Компания / ИНН: ${company}\n` +
                         `• Контактное лицо: ${name}\n` +
                         `• Телефон: ${phone}\n\n` +
                         `Свяжитесь со мной, я отправлю техническое задание и чертежи АР/КР.`;

            sendWhatsAppMessage(text);
        });
    }


    // ==========================================
    // ЛОГИКА ОТДЕЛЬНЫХ ССЫЛОК НА WHATSAPP
    // ==========================================
    document.querySelectorAll(".wa-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const origin = link.getAttribute("data-origin") || "Сайт строительной компании";
            const project = link.getAttribute("data-project");
            
            let message = "";
            if (project) {
                message = `Здравствуйте! Меня интересует проект "${project}". Прошу прислать планировки и сметную спецификацию.`;
            } else {
                message = `Здравствуйте! Перешел к вам с блока "${origin}". Расскажите подробнее о ваших проектах и условиях строительства.`;
            }

            sendWhatsAppMessage(message);
        });
    });


    // ==========================================
    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
    // ==========================================
    
    // Перенаправление на WhatsApp с закодированным текстом
    function sendWhatsAppMessage(messageText) {
        const encodedText = encodeURIComponent(messageText);
        const url = `https://api.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=${encodedText}`;
        window.open(url, "_blank");
    }

    // Форматирование цены в тенге (например: 3500000 -> 3 500 000 ₸)
    function formatPrice(number) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'KZT',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    }

    // Простой обработчик ввода телефона (маска)
    function initPhoneMasks() {
        document.querySelectorAll(".phone-mask").forEach(input => {
            input.addEventListener("input", (e) => {
                let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                if (!x) return;
                
                let val = '';
                if (!x[2]) {
                    val = x[1] ? '+' + x[1] : '';
                } else {
                    val = '+' + (x[1] === '7' || x[1] === '8' ? '7' : x[1]) + ' (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
                }
                
                e.target.value = val;
            });
        });
    }

    // Инициализация FAQ аккордеонов
    function initFaqAccordions() {
        document.querySelectorAll(".faq-question").forEach(question => {
            question.addEventListener("click", () => {
                const item = question.closest(".faq-item");
                if (!item) return;

                const isActive = item.classList.contains("active");

                // Закрываем другие вопросы в этом же списке для аккуратности
                const list = question.closest(".faq-list");
                if (list) {
                    list.querySelectorAll(".faq-item").forEach(i => {
                        i.classList.remove("active");
                    });
                }

                if (!isActive) {
                    item.classList.add("active");
                }
            });
        });
    }
});
