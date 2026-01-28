import ChevronDown from "../../../assets/ChevronDown.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MethodArticle() {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { t } = useTranslation("about");

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="p-4">
      <div className="" id="problem">
        <h1 className="text-[41px] font-fun font-semibold mb-4">
          <span className="border-b-4 border-b-orange-accent pb-1">
            {t("sections.theProblem")}
          </span>
        </h1>
        <h3 className="pb-4 text-[18px] font-heading font-bold">
          {t("theProblem.subtitle")}
        </h3>

        <p className="pb-4 text-[18px] font-primary">
          {t("theProblem.paragraph1")}
        </p>

        <h3 className="pb-4 text-[18px] font-heading font-bold">
          {t("theProblem.subtitle2")}
        </h3>

        <p className="pb-4 text-[18px] font-primary">
          {t("theProblem.paragraph2")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("theProblem.paragraph3")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("theProblem.paragraph4")}
        </p>

        <div className="border-l-4 pl-4 border-l-orange-accent flex items-center py-4 mb-4">
          <p className="pb-4 text-[18px] font-primary font-light">
            <em>{t("theProblem.response")}</em>
          </p>
        </div>

        <p className="pb-4 text-[18px] font-primary">
          {t("theProblem.paragraph5")}
        </p>
      </div>
      <img
        src="/boredBook.jpg"
        className="w-[100%] h-[500px] object-cover my-5 mx-auto" // Adjust width to 50% and center the image
        alt="A bored student with a book"
      />
      <div id="methods-fail" className="my-7">
        <h1 className="text-[32px] font-semibold pb-4">
          <span className="border-b-4 border-b-orange-accent pb-1">
            {t("sections.whyTraditionalMethodsFail")}
          </span>
        </h1>

        <div className="flex">
          <div className="flex-1">
            <h3 className="pb-4 text-[18px] font-heading font-bold">
              {t("whyTraditionalMethodsFail.subtitle")}
            </h3>
            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph1")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph2")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph3")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph4")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph5")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph6")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph7")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph8")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph9")}
            </p>

            <p className="pb-4 text-[18px] font-primary">
              {t("whyTraditionalMethodsFail.paragraph10")}
            </p>
          </div>
        </div>
      </div>

      <div
        id="how-to-watch"
        className="relative bg-[url('/books.jpg')] bg-cover bg-center p-10"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-[32px] font-semibold pb-4 text-white text-center">
            <span className="border-b-4 border-b-orange-accent pb-1">
              {t("sections.whatMakesComprehensibleInputDifferent")}
            </span>
          </h1>
          <h3 className="pb-4 text-[18px] font-heading font-bold text-white text-center">
            {t("comprehensibleInputDifferent.subtitle")}
          </h3>
        </div>
      </div>

      <div id="benefits" className="my-10">
        <h1 className="text-[32px] font-semibold pb-4">
          <span className="border-b-4 border-b-orange-accent pb-1">
            {t("sections.benefitsOfComprehensibleInput")}
          </span>
        </h1>
        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph1")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph2")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph3")}
        </p>

        <div className="border-l-4 pl-4 border-l-orange-accent flex items-center py-4 mb-4">
          <p className="pb-4 text-[18px] font-primary font-light italic">
            <strong>{t("benefitsOfComprehensibleInput.importantNote")}</strong>
          </p>
        </div>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph4")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph5")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph6")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph7")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph8")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph9")}
        </p>

        <ul className="pb-8 text-[18px] font-roboto list-disc pl-8 space-y-2">
          {t("benefitsOfComprehensibleInput.dontNeedList", {
            returnObjects: true,
          }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph10")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph11")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph12")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph13")}
        </p>

        <p className="pb-4 text-[18px] font-primary">
          {t("benefitsOfComprehensibleInput.paragraph14")}
        </p>
      </div>

      <div
        id="how-to-watch"
        className="relative bg-[url('/watch.jpg')] bg-cover bg-center p-10"
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-[32px] font-semibold pb-4 text-white text-center">
            <span className="border-b-4 border-b-orange-accent pb-1">
              {t("sections.howToWatchOurVideos")}
            </span>
          </h1>
          <h3 className="pb-4 text-[18px] font-heading font-bold text-white text-center">
            {t("howToWatchVideos.subtitle")}
          </h3>
        </div>
      </div>

      <div id="pay-attention" className="my-10">
        <h1 className="text-[32px] font-semibold pb-4">
          <span className="border-b-4 border-b-orange-accent pb-1">
            {t("sections.payAttention")}
          </span>
        </h1>
        <p className="pb-4 text-[18px] font-primary">
          {t("payAttention.paragraph1")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("payAttention.paragraph2")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("payAttention.paragraph3")}
        </p>
      </div>

      <div id="do-dont" className="mb-10">
        <h1 className="text-[32px] font-semibold pb-4">
          <span className="border-b-4 border-b-orange-accent pb-1">
            {t("sections.dosAndDonts")}
          </span>
        </h1>
        <p className="pb-4 text-[18px] font-primary">
          {t("dosAndDonts.paragraph1")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("dosAndDonts.paragraph2")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("dosAndDonts.paragraph3")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("dosAndDonts.paragraph4")}
        </p>
        <p className="pb-4 text-[18px] font-primary">
          {t("dosAndDonts.paragraph5")}
        </p>
      </div>

      <div>
        {/* Frequently Asked Questions Section */}
        <div
          id="how-to-watch"
          className="relative bg-[url('/question.jpg')] bg-cover bg-center p-10 mt-5 mb-5"
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-[32px] font-semibold pb-4 text-white text-center">
              <span className="border-b-4 border-b-orange-accent pb-1">
                {t("sections.frequentlyAskedQuestions")}
              </span>
            </h1>
            <h3 className="pb-4 text-[18px] font-heading font-bold text-white text-center">
              {t("faq.subtitle")}
            </h3>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {/* Accordion Item 1 */}
          <div className="border border-orange-accent rounded-md">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion("learnVocabulary")}
            >
              <h2 className="text-lg font-semibold">
                {t("faq.learnVocabulary.question")}
              </h2>
              <ChevronDown
                className={`w-4 h-4 transform ${
                  activeAccordion === "learnVocabulary" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeAccordion === "learnVocabulary" && (
              <div className="p-4">
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph1")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph2")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph3")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph4")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph5")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph6")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph7")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph8")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph9")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph10")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph11")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph12")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph13")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph14")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph15")}
                </p>
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.learnVocabulary.paragraph16")}
                </p>
              </div>
            )}
          </div>

          {/* Accordion Item 2 */}
          <div className="border border-orange-accent rounded-md">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion("pronunciationExample")}
            >
              <h2 className="text-lg font-semibold">
                {t("faq.pronunciation.question")}
              </h2>
              <ChevronDown
                className={`w-4 h-4 transform ${
                  activeAccordion === "pronunciationExample" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeAccordion === "pronunciationExample" && (
              <div className="p-4">
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph1")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph2")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph3")}
                </p>
                <ul className="list-disc pl-7 mb-4 ml-4 text-[18px] font-primary">
                  {t("faq.pronunciation.examples1", {
                    returnObjects: true,
                  }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph4")}
                </p>

                <ul className="list-disc pl-7 mb-4 ml-4 text-[18px] font-primary">
                  {t("faq.pronunciation.examples2", {
                    returnObjects: true,
                  }).map((item, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item }}
                    ></li>
                  ))}
                </ul>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph5")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph6")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.pronunciation.paragraph7")}
                </p>
              </div>
            )}
          </div>

          {/* Accordion Item 3 */}
          <div className="border border-orange-accent rounded-md">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion("grammar")}
            >
              <h2 className="text-lg font-semibold">
                {t("faq.grammar.question")}
              </h2>
              <ChevronDown
                className={`w-4 h-4 transform ${
                  activeAccordion === "grammar" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeAccordion === "grammar" && (
              <div className="p-4">
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph1")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph2")}
                </p>

                <p className="pb-4 text-[18px] font-roboto italic font-semibold">
                  {t("faq.grammar.exampleSentence")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph3")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph4")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph5")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph6")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph7")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph8")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph9")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph10")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph11")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph12")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph13")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph14")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph15")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.grammar.paragraph16")}
                </p>
              </div>
            )}
          </div>

          {/* Accordion Item 4 */}
          <div className="border border-orange-accent rounded-md">
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleAccordion("feedback")}
            >
              <h2 className="text-lg font-semibold">
                {t("faq.feedback.question")}
              </h2>
              <ChevronDown
                className={`w-4 h-4 transform ${
                  activeAccordion === "feedback" ? "rotate-180" : ""
                }`}
              />
            </div>
            {activeAccordion === "feedback" && (
              <div className="p-4">
                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph1")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph2")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph3")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph4")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph5")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph6")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph7")}
                </p>

                <p className="pb-4 text-[18px] font-primary">
                  {t("faq.feedback.paragraph8")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
