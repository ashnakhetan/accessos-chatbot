const relevantQuestionsDict = {
  Medical: [
    {
      question:
        "Can you describe the type of medical issue you are facing? You may select one or provide textual details.",
      options: [
        { text: "Physically Unstable", emoji: "🧍‍♂️⬇️" },
        { text: "Breathing Problem", emoji: "🫁" },
        { text: "Traffic Accident", emoji: "🚗" },
        { text: "Chest Pain", emoji: "💔" },
        { text: "Social Services", emoji: "👨‍👩‍👧‍👦" },
        { text: "Bleeding", emoji: "🩸" },
        { text: "Assault", emoji: "👊" },
        { text: "Crime Active", emoji: "🔫" },
      ],
    },
  ],
  Fire: [],
  Police: [],
  Mental: [],
  Any: [
    {
      question:
        "Please provide more details about your location. You may select an option or describe with text.",
      options: [
        { text: "Indoor", emoji: "🏠" },
        { text: "Outdoor", emoji: "🌳" },
        { text: "Moving", emoji: "🚗" },
      ],
    },
  ],
};
