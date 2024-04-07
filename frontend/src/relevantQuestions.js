const relevantQuestionsDict = {
  Medical: {
    Type: {
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
    Description: {
      question: "Can you describe the patient's condition?",
      options: [
        { text: "Conscious", emoji: "😀" },
        { text: "Unconscious", emoji: "😵" },
      ],
    },
  },
  Fire: {
    Type: {
      question:
        "Can you describe the type of fire you are facing? You may select one or provide textual details.",
      options: [
        { text: "Building", emoji: "🏢" },
        { text: "Forest", emoji: "🌲" },
        { text: "Vehicle", emoji: "🚗" },
        { text: "Trash", emoji: "🗑️" },
        { text: "Electrical", emoji: "⚡" },
        { text: "Chemical", emoji: "⚗️" },
      ],
    },
    Description: {
      question: "Are there people or pets inside the building?",
      options: [
        { text: "Yes", emoji: "👨‍👩‍👧‍👦" },
        { text: "No", emoji: "🚫" },
      ],
    },
  },
  Police: {
    Type: {
      question:
        "Can you describe the type of police incident you are facing? You may select one or provide textual details.",
      options: [
        { text: "Robbery", emoji: "💰" },
        { text: "Assault", emoji: "👊" },
        { text: "Theft", emoji: "🔐" },
        { text: "Vandalism", emoji: "🪟" },
        { text: "Domestic Violence", emoji: "👨‍👩‍👧‍👦" },
        { text: "Missing Person", emoji: "🚶‍♂️" },
        { text: "Suspicious Activity", emoji: "🕵️" },
        { text: "Traffic Incident", emoji: "🚗" },
      ],
    },
    Description: {
      question: "Can you describe the suspect?",
      options: null,
    },
  },
  Mental: {
    Type: {
      question:
        "Can you describe the type of mental health emergency you are facing? You may select one or provide textual details.",
      options: [
        { text: "Suicidal", emoji: "🔪" },
        { text: "Depressed", emoji: "😞" },
        { text: "Anxious", emoji: "😰" },
        { text: "Psychotic", emoji: "🤪" },
        { text: "Substance Abuse", emoji: "🍺" },
        { text: "Eating Disorder", emoji: "🍔" },
        { text: "Self-Harm", emoji: "🩹" },
        { text: "Bullying", emoji: "👊" },
      ],
    },
    Description: {
      question:
        "Is the person posing an immediate danger to themselves or others?",
      options: [
        { text: "Yes", emoji: "🔪" },
        { text: "No", emoji: "🚫" },
      ],
    },
  },
  Any: {
    Location: {
      question:
        "Please provide more details about your location. You may select an option or describe with text.",
      options: [
        { text: "Indoor", emoji: "🏠" },
        { text: "Outdoor", emoji: "🌳" },
        { text: "Moving", emoji: "🚗" },
      ],
    },
    Repeat: {
      question:
        "Please provide us with any other details you think will be helpful to authorities.",
      options: null,
    },
  },
};

export default relevantQuestionsDict;
