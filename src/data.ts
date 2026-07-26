import {
  UserProfile,
  DailyRoutineItem,
  Recipe,
  ExerciseRoutine,
  Habit,
  Badge,
  NoteItem,
  ShoppingItem,
  ReminderSetting,
  WeightLog,
  BodyMeasurement,
  DhikrItem,
  SpiritualQuote
} from './types';

export const initialProfile: UserProfile = {
  name: "",
  email: "",
  password: "",
  isLoggedIn: false,
  isProfileCreated: false,
  height: 165,
  startWeight: 0,
  currentWeight: 0,
  targetWeight: 68.0,
  dailyCalorieTarget: 1800,
  activityLevel: 'orta',
  isNursing: false,
  hasKneeIssue: false,
  startDate: new Date().toISOString().split('T')[0],
  targetDays: 68,
};

export const motivationalQuotes = [
  "Her gün atılan küçük adımlar, o büyük ve sağlıklı hedefe götürür!",
  "Gelişim bir gecede olmaz; kararlılık ve sabırla her gün yeniden başlar.",
  "Bebeğin için ve kendin için en güçlü versiyonun oluyorsun!",
  "Bahaneler kalori yakmaz, ama bugün içeceğin o 1 bardak su mucizeler yaratır.",
  "Bedenin bir mabet; ona şefkatle, sağlıklı gıdalarla ve sevgiyle bak.",
  "Kendi hikayenin kahramanı sensin. Sağlıklı yaşam yolculuğun başarıyla ilerliyor!",
  "Yorulunca dinlenmeyi öğren, pes etmeyi değil.",
  "Bugün kendine verdiğin sözü tut, yarın gurur duy.",
  "Allah'ım, bedenime sağlık, ruhuma huzur, evime bereket ihsan eyle.",
  "Rabbim evladını sana bağışlasın, attığın her adımda yar ve yardımcın olsun.",
  "Disiplin, isteklerin ile hedeflerin arasındaki en sağlam köprüdür.",
  "Bugün ektiğin sağlıklı alışkanlık tohumları, yarın zindelik olarak yeşerecek.",
  "Annelerin sabrı ve sevgisi dünyayı güzelleştirir; kendine şefkat göstermeyi unutma.",
  "Rabbim zihnini ferah, kalbini mutmain, bedenini sıhhatli eylesin.",
  "Bir anne güçlüyse, bir aile mutludur. Gücün içindeki sevgiden geliyor.",
  "Zorluklar seni durdurmak için değil, ne kadar güçlü olduğunu göstermek için vardır.",
  "Allah'ım, bana sabır, gücüme güç, ömrüme bereket ve hayırlı bir yaşam ver.",
  "Sağlık en büyük zenginliktir, bugün kendine yatırım yapmaktan vazgeçme.",
  "Rabbim evladınla geçirdiğin her anı huzurlu, neşeli ve sağlıkla dolu kılsın.",
  "Başarı, pes etmeyenlerin her gün sessizce attığı adımlarda gizlidir.",
  "Işığını dışarıdan bekleme; o ışık senin içindeki inançta ve azimde saklı.",
  "Ya Rabbim! Şafi isminle bedenime şifa, gönlüme ferahlık ver.",
  "Aynaya baktığında gurur duyacağın yarınlar için bugün küçük bir adım at.",
  "Kendine zaman ayırmak bencil olmak değil, sevdiklerine daha iyi yetebilmektir.",
  "Allah’ım, evlatlarımızı her türlü kötülükten korusun, sağlık ve afiyet versin.",
  "Küçük zaferlerini kutla; damlaya damlaya göl, adımla adımla yol olunur.",
  "Bedenin sana Allah'ın bir emanetidir; ona sevgiyle, iyi besinlerle bak.",
  "Bugün atacağın tek bir adım, dünkü duruşundan daha ileridedir.",
  "Rabbim yuvana huzur, hanene bereket, yüreğine inşirah versin.",
  "Yolculuk uzun olabilir ama senin azmin ve inancın her yoldan daha güçlü.",
  "Her doğan güneş, yeni bir başlangıç ve yeni bir şans demektir.",
  "Allah'ım, bizleri şükreden, sabreden ve hayırlı kapılara ulaşanlardan eyle.",
  "Su gibi aziz ol; bedenini besle, zihnini tazele ve ışılda.",
  "Anne olmak bir mucizedir; sen o mucizenin en güzel mimarısın.",
  "Rabbim bedenindeki yorgunluğu gidersin, yerine taptaze bir enerji versin.",
  "Bugün pes etmek yok; kendine, gücüne ve yarınlarına güven!",
  "Sen iyileştikçe ve güçlendikçe, etrafındaki herkes senin enerjinle güzelleşir.",
  "Allah'ım, atıştırmalıklarda ve kararlarımızda bize irade ve kolaylık lütfet.",
  "Sağlıklı bir beden, huzurlu bir zihin ve sevgi dolu bir kalp en büyük servettir.",
  "Sabır, dille değil kalple yürümektir. Sen çok güzel yürüyorsun.",
  "Rabbim attığın her adımda sana kolaylık versin, yükünü hafifletsin.",
  "Kıyaslama yapma; senin yolun sana özel ve her gün daha güzelleşiyor.",
  "Dün bitti, yarın henüz gelmedi; bugün sağlıklı seçimler yapmak için mükemmel an.",
  "Allah’ım, evlatlarımıza hayırlı ahlak, bedenlerimize sağlık ve afiyet ver.",
  "Sen harika bir annesin ve kendine değer vermeyi sonuna kadar hak ediyorsun.",
  "Mazeretleri bir kenara bırak; sağlık dolu bir yaşam senin tercihin.",
  "Rabbim kalbine ferahlık, evine neşe, niyetine bereket katın.",
  "Direnç gösterdiğin her an, iradeni çelik gibi güçlendirir.",
  "Bir tatlı gülümseme, bir bardak su ve derin bir nefes... İşte günün şifası!",
  "Allah'ım, çabalarımızı karşılıksız bırakma, hedeflerimize sağlıkla ulaştır.",
  "Hedeflerin hayallerinden büyük olsun; çalış ve gerisini tevekküle bırak.",
  "Bedenin, zihnin ve ruhun bir bütün; hepsini sevgiyle beslemeyi unutma.",
  "Rabbim sana ve sevdiklerine afiyet, huzur ve uzun ömürler versin.",
  "İrade bir kas gibidir; kullandıkça güçlenir ve seni zirveye taşır.",
  "Bugün kendin için güzel bir şey yap: Bir adım at, sağlıklı beslen, gülümse.",
  "Ya Rabbim! Bizi helal ve temiz rızıklarla, sağlıklı alışkanlıklarla donat.",
  "Büyük değişimler, kararlılıkla sürdürülen küçük rutinden doğar.",
  "Evladının gözlerindeki sevgi, senin en büyük güç kaynağındır.",
  "Allah'ım, darlık vermesin, şifa versin; günümüzü hayırlı kılsın.",
  "Her adımda daha hafif, her günde daha zinde ve mutlusun.",
  "İnanmak başarmanın yarısıysa, diğer yarısı da bugün adım atmaktır.",
  "Rabbim zihnimizi vesveselerden, bedenimizi hastalıklardan muhafaza eylesin.",
  "Kendi ritmini bul; acele etme ama asla durma.",
  "Bugün attığın her adım, gelecekteki sana verilmiş en güzel hediyedir.",
  "Allah'ım, evladımızla sağlıklı, neşeli ve uzun yıllar yaşamayı nasip eyle.",
  "Kendini sev, bedenine saygı duy ve sağlığını her zaman ön planda tut.",
  "Güçlü kadınlar engelleri aşmaz, onlardan yeni yollar inşa eder.",
  "Rabbim niyetini halis, gayretini daim, sonucunu bereketli kılsın.",
  "Günün nasıl başlarsa başlasın, onu güzelleştirmek senin elinde!",
  "Her nefes yeni bir umut, her gün Rabbimizin sunduğu taptaze bir nimettir."
];

export const initialRoutineList: DailyRoutineItem[] = [
  { id: 'rt1', time: '08:00', title: '1 Büyük Bardak Ilık Limonlu Su', iconName: 'Droplet', category: 'su', completed: false },
  { id: 'rt2', time: '08:30', title: 'Süt Dostu Proteinli Kahvaltı', iconName: 'Apple', category: 'kahvalti', completed: false },
  { id: 'rt3', time: '10:30', title: '20 dk Diz Dostu Anne Egzersizi', iconName: 'Activity', category: 'egzersiz', completed: false },
  { id: 'rt4', time: '13:00', title: '1 Bardak Süt Artıran Anne Çayı', iconName: 'Coffee', category: 'custom', completed: false },
  { id: 'rt5', time: '16:00', title: 'Gündüz Vitamini & Sıvı Takibi', iconName: 'Pill', category: 'vitamin', completed: false },
  { id: 'rt6', time: '20:30', title: 'Gece Sırt & Boyun Rahatlatma Esnemesi', iconName: 'Moon', category: 'gece', completed: false },
];

export const initialRecipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Dereotlu & Rezeneli Süt Artıran Anne Çayı',
    category: 'İçecek',
    prepTime: '10 dk',
    calories: 45,
    protein: 1,
    carbs: 8,
    fat: 0,
    ingredients: [
      '1 tatlı kaşığı anason tohumu',
      '1 tatlı kaşığı rezene tohumu',
      '1 tutam taze dereotu',
      '1 çubuk tarçın',
      '500 ml kaynar su'
    ],
    instructions: [
      'Anason ve rezene tohumlarını hafifçe havanda ezin.',
      'Kaynar suya tohumları, dereotunu ve çubuk tarçını ekleyin.',
      'Üzerini kapatıp 8-10 dakika demlenmeye bırakın.',
      'Süzerek ılık veya sıcak şekilde tüketin. Günde 2 fincan emzirme döneminde süt arttırmaya yardımcı olur.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    isFavorite: true,
  },
  {
    id: 'r2',
    title: 'Süt Dostu Hurmalı & Yulaf Sütlü Sıcak İçecek',
    category: 'İçecek',
    prepTime: '10 dk',
    calories: 160,
    protein: 4,
    carbs: 28,
    fat: 3,
    ingredients: [
      '1 su bardağı yulaf sütü (veya laktozsuz süt)',
      '2 adet çekirdeği çıkarılmış Medine hurması',
      '1/4 çay kaşığı toz tarçın',
      '1 çay kaşığı bal veya pekmez',
      '1 çimdik muskat rendesi'
    ],
    instructions: [
      'Yulaf sütünü ve doğranmış hurmaları cezvede kısık ateşte ısıtın.',
      'Isınan karışımı blenderda pürüzsüz olana kadar çekin.',
      'Üzerine tarçın ve muskat serperek sıcak servis yapın. Galaktagog etkisiyle anne sütünü besler ve tatlı krizini önler.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r3',
    title: 'Taze Naneli & Elmalı Anne Kompostosu (Şekersiz)',
    category: 'İçecek',
    prepTime: '20 dk',
    calories: 85,
    protein: 1,
    carbs: 20,
    fat: 0,
    ingredients: [
      '2 adet Kırmızı Elma',
      '1 çubuk Tarçın',
      '3-4 adet Karanfil',
      '1 dal Taze Nane',
      '1 litre Su',
      '1 yemek kaşığı Kuru Üzüm'
    ],
    instructions: [
      'Elmaları yıkayıp küp küp doğrayın.',
      'Tencereye su, elma, çubuk tarçın, karanfil ve kuru üzümü ekleyip kısık ateşte elmal yumuşayana kadar kaynatın.',
      'Ocağı kapattıktan sonra taze nane yapraklarını ekleyip soğumaya bırakın. Şekersiz doğal komposto sıvı alımınızı artırır.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r4',
    title: 'Avokadolu & Ispanaklı Yeşil Enerji Smoothie',
    category: 'İçecek',
    prepTime: '8 dk',
    calories: 195,
    protein: 5,
    carbs: 22,
    fat: 9,
    ingredients: [
      '1/2 adet Olgun Avokado',
      '1 avuç Taze Bebek Ispanak',
      '1/2 adet Yeşil Elma',
      '1 su bardağı Hindistan Cevizi Suyu',
      '1 tatlı kaşığı Chia Tohumu'
    ],
    instructions: [
      'Tüm malzemeleri yıkayıp blender haznesine alın.',
      'Pürüzsüz ve akışkan bir kıvam alana kadar yüksek devirde karıştırın.',
      'Taze olarak tüketin. Demir, potasyum ve sağlıklı yağlar emzirme döneminde canlılık sağlar.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r5',
    title: 'Kuşburnu & Isırgan Otu Kan Yapıcı Anne Çayı',
    category: 'İçecek',
    prepTime: '12 dk',
    calories: 30,
    protein: 0,
    carbs: 7,
    fat: 0,
    ingredients: [
      '1 yemek kaşığı Kurutulmuş Kuşburnu',
      '1 tatlı kaşığı Kurutulmuş Isırgan Otu',
      '1 dilim Taze Limon',
      '400 ml Kaynar Su'
    ],
    instructions: [
      'Kuşburnu tanelerini hafifçe ezin.',
      'Isırgan otu ve kuşburnunu demliğe koyup kaynar suyu ilave edin.',
      '10-12 dakika demlendikten sonra süzüp limon dilimiyle servis yapın. C vitamini ve demir emilimini destekler.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r6',
    title: 'Şeftalili & Zencefilli Sıvı Dengeleyici Soğuk Çay',
    category: 'İçecek',
    prepTime: '15 dk',
    calories: 65,
    protein: 1,
    carbs: 15,
    fat: 0,
    ingredients: [
      '1 adet Olgun Şeftali (dilimlenmiş)',
      '1 fındık büyüklüğünde Taze Zencefil',
      '2 poşet Papatya Çayı',
      '500 ml Kaynar Su',
      'Buz ve taze nane'
    ],
    instructions: [
      'Papatya çayı ve zencefili kaynar suda 8 dakika demleyip poşetleri çıkarın.',
      'Şeftali dilimlerini püre yapıp çaya ekleyin.',
      'Ilındıktan sonra buzdolabında soğutup buz ve nane ile ferahlatıcı olarak için.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r7',
    title: 'Dereotlu & Lor Peynirli Anne Omleti',
    category: 'Kahvaltı',
    prepTime: '12 dk',
    calories: 240,
    protein: 18,
    carbs: 5,
    fat: 16,
    ingredients: [
      '2 adet Yumurta',
      '2 yemek kaşığı Lor Peyniri',
      '1 tutam İnce Kıyılmış Dereotu',
      '1 çay kaşığı Çörek Otu',
      '1 tatlı kaşığı Zeytinyağı'
    ],
    instructions: [
      'Yumurtaları bir kapta çırpın, içine lor peyniri ve ince kıyılmış dereotunu ekleyin.',
      'Tavaya zeytinyağını döküp hafifçe ısıtın.',
      'Kısık ateşte omleti arkalı önlü pişirin.',
      'Üzerine süt artırıcı çörek otu serperek ılık servis edin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80',
    isFavorite: true,
  },
  {
    id: 'r8',
    title: 'Muzlu & Yulaflı Süt Dostu Pankek',
    category: 'Kahvaltı',
    prepTime: '15 dk',
    calories: 290,
    protein: 11,
    carbs: 42,
    fat: 8,
    ingredients: [
      '1 adet Olgun Muz',
      '1 adet Yumurta',
      '4 yemek kaşığı İnce Öğütülmüş Yulaf Ezmesi',
      '1/2 çay kaşığı Tarçın',
      '1 tatlı kaşığı Bal'
    ],
    instructions: [
      'Muzu çatalla ezin, yumurtayı ekleyip çırpın.',
      'Yulaf ezmesi ve tarçını ekleyip homojen bir harç elde edin.',
      'Yapışmaz tavaya kaşıkla dökerek arkalı önlü pişirin.',
      'Üzerine hafif bal gezdirerek tüketin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r9',
    title: 'Yulaf Lapası & Kırmızı Meyveli Fit Anne Kasesi',
    category: 'Kahvaltı',
    prepTime: '10 dk',
    calories: 270,
    protein: 10,
    carbs: 45,
    fat: 6,
    ingredients: [
      '4 yemek kaşığı Yulaf Ezmesi',
      '1 su bardağı Süt veya Yulaf Sütü',
      '1 avuç Yaban Mersini / Çilek',
      '1 tatlı kaşığı Keten Tohumu',
      '2 adet Ceviz İçi'
    ],
    instructions: [
      'Yulaf ve sütü küçük bir tencerede kısık ateşte koyulaşana kadar pişirin.',
      'Kaseye alıp üzerine taze kırmızı meyveleri, dövülmüş cevizi ve keten tohumunu ekleyin.',
      'Lif ve omega-3 deposu mükemmel bir anne kahvaltısıdır.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r10',
    title: 'Avokadolu & Çörek Otlu Tam Buğday Tostu',
    category: 'Kahvaltı',
    prepTime: '8 dk',
    calories: 280,
    protein: 9,
    carbs: 26,
    fat: 15,
    ingredients: [
      '2 dilim Ekşi Mayalı Tam Buğday Ekmeği',
      '1/2 adet Olgun Avokado',
      '1 tatlı kaşığı Limon Suyu',
      '1 tatlı kaşığı Çörek Otu',
      '1 dilim Süzme Peynir'
    ],
    instructions: [
      'Avokadoyu çatalla ezip limon suyu ve hafif tuzla karıştırın.',
      'Kızarmış ekmek dilimlerinin üzerine sürün.',
      'Üzerine süzme peynir ufalayıp bol çörek otu serpin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r11',
    title: 'Fırında Sebzeli & Peynirli Anne Mücveri',
    category: 'Kahvaltı',
    prepTime: '25 dk',
    calories: 210,
    protein: 12,
    carbs: 18,
    fat: 10,
    ingredients: [
      '2 adet Yeşil Kabak',
      '1 adet Havuç',
      '2 adet Yumurta',
      '3 yemek kaşığı Lor Peyniri',
      '2 yemek kaşığı Tam Buğday Unu',
      'Dereotu ve Maydanoz'
    ],
    instructions: [
      'Kabak ve havucu rendeleyip suyunu iyice sıkın.',
      'Yumurta, peynir, un ve yeşilliklerle karıştırın.',
      'Muffin kalıplarına döküp 180 derece fırında 20 dakika kızarana kadar pişirin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r12',
    title: 'Chia Tohumlu & Badem Sütlü Yoğurt Kasesi',
    category: 'Kahvaltı',
    prepTime: '10 dk',
    calories: 230,
    protein: 9,
    carbs: 28,
    fat: 9,
    ingredients: [
      '1 su bardağı Ev Yapımı Süzme Yoğurt',
      '1 yemek kaşığı Chia Tohumu',
      '1/2 adet Muz',
      '1 tatlı kaşığı Bal',
      '1 yemek kaşığı İnce File Badem'
    ],
    instructions: [
      'Yoğurt ve chia tohumunu karıştırıp 10 dakika bekletin.',
      'Üzerine dilimlenmiş muz, file badem ve bal gezdirin.',
      'Sindirimi kolaylaştırır, kalsiyum ihtiyacını karşılar.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r13',
    title: 'Fırında Sebzeli & Otlu Somon Fileto',
    category: 'Ana yemek',
    prepTime: '25 dk',
    calories: 380,
    protein: 32,
    carbs: 12,
    fat: 22,
    ingredients: [
      '1 dilim Somon Fileto',
      '1 adet Kabak',
      '1 adet Havuç',
      '1 yemek kaşığı Zeytinyağı',
      'Taze Limon suyu ve dereotu'
    ],
    instructions: [
      'Sebzeleri jülyen doğrayın.',
      'Fırın kabına sebzeleri ve somonu yerleştirin.',
      'Zeytinyağı, limon ve dereotu gezdirip 180 derece fırında 20 dakika pişirin.',
      'Omega-3 zengini besleyici akşam yemeği hazır.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=80',
    isFavorite: true,
  },
  {
    id: 'r14',
    title: 'Yeşil Mercimekli & Yulaflı Lohusa Çorbası',
    category: 'Ana yemek',
    prepTime: '30 dk',
    calories: 220,
    protein: 12,
    carbs: 35,
    fat: 4,
    ingredients: [
      '1 çay bardağı Yeşil Mercimek',
      '2 yemek kaşığı Yulaf Ezmesi',
      '1 adet Havuç',
      '1 tatlı kaşığı Zeytinyağı',
      'Nane ve Kimyon'
    ],
    instructions: [
      'Mercimekleri ve doğranmış havucu yumuşayana kadar haşlayın.',
      'Yulaf ezmesini ve baharatları ekleyip 5 dakika daha kaynatın.',
      'Blenderdan geçirip sıcak servis edin. Gaz yapmaması için kimyon eklenmiştir.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r15',
    title: 'Izgara Tavuklu & Kinoa Renkli Salata',
    category: 'Ana yemek',
    prepTime: '20 dk',
    calories: 340,
    protein: 30,
    carbs: 28,
    fat: 12,
    ingredients: [
      '150 gr Tavuk Göğsü',
      '1/2 çay bardağı Haşlanmış Kinoa',
      '1 avuç Akdeniz Yeşilliği',
      '1/2 adet Kırmızı Kapya Biber',
      '1 yemek kaşığı Zeytinyağı & Nar Ekşisi'
    ],
    instructions: [
      'Tavuk göğsünü ızgara tavada pişirip dilimleyin.',
      'Yeşillikleri, doğranmış biberi ve haşlanmış kinoayı bir kasede harmanlayın.',
      'Tavuk dilimlerini ekleyip zeytinyağı sosuyla tatlandırın.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r16',
    title: 'Fırınlanmış Köfte & Tatlı Patates Püresi',
    category: 'Ana yemek',
    prepTime: '35 dk',
    calories: 410,
    protein: 28,
    carbs: 32,
    fat: 18,
    ingredients: [
      '150 gr Yağsız Dana Kıyma',
      '1 orta boy Tatlı Patates',
      '1 adet Kuru Soğan',
      '1 yemek kaşığı Zeytinyağı',
      'Kimyon, kekik ve az tuz'
    ],
    instructions: [
      'Kıymayı soğan ve baharatlarla yoğurup köfte şekli verin.',
      'Tatlı patatesi haşlayıp zeytinyağı ile pürüzsüz püre haline getirin.',
      'Köfteleri fırında pişirip tatlı patates püresi ile servis edin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r17',
    title: 'Zeytinyağlı Enginar & Taze Bakla',
    category: 'Ana yemek',
    prepTime: '30 dk',
    calories: 210,
    protein: 7,
    carbs: 24,
    fat: 10,
    ingredients: [
      '2 adet Enginar Çanağı',
      '1 su bardağı Taze İç Bakla',
      '1 adet Havuç & Soğan',
      '2 yemek kaşığı Zeytinyağı',
      'Bol Taze Dereotu ve Limon'
    ],
    instructions: [
      'Soğan ve havucu zeytinyağında soteleyin.',
      'Enginarları ve baklaları ekleyip limonlu su ilavesiyle kısık ateşte pişirin.',
      'Üzerine bol taze dereotu serperek ılık veya soğuk servis yapın.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r18',
    title: 'Kuru Kıymalı & Fırınlanmış Kabak Sandal',
    category: 'Ana yemek',
    prepTime: '35 dk',
    calories: 290,
    protein: 22,
    carbs: 14,
    fat: 16,
    ingredients: [
      '2 adet Orta Boy Kabak',
      '100 gr Yağsız Dana Kıyma',
      '1 adet Domates & Biber',
      '1 tatlı kaşığı Salça',
      'Zeytinyağı ve maydanoz'
    ],
    instructions: [
      'Kabakları uzunlamasına ikiye bölüp içlerini kaşıkla oyarak sandal şekli verin.',
      'Kıymayı soğan, domates ve biberle soteleyin.',
      'Kabakların içine kıymalı harcı doldurup fırında 25 dakika pişirin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r19',
    title: 'Hurmalı & Cevizli Süt Enerji Topları',
    category: 'Ara öğün',
    prepTime: '15 dk',
    calories: 180,
    protein: 4,
    carbs: 24,
    fat: 8,
    ingredients: [
      '6 adet Medine Hurması',
      '3 adet Ceviz İçi',
      '2 yemek kaşığı Yulaf',
      '1 tatlı kaşığı Kakao',
      'Hindistan Cevizi Tozu'
    ],
    instructions: [
      'Hurmaları sıcak suda 10 dk bekletip yumuşatın.',
      'Tüm malzemeleri mutfak robotunda çekin.',
      'Ceviz büyüklüğünde yuvarlayıp Hindistan cevizine bulayın.',
      'Günde 2 adet ara öğün olarak tüketin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r20',
    title: 'Yoğurtlu & Yaban Mersinli Parfe',
    category: 'Ara öğün',
    prepTime: '8 dk',
    calories: 165,
    protein: 8,
    carbs: 22,
    fat: 5,
    ingredients: [
      '1/2 su bardağı Süzme Yoğurt',
      '1 avuç Taze Yaban Mersini',
      '1 tatlı kaşığı Süzme Bal',
      '1 yemek kaşığı Ev Yapımı Granola'
    ],
    instructions: [
      'Cam kupon tabanına yoğurdu yayın.',
      'Üzerine yaban mersini ve granolayı kat kat dizin.',
      'En üste hafif bal gezdirip ara öğünde keyifle tüketin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r21',
    title: 'Tahinli & Yulaflı Tok Tutan Barlar',
    category: 'Ara öğün',
    prepTime: '20 dk',
    calories: 205,
    protein: 6,
    carbs: 25,
    fat: 9,
    ingredients: [
      '1 su bardağı Yulaf Ezmesi',
      '2 yemek kaşığı Doğal Tahin',
      '2 yemek kaşığı Pekmez',
      '1 yemek kaşığı Susam & Çörek Otu'
    ],
    instructions: [
      'Tüm malzemeleri karıştırma kabında iyice yoğurun.',
      'Kare bir kaba bastırarak yayın ve dondurucuda 30 dakika bekletin.',
      'Dilimleyerek emzirme aralarında sağlıklı atıştırmalık olarak kullanın.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1622484210800-8883a4373291?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r22',
    title: 'İncirli & Tarçınlı Süt Uyutması Tatlısı',
    category: 'Tatlı',
    prepTime: '20 dk',
    calories: 190,
    protein: 6,
    carbs: 28,
    fat: 5,
    ingredients: [
      '4 adet Kuru İncir',
      '2 su bardağı Ilık Laktozsuz Süt veya Yulaf Sütü',
      '1/2 çay kaşığı Tarçın',
      'Dövülmüş Fındık'
    ],
    instructions: [
      'İncirleri sıcak suda yumuşatıp minik küpler halinde doğrayın.',
      'Ilık süt ile incirleri blenderda pürüzsüz olana kadar çırpın.',
      'Kaselere paylaştırıp üzerini kapatın ve 2 saat ılık ortamda maya gibi uyutun.',
      'Buzdolabında soğutup tarçın ve fındıkla servis yapın.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r23',
    title: 'Şekersiz Kakao & Avokadolu Mousse',
    category: 'Tatlı',
    prepTime: '10 dk',
    calories: 175,
    protein: 3,
    carbs: 18,
    fat: 11,
    ingredients: [
      '1 adet Tam Olgun Avokado',
      '2 yemek kaşığı Ham Kakao',
      '2 yemek kaşığı Bal veya Akçaağaç Şurubu',
      '1/4 çay bardağı Badem Sütü'
    ],
    instructions: [
      'Avokadoyu soyup parçalara ayırın.',
      'Kakao, bal ve sütü ekleyip mutfak robotunda ipeksi krem kıvamına gelene kadar çekin.',
      'Buzdolabında 1 saat soğutup üzerini nar taneleriyle süsleyin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  },
  {
    id: 'r24',
    title: 'Fırında Yulaflı Elma Crumble',
    category: 'Tatlı',
    prepTime: '25 dk',
    calories: 220,
    protein: 5,
    carbs: 38,
    fat: 6,
    ingredients: [
      '2 adet Elma (küp doğranmış)',
      '1 çay kaşığı Tarçın',
      '1/2 su bardağı Yulaf Ezmesi',
      '1 yemek kaşığı Hindistan Cevizi Yağı',
      '1 tatlı kaşığı Pekmez'
    ],
    instructions: [
      'Elmaları tarçınla harmanlayıp fırın kabına dizin.',
      'Yulaf, erimiş hindistan cevizi yağı ve pekmezi ovuşturarak elmanın üzerine yayın.',
      '180 derece fırında 20 dakika kıtırlaşana kadar pişirin.'
    ],
    isNursingFriendly: true,
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=500&auto=format&fit=crop&q=80',
    isFavorite: false,
  }
];

export const initialExercises: ExerciseRoutine[] = [
  {
    id: 'e1',
    title: 'Pelvik Taban & Diyafram Nefesi (Lohusa Başlangıç)',
    durationMinutes: 10,
    intensity: 'Kolay',
    isKneeFriendly: true,
    description: 'Doğum sonrası ilk haftalardan itibaren güvenle uygulanabilen pelvik taban (Kegel) ve derin diyafram nefesi egzersizi.',
    steps: [
      'Rahat bir pozisyonda sırtüstü yatın veya dik oturun.',
      'Derin nefes alırken karnınızı gevşetin, nefes verirken pelvik taban kaslarınızı nazikçe yukarı doğru çekin.',
      'Kasılmayı 3-5 saniye tutup yavaşça serbest bırakın.',
      '10 tekrar x 3 set halinde tamamlayın.'
    ],
    completedDates: []
  },
  {
    id: 'e2',
    title: 'Sırt & Boyun Rahatlatma (Bebek Emzirme Duruşu Düzeltme)',
    durationMinutes: 15,
    intensity: 'Kolay',
    isKneeFriendly: true,
    description: 'Emzirme ve bebek taşıma sırasında öne eğilen omuzları açan, üst sırt ve boyun ağrılarını hafifleten mobilite serisi.',
    steps: [
      'Omuz yuvarlama: Omuzlarınızı geriye doğru 10 kez daire çizecek şekilde döndürün.',
      'Kedi-Deve Esnemesi: Dört ayak pozisyonunda omurganızı yuvarlayıp çenenizi göğsünüze çekin, ardından omurganızı hafifçe çukurlaştırın.',
      'Göğüs Açma: Ellerinizi arkada birleştirip omuz küreklerinizi birbirine yaklaştırın, 20 saniye bekleyin.',
      'Boyun Esnetme: Başınızı sağa ve sola nazikçe yatırarak yan boyun kaslarını esnetin.'
    ],
    completedDates: []
  },
  {
    id: 'e3',
    title: 'Karın Kasları Onarımı (Diastasis Recti Dostu Core)',
    durationMinutes: 15,
    intensity: 'Kolay',
    isKneeFriendly: true,
    description: 'Karın ayrışmasını (diastasis recti) zorlamadan, iç karın kaslarını (transversus abdominis) güvenle sıkılaştıran özel lohusa egzersizi.',
    steps: [
      'Sırtüstü yatın, dizlerinizi bükün ve ayak tabanlarınızı yere basın.',
      'Bel boşluğunu hafifçe yere bastırarak nefes verin ve karnınızı içeri çekin (Pelvic Tilt).',
      'Alternatif Topuk Kaydırma: Nefes verirken tek bacağınızı topuğunuzu yerden kaldırmadan ileri uzatın ve geri çekin.',
      'Topuk Dokundurma (Heel Taps): Bacaklarınızı 90 derece kaldırıp sırayla yere dokundurun.',
      'Her hareketi 12 tekrar yapın.'
    ],
    completedDates: []
  },
  {
    id: 'e4',
    title: 'Diz Dostu Kalça & Bacak Güçlendirme',
    durationMinutes: 20,
    intensity: 'Orta',
    isKneeFriendly: true,
    description: 'Eklem ve diz ağrısı çekmeyen anneler için özel tasarlanmış yatay ve ayakta kalça-bacak tonlama rutini.',
    steps: [
      'Glute Bridge (Kalça Kaldırma): Sırtüstü yatıp kalçayı yukarı kaldırın, en tepede 2 saniye sıkıp yavaşça indirin.',
      'Side-Lying Leg Lift (Yan Bacak Kaldırma): Yana yatıp üstteki bacağınızı dümdüz yukarı kaldırıp indirin.',
      'Clamshell (Deniz Kabuğu): Yana yatıp dizleri bükün, topukları bir arada tutarak üstteki dize açılış yaptırın.',
      'Donkey Kicks (Dört Ayakta Kalça İtiş): Dört ayak pozisyonunda bacağınızı dik açıyla yukarı itin.',
      'Her bacak için 15 tekrar x 3 set uygulayın.'
    ],
    completedDates: []
  },
  {
    id: 'e5',
    title: 'Tüm Vücut Anne Pilatesi & Mobilite',
    durationMinutes: 25,
    intensity: 'Orta',
    isKneeFriendly: true,
    description: 'Tüm vücut esnekliğini artıran, duruşu düzelten ve kas tonusunu geri kazandıran dengeli anne pilatesi.',
    steps: [
      'Isınma: Derin nefesler eşliğinde omurga rotasyonu ve omuz dairesi.',
      'Bird-Dog Hareketi: Dört ayakta çapraz kol ve bacağı uzatarak omurgayı dengeleyin.',
      'Spine Twist: Oturur pozisyonda gövdenizi sağa ve sola nazikçe döndürün.',
      'Yan Plank Desteği: Dizler yerde yan plank pozisyonunda 20 saniye bekleyin.',
      'Soğuma: Çocuk pozisyonu (Child\'s Pose) ile tüm sırtınızı ve kalçanızı 1 dakika esnetin.'
    ],
    completedDates: []
  },
  {
    id: 'e6',
    title: 'Kollar & Üst Beden Tonlama (Bebek Taşıma Gücü)',
    durationMinutes: 15,
    intensity: 'Orta',
    isKneeFriendly: true,
    description: 'Bebeğinizi taşırken yıpranan kol, omuz ve sırt kaslarını güçlendiren hafif ağırlıklı (veya su şişeli) rutin.',
    steps: [
      'Biceps Curl: 0.5 lt su şişeleriyle kolları dirsekten bükerek yukarı kaldırın.',
      'Triceps Kickback: Gövdeyi hafif öne eğip dirsekleri arkaya doğru uzatın.',
      'Lateral Raise: Kolları yanlara omuz hizasına kadar yavaşça kaldırıp indirin.',
      'Duvar Şınavı (Wall Push-ups): Duvara karşı göğüs kaslarını çalıştıran 15 tekrar şınav.',
      '3 set x 12 tekrar yapın.'
    ],
    completedDates: []
  },
  {
    id: 'e7',
    title: 'Yağ Yakıcı & Hızlı Metabolizmalı Yürüyüş Kardiyosu',
    durationMinutes: 20,
    intensity: 'Yoğun',
    isKneeFriendly: true,
    description: 'Zıplama içermeyen, evde alan gerektirmeden ritmik adımlarla kalori harcatan enerji dolu anne kardiyosu.',
    steps: [
      'Tempolu Yerinde Yürüyüş (2 dk ısınma).',
      'Adım Yanı (Step Touch) + Kol İtişi (3 dk).',
      'Diz Desteği Olmadan Topuk Arkaya (Butt Kicks - darbesiz) (3 dk).',
      'Kolları Yukarı Uzatarak Yürüyüş (3 dk).',
      'Gövde Rotasyonlu Yürüyüş (3 dk).',
      'Soğuma ve hafif esnetme adımları (4 dk).'
    ],
    completedDates: []
  },
  {
    id: 'e8',
    title: 'Kalça & Bel Ağrısı Rahatlatma Esnemesi',
    durationMinutes: 15,
    intensity: 'Kolay',
    isKneeFriendly: true,
    description: 'Hamilelik ve doğum sonrası değişen ağırlık merkezi nedeniyle oluşan bel ve kalça gerginliklerini çözen esneme serisi.',
    steps: [
      'Figure-4 Esnemesi: Sırtüstü yatıp sağ ayak bileğinizi sol dizinizin üzerine koyun ve sol bacağınızı kendinize çekin.',
      'Mutlu Bebek Pozu (Happy Baby): Sırtüstü yatıp ayak tabanlarınızdan tutarak dizlerinizi koltuk altlarınıza doğru çekin.',
      'Kelebek Esnemesi: Ayak tabanlarını birleştirip dizleri iki yana bırakın.',
      'Hamstring Esnemesi: Bacağınızı bir havlu yardımıyla dikey yukarı esnetin.'
    ],
    completedDates: []
  },
  {
    id: 'e9',
    title: 'Derin Gevşeme & Zihin Dinginliği Anne Yogası',
    durationMinutes: 15,
    intensity: 'Kolay',
    isKneeFriendly: true,
    description: 'Günün yorgunluğunu, uykusuzluğu ve stresi azaltmak için meditasyon ve hafif yoga duruşları.',
    steps: [
      'Bacaklar Duvarda Pozu (Viparita Karani): Bacaklarınızı duvara yaslayıp 5 dakika derin nefes alın.',
      'Geniş Çocuk Pozu: Dizleri açarak öne katlanın ve alnınızı yere koyun.',
      'Sırtüstü Omurga Bükülmesi (Supine Twist): Dizleri sağa yatırıp bakışları sola çevirin.',
      'Derin Savasana: Gözlerinizi kapatıp tüm bedeninizi serbest bırakarak dinlenin.'
    ],
    completedDates: []
  },
  {
    id: 'e10',
    title: 'Metabolizma Canlandırıcı Anne Tüm Vücut Rutini',
    durationMinutes: 20,
    intensity: 'Yoğun',
    isKneeFriendly: true,
    description: 'Enerji seviyesini yükselten, kas dokusunu koruyan ve süt verimini olumsuz etkilemeyen dengeli antrenman.',
    steps: [
      'Sandalyeye Otur-Kalk (Chair Squat): Dizleri koruyarak sandalyeye dokunup kalkma (12 tekrar).',
      'Ayakta Çapraz Diz-Dirsek Teması (15 tekrar).',
      'Yarım Plank Hold (20 saniye x 3 set).',
      'Esneme ve nefes egzersizi ile bitiriş.'
    ],
    completedDates: []
  }
];

export const initialHabits: Habit[] = [
  { id: 'h1', title: 'Günlük 2.5 L Su İçmek', iconName: 'Droplet', completedDates: [] },
  { id: 'h2', title: 'Rafine Şekersiz Beslenme', iconName: 'Heart', completedDates: [] },
  { id: 'h3', title: 'Her Gün 20 dk Egzersiz / Yürüyüş', iconName: 'Activity', completedDates: [] },
  { id: 'h4', title: 'Günde 2 Fincan Anne Çayı', iconName: 'Baby', completedDates: [] },
];

export const initialBadges: Badge[] = [
  { id: 'b1', title: 'Yolculuk Başladı!', description: 'Kendi hedeflerine giden yolculukta ilk adımı attın.', iconName: 'Rocket', unlocked: true },
  { id: 'b2', title: 'Su Şampiyonu', description: 'Arka arkaya 3 gün boyunca su hedefini tamamladın.', iconName: 'Droplet', unlocked: false },
  { id: 'b3', title: 'Şekersiz 7 Gün', description: '1 hafta boyunca rafine şeker tüketmedin.', iconName: 'ShieldCheck', unlocked: false },
  { id: 'b4', title: 'Süt & Sağlık Dostu Anne', description: 'Emziren anne beslenme ilkelerine tam uyum sağladın.', iconName: 'Baby', unlocked: true },
  { id: 'b5', title: 'Aktivite Rozeti', description: 'Haftalık tüm aktivite hedeflerini gerçekleştirdin.', iconName: 'Award', unlocked: false },
  { id: 'b6', title: 'Hedef Kilo Zaferi', description: 'Hedeflenen ağırlığa ulaşıldı!', iconName: 'Crown', unlocked: false }
];

export const initialWeightLogs: WeightLog[] = [];

export const initialMeasurements: BodyMeasurement[] = [];

export const initialNotes: NoteItem[] = [
  {
    id: 'n1',
    title: 'Lohusalık & Sağlıklı Yaşam Hatırlatması',
    content: 'Anne sütünü artırmanın en temel anahtarı bol sıvı alımı (min 2.5 - 3 Litre) ve stresten uzak durmaktır. Egzersizlerde dizleri yormadan, sırt ve pelvik taban hareketlerine öncelik ver.',
    date: new Date().toISOString().split('T')[0],
    category: 'Genel'
  }
];

export const initialShopping: ShoppingItem[] = [
  { id: 's1', title: 'Yulaf Ezmesi & Chia Tohumu', category: 'Kiler', checked: false },
  { id: 's2', title: 'Taze Dereotu & Nane (2 demet)', category: 'Yeşillik', checked: false },
  { id: 's3', title: 'Lor Peyniri (Tuzsuz)', category: 'Süt Ürünleri', checked: false },
  { id: 's4', title: 'Avokado & Kırmızı Elma', category: 'Meyve / Sebze', checked: false },
  { id: 's5', title: 'Rezene & Anason Çayı', category: 'İçecek', checked: true },
  { id: 's6', title: 'Somon Fileto / Tavuk Göğsü', category: 'Et & Balık', checked: false }
];

export const initialReminders: ReminderSetting[] = [
  { id: 'rem1', type: 'water', title: 'Su İçme Zamanı 💧', time: '10:00', enabled: true, daysText: 'Her Gün' },
  { id: 'rem2', type: 'exercise', title: 'Lohusa Egzersiz Molası 🧘‍♀️', time: '11:00', enabled: true, daysText: 'Haftaiçi' },
  { id: 'rem3', type: 'vitamin', title: 'Süt Artıran Çay & Vitamin 🍵', time: '15:30', enabled: true, daysText: 'Her Gün' },
  { id: 'rem4', type: 'weigh', title: 'Haftalık Kilo Kontrolü ⚖️', time: '09:00', enabled: true, daysText: 'Pazartesi' }
];

export const initialDhikrList: DhikrItem[] = [
  {
    id: 'd1',
    title: 'Sabah Namazı Sonrası',
    phrase: 'Sübhânallahi ve bihamdihî',
    targetCount: 100,
    currentCount: 0,
    category: 'Sabah',
    meaning: 'Allah’ı hamd ile tesbih ederim. Kalbe huzur, güne bereket ve ferahlık verir.',
    completedDates: []
  },
  {
    id: 'd2',
    title: 'Mutfak İşleri Saati',
    phrase: 'Lâ havle velâ kuvvete illâ billâhil aliyyil azîm',
    targetCount: 100,
    currentCount: 0,
    category: 'Mutfak',
    meaning: 'Güç ve kuvvet ancak yüce ve azamet sahibi olan Allah’ındır. Ev işlerinde sabır ve kolaylık sağlar.',
    completedDates: []
  },
  {
    id: 'd3',
    title: 'Ertuğrul Bebek Uyurken',
    phrase: 'Ya Hâfız, Ya Şâfî',
    targetCount: 100,
    currentCount: 0,
    category: 'Ertuğrul',
    meaning: 'Ey Koruyan ve Ey Şifa Veren Allah’ım. Bebeğin korunması, afiyeti ve anne kalbinin sükuneti için.',
    completedDates: []
  },
  {
    id: 'd4',
    title: 'Gün Sonu Kapanış',
    phrase: 'Estağfirullah el-Azîm',
    targetCount: 100,
    currentCount: 0,
    category: 'Gece',
    meaning: 'Yüce Allah’tan bağışlanma dilerim. Günün yorgunluğunu hafifletir, ruhu arındırıp huzur verir.',
    completedDates: []
  }
];

export const spiritualQuotes: SpiritualQuote[] = [
  { id: 'q1', text: "Dikkat edin, kalpler ancak Allah'ı anmakla huzur ve sükûna kavuşur.", source: "Râ'd Suresi, 28. Âyet-i Kerîme" },
  { id: 'q2', text: "Allah, hiç kimseye gücünün yettiğinden fazlasını yüklemez.", source: "Bakara Suresi, 286. Âyet-i Kerîme" },
  { id: 'q3', text: "Şüphesiz güçlükle beraber bir kolaylık vardır.", source: "İnşirah Suresi, 5. Âyet-i Kerîme" },
  { id: 'q4', text: "Rabbin seni terk etmedi ve sana darılmadı.", source: "Duhâ Suresi, 3. Âyet-i Kerîme" },
  { id: 'q5', text: "Cennet, annelerin ayakları altındadır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q6', text: "Ben hüznümü ve kederimi ancak Allah'a arz ederim.", source: "Yûsuf Suresi, 86. Âyet-i Kerîme" },
  { id: 'q7', text: "O ki, yaratan ve yol gösterendir.", source: "A'lâ Suresi, 2-3. Âyet-i Kerîme" },
  { id: 'q8', text: "Bana dua edin, duanıza icabet edeyim.", source: "Mü'min Suresi, 60. Âyet-i Kerîme" },
  { id: 'q9', text: "Rabbiniz şöyle buyurdu: Eğer şükrederseniz, elbette size nimetimi artırırım.", source: "İbrâhîm Suresi, 7. Âyet-i Kerîme" },
  { id: 'q10', text: "Kullarıma söyle: En güzel sözü söylesinler.", source: "İsrâ Suresi, 53. Âyet-i Kerîme" },
  { id: 'q11', text: "Nerede olursanız olun O sizinle beraberdir.", source: "Hadîd Suresi, 4. Âyet-i Kerîme" },
  { id: 'q12', text: "Sabır ve namazla Allah'tan yardım isteyin.", source: "Bakara Suresi, 45. Âyet-i Kerîme" },
  { id: 'q13', text: "En hayırlınız, ailesine karşı en hayırlı olanınızdır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q14', text: "İyi bilin ki Allah'ın yardımı pek yakındır.", source: "Bakara Suresi, 214. Âyet-i Kerîme" },
  { id: 'q15', text: "Üzülme, şüphesiz Allah bizimledir.", source: "Tevbe Suresi, 40. Âyet-i Kerîme" },
  { id: 'q16', text: "Güzel söz sadakadır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q17', text: "Rabbim! Göğsümü genişlet, işimi kolaylaştır.", source: "Tâhâ Suresi, 25-26. Âyet-i Kerîme" },
  { id: 'q18', text: "Gevşemeyin, üzülmeyin; eğer iman etmişseniz en üstün sizsiniz.", source: "Âl-i İmrân Suresi, 139. Âyet-i Kerîme" },
  { id: 'q19', text: "Allah merhametlilerin en merhametlisidir.", source: "Yûsuf Suresi, 92. Âyet-i Kerîme" },
  { id: 'q20', text: "Göklerin ve yerin orduları Allah'ındır.", source: "Fetih Suresi, 4. Âyet-i Kerîme" },
  { id: 'q21', text: "Allah sabredenleri sever.", source: "Âl-i İmrân Suresi, 146. Âyet-i Kerîme" },
  { id: 'q22', text: "Sizin en hayırlınız ahlakı en güzel olanınızdır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q23', text: "Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q24', text: "Rabbimiz! Bize dünyada da iyilik ver, ahirette de iyilik ver.", source: "Bakara Suresi, 201. Âyet-i Kerîme" },
  { id: 'q25', text: "Allah bir kapıyı kapatırsa rahmetiyle yenisini açar.", source: "Hikmetli Söz" },
  { id: 'q26', text: "İyilikle kötülük bir olmaz. Sen kötülüğü en güzel olan şeyle sav.", source: "Fussilet Suresi, 34. Âyet-i Kerîme" },
  { id: 'q27', text: "Ameller ancak niyetlere göredir.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q28', text: "Allah güzeldir, güzelliği sever.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q29', text: "De ki: Allah bize yeter, O ne güzel vekildir.", source: "Âl-i İmrân Suresi, 173. Âyet-i Kerîme" },
  { id: 'q30', text: "O, bir şeyin olmasını istediğinde sadece 'Ol' der ve o şey oluverir.", source: "Yâsîn Suresi, 82. Âyet-i Kerîme" },
  { id: 'q31', text: "De ki: Hiç bilenlerle bilmeyenler bir olur mu?", source: "Zümer Suresi, 9. Âyet-i Kerîme" },
  { id: 'q32', text: "Benim namazım, ibadetlerim, hayatım ve ölümüm âlemlerin Rabbi olan Allah içindir.", source: "En'âm Suresi, 162. Âyet-i Kerîme" },
  { id: 'q33', text: "İnsan için ancak çalıştığının karşılığı vardır.", source: "Necm Suresi, 39. Âyet-i Kerîme" },
  { id: 'q34', text: "Allah kuluna kâfi değil midir?", source: "Zümer Suresi, 36. Âyet-i Kerîme" },
  { id: 'q35', text: "Biz insanı en güzel biçimde yarattık.", source: "Tîn Suresi, 4. Âyet-i Kerîme" },
  { id: 'q36', text: "Gönül Çalab'ın tahtı, Çalab gönüle baktı; İki cihan بدبختı kim gönül yıkar ise.", source: "Yunus Emre" },
  { id: 'q37', text: "Dualarınız olmasa Rabbim size ne diye değer versin?", source: "Furkân Suresi, 77. Âyet-i Kerîme" },
  { id: 'q38', text: "Tebessüm etmek sadakadır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q39', text: "Rabbim! İlmimi ve anlayışımı artır.", source: "Tâhâ Suresi, 114. Âyet-i Kerîme" },
  { id: 'q40', text: "Yeryüzündekilere merhamet edin ki, göktekiler de size merhamet etsin.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q41', text: "Mümin müminin aynasıdır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q42', text: "Kim bir insanı yaşatırsa bütün insanlığı yaşatmış gibi olur.", source: "Mâide Suresi, 32. Âyet-i Kerîme" },
  { id: 'q43', text: "Sabır, ilk darbe anındaki metanettir.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q44', text: "Her şey vaktini bekler; ne gül vaktinden önce açar, ne güneş vaktinden önce doğar.", source: "Mevlânâ Celâleddîn-i Rûmî" },
  { id: 'q45', text: "Temizlik imanın yarısıdır.", source: "Hz. Muhammed (s.a.v.) / Hadîs-i Şerîf" },
  { id: 'q46', text: "Dost istersen Allah yeter.", source: "Kelâm-ı Kibâr" },
  { id: 'q47', text: "Yaratılanı hoş gör, Yaratandan ötürü.", source: "Yunus Emre" },
  { id: 'q48', text: "Kalbinde zerre kadar iyilik olan zayi olmaz.", source: "Hikmetli Söz" },
  { id: 'q49', text: "Kalp denizdir, dil ise kıyı. Denizde ne varsa kıyıya o vurur.", source: "Mevlânâ Celâleddîn-i Rûmî" },
  { id: 'q50', text: "Dualar eken, huzur biçar.", source: "Hikmetli Söz" }
];
