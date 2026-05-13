import { motion, AnimatePresence } from "motion/react";
import { Waves, Droplet, Shield, Cloud, MapPin, Phone, Instagram, X } from "lucide-react";
import { useState } from "react";

function GalleryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [userImages, setUserImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const images = [
    { url: "https://images.unsplash.com/photo-1543831804-06767210db23?auto=format&fit=crop&q=80&w=1200", title: "Закат в море" },
    { url: "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=1200", title: "Интерьер парной" },
    { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200", title: "Зона отдыха" },
    { url: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=1200", title: "Ритуал парения" },
    { url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=1200", title: "Чайная церемония" },
    { url: "https://images.unsplash.com/photo-1621293954908-d81149c0dd07?auto=format&fit=crop&q=80&w=1200", title: "Морская купель" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUserImages(prev => [...newImages, ...prev]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUserImages(prev => [...newImages, ...prev]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div className="absolute inset-0 bg-sea-950/95 backdrop-blur-2xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-7xl h-[90vh] glass-card rounded-[40px] overflow-hidden flex flex-col pointer-events-auto"
          >
            <div className="p-8 md:px-12 flex justify-between items-center border-b border-white/5 bg-white/[0.02]">
              <div>
                <h2 className="font-serif text-3xl text-white font-light italic">Впечатления</h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-1">Галерея комплекса и ваши фото</p>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 space-y-20">
              {/* Upload Section */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-white font-light italic">Ваши фотографии</h3>
                  <label className="cursor-pointer group flex items-center space-x-3 text-[10px] uppercase tracking-widest text-gold font-semibold bg-gold/5 px-6 py-3 rounded-full border border-gold/20 hover:bg-gold/10 transition-all">
                    <span>Загрузить фото</span>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
                
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`
                    relative w-full h-48 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center space-y-3 transition-all duration-300
                    ${isDragging ? 'border-gold bg-gold/5 scale-[0.99] shadow-2xl' : 'border-white/5 bg-white/0 hover:border-white/10 hover:bg-white/[0.02]'}
                    ${userImages.length === 0 ? 'h-64' : 'h-40'}
                  `}
                >
                  <Cloud className={`w-8 h-8 transition-colors ${isDragging ? 'text-gold' : 'text-white/20'}`} />
                  <p className="text-white/30 text-sm font-light">Перетащите снимки сюда или <span className="text-white/50 border-b border-white/20">выберите на диске</span></p>
                </div>

                {userImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {userImages.map((url, idx) => (
                      <motion.div
                        key={idx}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
                      >
                        <img src={url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>

              {/* Official Gallery */}
              <section className="space-y-8">
                <h3 className="font-serif text-2xl text-white font-light italic">Атмосфера комплекса</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                  {images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative aspect-[4/5] md:aspect-square rounded-3xl overflow-hidden group border border-white/5 shadow-2xl shadow-black/50"
                    >
                      <img 
                        src={img.url} 
                        alt={img.title}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110 active:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-sea-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                        <span className="text-gold text-[10px] uppercase tracking-[0.3em] mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Экстерьер</span>
                        <span className="text-white font-serif italic text-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">{img.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function BackgroundAtmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div className="bg-glow-orb top-[-10%] right-[-10%] w-[600px] h-[600px] bg-sea-800" />
      <div className="bg-glow-orb bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-sea-900 opacity-60 blur-[150px]" />
      <div className="bg-glow-orb top-[20%] left-[30%] w-[300px] h-[300px] bg-gold opacity-10 blur-[100px]" />
    </div>
  );
}

function Nav() {
  return (
    <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 border border-gold rounded-full flex items-center justify-center">
          <span className="text-gold font-serif italic text-xl">B</span>
        </div>
        <span className="tracking-[0.2em] font-light text-sm hidden sm:inline text-white/80">BANYA V MORE</span>
      </div>
      <div className="flex items-center space-x-6 sm:space-x-10 text-[11px] uppercase tracking-[0.15em] text-white/50">
        <a href="#hero" className="text-white border-b border-gold pb-1 transition-all">Главная</a>
        <a href="#pricing" className="hover:text-white transition-colors">Услуги</a>
        <a href="#booking" className="hover:text-white transition-colors">Контакты</a>
        <a href="tel:+79244205555" className="p-2 border border-gold/30 rounded-full text-gold hover:bg-gold hover:text-black transition-all md:hidden">
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </nav>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col overflow-hidden bg-white/0">
      <BackgroundAtmosphere />
      <Nav />

      {/* Floating Call Button for Mobile */}
      <motion.a
        href="tel:+79244205555"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gold text-black rounded-full flex items-center justify-center shadow-2xl md:hidden"
      >
        <Phone className="w-6 h-6" />
      </motion.a>
      
      <div className="relative z-10 flex-1 grid grid-cols-12 px-6 md:px-12 pb-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold">Уникальный отдых во Владивостоке</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[60px] sm:text-[84px] md:text-[100px] leading-[0.9] font-serif font-light mb-8 text-white"
          >
            Почувствуйте <br/>
            <span className="italic text-gold">силу моря</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-md leading-relaxed mb-10 font-light"
          >
            Первая во Владивостоке баня на дровах прямо в открытом море. Панорамные виды, ледяная купель за бортом и абсолютное уединение.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6"
          >
            <a 
              href="#booking"
              className="px-10 py-5 bg-gold text-black font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-gold-hover transition-all shadow-xl shadow-gold/10 inline-block text-center"
            >
              Забронировать
            </a>
            <a 
              href="tel:+79244205555"
              className="px-10 py-5 border border-gold/30 text-gold font-semibold text-sm uppercase tracking-widest rounded-full hover:bg-gold/5 transition-all inline-flex items-center justify-center gap-3"
            >
              <Phone className="w-4 h-4" /> Позвонить
            </a>
            <div className="flex flex-col ml-0 sm:ml-4">
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Аренда от</span>
              <span className="text-xl font-serif text-white">5 000 ₽ / час</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 lg:col-span-5 hidden lg:flex flex-col justify-center space-y-6"
        >
          <div className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            </div>
            <h3 className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-6">Текущая температура</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-4xl font-serif text-white">92°C</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Парная</div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-serif text-white">19°C</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-1">За бортом</div>
                </div>
              </div>

              <div className="h-[1px] bg-white/10 w-full" />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gold mb-1 italic uppercase tracking-wider">Материал</div>
                  <div className="text-sm font-light text-white/80">Сибирский кедр</div>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gold mb-1 italic uppercase tracking-wider">Локация</div>
                  <div className="text-sm font-light text-white/80">Открытое море</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="py-32 px-6 md:px-12 bg-sea-950 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="flex flex-col items-center">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4">Наши ценности</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-light italic">Философия отдыха</h2>
            <div className="w-12 h-[1px] bg-gold/30 mt-8" />
          </div>
          <p className="text-xl md:text-2xl text-white/50 font-serif leading-relaxed italic font-light">
            Гармония раскаленного пара, свежего морского воздуха и бескрайнего горизонта. Мы создали тихую гавань, где стихии встречаются для вашего здоровья и спокойствия.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function Features() {
  const features = [
    {
      icon: <Waves className="w-6 h-6 text-gold" />,
      tag: "01",
      title: "Морское погружение",
      description: "Единственная возможность нырнуть в открытое море прямо после парной. Моментальный контраст и перезагрузка."
    },
    {
      icon: <Cloud className="w-6 h-6 text-gold" />,
      tag: "02",
      title: "Дыхание кедра",
      description: "Парная из сибирского кедра наполняет воздух ароматами леса, создавая целебный микроклимат и уют."
    },
    {
      icon: <Shield className="w-6 h-6 text-gold" />,
      tag: "03",
      title: "Приватный трансфер",
      description: "Ваше приключение начинается с прогулки на катере. Полная изоляция от городской суеты и случайных людей."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-sea-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="flex flex-col space-y-6 group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/40 group-hover:border-gold group-hover:text-gold transition-colors font-mono">
                {feature.tag}
              </div>
              <h3 className="font-serif text-2xl text-white font-light">{feature.title}</h3>
            </div>
            <p className="text-white/40 leading-relaxed font-light pl-14">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function PanoramaView() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section className="py-32 bg-sea-950 relative">
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 space-y-10">
          <div>
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 inline-block">Иммерсивность</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white leading-[1.1] font-light">
              Вид, который <br />
              <span className="italic text-gold">завораживает</span>
            </h2>
          </div>
          <p className="text-lg text-white/50 font-light leading-relaxed max-w-lg">
            Панорамное остекление по всему периметру создает эффект полного отсутствия границ. Наблюдайте за утренним туманом или огненными закатами Владивостока, не выходя из мягкого тепла парной.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => setIsGalleryOpen(true)}
              className="text-xs uppercase tracking-[0.3em] font-semibold text-gold border-b border-gold/30 pb-2 hover:border-gold transition-all cursor-pointer"
            >
              Галерея комплекса
            </button>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex-1 relative aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1543831804-06767210db23?auto=format&fit=crop&q=80&w=1200" 
            alt="Interior view" 
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 active:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-linear-to-t from-sea-950/80 to-transparent opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}

export function Pricing() {
  const prices = [
    { service: "Аренда комплекса целиком", detail: "До 6 гостей включительно", price: "5 000 ₽ / час" },
    { service: "Ритуал парения «Морской бриз»", detail: "45 минут / профессиональный пармейстер", price: "3 500 ₽" },
    { service: "Банщик (услуги на всё время)", detail: "Индивидуальный подход", price: "8 000 ₽" },
    { service: "Трансфер туда-обратно", detail: "Комфортабельный катер из яхт-клуба", price: "Включено" }
  ];

  return (
    <section id="pricing" className="py-32 px-6 md:px-12 bg-sea-900 overflow-hidden relative">
      <BackgroundAtmosphere />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4 inline-block">Ваш визит</span>
          <h2 className="font-serif text-5xl text-white font-light italic">Стоимость услуг</h2>
        </div>
        
        <div className="glass-card rounded-[32px] overflow-hidden">
          {prices.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center py-10 px-8 sm:px-12 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group"
            >
              <div className="space-y-1 mb-4 md:mb-0">
                <div className="text-white text-xl font-serif font-light">{item.service}</div>
                <div className="text-[11px] text-white/30 uppercase tracking-[0.1em]">{item.detail}</div>
              </div>
              <div className="text-gold font-serif text-2xl group-hover:scale-110 transition-transform origin-right">
                {item.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <footer id="booking" className="relative bg-sea-950 pt-32 pb-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-16">
          <div className="space-y-6">
            <h2 className="font-serif text-[50px] md:text-[80px] leading-tight text-white font-light">
              Ждем вас <span className="italic text-gold">в море</span>
            </h2>
            <p className="text-white/40 tracking-[0.2em] uppercase text-xs">Готовы к полному расслаблению?</p>
          </div>
          
          <div className="w-full max-w-5xl py-12 px-6 rounded-3xl border border-white/10 glass-card grid grid-cols-1 md:grid-cols-3 items-center justify-around gap-8 md:gap-4 group">
            <a href="https://wa.me/79244205555" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group/item">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">WhatsApp</span>
              <span className="text-xl sm:text-2xl font-serif text-white group-hover/item:text-gold transition-colors">+7 (924) 420-55-55</span>
            </a>
            <div className="hidden md:block w-px h-12 bg-white/10 mx-auto" />
            <div className="flex flex-col items-center gap-6">
              <a href="https://t.me/banya_v_more_vl" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group/item">
                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Telegram</span>
                <span className="text-xl sm:text-2xl font-serif text-white group-hover/item:text-gold transition-colors">@banya_v_more_vl</span>
              </a>
              <a href="https://instagram.com/banya_v_more" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group/item">
                <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Instagram</span>
                <span className="text-xl sm:text-2xl font-serif text-white group-hover/item:text-gold transition-colors">@banya_v_more</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 w-full pt-20 border-t border-white/5 items-center gap-8">
            <div className="text-left order-2 md:order-1">
              <div className="flex items-center space-x-3 text-white/40 text-[10px] uppercase tracking-[0.2em]">
                <MapPin className="w-3 h-3" />
                <span>г. Владивосток, Набережная 7Б, Бухта Фёдорова</span>
              </div>
            </div>
            
            <div className="flex justify-center order-1 md:order-2">
               <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
              </div>
            </div>
            
            <div className="text-right text-[10px] uppercase tracking-[0.2em] text-white/20 order-3">
              © {new Date().getFullYear()} Все права защищены
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}
