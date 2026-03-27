import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Coffee,
  Coins,
  Footprints,
  Heart,
  MapPinned,
  PawPrint,
  Popcorn,
  RefreshCw,
  Sparkles,
  Train,
  Wand2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const amiePhotoFolder = "amiechikin pics";
const amiePhotos = [
  `${amiePhotoFolder}/amiechikin_1762596064_3761250859222246068_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1762596064_3761250859507508783_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1763110880_3765569446623504392_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1763695574_3770474215817585994_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1763695574_3770474215708532144_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1768798746_3813282727227959197_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1768729117_3812698635004886364_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1768729117_3812698635122343285_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1768576152_3811415474618709851_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1769305599_3817534514735059732_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1769305599_3817534514768586443_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1771087456_3832478916934867124_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1771087456_3832478921070447193_44676528496.jpg`,
  `${amiePhotoFolder}/amiechikin_1769305599_3817534515120907127_44676528496.jpg`,
];

const biscuitPhotos = [
  "https://placehold.co/900x1200/png?text=Upload+Biscuit+Photo+1",
  "https://placehold.co/900x1200/png?text=Upload+Biscuit+Photo+2",
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");

const amieAcceptedAnswers = [
  "amie",
  "amy",
  "amiechikin",
  "amiechicken",
  "amiechkn",
  "amiechikinofficial",
  "amiechikinla",
  "amiechikinstreamer",
  "amiechikinirl",
  "amiechikincute",
  "amiechikinpretty",
  "amiechikinbaby",
  "amiechikinqueen",
  "amiechikinprincess",
  "amiechikinangel",
  "amiechikinbestgirl",
  "amiechikinthecutest",
  "amiechikinthestreamer",
  "amie chikin",
  "amie chikinn",
  "amieee",
  "ami",
  "amii",
  "amiiie",
];

const biscuitAcceptedAnswers = ["biscuit", "bisky", "biscy", "bisquit", "hamster", "biscuitt"];

const styleFacts = [
  "the cutest girl on the internet",
  "the prettiest human alive",
  "an actual pink princess",
  "the main character of every room",
  "a tiny legend with elite aura",
  "the most iconic girl in existence",
  "the prettiest streamer ever created",
  "an angel with insane visual stats",
  "the softest and most powerful girl alive",
  "the final boss of being adorable",
];

const publicCompliments = [
  "the streamer with the nicest vibes",
  "the variety queen with elite taste",
  "the prettiest Just Chatting presence",
  "the cutest creative on the timeline",
  "the internet’s sweetest sunshine beam",
  "the girl who makes every clip better",
  "the most effortlessly iconic creator",
  "the cutest public influencer in the world",
];

const personalFacts = [
  "the cutest Louisa Coffee date ever",
  "the healthiest walking queen alive",
  "the girl with the best Jeju memories",
  "the most geography-coded cutie",
  "the girl who looks cutest eating popcorn",
  "the biggest step collector with the best vibes",
  "the public transport princess",
  "the most ENFP-coded sunshine beam",
  "the girl who deserves every bag and every blessing",
  "the cutest person to ever love money",
  "a certified skinny legend",
  "so tiny she seems teleport-sized",
  "the cutest tiny queen alive",
  "the girl who is somehow pocket-sized and iconic",
  "the tiniest fashion icon in the room",
  "the girl who loves tiramisu the most",
  "small enough to be babie but powerful enough to rule",
  "the most adorable tiny legend ever",
  "the girl who would disappear if she turned sideways",
  "the strongest skinny-legend aura in the building",
  "the CEO of serving face and tiny proportions",
  "the girl who hit the cuntagon",
  "the queen of serving outfit after outfit",
  "the girl with illegal levels of serve",
  "the most dangerously babygirl fashion icon alive",
  "the tiny diva with maximum aura",
  "the girl who stays serving with zero effort",
  "the prettiest menace to everyone else's outfit",
  "the pocket-sized queen of mother behavior",
  "the internet's top representative for face card never declines",
];

const biscuitFacts = [
  "the cutest pet in the entire universe",
  "the tiniest celebrity with the most aura",
  "the most iconic hamster ever",
  "the cutest little guy on earth",
  "the fluffiest legend alive",
  "the pet with the strongest fanbase",
];

const amieQuestionTemplates = [
  "Who is {fact}?",
  "Who’s {fact}?",
  "Who would win the world championship for being {fact}?",
  "Who has been scientifically confirmed to be {fact}?",
  "Who is secretly and obviously {fact}?",
  "Who is universally agreed to be {fact}?",
  "Who is the only correct answer for {fact}?",
  "Who was born to be {fact}?",
  "Type the name of the person who is {fact}.",
  "Be honest. Who is {fact}?",
  "Who would disappear if she turned sideways because she is {fact}?",
  "Who has the strongest tiny-girl aura for being {fact}?",
  "Who hit the cuntagon because she is {fact}?",
  "Who stays serving because she is {fact}?",
  "Who is giving maximum meme energy by being {fact}?",
];

const biscuitQuestionTemplates = [
  "What is {fact}?",
  "Who is {fact}?",
  "Type the name of the pet who is {fact}.",
  "Be serious. Who is {fact}?",
  "Which tiny creature is {fact}?",
];

const accents = [
  "from-pink-300 via-rose-200 to-fuchsia-200",
  "from-rose-300 via-pink-200 to-purple-200",
  "from-fuchsia-300 via-pink-200 to-rose-200",
  "from-orange-200 via-pink-100 to-rose-200",
  "from-pink-200 via-fuchsia-200 to-rose-200",
  "from-yellow-100 via-pink-200 to-rose-200",
  "from-pink-300 via-rose-100 to-fuchsia-100",
  "from-pink-200 via-rose-200 to-orange-100",
];

const iconSet = [Heart, Sparkles, Coins, Coffee, Popcorn, MapPinned, Train, Footprints, PawPrint, Wand2];

function FloatingSticker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`absolute select-none ${className}`}
      animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getRandomIndex(length: number, exclude?: number) {
  if (length <= 1) return 0;
  let next = Math.floor(Math.random() * length);
  while (next === exclude) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

function buildQuestions() {
  const amieFacts = shuffle([...styleFacts, ...publicCompliments, ...personalFacts]).slice(0, 22);
  const biscuitPool = shuffle(biscuitFacts).slice(0, 4);

  const amieQuestions = amieFacts.map((fact, index) => ({
    id: `amie-${index}-${normalize(fact)}`,
    type: "amie",
    fact,
    question: amieQuestionTemplates[index % amieQuestionTemplates.length].replace("{fact}", fact),
    accepted: amieAcceptedAnswers,
    celebration: "you’re right — it’s AMIE! 💖",
    accent: accents[index % accents.length],
    icon: iconSet[index % iconSet.length],
    chip: index % 2 === 0 ? "extremely important question" : "serve verification in progress",
  }));

  const biscuitQuestions = biscuitPool.map((fact, index) => ({
    id: `biscuit-${index}-${normalize(fact)}`,
    type: "biscuit",
    fact,
    question: biscuitQuestionTemplates[index % biscuitQuestionTemplates.length].replace("{fact}", fact),
    accepted: biscuitAcceptedAnswers,
    celebration: "you’re right — it’s BISCUIT! 🐹",
    accent: accents[(index + 3) % accents.length],
    icon: PawPrint,
    chip: "tiny fluffy correct answer",
  }));

  return shuffle([...amieQuestions, ...biscuitQuestions]);
}

export default function AmieChikinCuteQuizSite() {
  const [questions, setQuestions] = useState(() => buildQuestions());
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [message, setMessage] = useState("");
  const [photoIndex, setPhotoIndex] = useState(0);

  const item = questions[index];
  const Icon = item.icon;
  const answerGallery = item.type === "amie" ? amiePhotos : biscuitPhotos;
  const currentPhoto = answerGallery[photoIndex % answerGallery.length];

  useEffect(() => {
    setInput("");
    setStatus("idle");
    setMessage("");
  }, [index]);

  const submitAnswer = () => {
    const clean = normalize(input);
    const validAnswers = item.accepted.map(normalize);
    const isCorrect = validAnswers.includes(clean);

    if (!clean) {
      setStatus("wrong");
      setMessage("type your answer first, silly 💌");
      return;
    }

    if (isCorrect) {
      setStatus("correct");
      setMessage(item.celebration);
      return;
    }

    setStatus("wrong");
    setMessage(item.type === "amie" ? "not quite… try again 💭" : "close, but the tiny legend disagrees 🐹");
  };

  const revealAnswer = () => {
    setStatus("correct");
    setMessage(item.celebration);
  };

  const nextQuestion = () => {
    const nextItem = questions[index + 1];

    if (index < questions.length - 1) {
      if (nextItem?.type === item.type) {
        setPhotoIndex((current) => getRandomIndex(answerGallery.length, current));
      } else {
        setPhotoIndex(getRandomIndex(nextItem?.type === "amie" ? amiePhotos.length : biscuitPhotos.length));
      }
      setIndex((current) => current + 1);
      return;
    }

    const refreshedQuestions = buildQuestions();
    const firstType = refreshedQuestions[0]?.type;
    setQuestions(refreshedQuestions);
    setPhotoIndex(getRandomIndex(firstType === "amie" ? amiePhotos.length : biscuitPhotos.length));
    setIndex(0);
  };

  const restart = () => {
    setQuestions(buildQuestions());
    setIndex(0);
    setPhotoIndex(0);
  };

  const mysteryLabel = useMemo(() => {
    const labels = [
      "mystery quiz in progress",
      "cute question sequence active",
      "scientific admiration test",
      "pink main-character exam",
      "classified cuteness protocol",
      "serve audit currently running",
    ];
    return labels[index % labels.length];
  }, [index]);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-100 text-zinc-800">
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center p-4 sm:p-8">
        <FloatingSticker className="left-4 top-8 text-4xl sm:left-10 sm:text-5xl">🐹</FloatingSticker>
        <FloatingSticker className="right-6 top-12 text-3xl sm:right-16 sm:text-5xl">🌸</FloatingSticker>
        <FloatingSticker className="bottom-16 left-6 text-3xl sm:left-16 sm:text-5xl">💖</FloatingSticker>
        <FloatingSticker className="bottom-10 right-5 text-3xl sm:right-10 sm:text-5xl">🍿</FloatingSticker>
        <FloatingSticker className="left-1/4 top-24 hidden text-4xl sm:block">☁️</FloatingSticker>
        <FloatingSticker className="right-1/4 bottom-24 hidden text-4xl sm:block">🎀</FloatingSticker>

        <Card className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border-white/60 bg-white/75 shadow-2xl backdrop-blur-xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-40`} />
          <CardContent className="relative grid gap-6 p-5 sm:grid-cols-2 sm:gap-8 sm:p-8">
            <div className="flex flex-col justify-between gap-5">
              <div>
                <div className="mb-4 flex items-center gap-2 text-pink-600">
                  <Heart className="h-5 w-5 fill-pink-500" />
                  <span className="text-sm font-semibold uppercase tracking-[0.2em]">amiechikin.exe</span>
                </div>

                <h1 className="text-3xl font-black leading-tight sm:text-5xl">
                  an important pink website
                  <span className="block text-pink-500">for the cutest girl ever</span>
                </h1>

                <p className="mt-3 max-w-xl text-sm text-zinc-600 sm:text-base">
                  No one knows how many questions there are. Not even science.
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-lg sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-pink-700">
                    <Icon className="h-4 w-4" />
                    {mysteryLabel}
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500 shadow-sm">
                    {item.chip}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.id + status}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                    className="min-h-[300px]"
                  >
                    <div className="flex h-full flex-col gap-4">
                      <div>
                        <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{item.question}</h2>
                        <p className="mt-3 text-sm text-zinc-500 sm:text-base">
                          Type your answer below and trust your instincts.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Input
                          value={input}
                          onChange={(event) => setInput(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") submitAnswer();
                          }}
                          placeholder={item.type === "amie" ? "type your answer here..." : "type the tiny celebrity's name..."}
                          className="h-14 rounded-2xl border-pink-200 bg-white text-base shadow-sm placeholder:text-zinc-400 focus-visible:ring-pink-300"
                        />

                        <div className="flex flex-wrap gap-3">
                          <Button
                            onClick={submitAnswer}
                            className="rounded-2xl bg-pink-500 px-6 py-6 text-base font-semibold shadow-lg hover:bg-pink-600"
                          >
                            Check answer 💌
                          </Button>
                          <Button
                            variant="outline"
                            onClick={revealAnswer}
                            className="rounded-2xl border-pink-200 bg-white/80 px-6 py-6 text-base font-semibold text-pink-600 hover:bg-pink-50"
                          >
                            Reveal answer ✨
                          </Button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {status !== "idle" && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`rounded-[1.5rem] p-4 shadow-md ${
                              status === "correct"
                                ? "bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700"
                                : "bg-white text-zinc-600"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Sparkles className={`mt-0.5 h-5 w-5 ${status === "correct" ? "text-pink-500" : "text-zinc-400"}`} />
                              <div>
                                <div className={`text-lg font-bold ${status === "correct" ? "text-pink-600" : "text-zinc-700"}`}>
                                  {message}
                                </div>
                                <p className="mt-1 text-sm">
                                  {status === "correct"
                                    ? item.type === "amie"
                                      ? "obviously the answer is Amie. history agrees."
                                      : "obviously the answer is BISCUIT. tiny cuteness remains undefeated."
                                    : "That one did not pass the official cuteness verification test."}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {status === "correct" && (
                        <div className="pt-1">
                          <Button
                            onClick={nextQuestion}
                            className="rounded-2xl bg-pink-500 px-6 py-6 text-base font-semibold hover:bg-pink-600"
                          >
                            Next mystery question →
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">pink mode enabled</span>
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">chikawa energy</span>
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">mystery question count</span>
                <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">serve levels critical</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <motion.div
                layout
                className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-xl"
              >
                <div className="absolute right-3 top-3 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-pink-500 shadow">
                  {status === "correct" ? "Correct answer" : "Cute evidence panel"}
                </div>

                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-pink-100">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPhoto + String(status)}
                      src={currentPhoto}
                      alt={status === "correct" ? item.celebration : item.question}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                    />
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.5rem] bg-white/80 p-4 shadow-lg">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-pink-500">Cute facts</div>
                  <div className="space-y-2 text-sm text-zinc-700">
                    <div>🐹 Biscuit supremacy</div>
                    <div>☕ Louisa Coffee lover</div>
                    <div>🍿 Popcorn enthusiast</div>
                    <div>🌍 Geography queen</div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-white/80 p-4 shadow-lg">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-pink-500">Certified lore</div>
                  <div className="space-y-2 text-sm text-zinc-700">
                    <div>🚆 Public transport appreciator</div>
                    <div>👟 Step collector</div>
                    <div>💸 Money enjoyer</div>
                    <div>💅 Serve levels maxed</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/70 bg-gradient-to-r from-pink-100 to-rose-100 p-4 text-sm text-zinc-700 shadow-lg">
                <span className="font-bold text-pink-600">Photo note:</span> Amie photos now point to the <code>amiechikin pics</code> folder and randomly switch only when moving to the next answer.
              </div>

              <Button
                variant="outline"
                onClick={restart}
                className="rounded-2xl border-pink-200 bg-white/80 py-6 text-base font-semibold text-pink-600 hover:bg-pink-50"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh with new questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
