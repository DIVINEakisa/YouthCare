require('dotenv').config();
const mongoose = require('mongoose');
const Education = require('../models/Education');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youthcare');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const educationalContent = [
  // Reproductive Health - Articles
  {
    category: 'reproductive',
    title: {
      en: 'Understanding Your Period',
      rw: 'Kumva Iminsi Yawe',
    },
    description: {
      en: 'Learn about menstruation and what to expect',
      rw: 'Menya ibintu byinshi ku minsi yawe',
    },
    content: {
      en: 'Menstruation is a normal biological process where the uterus sheds its lining approximately once a month. A typical period lasts between 3-7 days and occurs roughly every 28 days, though cycles can range from 21-35 days. During menstruation, your body releases blood and tissue through the vagina. It\'s completely normal to experience symptoms like cramping, bloating, or mood changes. If your period is very heavy, painful, or irregular, consult a healthcare provider.',
      rw: 'Iminsi ni inzira nzira nkeneye byingirije rimwe mu mezi. Iminsi isanzwe igira ibyumbi 3-7 n\'ibaho rimwe mu mezi 28, ariko ibitenge birashobora kwahindura. Mu gihe cy\'iminsi, umubiri wawe wacuyamo imvura n\'imwe. Hari ibigendererwaho nka kwiginagirira, kubyimba, cyangwa imvurire y\'ubwenge. Niba iminsi yawe ari nini, itera agaciro cyangwa itakunda, muhire umuganga.',
    },
    icon: '🩸',
    type: 'article',
    targetAudience: ['all', 'female'],
    ageGroup: 'all',
    source: 'YouthCare+',
  },
  {
    category: 'reproductive',
    title: {
      en: 'Contraception Methods Explained',
      rw: 'Inzira zo Gukurura Ubudade',
    },
    description: {
      en: 'A guide to different contraception options',
      rw: 'Iyobozi ry\'inzira zitandukanye zo gukurura ubudade',
    },
    content: {
      en: 'There are several contraception methods available, each with different effectiveness rates and benefits. Condoms protect against both pregnancy and sexually transmitted infections. Birth control pills are taken daily and are very effective when used correctly. IUDs are long-acting and can prevent pregnancy for 3-10 years. Other options include patches, rings, injections, and implants. It\'s important to talk with a healthcare provider about which method is best for your lifestyle and health needs.',
      rw: 'Hari inzira zitandukanye zo gukurura ubudade, buri nzira ifite ubwigenereza n\'ibihe. Konidomu zitera impfu zose z\'ubwiyunge n\'indwara zisambwa mu mahoro. Iniyiveri z\'umuryango zitakwa buri munsi kandi ni neza cyane mugihe itakwikozwe neza. IUD ni inzira itagira mpera kandi ishobora guteza impfu mu myaka 3-10. Ubundi bushya rimo: patches, rings, injections, n\'implants. Nibyiza kumvikana n\'umuganga ku nzira nziza ku nshingano zawe.',
    },
    icon: '💊',
    type: 'article',
    targetAudience: ['all', 'female'],
    ageGroup: '13-16',
    source: 'YouthCare+',
  },
  {
    category: 'reproductive',
    title: {
      en: 'STI Prevention and Testing',
      rw: 'Kuwirinda Indwara Zisambwa mu Mahoro',
    },
    description: {
      en: 'Protect yourself from sexually transmitted infections',
      rw: 'Jya neza mugihe w\'isambwa mu mahoro',
    },
    content: {
      en: 'Sexually transmitted infections (STIs) can be prevented through safe sex practices. Using condoms correctly every time you have sex provides the best protection. Regular testing is important if you\'re sexually active. Many STIs have no symptoms but can be treated with antibiotics or antivirals. Open communication with your partner about sexual health and getting tested together is recommended. If you\'re diagnosed with an STI, inform your partner(s) so they can also get tested and treated.',
      rw: 'Indwara zisambwa mu mahoro zishobora kuwirindwa n\'ubwishingizi mu mahoro. Gukoresha konidomu neza buri gihe urimo mahoro ni inzira nziza yiganjirizo. Ubwiyunge buri gihe ni byinzira mu gihe ushingira mu mahoro. Indwara nyinshi zidafite ibigendererwaho ariko zishobora gucurwa. Kubivuganya na mugenzi wawe ku buzima bwimahoro n\'kumvikana nibigendererwaho. Mugihe wibwire ku ndwara, teza mugenzi wawe kugira ngo akakubwira n\'akubwire.',
    },
    icon: '🛡️',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: 'all',
    source: 'YouthCare+',
  },
  {
    category: 'reproductive',
    title: {
      en: 'Puberty and Body Changes',
      rw: 'Ubwenge n\'Impinduka z\'Umubiri',
    },
    description: {
      en: 'What to expect during puberty',
      rw: 'Ibintu byashobora kubaho mugihe cy\'ubwenge',
    },
    content: {
      en: 'Puberty is a normal stage of development when your body undergoes significant changes. For girls, this includes breast development, menstruation starting, and growth of body hair. For boys, this includes growth of the penis and testicles, body hair, deepening voice, and increased muscle mass. These changes happen at different ages for everyone and are completely normal. Emotional changes like mood swings are also part of puberty. It\'s helpful to talk to a trusted adult about what to expect during this important transition.',
      rw: 'Ubwenge ni iyi mpande nzira y\'iterambere rero umubiri wawe uhinduka. Abakobwa basigira guhora ari: mbavu ziyambuka, iminsi itangira, n\'ubwoya bwumubiri. Abagabo: peni n\'ibihata bisigira guhora ari: gukura, ubwoya bwumubiri, ijwi rigakira rusukira, n\'imisimu mito. Ibyo bihinduka bihitira inzira zitandukanye buri muntu kandi ni nzira nziza. Impinduka z\'ubwenge nk\'icyiciro cyubwenge ni inzira ny\'ubwenge. Ni byiza kubivuganya na muntu wizeye ku bintu byabyo shobora kubaho.',
    },
    icon: '🌱',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: '10-13',
    source: 'YouthCare+',
  },

  // Mental Health - Articles
  {
    category: 'mental',
    title: {
      en: 'Managing Stress and Anxiety',
      rw: 'Kumva no Gukurura Ubushyize',
    },
    description: {
      en: 'Healthy ways to cope with stress',
      rw: 'Inzira nziza zo kumva ubushyize',
    },
    content: {
      en: 'Stress is a normal part of life, but managing it is crucial for your wellbeing. Some healthy ways to manage stress include: regular exercise, deep breathing exercises, meditation, spending time in nature, talking to friends or family, and pursuing hobbies you enjoy. Physical activity releases endorphins which improve mood. Journaling can help you process emotions. If stress becomes overwhelming and affects your daily life, don\'t hesitate to reach out to a counselor or mental health professional.',
      rw: 'Ubushyize ni inzira nziza y\'ubwiyunge, ariko kumva ni byinzira mu buzima bwawe. Inzira nziza zo kumva ubushyize: gutsibuka buri gihe, gufunga n\'kwiginagirira, yoga, kubyumba mu mahoro, kubivuganya na bantu, n\'ibigendererwaho. Gutsibuka gutacya endorphins zisaga ubwenge. Kwandika mahoro ishobora kugufasha. Niba ubushyize biba rungu kandi biguhamagara ubuyobozi bwawe, muhire umujyanama.',
    },
    icon: '😌',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: 'all',
    source: 'YouthCare+',
  },
  {
    category: 'mental',
    title: {
      en: 'Understanding Depression',
      rw: 'Kumva Icyiciro cy\'Ubwenge',
    },
    description: {
      en: 'Signs and support for depression',
      rw: 'Ibimenyetso n\'inzira yo kugabanya icyiciro cy\'ubwenge',
    },
    content: {
      en: 'Depression is a serious mental health condition that goes beyond regular sadness. Signs include persistent low mood, loss of interest in activities, changes in sleep or appetite, difficulty concentrating, and feelings of worthlessness. Depression is treatable with therapy, medication, or a combination of both. If you\'re experiencing these symptoms, it\'s important to talk to a healthcare provider. Crisis support is available 24/7 if you\'re having thoughts of self-harm. Remember: depression is not your fault, and seeking help is a sign of strength.',
      rw: 'Icyiciro cy\'ubwenge ni ikibazo gikomeye cy\'ubwenge kitakira ubwiyunge bwa buri munsi. Ibimenyetso: ubwiyunge bwakinini, kutakuba no kugusumbujira ibigendererwaho, impinduka z\'ijoro cyangwa imfungirizo, ubutaganda, n\'ubwenge bwahe. Icyiciro cy\'ubwenge gishobora gucurwa: umujyanama, iyifasilo, cyangwa rusange. Niba uzi ibyo bimenyetso, muhire umuganga. Inzira y\'ubwiyunge ifatwa 24/7 niba ushakira kugira impfu. Icyiciro cy\'ubwenge si ikosa ryawe, no kumva n\'imvano nziza.',
    },
    icon: '💙',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: '13-16',
    source: 'YouthCare+',
  },

  // Youth Education
  {
    category: 'youth',
    title: {
      en: 'Healthy Relationships',
      rw: 'Isambwa Nziza',
    },
    description: {
      en: 'Building respectful and supportive relationships',
      rw: 'Gushaka isambwa isuportirwa',
    },
    content: {
      en: 'Healthy relationships are built on trust, respect, communication, and equality. Both people should feel valued and heard. Red flags to watch for include: controlling behavior, jealousy, pressure to do things you\'re not comfortable with, or disrespect. It\'s important to maintain your own identity, friendships, and interests while in a relationship. If you feel unsafe or unhappy in a relationship, talk to someone you trust. Remember: you deserve a relationship where you feel respected and cared for.',
      rw: 'Isambwa nziza ifatwe ku mahoro, ubwenge, ubivuganya, n\'ubwishingizi. Buri muntu ashobora kumva agaciro kandi akuvuganya. Ibimenyetso by\'ikibazo: kukabuza, ubwiyunge buha, kunyunga gukora ibintu udakunyuza, cyangwa kubuza ubwiyunge. Ni byiza kuzonka ubwiyunge bwawe, bantu, n\'ibigendererwaho. Niba wumva utagira neza cyangwa ud\'ubwiyunge burake, bivuganya na muntu wizeye. Deserv\'ubwiyunge ushobora kumva ubwiyunge n\'agaciro.',
    },
    icon: '💝',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: '13-16',
    source: 'YouthCare+',
  },
  {
    category: 'youth',
    title: {
      en: 'Digital Safety and Online Privacy',
      rw: 'Ubwishingizi Mu Murinzi w\'Internet',
    },
    description: {
      en: 'Protect yourself online and offline',
      rw: 'Jya neza mu murinzi w\'internet',
    },
    content: {
      en: 'Online safety is important in today\'s digital world. Protect your privacy by: not sharing personal information with strangers, using strong passwords, enabling privacy settings on social media, and being cautious of what you post. Cyberbullying can be serious - if you\'re being bullied online, save evidence and report it. Don\'t engage with predators or suspicious people. Be aware of scams and phishing attempts. Remember: you have the right to privacy and safety both online and offline.',
      rw: 'Ubwishingizi mu murinzi w\'internet ni byinzira mu iyi miryango. Zirikira ubwiyunge bwawe: utabyivuga ibintu by\'ubwiyunge ba muncu, gukoresha imibare yagaciro, kubwira ibiyobozi by\'ibanga mu sociable media, n\'kubazo ibintu bikwivuga. Cyberbullying irashobora kuba ryinzira - niba utewe kubwiyunge mu internet, ubika ubwiyunge kandi utavuga. Utakwikire n\'abantu badakunyuza. Menya ibintu bivuga kandi ibyasambwa. Ubwiyunge ni ubwiyunge wawe murinzi w\'internet n\'murinzi w\'ubwiyunge.',
    },
    icon: '🔒',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: 'all',
    source: 'YouthCare+',
  },
  {
    category: 'nutrition',
    title: {
      en: 'Healthy Eating Habits',
      rw: 'Imvikire Nziza',
    },
    description: {
      en: 'Nutrition guide for teens',
      rw: 'Iyobozi ry\'imvikire abagore ba puruselli',
    },
    content: {
      en: 'A balanced diet is essential for your growth, energy, and mental health. Include fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit sugary drinks and junk food. Breakfast is important for concentration in school. Eat regular meals and snacks to maintain energy levels. Stay hydrated by drinking water throughout the day. Remember: your body is unique, and diet needs vary from person to person. If you have concerns about your eating habits or body image, talk to a healthcare provider.',
      rw: 'Imvikire nziza ni byinzira kubwiyunge, ubwiyunge, n\'ubwenge. Shabwa: imbuto, imvura, ubwenge bwakofa, inyo yagaciro, n\'amavuta nziza. Mahweza ibirahira n\'ibyacu. Subira ni byinzira kubwiyunge mu isomo. Rimwe mu mezi mato: imvikire n\'amasiko yo guzonka ubwiyunge. Niyamuze imvura buri gihe. Umubiri wawe ni wa keka, imvikire ihindutsa. Niba ushaka, bivuganya na muganga.',
    },
    icon: '🥗',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: 'all',
    source: 'YouthCare+',
  },
  {
    category: 'safety',
    title: {
      en: 'Personal Safety and Self-Defense',
      rw: 'Ubwishingizi bwawe n\'Ubwiyunge bwawe',
    },
    description: {
      en: 'Stay safe in various situations',
      rw: 'Jya neza mu bice bitandukanye',
    },
    content: {
      en: 'Your personal safety is important. Trust your instincts - if something feels wrong, it probably is. When going out, let someone know where you\'re going. Stay aware of your surroundings. Travel in groups when possible. Keep your phone charged and have emergency contacts saved. Know your rights if you\'re approached by someone making you uncomfortable. Self-defense classes can boost confidence and provide practical skills. If you\'re in danger, seek help immediately from police or trusted adults.',
      rw: 'Ubwishingizi bwawe ni byinzira. Zama ubwiyunge bwawe - niba ibintu bihitamo, ari kandi. Mugihe ugiye, teza muntu akahuye n\'aho ugiye. Menya ibintu biri hafi yawe. Genda n\'abantu niba wasigire. Zama telephone ihariye n\'inomero z\'ubwiyunge. Menya ubwiyunge bwawe niba muntu wamukamata. Ubwiyunge bushobora kubwigisha n\'inzira nziza. Mugihe urimvemo, mumire polisi cyangwa abantu ba wizeye.',
    },
    icon: '🛡️',
    type: 'article',
    targetAudience: ['all'],
    ageGroup: 'all',
    source: 'YouthCare+',
  },

  // Videos
  {
    category: 'reproductive',
    title: {
      en: 'Puberty Explained for Teens',
      rw: 'Ubwenge Bivuganywa Abagore',
    },
    description: {
      en: 'Video about puberty changes',
      rw: 'Inzira y\'ubwenge',
    },
    content: {
      en: 'This video explains the physical and emotional changes that happen during puberty for both boys and girls.',
      rw: 'Inzira ibihuza impinduka z\'ubwenge n\'ubwenge.',
    },
    icon: '🎥',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/p3ib3nf3hoo',
    targetAudience: ['all'],
    ageGroup: '10-13',
    source: 'YouthCare+',
  },
  {
    category: 'mental',
    title: {
      en: 'Mental Wellness for Teens',
      rw: 'Ubwenge bwacu Abagore',
    },
    description: {
      en: 'Video about mental health',
      rw: 'Inzira y\'ubwenge',
    },
    content: {
      en: 'This video discusses mental health awareness and coping strategies for teenagers.',
      rw: 'Inzira ibihuza ubwenge n\'inzira zo kumva.',
    },
    icon: '🎥',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/WuYJjbhsKOA',
    targetAudience: ['all'],
    ageGroup: '13-16',
    source: 'YouthCare+',
  },
  {
    category: 'youth',
    title: {
      en: 'Building Confidence in Teens',
      rw: 'Kubwigisha Ubwiyunge Abagore',
    },
    description: {
      en: 'Video about confidence building',
      rw: 'Inzira y\'ubwiyunge',
    },
    content: {
      en: 'This video provides tips and strategies for building self-confidence during the teenage years.',
      rw: 'Inzira ibihuza ubwiyunge n\'inzira zo kubwigisha.',
    },
    icon: '🎥',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/w-HYZv6HzAs',
    targetAudience: ['all'],
    ageGroup: '16-19',
    source: 'YouthCare+',
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing education content
    await Education.deleteMany({});
    console.log('Cleared existing education content');

    // Insert new content
    const result = await Education.insertMany(educationalContent);
    console.log(`Successfully seeded ${result.length} educational content items`);

    // Display summary
    const categories = await Education.distinct('category');
    console.log('\nContent Summary:');
    for (const category of categories) {
      const count = await Education.countDocuments({ category });
      console.log(`  ${category}: ${count} items`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(() => {
  seedDatabase();
});
