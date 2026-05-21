const About = () => (
  <div className="max-w-2xl mx-auto prose">
    <h1>About DayBook</h1>
    <p>
      DayBook is a personal journaling app built with the MERN stack. It lets you
      log in, write, view, and manage your daily entries in a secure, distraction-free environment.
    </p>
    <h2>Tech Stack</h2>
    <ul>
      <li><strong>Frontend:</strong> React, Vite, TailwindCSS, DaisyUI, Redux Toolkit</li>
      <li><strong>Backend:</strong> Node.js, Express.js</li>
      <li><strong>Database:</strong> MongoDB with Mongoose</li>
      <li><strong>Auth:</strong> JWT in HTTP-only cookies</li>
    </ul>
  </div>
);
export default About;