// Created using ChatGPT

const data = [
  {
    id: 1,
    to: {
      name: 'Johnny',
      username: 'johnnyboy',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    text: 'Yo, what kinda food you like the most?',
    answer: {
      text: "Oh dude, I can't get enough of pizza!",
      createdAt: Date.now() - 60 * 60 * 1000,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 2,
  },
  {
    id: 2,
    to: {
      name: 'Filiz',
      username: 'filiz567',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
    },
    text: 'Hayatımın en büyük kararını vermek zorundayım ama kafam çok karışık. Ne yapmalıyım?',
    answer: {
      text: 'Merhaba, bu kesinlikle zor bir durum. Öncelikle, kararını vermeden önce kendine şu soruları sormanı öneririm: Bu karar benim gerçekten mi yoksa başka birisinin mi? Bu kararın sonucunda, kendim ve sevdiklerim için ne tür sonuçlar olacak? Kararımın bana, hayatımda ne tür yeni fırsatlar sunabileceğini düşünebilir miyim? Kararımı vermeden önce, yakın çevremden destek alabilir miyim? Bütün bu soruların cevabını alarak, kararını vermen daha kolay olabilir. Ayrıca, hayatımızda yaptığımız kararlar her zaman doğru olmayabilir, bu yüzden kendine şunu hatırlatmanı öneririm: hatalar insan doğasının bir parçasıdır ve bu hatalardan öğrenerek ilerleriz. Umarım bu sana yardımcı olur, başka bir şeyde yardımcı olmamı istersen her zaman buradayım.',
      createdAt: Date.now() - 60 * 60 * 1000 * 24,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24,
  },
  {
    id: 3,
    to: {
      name: 'Merve',
      username: 'merve_93',
      avatar: 'https://randomuser.me/api/portraits/women/76.jpg',
    },
    text: 'Bugün yemekte ne yesem bilemedim, önerileriniz nelerdir?',
    answer: {
      text: 'Ben bugün lahmacun yedim, tavsiye ederim. Hamburger de iyi olabilir, senin damak tadına kalmış tabii. Afiyet olsun!',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 2,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 2,
  },
  {
    id: 4,
    to: {
      name: 'Ayşe',
      username: 'ayse123',
      avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
    },
    text: 'Uzun zamandır iş arıyorum ama bir türlü bulamıyorum. Sizce ne yapabilirim?',
    answer: {
      text: 'İş aramaya devam etmekten vazgeçme, umudunu kaybetme. Yeni iş ilanlarına her gün bak ve başvuru yap. Ayrıca kendini geliştirecek kurslara da katılabilirsin. Umarım yakında aradığın işi bulursun!',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 7,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 7,
  },
  {
    id: 5,
    to: {
      name: 'Emily',
      username: 'emilyjones',
      avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
    },
    text: 'Hey Emily, do you know any good movies to watch on Netflix?',
    answer: {
      text: 'Yeah, I just watched "The Mitchells vs. the Machines" and it was really good! Highly recommend it. Also "The Queen\'s Gambit" is amazing if you haven\'t seen it yet.',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 5,
    },
    createdAt: Date.now() - 60 * 60 * 1000,
  },
  {
    id: 6,
    to: {
      name: 'Emily Jones',
      username: 'emily',
      avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
    },
    text: "What's the best way to start learning a new language?",
    answer: {
      text: 'One great way to start learning a new language is to immerse yourself in it as much as possible. This could mean watching movies or TV shows in the target language, listening to music or podcasts, and speaking with native speakers. Another useful strategy is to start with basic vocabulary and grammar rules, and practice speaking and writing as much as possible.',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 7,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 7,
  },
  {
    id: 7,
    to: {
      name: 'Lucas Silva',
      username: 'lucas',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    text: 'How can I improve my coding skills?',
    answer: {
      text: "One of the best ways to improve your coding skills is to practice writing code as much as possible. You can work on personal projects or contribute to open-source projects on GitHub. Additionally, reading books or taking online courses can help you learn new coding concepts and techniques. Finally, don't be afraid to ask questions and seek feedback from more experienced developers.",
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 14,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 14,
  },
  {
    id: 8,
    to: {
      name: 'Mehmet Yılmaz',
      username: 'mehmet',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    text: 'Hangi yemeği en seversin?',
    answer: {
      text: 'Benim en sevdiğim yemek döner. Özellikle de acılı soslu olanları çok seviyorum.',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 3,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 3,
  },
  {
    id: 9,
    to: {
      name: 'Sophie Martin',
      username: 'sophie',
      avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    },
    text: "What's the best way to prepare for a job interview?",
    answer: {
      text: "To prepare for a job interview, it's important to research the company and the position you're applying for. Review the job description and make a list of your relevant skills and experiences. Practice answering common interview questions, and prepare questions to ask the interviewer. Finally, make sure you dress appropriately and arrive on time for the interview.",
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 10,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 10,
  },
  {
    id: 10,
    to: {
      name: 'Ayşe',
      username: 'itsayse00',
      avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    },
    text: 'Selam Ayşe, Instagram hesabımı büyütmek için ne yapabilirim?',
    answer: {
      text: 'Merhaba! Instagram hesabınızı büyütmek için etkileşim oranınızı artırmak önemlidir. Bunun için özgün içerikler üretmek, etkileşimli bir kitle oluşturmak, doğru hashtagleri kullanmak ve düzenli paylaşımlar yapmak işe yarayabilir. Ayrıca etkileşimli hesaplarla etkileşim kurmak da faydalı olabilir. Başarılar!',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 5,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 5,
  },
  {
    id: 11,
    to: {
      name: 'Fatma',
      username: 'fatosh',
      avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
    },
    text: 'Merhaba Fatma, önerdiğin güzel bir yemek tarifi var mı?',
    answer: {
      text: 'Tabii ki! Benim favori yemek tariflerimden biri, mantar soslu tavuk. İnce doğranmış tavuk göğsü parçalarını tuz ve karabiberle baharatlayıp soteleyin. Daha sonra ince doğranmış mantarları ekleyin ve pişmeye devam edin. Son olarak biraz süt ve un karışımı ekleyerek sos yapın. Sosu tavuk ve mantarların üzerine dökün ve servis yapın. Afiyet olsun!',
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 10,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 10,
  },
  {
    id: 12,
    to: {
      name: 'Ali',
      username: 'ali-baba',
      avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    text: 'Selam Ali, tavsiye edebileceğin bir müzik uygulaması var mı?',
    answer: {
      text: "Merhaba, ben müzik uygulaması olarak Spotify kullanıyorum ve oldukça memnunum. Sınırsız müzik seçeneği, özelleştirilebilir çalma listeleri, podcast'ler ve daha birçok özellik sunuyor. Üstelik hem mobil hem de masaüstü cihazlar için kullanılabilir. Tavsiye ederim!",
      createdAt: Date.now() - 60 * 60 * 1000 * 24 * 2,
    },
    createdAt: Date.now() - 60 * 60 * 1000 * 24 * 2,
  },
]

export default data
