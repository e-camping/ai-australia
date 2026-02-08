export default function handler(request, response) {
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return response.status(200).json({ quote: randomQuote });
}