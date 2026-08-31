import { QuizQuestion } from "@/types";

export const quizzes: QuizQuestion[] = [
  // =========================
  // PHOTOS
  // =========================

  {
    id: "photo-001",
    category: "photos",
    question:
      "Tu veux publier une photo prise devant ton lycée. Que dois-tu vérifier ?",
    answers: [
      "Seulement si la photo est jolie",
      "Les informations visibles autour de moi",
      "Le nombre de likes",
      "Rien, puisque c'est ma photo",
    ],
    correctAnswer: 1,
    explanation:
      "Une photo peut révéler ton établissement, ta ville, ton trajet ou d'autres informations personnelles.",
    points: 10,
    danger: "medium",
  },

  {
    id: "photo-002",
    category: "photos",
    question:
      "Une lettre avec ton adresse apparaît derrière toi sur une photo. Que faire ?",
    answers: [
      "Publier quand même",
      "Ajouter encore plus de détails",
      "Recadrer la photo avant de la publier",
      "Demander à tes abonnés de deviner l'adresse",
    ],
    correctAnswer: 2,
    explanation:
      "Les documents visibles sur une photo peuvent révéler ton adresse ou d'autres informations privées.",
    points: 10,
    danger: "high",
  },

  {
    id: "photo-003",
    category: "photos",
    question:
      "Un ami apparaît sur ta photo. Que devrais-tu prendre en compte ?",
    answers: [
      "Son accord avant de publier",
      "Uniquement le nombre de likes",
      "Rien",
      "La qualité de la caméra",
    ],
    correctAnswer: 0,
    explanation:
      "Avant de publier une photo d'une autre personne, il est préférable de respecter son accord et sa vie privée.",
    points: 10,
    danger: "medium",
  },

  {
    id: "photo-004",
    category: "photos",
    question:
      "Quelle information vaut mieux éviter de montrer sur une photo publique ?",
    answers: [
      "Ton adresse",
      "Une montagne",
      "Un coucher de soleil",
      "Un dessin",
    ],
    correctAnswer: 0,
    explanation:
      "Une adresse est une information personnelle qui peut permettre de localiser ton domicile.",
    points: 10,
    danger: "high",
  },

  {
    id: "photo-005",
    category: "photos",
    question:
      "Une photo montre ton billet de train avec un QR code. Que faire ?",
    answers: [
      "Publier le billet en entier",
      "Masquer les informations sensibles",
      "Ajouter ton nom en commentaire",
      "Envoyer le QR code à tout le monde",
    ],
    correctAnswer: 1,
    explanation:
      "Les billets et QR codes peuvent contenir des informations personnelles ou des données utilisables par quelqu'un d'autre.",
    points: 10,
    danger: "high",
  },

  // =========================
  // VIDEOS
  // =========================

  {
    id: "video-001",
    category: "videos",
    question:
      "Tu filmes une vidéo chez toi. Quel élément dois-tu vérifier ?",
    answers: [
      "Les éléments visibles en arrière-plan",
      "Uniquement ta coiffure",
      "Le nombre de vues",
      "La durée uniquement",
    ],
    correctAnswer: 0,
    explanation:
      "L'arrière-plan peut montrer ton logement, tes habitudes, des documents ou d'autres informations privées.",
    points: 10,
    danger: "medium",
  },

  {
    id: "video-002",
    category: "videos",
    question:
      "Une notification privée apparaît dans ta vidéo. Que faire ?",
    answers: [
      "La laisser visible",
      "La partager en story",
      "La masquer ou couper le passage",
      "Demander aux abonnés de la lire",
    ],
    correctAnswer: 2,
    explanation:
      "Une notification peut afficher un nom, un message, un numéro ou d'autres informations privées.",
    points: 10,
    danger: "high",
  },

  {
    id: "video-003",
    category: "videos",
    question:
      "Une plaque d'immatriculation apparaît dans ta vidéo. Que peux-tu faire ?",
    answers: [
      "La mettre en avant",
      "La flouter si nécessaire",
      "Ajouter la plaque dans le titre",
      "Rien",
    ],
    correctAnswer: 1,
    explanation:
      "Flouter certaines informations permet de limiter la quantité de données personnelles diffusées.",
    points: 10,
    danger: "medium",
  },

  {
    id: "video-004",
    category: "videos",
    question:
      "Tu filmes ton trajet quotidien et publies toujours l'heure exacte. Quel est le problème ?",
    answers: [
      "Aucun",
      "Cela peut révéler certaines de tes habitudes",
      "Cela augmente seulement la qualité",
      "Cela protège ton compte",
    ],
    correctAnswer: 1,
    explanation:
      "Des publications régulières et très précises peuvent permettre à quelqu'un de comprendre certaines habitudes ou déplacements.",
    points: 10,
    danger: "medium",
  },

  {
    id: "video-005",
    category: "videos",
    question:
      "Avant de publier une vidéo, quel réflexe est utile ?",
    answers: [
      "La regarder une dernière fois attentivement",
      "La publier immédiatement",
      "Ne vérifier que les commentaires",
      "Demander aux inconnus de la vérifier",
    ],
    correctAnswer: 0,
    explanation:
      "Regarder une vidéo avant publication permet de repérer des informations qui auraient pu passer inaperçues.",
    points: 10,
    danger: "low",
  },

  // =========================
  // CONVERSATIONS
  // =========================

  {
    id: "conversation-001",
    category: "conversations",
    question:
      "Une personne que tu viens de rencontrer en ligne te demande ton adresse. Que fais-tu ?",
    answers: [
      "Je donne mon adresse",
      "Je donne seulement ma rue",
      "Je ne partage pas cette information",
      "Je demande son adresse en premier",
    ],
    correctAnswer: 2,
    explanation:
      "Une personne inconnue en ligne n'a pas besoin de connaître ton adresse.",
    points: 10,
    danger: "high",
  },

  {
    id: "conversation-002",
    category: "conversations",
    question:
      "Un inconnu te dit : « Ne parle à personne de notre conversation ». Comment réagir ?",
    answers: [
      "Je garde absolument le secret",
      "Je donne mon numéro",
      "Je reste prudent et j'en parle à quelqu'un de confiance si nécessaire",
      "Je lui envoie une photo",
    ],
    correctAnswer: 2,
    explanation:
      "Demander de garder une conversation secrète peut être un signal d'alerte, notamment lorsqu'une personne cherche à t'isoler.",
    points: 10,
    danger: "high",
  },

  {
    id: "conversation-003",
    category: "conversations",
    question:
      "Quelqu'un rencontré en ligne te demande ton mot de passe. Que fais-tu ?",
    answers: [
      "Je lui donne",
      "Je lui donne seulement un ancien mot de passe",
      "Je ne le partage pas",
      "Je lui demande de me donner le sien",
    ],
    correctAnswer: 2,
    explanation:
      "Un mot de passe doit rester secret. Même quelqu'un que tu connais ne devrait pas te demander de le partager.",
    points: 10,
    danger: "critical",
  },

  {
    id: "conversation-004",
    category: "conversations",
    question:
      "Une personne insiste après que tu as dit non. Que peux-tu faire ?",
    answers: [
      "Continuer à discuter pour lui faire plaisir",
      "Céder",
      "Arrêter la conversation et bloquer si nécessaire",
      "Donner davantage d'informations",
    ],
    correctAnswer: 2,
    explanation:
      "Tu as le droit de dire non. Une personne qui ne respecte pas tes limites mérite une attention particulière.",
    points: 10,
    danger: "high",
  },

  {
    id: "conversation-005",
    category: "conversations",
    question:
      "Un inconnu veut rapidement passer d'un réseau social à une messagerie privée. Que faire ?",
    answers: [
      "Accepter automatiquement",
      "Rester prudent",
      "Donner mon adresse",
      "Envoyer une photo immédiatement",
    ],
    correctAnswer: 1,
    explanation:
      "Changer rapidement de plateforme peut être utilisé pour sortir d'un environnement où les outils de signalement sont disponibles.",
    points: 10,
    danger: "medium",
  },

  // =========================
  // VIE PRIVÉE
  // =========================

  {
    id: "privacy-001",
    category: "vie-privee",
    question:
      "Quelle information vaut mieux éviter de publier publiquement ?",
    answers: [
      "Ton adresse",
      "Ton film préféré",
      "Une recette",
      "Une photo de paysage",
    ],
    correctAnswer: 0,
    explanation:
      "Ton adresse est une information personnelle qui ne devrait pas être publiée publiquement.",
    points: 10,
    danger: "high",
  },

  {
    id: "privacy-002",
    category: "vie-privee",
    question:
      "Que faire avec un mot de passe ?",
    answers: [
      "Le partager avec tes abonnés",
      "Le publier dans ta bio",
      "Le garder secret",
      "L'envoyer à un inconnu",
    ],
    correctAnswer: 2,
    explanation:
      "Un mot de passe doit rester secret et être suffisamment difficile à deviner.",
    points: 10,
    danger: "critical",
  },

  {
    id: "privacy-003",
    category: "vie-privee",
    question:
      "Tu pars en vacances. Quel réflexe peut limiter les informations publiées ?",
    answers: [
      "Publier immédiatement ton adresse et tes dates",
      "Éviter de donner trop de détails en public",
      "Publier une photo de ta maison",
      "Indiquer quand personne n'est chez toi",
    ],
    correctAnswer: 1,
    explanation:
      "Éviter de diffuser publiquement des informations précises sur ton absence limite les informations disponibles sur ta vie privée.",
    points: 10,
    danger: "medium",
  },

  {
    id: "privacy-004",
    category: "vie-privee",
    question:
      "Une application demande l'accès à ta localisation. Que dois-tu faire ?",
    answers: [
      "Toujours accepter",
      "Vérifier si cette autorisation est réellement nécessaire",
      "Donner toutes les autorisations possibles",
      "Partager également ton adresse",
    ],
    correctAnswer: 1,
    explanation:
      "Les autorisations d'une application doivent correspondre à ses besoins réels.",
    points: 10,
    danger: "medium",
  },

  {
    id: "privacy-005",
    category: "vie-privee",
    question:
      "Quel est un bon réflexe avant d'accepter quelqu'un que tu ne connais pas ?",
    answers: [
      "Accepter immédiatement",
      "Vérifier son profil et rester prudent",
      "Lui donner ton numéro",
      "Lui envoyer une photo",
    ],
    correctAnswer: 1,
    explanation:
      "Un profil peut être faux. Prendre le temps de vérifier et de rester prudent est un bon réflexe.",
    points: 10,
    danger: "medium",
  },

  // =========================
  // FAUX PROFILS
  // =========================

  {
    id: "fake-001",
    category: "faux-profils",
    question:
      "Un profil vient d'être créé et te demande immédiatement une photo privée. Que fais-tu ?",
    answers: [
      "J'envoie la photo",
      "Je reste prudent",
      "Je donne mon adresse",
      "Je lui donne mon numéro",
    ],
    correctAnswer: 1,
    explanation:
      "Une demande rapide de contenu privé de la part d'un profil inconnu est un signal qui mérite de la prudence.",
    points: 10,
    danger: "high",
  },

  {
    id: "fake-002",
    category: "faux-profils",
    question:
      "Quels éléments peuvent rendre un profil suspect ?",
    answers: [
      "Des incohérences dans les informations",
      "Une photo de paysage",
      "Un compte qui suit peu de personnes",
      "Un prénom courant",
    ],
    correctAnswer: 0,
    explanation:
      "Les incohérences entre les photos, l'âge, les informations ou les publications peuvent être un indice.",
    points: 10,
    danger: "medium",
  },

  {
    id: "fake-003",
    category: "faux-profils",
    question:
      "Une personne refuse systématiquement les appels vidéo mais veut beaucoup discuter en privé. Que faire ?",
    answers: [
      "Lui faire immédiatement confiance",
      "Rester prudent",
      "Donner mon adresse",
      "Envoyer des documents",
    ],
    correctAnswer: 1,
    explanation:
      "Ce comportement ne prouve pas qu'il s'agit d'un faux profil, mais peut constituer un élément parmi d'autres nécessitant de la prudence.",
    points: 10,
    danger: "medium",
  },

  {
    id: "fake-004",
    category: "faux-profils",
    question:
      "Quelqu'un rencontré en ligne semble connaître beaucoup de choses sur toi. Que faire ?",
    answers: [
      "Lui donner encore plus d'informations",
      "Être prudent et vérifier ce qui est public sur mes profils",
      "Lui donner mon mot de passe",
      "Publier davantage d'informations",
    ],
    correctAnswer: 1,
    explanation:
      "Il est utile de vérifier les informations publiques de ses propres profils et de limiter ce qui peut permettre de mieux te connaître.",
    points: 10,
    danger: "high",
  },

  {
    id: "fake-005",
    category: "faux-profils",
    question:
      "Un compte te promet un cadeau si tu lui donnes tes identifiants. Que faire ?",
    answers: [
      "Donner mes identifiants",
      "Donner seulement mon mot de passe",
      "Ne rien partager et signaler si nécessaire",
      "Envoyer une photo de ma pièce d'identité",
    ],
    correctAnswer: 2,
    explanation:
      "Les identifiants ne doivent jamais être partagés pour obtenir un cadeau ou une récompense.",
    points: 10,
    danger: "critical",
  },

  // =========================
  // MANIPULATION
  // =========================

  {
    id: "manipulation-001",
    category: "manipulation",
    question:
      "Une personne te dit : « Si tu refuses, c'est que tu ne me fais pas confiance ». Que remarques-tu ?",
    answers: [
      "Une possible pression émotionnelle",
      "Une preuve d'amitié",
      "Une obligation",
      "Rien de particulier",
    ],
    correctAnswer: 0,
    explanation:
      "Faire culpabiliser quelqu'un pour obtenir quelque chose peut être une technique de pression.",
    points: 10,
    danger: "high",
  },

  {
    id: "manipulation-002",
    category: "manipulation",
    question:
      "Quelqu'un te demande de garder une information secrète et insiste fortement. Que faire ?",
    answers: [
      "Garder le secret quoi qu'il arrive",
      "En parler à une personne de confiance si la situation te met mal à l'aise",
      "Envoyer une photo",
      "Donner mon adresse",
    ],
    correctAnswer: 1,
    explanation:
      "Tu n'es jamais obligé de garder seul quelque chose qui te met mal à l'aise ou qui te fait peur.",
    points: 10,
    danger: "high",
  },

  {
    id: "manipulation-003",
    category: "manipulation",
    question:
      "Une personne te dit qu'il faut répondre immédiatement sinon elle va partir. Quel signal peux-tu reconnaître ?",
    answers: [
      "Une pression ou une urgence artificielle",
      "Une garantie de sécurité",
      "Une preuve d'identité",
      "Un bon conseil",
    ],
    correctAnswer: 0,
    explanation:
      "Créer un sentiment d'urgence peut empêcher quelqu'un de prendre le temps de réfléchir.",
    points: 10,
    danger: "medium",
  },

  {
    id: "manipulation-004",
    category: "manipulation",
    question:
      "Tu te sens mal à l'aise pendant une conversation en ligne. Que peux-tu faire ?",
    answers: [
      "Continuer obligatoirement",
      "Arrêter la conversation",
      "Donner davantage d'informations",
      "Rencontrer la personne",
    ],
    correctAnswer: 1,
    explanation:
      "Ton ressenti compte. Tu peux arrêter une conversation, bloquer quelqu'un et demander de l'aide.",
    points: 10,
    danger: "medium",
  },

  {
    id: "manipulation-005",
    category: "manipulation",
    question:
      "Quelqu'un essaie de t'isoler en disant que personne d'autre ne doit être au courant. Que faire ?",
    answers: [
      "Ne rien dire à personne",
      "En parler à une personne de confiance",
      "Donner mon adresse",
      "Envoyer une vidéo",
    ],
    correctAnswer: 1,
    explanation:
      "Une tentative d'isolement peut être un signal d'alerte. Parler à quelqu'un de confiance peut aider à prendre du recul.",
    points: 10,
    danger: "high",
  },
];