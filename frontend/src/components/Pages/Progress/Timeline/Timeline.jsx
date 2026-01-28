import { useState, useContext } from "react";
import BadgeIcon from "../../../../assets/BadgeIcon";
import BalloonIcon from "../../../../assets/BalloonIcon";
import CertificateIcon from "../../../../assets/CertificateIcon";
import CrownIcon from "../../../../assets/CrownIcon";
import RibbonIcon from "../../../../assets/RibbonIcon";
import StarIcon from "../../../../assets/StarIcon";
import TimelineTrophy from "../../../../assets/TimelineTrophy";
import LevelModalContainer from "../../../Reusables/Modal/LevelModal/LevelModalContainer";
import { ModalContext } from "../../../Reusables/Modal/ModalContext";
import { useTranslation } from "react-i18next";

export default function Timeline({ data, currentLevel }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { openModal } = useContext(ModalContext);
  const { t } = useTranslation(["progress", "level"]);

  const levelOrder = {
    "A0 Absolute Beginner": 0,
    "A1 Beginner": 1,
    "A2 Upper Beginner": 2,
    "B1 Intermediate": 3,
    "B1.5 Upper-Intermediate": 4,
    "B2 Upper-Intermediate": 5,
    "C1 Advanced": 6,
  };

  const getLevelDetails = (levelName) => {
    const levelKey = levelName;
    const levelData = t(`level:levels.${levelKey}`, { returnObjects: true });

    // Fallback to English if translation not found
    if (typeof levelData === "string" || !levelData) {
      // Return English fallback data
      return englishLevelDetails[levelName] || null;
    }

    return levelData;
  };

  const englishLevelDetails = {
    "A0 Absolute Beginner": {
      title: "A0 - Absolute Beginner",
      timeRange: "0-2 hours",
      description: "Starting your English journey from the very beginning.",
      howItFeels:
        'English sounds completely alien to you. None of it feels or sounds familiar to your ears. You\'re not confident with even the most basic words like I, you, he, she. Even simple phrases like "How are you" are not familiar to you.',
      whatToDo:
        "The only thing you need to do right now is listen! The A0 videos on Englishsponge have been designed for students who know absolutely zero English, so watch these videos for a couple of hours until you reach the A1 level. These A0 videos use lots of images and gestures so that you can understand them without knowing any English. We do NOT recommend that you start speaking, reading or writing at this stage. It's worth noting that many students have already reached an A1 beginner level from what they learned at school as a child. If the A0 beginner videos seem too easy for you then it's ok to skip ahead of the A1 beginner level.",
      whatYouLearn:
        "At this level you learn basic words like I, you, he and she. You also learn the most foundational verbs such as want, like, have and so on. Finally, you will also learn a few basic nouns at this stage like some colours (blue, yellow, red), the names of some foods (pizza, bread, milk) and the names of some animals (dog, cat, fish).",
      requirements: [
        "Learn basic greetings and introductions",
        "Master the English alphabet and numbers",
        "Understand simple present tense",
        "Build vocabulary of 300+ common words",
        "Complete basic listening exercises",
      ],
      skills:
        "Basic communication, simple vocabulary, present tense understanding",
    },
    "A1 Beginner": {
      title: "A1 - Beginner",
      timeRange: "2-50 hours",
      description: "Building fundamental English communication skills.",
      howItFeels:
        'As an A1 beginner you have learnt some basic words, but you do not understand how to form complete sentences. All of the language still seems very new and alien to you. You will now know a few key phrases like "how are you?" and "what is your name?" but you cannot understand a conversation beyond this point.',
      whatToDo:
        "The only thing you need to do right now is listen! The A1 beginner videos on Englishsponge have been designed so that you can listen and learn vocabulary from them even as a beginner. Here you will learn your first 200-500 words by listening - learning them by listening ensures that you learn the correct pronunciation for these common and fundamental words. Here, most students try to memorise the colours, numbers, animals and foods and so on. This is wrong (and boring). Instead, just watch our A1 beginner videos and you'll learn all of these things naturally as they come up throughout the videos. We do NOT recommend that you start speaking, reading or writing at this stage. Starting to learn new vocabulary by reading at this level is completely unnecessary as all beginner vocabulary can be learned through listening, and learning through reading will interfere with good pronunciation habits. Starting to speak at this level is unnecessary as you will start making \"guesses\" for which words to use while speaking and therefore create incorrect habits. You do not need to try to memorise vocabulary as all vocabulary will be naturally learned through comprehensible input. Many people suggest that you try to watch children's cartoons at this level, but this is bad advice. Children's cartoons are still too difficult for an A1 beginner learner. Your main focus should still be listening to massive amounts of comprehensible input at this stage.",
      whatYouLearn:
        'At the A1 beginner level you will learn basic verbs such as: see, go, drink, eat and bring. You will also learn some basic nouns such as table, pen, cup and tree. You will learn basic adjectives like: happy, sad, hot and cold. The "function words", such as him, her, about, from, to and with will still be confusing to you at this stage. This is completely normal.',
      requirements: [
        "Engage in simple conversations",
        "Use past and future tenses correctly",
        "Expand vocabulary to 800+ words",
        "Read simple texts and stories",
        "Write basic sentences and paragraphs",
      ],
      skills: "Simple conversations, basic tenses, expanded vocabulary",
    },
    "A2 Upper Beginner": {
      title: "A2 - Upper Beginner",
      timeRange: "50-250 hours",
      description: "Developing more confident communication abilities.",
      howItFeels:
        "As an A2 beginner you're now quite familiar with some of the most common words in English. You comfortably understand basic verbs like want, see, watch, eat, drink and run. You are now somewhat familiar with how the English language sounds, and you have built up a vocabulary of around 200-500 words that you know well and another 500 or so words that you vaguely understand. You don't feel like a complete beginner anymore, but you still probably don't feel confident in understanding English yet. That's perfectly normal. A native speaker talking to you normally will still be mostly incomprehensible to you at this stage. The A2 level can seem slow sometimes. Just keep listening and you will make it to the B1 intermediate level before you know it!",
      whatToDo:
        'The only thing you need to do right now is listen! On Englishsponge, you can watch hundreds of videos designed for A2 upper-beginner students. All you need to do is watch them, and build up your vocabulary through watching comprehensible input. By learning English in this way, you are building up a fantastic foundation of good pronunciation and natural sounding English. We do NOT recommend that you start speaking, reading or writing at this stage. Starting to learn new vocabulary by reading at this level is completely unnecessary as all beginner vocabulary can be learned through listening, and learning through reading will interfere with good pronunciation habits. Starting to speak at this level is unnecessary as you will start making "guesses" for which words to use while speaking and therefore create incorrect habits. Just keep listening until you reach a B1 intermediate level of understanding before you do anything else. You do not need to try to memorise vocabulary as all vocabulary will be naturally learned through comprehensible input. You do not need to start studying grammar or doing grammar exercises. Instead, if you want to understand grammar better, go to the grammar filters on Englishsponge and watch videos that contain the use of the grammar point you want to study. There is very little need to do grammar exercises or learn grammar rules. Your main focus should still be listening to massive amounts of comprehensible input at this stage. (You may also want to return to A1 videos from time to time during this stage - listening to content that is below your current level can allow you to notice the finer details of the language)',
      whatYouLearn:
        "You'll continue to build up your vocabulary through watching comprehensible input videos until you've learnt roughly 1500-2500 words in English. You'll learn the future simple and past simple tenses at this stage - not from studying grammar, but through watching videos. If you want focused grammar study, you can go to the grammar filter tab and learn specific grammar points through watching videos. The present perfect tense will also begin to be learned at this stage, but you will not fully understand this verb tense until the B2+ level. The \"function words\", such as him, her, about, from, to and with will still be confusing to you at this stage. This is completely normal, so do not worry if you still do not feel confident with these words.",
      requirements: [
        "Handle routine tasks and social situations",
        "Use conditional and perfect tenses",
        "Master 1500+ vocabulary words",
        "Understand longer conversations",
        "Write coherent short texts",
      ],
      skills: "Routine communication, complex tenses, intermediate vocabulary",
    },
    "B1 Intermediate": {
      title: "B1 - Intermediate",
      timeRange: "250-400 hours",
      description: "Achieving functional independence in English.",
      howItFeels:
        "Good job! You're officially an intermediate English learner! Now that you're a B1 student of English you have built a solid foundation of English and you'll likely be starting to feel some confidence when interacting with the language. You may find that listening to English has started to become a little bit more enjoyable as you can now understand slightly more complex topics. For many, B1 is the \"magic\" level where they start to feel more comfortable with English and listening no longer feels like such hard work for your brain. At this stage, you'll be able to understand a patient native-English speaker who is speaking a little slower than normal, although you'll still often come across problems with new words that you don't understand.",
      whatToDo:
        "The main thing that you need to do as a B1 English learner is keep listening to comprehensible input videos at the B1 level. This should continue to be your top priority above all else. At this stage you can begin to speak if you wish. Of course, it will still feel difficult as you begin to speak for the first time. However, you may be surprised by how quickly you learn to speak English because you already have so much vocabulary in your head that you understand from listening to so much comprehensible input. When first starting to speak, you could consider booking a few lessons with a tutor as they will be patient with you as you start to speak for the first time. You've already done the hard part: acquiring 1500-2500 words in English. Now you just need to learn to use them. It is only now at the B1 level that you'll be able to handle basic real life situations such as going to the cafe, going to the supermarket, giving directions on the street etc, in English (After a good amount of speaking practise, of course) For those who wish to follow the Pure Method and for those who want extremely good pronunciation and natural sounding English, you should not start speaking, reading or writing just yet. You can also begin to read English at this stage if you wish. However, we do not recommend doing extensive reading until you reach the B2 level, as doing extensive reading at this stage will interfere with pronunciation. You can begin doing some writing if you choose to at this stage. You can study some grammar if you wish to, although we recommend watching EnglishSponge videos using the grammar filter to learn grammar in a natural way through comprehensible input instead of studying grammar rules and doing lots of grammar exercises. Above all, your main focus should still be listening to massive amounts of comprehensible input at this stage. At this level, you could also start using some children's cartoons as comprehensible input if you wish. (You may also want to return to A2 videos from time to time during this stage - listening to content that is below your current level can allow you to notice the finer details of the language)",
      whatYouLearn:
        "You will continue to build your vocabulary more and more as you continue watching comprehensible input videos. In order to reach the B2 level, you'll need to build a vocabulary of roughly 4000 words in English. You'll improve your understanding of the present perfect tense and the past simple tense at this level and you'll start to learn about some slightly more advanced grammar structures, such as the second and third conditionals, the past perfect and others. Surprisingly, \"function words\", such as him, her, about, from, to and with will often continue to be somewhat confusing for B1 learners. But as you keep listening to comprehensible input in English, these function words will gradually start to make more and more sense.",
      requirements: [
        "Discuss abstract topics and opinions",
        "Use all major grammar structures",
        "Command 3000+ vocabulary words",
        "Follow detailed presentations",
        "Write structured essays and reports",
      ],
      skills: "Abstract discussions, advanced grammar, extensive vocabulary",
    },
    "B1.5 Upper-Intermediate": {
      title: "B1.5 - Intermediate",
      timeRange: "400-600 hours",
      description:
        "Bridging the gap between intermediate and advanced English.",
      howItFeels:
        'Alright, now we\'re at the half-way point between the B1 Intermediate and B2 upper-intermediate levels. Your confidence and comfort with English will have built substantially by now. You still won\'t be 100% comfortable with English, but if somebody asks you: "Do you know English?" You begin to feel confident in saying "Yes, I know English". If you have decided to start speaking, you may now feel like you can handle most basic situations in English going to the cafe, going to the supermarket, giving directions on the street etc. At this stage, you\'ll be able to understand a patient native-English speaker who is speaking a little slower than normal.',
      whatToDo:
        "You will continue to build your vocabulary more and more as you continue watching comprehensible input videos. In order to reach the B2 level, you'll need to build a vocabulary of roughly 4000 words in English. Your main priority at this level should be to keep watching lots and lots of comprehensible input at the B1 level, until you can understand the B2 level videos on Englishsponge. As for speaking, you can continue taking speaking lessons with a teacher, speaking with language exchange partners as well as starting to use English in the real world if possible. Keep listening to comprehensible input videos as you build your speaking skills - you want your brain to be filled with English when you learn to speak. As for reading, you can continue doing some reading if you wish. However, we still do not recommend that you start doing extensive reading at this stage as too much reading right now can interfere with correct pronunciation. As for writing, feel free to do some writing at this stage if needs be. For those who wish to follow the Pure Method and for those who want extremely good pronunciation and natural sounding English, you should not start speaking, reading or writing just yet. At this stage, podcasts begin to be a useful tool to get more input while you're out and about. You could start listening to podcasts specifically made for intermediate learners at this stage. Children's cartoons as well as some Japanese animes could also become comprehensible to you at this stage. Above all, your main focus should still be listening to massive amounts of comprehensible input at this stage. (You may also want to return to A2 videos from time to time during this stage - listening to content that is below your current level can allow you to notice the finer details of the language)",
      whatYouLearn:
        "You'll continue working towards the roughly 4000 words in English you'll need to reach the B2 level. Through watching massive amounts of comprehensible input your vocabulary will increase over time. You'll begin to feel comfortable with some more advanced tenses like the past perfect or 2nd conditional tense. Surprisingly, \"function words\", such as him, her, about, from, to and with will often continue to be somewhat confusing for B1.5 learners. But as you keep listening to comprehensible input in English, these function words will gradually start to make more and more sense.",
      requirements: [
        "Handle complex conversations with confidence",
        "Understand most TV shows and movies",
        "Expand vocabulary to 5000+ words",
        "Use advanced grammar structures naturally",
        "Read intermediate-level texts fluently",
      ],
      skills:
        "Complex conversations, natural grammar usage, extensive vocabulary",
    },
    "B2 Upper-Intermediate": {
      title: "B2 - Upper-Intermediate",
      timeRange: "600-1000 hours",
      description: "Mastering advanced English for professional use.",
      howItFeels:
        "Congratulations! You've made it to the B2 upper-intermediate level! You are now a competent English learner. You will feel as though you can finally use the language for real. At this stage, you'll often be able to understand a native English speaker talking to you at nearly full speed. Although listening to conversations between 2 or more native English speakers will still be a challenge. Native speakers won't have to adapt their speech too much in order for you to understand. They'll be able to speak to you in a normal way for the most part. You'll feel very comfortable with regular situations in English, although trying to understand situations in the workplace, about politics, or science will still pose a challenge for you. Slang, as well as some phrasal verbs and idioms will still frequently confuse you. At this stage, you should be able to start making friends in the language and perhaps even romantic connections. It is possible to survive in an English speaking, professional workplace at this level although at the B2 level you'll likely come across language barriers that can affect your ability to work or communicate with your colleagues.",
      whatToDo:
        "First and foremost, you need to keep listening to massive amounts of comprehensible input at the B2 level, especially at the early stages. Our EnglishSponge B2 videos are designed to help you bridge the gap from content made for learners and normal English content made for native speakers. In the early stages of the B2 level, we recommend you continue to watch comprehensible input videos here on Englishsponge. After a certain amount of time, our B2 videos will become too easy for you, and you'll be able to move onto watching content made for native speakers. As a B2 learner, lots of native media will start to feel comprehensible to you. We recommend watching TV Series with episodes 20 minutes in length - you should be able to easily focus on and complete one 20-minute episode at a time. If you're following the Pure Method now would be a good time to finally start speaking, reading and writing. Although you could hold off until you can understand native content first if you're aiming for excellent, near-perfect pronunciation and extremely natural sounding English. At the B2 level, you should start speaking at every chance you get and trying to speak English as much as you can - all the while, continuing to watch massive amounts of comprehensible input in English. As usual, you want your brain to already be filled with English as you practise speaking. At the B2 level, here is where you can start doing extensive reading. Doing extensive reading before this level can have a negative impact on your English pronunciation, but now that you've learned a huge amount of vocabulary through listening (and hearing the correct pronunciation), it's a good time to start reading a lot. Keep in mind that English is not a phonetic language so the way words are spelt and the way they are pronounced are not the same If you come across a new word while reading, we recommend that you also try to listen to the pronunciation, as failing to do so can lead to you trying to guess the pronunciation for yourself and getting it wrong. Reading is also a form of comprehensible input - so you should try to read things where you already understand a minimum of 80% of what you're reading already, with a maximum of 20% extra new words that you can learn. Overall, you need to continue listening to massive amounts of comprehensible input - starting with our B2 level EnglishSponge videos and eventually moving onto native level content. At the same time, you can start to really focus on all other areas of English: Speaking, reading and writing. Moving to an English-speaking country at this level would be an excellent way to help boost your English to the next stage. (You may also want to return to B1 videos from time to time during this stage - listening to content that is below your current level can allow you to notice the finer details of the language)",
      whatYouLearn:
        "You'll continue working towards the roughly 8000 words in English you'll need to reach the C1 level. You'll learn this through continuing to watch EnglishSponge comprehensible input as well as native media like TV series. You can also learn more words at this stage through extensive reading, without it having too negative an impact on your pronunciation. You'll start to become confident with more advanced grammar structures such as the 3rd conditional and the future perfect. You'll also start to become more confident with both phrasal verbs and idioms, although you'll still come across lots of new ones you've never heard of before. Surprisingly, some function words like prepositions (about, to, from, for, with etc.) as well as articles (the, a,an) will STILL frequently trip you up. This is completely normal, so don't worry if you still make mistakes with these words.",
      requirements: [
        "Engage in complex debates and negotiations",
        "Use sophisticated grammar naturally",
        "Master 5000+ vocabulary words",
        "Understand native-speed conversations",
        "Write professional documents",
      ],
      skills:
        "Complex communication, natural grammar usage, professional vocabulary",
    },
    "C1 Advanced": {
      title: "C1 - Advanced",
      timeRange: "1000+ hours",
      description: "Achieving near-native proficiency in English.",
      howItFeels:
        "Amazing! You have reached a level that most English learners will never reach. This is a fantastic achievement and it probably took a lot of practice. Great job! You are now able to understand all kinds of native media: movies, TV shows, the news, Youtube videos and so on. Of course, you will still occasionally come across vocabulary that you don't understand, but for the most part you can generally understand what's going on in most forms of native media. You will still have issues with media that has culturally specific references, region-specific slang or unusual accents you're not familiar with. You are conversationally fluent and can handle all situations that come your way in English. You may sometimes struggle to find the right words in my complex situations, but one way or another you always find a way to get your point across. You often speak without the language being a barrier whatsoever, being able to focus your full attention on expressing yourself without worrying about the language itself very much. You should now be able to comfortably get by in an English-speaking workplace environment without language being a significant barrier in order for you to complete your work. At this level, you should now be proficient in using a wide range of phrasal verbs and idioms, although you'll still frequently come across new ones you haven't heard before.",
      whatToDo:
        "Continue listening to massive amounts of comprehensible input through both listening and reading. EnglishSponge B2 level videos will be too easy for you at this stage. However, there can be a lot of benefit of sometimes listening to content that's below your level, as it allows you to focus more on the finer details of the language because our mind doesn't have to work at all to understand the content. EnglishSponge videos can also continue to be helpful if you wish to practise listening to other accents that you're not familiar with. Use the accents filter and choose to watch only content containing the accent you wish to practise. Speak at every opportunity you can get and try to use English in the real world as much as you possibly can. Consider trying to write some more challenging things such as essays, articles and stories. If you want to reach the C2 upper-advanced level, it's possible that you may need to add in some focused study. A particular focus on learning unusual grammar structures, rare, topic specific vocabulary and perhaps business-specific vocabulary Bare in mind, the C2 level is very much an academic level that includes having the ability to use and understand vocabulary that even the average native English speaker doesn't know. Moving to an English speaking country at this stage would likely be the best way to boost your English level at this stage. If you have reached this stage using the comprehensible input method, your pronunciation should be very natural sounding. However, if you still feel as though you have pronunciation issues, you could consider shadowing exercises or taking targeted pronunciation classes.",
      whatYouLearn:
        "At this level, you'll continue to increase the range of phrasal verbs and idioms that you can use. You'll also learn more and more topic-specific vocabulary (Eg. vocabulary about marketing, sailing, football etc.). You'll start to get more comfortable with certain types of slang. You'll finally start to get to grips with a lot of the function words that have been tripping you up all this time. Knowing when to use a/an or the, and when not to. Knowing which prepositions to use with each verb, adjective or noun. You'll also start noticing some of the finer parts of pronunciation. You may start to notice certain vowel sounds that you've been mispronouncing all this time. For example, you may notice that you've been saying words like bone, sit and men incorrectly all this time - now you can finally start saying them correctly. Although if you have been following the comprehensible input method all the way from an A1 beginner, it's likely that you will have excellent pronunciation by now.",
      requirements: [
        "Engage in sophisticated academic discussions",
        "Understand complex texts and literature",
        "Master 8000+ vocabulary words",
        "Use language with near-native fluency",
        "Write professional and academic documents",
      ],
      skills:
        "Near-native fluency, sophisticated expression, cultural understanding",
    },
  };

  const getCurrentLevelIndex = () => {
    return levelOrder[currentLevel?.name] !== undefined
      ? levelOrder[currentLevel.name]
      : -1;
  };

  const isLevelUnlocked = (levelName) => {
    const currentLevelIndex = getCurrentLevelIndex();
    const itemLevelIndex = levelOrder[levelName];
    return itemLevelIndex <= currentLevelIndex;
  };

  const handleRowClick = (item) => {
    const levelDetail = getLevelDetails(item.name);
    setSelectedLevel(levelDetail);
    openModal("level", levelDetail);
  };

  const getIconForLevel = (levelName, isUnlocked) => {
    const iconProps = {
      width: "50px",
      height: "50px",
      style: isUnlocked ? {} : { filter: "grayscale(100%) opacity(0.5)" },
    };

    switch (levelName) {
      case "A0 Absolute Beginner":
        return <BadgeIcon {...iconProps} />;
      case "A1 Beginner":
        return <RibbonIcon {...iconProps} />;
      case "A2 Upper Beginner":
        return <CertificateIcon {...iconProps} />;
      case "B1 Intermediate":
        return <TimelineTrophy {...iconProps} />;
      case "B1.5 Upper-Intermediate":
        return <BalloonIcon {...iconProps} />;
      case "B2 Upper-Intermediate":
        return <CrownIcon {...iconProps} />;
      case "C1 Advanced":
        return <StarIcon {...iconProps} />;
      default:
        return <BadgeIcon {...iconProps} />;
    }
  };

  return (
    <>
      <div className="md:p-4 p-2">
        <div className="rounded-sm bg-white my-2 border border-gray-200">
          <h3 className="font-primary text-[18px] font-semibold p-4">
            {t("timeline.titleStandalone")}
          </h3>
          <p className="text-text-secondary px-4 pb-4 text-[14px]">
            {t("timeline.description")}
          </p>
          <hr className="border-[#A5A5A5]" />

          {data &&
            data.map((item, index) => {
              const isUnlocked = isLevelUnlocked(item.name);

              return (
                <div
                  className={`cursor-pointer hover:bg-gray-100 transition-colors duration-200 py-6 px-4 ${
                    index !== data.length - 1 ? "border-b border-[#E5E7EB]" : ""
                  }`}
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                >
                  <div className="flex flex-row w-full items-center">
                    <div className="w-[70px] h-[70px] rounded-md flex items-center justify-center shrink-0">
                      <div className="w-[70px] h-[60px] flex items-center justify-center">
                        {getIconForLevel(item.name, isUnlocked)}
                      </div>
                    </div>
                    <div className="flex flex-col w-full px-6 justify-center">
                      <h2
                        className={`text-[16px] font-semibold leading-tight ${
                          !isUnlocked ? "text-gray-400" : ""
                        }`}
                      >
                        {item.name}
                      </h2>
                      <div className="flex flex-row justify-between items-center w-full">
                        <p
                          className={`text-[14px] leading-relaxed ${
                            !isUnlocked
                              ? "text-gray-400"
                              : "text-text-secondary"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* LevelModal */}
      <LevelModalContainer selectedLevel={selectedLevel} />
    </>
  );
}
