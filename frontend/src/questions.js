const questionsDict = {
  Address: {
    question:
      "You don't have location services enabled. What is the address of the emergency?",
    options: null,
    messagePrefix: "Address: ",
  },
  "Type of Incident": {
    question: "Is this a medical, fire, police, or mental emergency?",
    options: [
      { text: "Medical", emoji: "🚑" },
      { text: "Fire", emoji: "🔥" },
      { text: "Police", emoji: "🚨" },
      { text: "Mental", emoji: "🤕" },
    ],
    messagePrefix: "Nature of Emergency: ",
  },
  "Details of Incident": {
    question: "Could you provide more details about the incident?",
    options: null,
    messagePrefix: "Details: ",
  },
  "Weapon Involved": {
    question: "Is a weapon involved?",
    options: [
      { text: "Yes", emoji: "🔫" },
      { text: "No", emoji: "🚫" },
    ],
    messagePrefix: "Weapon Involved: ",
  },
};

export default questionsDict;
