// Dokkai matnlaridan ajratilgan N2/N1 darajadagi so'zlar
// Faqat N3 dan YUQORI - qiyin so'zlar
const dokkaiVocab = [
  // ===== July 短文1: 環境問題 =====
  {id:"dv-1",kanji:"海洋汚染",reading:"かいようおせん",meaning:"okeanni ifloslantirish",meaningJP:"海が汚れること",level:"N2",source:"j-dk-1",jlptTip:"海洋=okean(katta), 汚染=ifloslantirish. 大気汚染=havoni ifloslantirish ham muhim",category:"kankyo"},
  {id:"dv-2",kanji:"深刻",reading:"しんこく",meaning:"jiddiy, og'ir, dahshatli",meaningJP:"非常に重大で心配なこと",level:"N2",source:"j-dk-1",jlptTip:"深刻な問題=jiddiy muammo. 重大=rasmiyroq, 深刻=hissiy og'irlik bor",category:"kankyo"},
  {id:"dv-3",kanji:"削減",reading:"さくげん",meaning:"kamaytirish, qisqartirish",meaningJP:"減らすこと（計画的に）",level:"N2",source:"j-dk-1",jlptTip:"削減=rejalashtirilgan kamaytirish, 減少=tabiiy kamayish, 節約=tejash",category:"kankyo"},
  {id:"dv-4",kanji:"不可欠",reading:"ふかけつ",meaning:"zarur, bo'lmasa bo'lmaydigan",meaningJP:"なくてはならないこと",level:"N2",source:"j-dk-1",jlptTip:"不可欠=MUTLAQO kerak, 必要=oddiy kerak, 欠かせない=不可欠 ning fe'l shakli",category:"kankyo"},
  {id:"dv-5",kanji:"意識改革",reading:"いしきかいかく",meaning:"fikrlash tarzini o'zgartirish",meaningJP:"考え方を根本的に変えること",level:"N1",source:"j-dk-1",jlptTip:"意識=ong/fikr, 改革=tubdan o'zgarish. 改善=yaxshilash(kichik), 改革=butunlay o'zgartirish",category:"kankyo"},

  // ===== July 短文2: 働き方改革 =====
  {id:"dv-6",kanji:"是正",reading:"ぜせい",meaning:"tuzatish, to'g'rilash",meaningJP:"間違いや不正を正すこと",level:"N1",source:"j-dk-2",jlptTip:"是正=noto'g'rini TO'G'RILASH(rasmiy), 修正=xatoni tuzatish(oddiy), 訂正=matnni tuzatish",category:"shigoto"},
  {id:"dv-7",kanji:"柔軟",reading:"じゅうなん",meaning:"egiluvchan, moslashuvchan",meaningJP:"やわらかく対応できること",level:"N2",source:"j-dk-2",jlptTip:"柔軟な対応=moslashuvchan munosabat, 柔軟な考え=ochiq fikr. 柔らかい=jismoniy yumshoq",category:"shigoto"},
  {id:"dv-8",kanji:"賃金",reading:"ちんぎん",meaning:"ish haqi, maosh",meaningJP:"労働の対価として支払われるお金",level:"N2",source:"j-dk-2",jlptTip:"賃金=rasmiy ish haqi, 給料=oddiy maosh, 報酬=mukofot/to'lov(rasmiy)",category:"shigoto"},
  {id:"dv-9",kanji:"確保",reading:"かくほ",meaning:"ta'minlash, kafolatlash",meaningJP:"しっかりと手に入れること",level:"N2",source:"j-dk-2",jlptTip:"確保=oldindan ta'minlab qo'yish, 保証=kafolat berish, 保障=himoya qilish(huquq)",category:"shigoto"},
  {id:"dv-10",kanji:"導入",reading:"どうにゅう",meaning:"joriy etish, kiritish",meaningJP:"新しいものを取り入れること",level:"N2",source:"j-dk-2",jlptTip:"導入=yangi tizim/texnologiyani kiritish, 採用=odamni/usulni qabul qilish",category:"shigoto"},
  {id:"dv-11",kanji:"拡大",reading:"かくだい",meaning:"kengaytirish",meaningJP:"範囲や規模を大きくすること",level:"N2",source:"j-dk-2",jlptTip:"拡大=doirani kengaytirish, 拡張=jismoniy kengaytirish(bino), 拡充=sifat+miqdor kengaytirish",category:"shigoto"},

  // ===== July 中文: AI技術 =====
  {id:"dv-12",kanji:"精度",reading:"せいど",meaning:"aniqlik darajasi",meaningJP:"正確さの度合い",level:"N2",source:"j-dk-3",jlptTip:"精度が高い=aniqlik yuqori. 正確=to'g'ri(fakt), 精密=juda nozik aniqlik",category:"gijutsu"},
  {id:"dv-13",kanji:"懸念",reading:"けねん",meaning:"xavotir, tashvish",meaningJP:"心配すること（硬い表現）",level:"N1",source:"j-dk-3",jlptTip:"懸念=rasmiy xavotir(yangiliklar), 心配=oddiy xavotir, 危惧=kuchli xavf hissi",category:"gijutsu"},
  {id:"dv-14",kanji:"恩恵",reading:"おんけい",meaning:"ne'mat, foyda, rahmat",meaningJP:"ありがたい利益や恵み",level:"N1",source:"j-dk-3",jlptTip:"恩恵=tabiat/texnologiya bergan FOYDA, 利益=moliyaviy foyda, 恵み=tabiatning in'omi",category:"gijutsu"},
  {id:"dv-15",kanji:"法整備",reading:"ほうせいび",meaning:"qonun bazasini tayyorlash",meaningJP:"法律を整えること",level:"N1",source:"j-dk-3",jlptTip:"法整備=yangi qonunlar tizimini yaratish, 立法=qonun chiqarish, 法改正=mavjud qonunni o'zgartirish",category:"gijutsu"},
  {id:"dv-16",kanji:"画像診断",reading:"がぞうしんだん",meaning:"tasvir orqali diagnostika",meaningJP:"写真や映像を使って病気を見つけること",level:"N1",source:"j-dk-3",jlptTip:"画像=tasvir/rasm, 診断=tashxis qo'yish. Rentgen, MRI kabi",category:"gijutsu"},
  {id:"dv-17",kanji:"雇用",reading:"こよう",meaning:"ish bilan ta'minlash, bandlik",meaningJP:"人を雇って働かせること",level:"N2",source:"j-dk-3",jlptTip:"雇用=rasmiy ish berish, 就職=ishga kirish, 採用=ishga olish(bir marta)",category:"gijutsu"},

  // ===== July 中文: 食文化 =====
  {id:"dv-18",kanji:"無形文化遺産",reading:"むけいぶんかいさん",meaning:"nomoddiy madaniy meros",meaningJP:"形のない文化的な財産",level:"N1",source:"j-dk-4",jlptTip:"無形=shakli yo'q, 有形=shakli bor. 遺産=meros. UNESCO ro'yxati",category:"bunka"},
  {id:"dv-19",kanji:"継承",reading:"けいしょう",meaning:"meros qilib olish/berish",meaningJP:"前の世代から受け継ぐこと",level:"N1",source:"j-dk-4",jlptTip:"継承=an'anani davom ettirish, 相続=mol-mulkni meros olish, 伝承=og'zaki rivoyat",category:"bunka"},
  {id:"dv-20",kanji:"調理法",reading:"ちょうりほう",meaning:"tayyorlash usuli (ovqat)",meaningJP:"料理の作り方",level:"N2",source:"j-dk-4",jlptTip:"調理=rasmiy ovqat tayyorlash, 料理=oddiy ovqat pishirish, 調理法=usul/metod",category:"bunka"},
  {id:"dv-21",kanji:"欧米化",reading:"おうべいか",meaning:"g'arblashish",meaningJP:"ヨーロッパやアメリカのようになること",level:"N2",source:"j-dk-4",jlptTip:"欧米=Yevropa+Amerika, ～化=...ga aylantirish. 西洋化 ham o'xshash",category:"bunka"},
  {id:"dv-22",kanji:"結びつき",reading:"むすびつき",meaning:"bog'liqlik, aloqadorlik",meaningJP:"つながり、関係があること",level:"N2",source:"j-dk-4",jlptTip:"結びつき=chuqur aloqa, つながり=oddiy bog'lanish, 関連=rasmiy aloqadorlik",category:"bunka"},

  // ===== July 長文: 読書の価値 =====
  {id:"dv-23",kanji:"定着",reading:"ていちゃく",meaning:"mustahkamlanish, o'rnashib qolish",meaningJP:"しっかりと根づくこと",level:"N2",source:"j-dk-5",jlptTip:"記憶の定着=xotiraga o'rnashish, 定着する=jamiyatga o'rnashish. 固定=jismoniy mahkamlash",category:"dokusho"},
  {id:"dv-24",kanji:"利便性",reading:"りべんせい",meaning:"qulaylik",meaningJP:"便利であること（硬い言い方）",level:"N1",source:"j-dk-5",jlptTip:"利便性=rasmiy qulaylik(texnologiya), 便利さ=oddiy qulaylik, 快適さ=yoqimlilik",category:"dokusho"},
  {id:"dv-25",kanji:"反面",reading:"はんめん",meaning:"aksi tomoni, boshqa tomoni",meaningJP:"一方では良いが他方では悪い面",level:"N2",source:"j-dk-5",jlptTip:"反面=bir narsaning teskari tomoni, 一方で=parallel ikki tomon, 半面=反面 varianti",category:"dokusho"},
  {id:"dv-26",kanji:"こだわる",reading:"こだわる",meaning:"yopishmoq, qattiq e'tibor bermoq",meaningJP:"特定のことに強く執着すること",level:"N2",source:"j-dk-5",jlptTip:"こだわる=1)salbiy:yopishmoq 2)ijobiy:sifatga e'tibor berish. 味にこだわる=ta'mga e'tibor berish(ijobiy)",category:"dokusho"},

  // ===== Dec 短文1: ストレス =====
  {id:"dv-27",kanji:"慢性的",reading:"まんせいてき",meaning:"surunkali, uzoq davom etuvchi",meaningJP:"長い間続いている状態",level:"N1",source:"d-dk-1",jlptTip:"慢性的=uzoq davom etuvchi(kasallik), 急性=to'satdan(kasallik), 一時的=vaqtincha",category:"kenko"},
  {id:"dv-28",kanji:"蓄積",reading:"ちくせき",meaning:"to'planish, yig'ilish",meaningJP:"少しずつたまること",level:"N2",source:"d-dk-1",jlptTip:"蓄積=asta-sekin to'planish(stress,bilim), 貯蓄=pul jamg'arish, 集積=bir joyga yig'ish",category:"kenko"},
  {id:"dv-29",kanji:"及ぼす",reading:"およぼす",meaning:"ta'sir qilmoq, yetkazmoq",meaningJP:"影響を与えること",level:"N2",source:"d-dk-1",jlptTip:"影響を及ぼす=ta'sir ko'rsatmoq(rasmiy/salbiy). 与える=bermoq(neytral), もたらす=olib kelmoq",category:"kenko"},
  {id:"dv-30",kanji:"適度",reading:"てきど",meaning:"me'yorida, o'rtacha mos",meaningJP:"ちょうどよい程度",level:"N2",source:"d-dk-1",jlptTip:"適度な運動=me'yoridagi sport. 過度=haddan tashqari, 適切=to'g'ri(usul), 適度=to'g'ri(miqdor)",category:"kenko"},

  // ===== Dec 短文2: 少子高齢化 =====
  {id:"dv-31",kanji:"出生数",reading:"しゅっしょうすう",meaning:"tug'ilganlar soni",meaningJP:"生まれた子供の数",level:"N1",source:"d-dk-2",jlptTip:"出生=tug'ilish(rasmiy), 誕生=tug'ilish(bayram), 出産=tug'ish(ona)",category:"shakai"},
  {id:"dv-32",kanji:"過疎化",reading:"かそか",meaning:"aholi kamayishi (qishloqlarda)",meaningJP:"人口が減って寂しくなること",level:"N1",source:"d-dk-2",jlptTip:"過疎=aholi kam(qishloq), 過密=aholi ko'p(shahar). Teskari juft so'zlar",category:"shakai"},
  {id:"dv-33",kanji:"充実",reading:"じゅうじつ",meaning:"boyitish, to'ldirish, mazmunli",meaningJP:"中身が豊かで満足できること",level:"N2",source:"d-dk-2",jlptTip:"充実した生活=mazmunli hayot, 充実させる=boyitish. 満足=qanoatlanish(natija), 充実=mazmunlilik(jarayon)",category:"shakai"},
  {id:"dv-34",kanji:"根本的",reading:"こんぽんてき",meaning:"tubdan, asosiy",meaningJP:"物事の一番下にある基本的なこと",level:"N2",source:"d-dk-2",jlptTip:"根本的な解決=tubdan hal qilish, 基本的=asosiy, 抜本的=butunlay o'zgartirib(yanada kuchli)",category:"shakai"},
  {id:"dv-35",kanji:"社会保障",reading:"しゃかいほしょう",meaning:"ijtimoiy kafolatlar",meaningJP:"国民の生活を守る制度",level:"N1",source:"d-dk-2",jlptTip:"社会保障=pensiya/sug'urta tizimi, 福祉=farovonlik xizmati, 保険=sug'urta",category:"shakai"},

  // ===== Dec 中文: コミュニケーション =====
  {id:"dv-36",kanji:"仕草",reading:"しぐさ",meaning:"imo-ishora, harakat",meaningJP:"体の動きや態度",level:"N2",source:"d-dk-3",jlptTip:"仕草=kichik tana harakatlari, 動作=aniq harakat, 振る舞い=umumiy xulq-atvor",category:"komyuni"},
  {id:"dv-37",kanji:"制約",reading:"せいやく",meaning:"cheklov, to'siq",meaningJP:"自由を制限する条件",level:"N2",source:"d-dk-3",jlptTip:"制約がある=cheklov bor, 制限=sun'iy cheklov, 制約=sharoit tufayli cheklov",category:"komyuni"},
  {id:"dv-38",kanji:"伴う",reading:"ともなう",meaning:"birga bo'lmoq, hamroh bo'lmoq",meaningJP:"一緒についてくること",level:"N2",source:"d-dk-3",jlptTip:"危険を伴う=xavf bilan birga. ～に伴って=...bilan birga o'zgarib",category:"komyuni"},
  {id:"dv-39",kanji:"望ましい",reading:"のぞましい",meaning:"ma'qul, istalmali",meaningJP:"そうなってほしいと思う",level:"N2",source:"d-dk-3",jlptTip:"望ましい=ideal/ma'qul(rasmiy), 好ましい=yoqimli, 理想的=eng yaxshi",category:"komyuni"},
  {id:"dv-40",kanji:"効率的",reading:"こうりつてき",meaning:"samarali, unumli",meaningJP:"無駄なく成果を出すこと",level:"N2",source:"d-dk-3",jlptTip:"効率的=kam vaqt/kuch bilan ko'p natija, 能率的=o'xshash, 生産的=ishlab chiqarish jihatdan",category:"komyuni"},
  {id:"dv-41",kanji:"誤解",reading:"ごかい",meaning:"noto'g'ri tushunish",meaningJP:"間違って理解すること",level:"N2",source:"d-dk-3",jlptTip:"誤解を招く=noto'g'ri tushunishga olib kelmoq. 勘違い=oddiy xato tushunish",category:"komyuni"},

  // ===== Dec 中文: 睡眠 =====
  {id:"dv-42",kanji:"老廃物",reading:"ろうはいぶつ",meaning:"chiqindi moddalar (tana ichidagi)",meaningJP:"体の中のいらなくなったもの",level:"N1",source:"d-dk-4",jlptTip:"老廃物=tana ichidagi toksinlar, 廃棄物=tashqi chiqindilar(zavod), 排出=chiqarib tashlash",category:"kenko"},
  {id:"dv-43",kanji:"認知機能",reading:"にんちきのう",meaning:"idrok qilish qobiliyati",meaningJP:"知る・覚える・考える力",level:"N1",source:"d-dk-4",jlptTip:"認知=anglash/bilish, 機能=funksiya. 認知症=demensiya(xotira kasalligi)",category:"kenko"},
  {id:"dv-44",kanji:"除去",reading:"じょきょ",meaning:"olib tashlash, tozalash",meaningJP:"取り除くこと",level:"N1",source:"d-dk-4",jlptTip:"除去=to'liq olib tashlash, 除く=ayirmoq/tashqari, 排除=chetlatish(odam/fikr)",category:"kenko"},
  {id:"dv-45",kanji:"加盟国",reading:"かめいこく",meaning:"a'zo davlatlar",meaningJP:"組織に入っている国",level:"N1",source:"d-dk-4",jlptTip:"加盟=tashkilotga a'zo bo'lish, 加入=kirish(oddiy), 参加=qatnashish(voqea)",category:"kenko"},

  // ===== Dec 長文: 地域活性化 =====
  {id:"dv-46",kanji:"活性化",reading:"かっせいか",meaning:"jonlantirish, faollashtirish",meaningJP:"元気にすること、活発にすること",level:"N1",source:"d-dk-5",jlptTip:"地域活性化=mintaqani jonlantirish. 活性=faollik, 活発=g'ayratli",category:"chiiki"},
  {id:"dv-47",kanji:"急務",reading:"きゅうむ",meaning:"shoshilinch vazifa",meaningJP:"すぐにやらなければならないこと",level:"N1",source:"d-dk-5",jlptTip:"急務=eng birinchi hal qilish kerak, 緊急=shoshilinch(vaqt), 急務=muhimlik(vazifa)",category:"chiiki"},
  {id:"dv-48",kanji:"誘致",reading:"ゆうち",meaning:"jalb qilish (kompaniya/tadbir)",meaningJP:"来てもらうように働きかけること",level:"N1",source:"d-dk-5",jlptTip:"工場誘致=zavod jalb qilish, オリンピック誘致=olimpiadani jalb qilish. 誘う=oddiy taklif",category:"chiiki"},
  {id:"dv-49",kanji:"持続的",reading:"じぞくてき",meaning:"davomli, barqaror",meaningJP:"長く続くこと",level:"N2",source:"d-dk-5",jlptTip:"持続的な発展=barqaror rivojlanish(SDGs), 継続的=uzluksiz davom, 永続的=abadiy",category:"chiiki"},
  {id:"dv-50",kanji:"固有",reading:"こゆう",meaning:"o'ziga xos, maxsus",meaningJP:"そのものだけが持っている",level:"N1",source:"d-dk-5",jlptTip:"固有の文化=o'ziga xos madaniyat, 独自=mustaqil o'ziga xos, 特有=faqat shu narsaga xos",category:"chiiki"},
  {id:"dv-51",kanji:"画一的",reading:"かくいつてき",meaning:"bir xil, yagona qolipda",meaningJP:"全部同じにすること",level:"N1",source:"d-dk-5",jlptTip:"画一的=salbiy(kreativlik yo'q), 一律=bir xil(qoida), 均一=teng taqsim",category:"chiiki"},
  {id:"dv-52",kanji:"主体的",reading:"しゅたいてき",meaning:"mustaqil, o'zi tashabbuskor",meaningJP:"自分から進んで行動すること",level:"N1",source:"d-dk-5",jlptTip:"主体的に=o'zi xohlab faol, 自主的=o'z xohishi bilan, 能動的=faol(passiv emas)",category:"chiiki"},
  {id:"dv-53",kanji:"改装",reading:"かいそう",meaning:"qayta ta'mirlash, qayta jihozlash",meaningJP:"建物を作り変えること",level:"N2",source:"d-dk-5",jlptTip:"改装=ichini o'zgartirish(dizayn), 改築=tuzilishini o'zgartirish, 改修=ta'mirlash(eski)",category:"chiiki"},
  {id:"dv-54",kanji:"拠点",reading:"きょてん",meaning:"baza, markaz",meaningJP:"活動の中心となる場所",level:"N2",source:"d-dk-5",jlptTip:"活動拠点=faoliyat markazi, 本拠地=bosh qarorgoh, 基地=harbiy baza",category:"chiiki"},

];
