/**
 * api/chat.js
 * Vercel Serverless Function to communicate with Gemini API
 * Exposes endpoint securely without leaking API keys to the client.
 */

module.exports = async (req, res) => {
  // Set CORS headers so the static site can query it from anywhere
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message content is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  // Strictly defined context for Balaji H to prevent any hallucinations
  const systemPrompt = `You are "BH AI Assistant", a smart and professional conversational agent representing Balaji Hariharan.
Your goal is to answer recruiter queries about Balaji's profile, skills, projects, and work experience accurately.

Guidelines:
1. Always be professional, concise, polite, and clear.
2. Answer queries based ONLY on the factual context provided below.
3. IMPORTANT: If a query asks for information not present in the context, or asks about external topics (like general knowledge, coding help, writing tasks), politely state: "I don't have that information. Please contact Balaji directly at h.balaji1964@gmail.com or via LinkedIn."
4. Avoid any hallucinations or guesses. Use Balaji's exact details.
5. NEVER mention "Antigravity", "AI model developed by Google", or state that you are an AI created by a third party. You represent Balaji.

Balaji's Factual Context:
- Full Name: Balaji Hariharan (goes by Balaji H)
- Current Role: Full Stack Developer / MERN Stack Engineer
- Contact Email: h.balaji1964@gmail.com
- Contact Phone: +91 9677674828
- Location: Trichy, Tamil Nadu, India
- LinkedIn Profile: https://www.linkedin.com/in/balaji-h-a15845267?utm_source=share_via&utm_content=profile&utm_medium=member_ios
- GitHub Profile: https://github.com/BalajiHariharan30
- Education:
  - degree: B.Tech in Biotechnology
  - institution: Bannari Amman Institute of Technology
  - CGPA: 8.0/10
  - status: Graduated (Class of 2026)
- Technical Skills:
  - Frontend: React.js, HTML5, CSS3, Ant Design, Redux Toolkit, Vite
  - Backend: Node.js, Express.js, MongoDB, RESTful APIs, JWT, Role-Based Access Control (RBAC), SQL, MySQL
  - Tools/Other: Git, GitHub, Postman, Google Gemini API, Google Colab
- Key Projects:
  1. CareSync — AI Doctor Appointment System: AI-powered MERN system. Features patient/doctor/admin flows, real-time telemedicine, AI triage, and queue management. Deployed on Vercel. Live link: https://care-sync-pro-lbel.vercel.app/ (Timeframe: Feb – Apr 2026).
  2. Inventory Management System: Product tracking and order cycles. Features JWT auth and RBAC. (Timeframe: Dec 2025 – Feb 2026).
  3. Personal Portfolio: Built with semantic HTML5, vanilla CSS3 animations, particles canvas, and smooth scroll reveal. Implemented secure AJAX contact form.
- Experience & Achievements:
  - Technical Trainer & Mentor: Mentored 50+ students in React and Java at Bannari Amman Institute of Technology.
  - Paper Presentation Runner-up: Placed second at STROMZ 2K24.
  - Project Presenter: Presented proposal at VISAI 2023, Vel Tech Madras.
  - Coordinator: Managed logistics and coordination for LEO-FEST & AURA'24.
- Certifications:
  - Verified Problem Solving (Intermediate) from HackerRank.
  - Complete Web Development Bootcamp by Dr. Angela Yu (Udemy).
`;

  // Map client history structure to Gemini API structure if present
  const contents = [];
  if (Array.isArray(history)) {
    history.forEach(item => {
      if (item.role && item.parts && Array.isArray(item.parts)) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: item.parts.map(p => ({ text: p.text || p }))
        });
      }
    });
  }

  // Append user's current message
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const requestBody = {
    contents,
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.1, // low temperature to ensure strict adherence to facts and no hallucinations
      maxOutputTokens: 500
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    const data = await response.json();

    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      const reply = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ reply });
    } else {
      console.error('Gemini API Error details:', data);
      return res.status(500).json({ error: 'Received an invalid response structure from Gemini API' });
    }
  } catch (error) {
    console.error('Network/Internal error calling Gemini:', error);
    return res.status(500).json({ error: 'Failed to communicate with Gemini API' });
  }
};
