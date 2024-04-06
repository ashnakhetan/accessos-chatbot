const questionsDict = {
  Address: {
    question: "What is the address of the emergency?",
    options: null,
  },
  "Type of Incident": {
    question: "Is this a medical, fire, police, or mental emergency?",
    options: [
      { text: "Medical", emoji: "🚑" },
      { text: "Fire", emoji: "🔥" },
      { text: "Police", emoji: "🚨" },
      { text: "Mental", emoji: "🤕" },
    ],
  },
  "Details of Incident": {
    question: "Could you provide more details about the incident?",
    options: null,
  },
  "Weapon Involved": {
    question: "Is a weapon involved?",
    options: [
      { text: "Yes", emoji: "🔫" },
      { text: "No", emoji: "🚫" },
    ],
  },
};

export default questionsDict;
