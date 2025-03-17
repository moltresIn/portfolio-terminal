/* eslint-disable no-useless-escape */
import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiDocker,
  SiGit,
  SiAmazon,
  SiVercel,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiGoogle,
} from "react-icons/si";
import { Mail, Phone } from "lucide-react";

import { FaLinkedin, FaGithub } from "react-icons/fa"; // Importing icons
import { BsTwitterX } from "react-icons/bs";
// Developer data
const developerData = {
  name: "Kishor Arjunan",
  about:
    "Hello! 👋 I'm Kishor Arjunan, a full-stack developer with a passion for turning imaginative ideas into reality. I specialize in harnessing the latest web technologies and cloud solutions to craft scalable digital experiences that leave a lasting impact. When I'm not geeking out over the latest tech trends, I'm on a mission to build solutions that make the world a better place. Let's join forces and create something truly remarkable! ✨",
  skills: {
    "Programming Languages": ["JavaScript", "TypeScript", "Python"],
    "Frameworks & Libraries": [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Express.js",
    ],
    "Tools & Platforms": ["Docker", "Git", "AWS", "Vercel", "GCP"],
    Databases: ["MySQL", "MongoDB", "Firebase"],
  },
  // projects: [
  //   {
  //     name: "DevConnect",
  //     description: "A networking platform for developers.",
  //     link: "https://github.com/alexdoe/devconnect",
  //   },
  //   {
  //     name: "Taskly",
  //     description: "A minimalist task management app.",
  //     link: "https://taskly.app",
  //   },
  //   {
  //     name: "CodeSnaps",
  //     description: "A gallery of code snippets for developers.",
  //     link: "https://codesnaps.dev",
  //   },
  // ],
  experience: [
    {
      title: "Full Stack Developer",
      company: "Skypler",
      period: "2024-Present",
      description: "Developed and optimized scalable microservices.",
    },
    {
      title: "Full-Stack Developer",
      company: "Freelance",
      period: "2023-2024",
      description: "Delivered Website and apps.",
    },
  ],
  contact: {
    email: "akishor2001@gmail.com",
    phone: "+91 63806 22917",
  },

  socials: {
    twitter: "https://x.com/Kishor019",
    linkedin: "https://linkedin.com/in/kishor-arjunan",
    github: "https://github.com/moltresIn",
  },
};

// Type definitions
type CommandFunction = (args: string[]) => React.ReactNode;
type CommandsObject = Record<string, CommandFunction>;

// Command implementations
export const commands: CommandsObject = {
  help: () => (
    <div>
      <p className="font-bold text-terminal-green mb-2">
        Welcome to {developerData.name}'s Portfolio Terminal!
      </p>
      <p className="mb-2">Type a command below to explore.</p>

      <p className="font-bold mt-4 mb-2">Available Commands:</p>
      <ul className="pl-4">
        <li>
          <span className="text-terminal-amber">about</span> - Learn about{" "}
          {developerData.name}.
        </li>
        <li>
          <span className="text-terminal-amber">echo</span> - Play around.
        </li>
        <li>
          <span className="text-terminal-amber">skills</span> - View technical
          skills.
        </li>
        {/* <li>
          <span className="text-terminal-amber">projects</span> - Explore
          completed projects.
        </li> */}
        <li>
          <span className="text-terminal-amber">experience</span> - Check
          professional experience.
        </li>
        <li>
          <span className="text-terminal-amber">contact</span> - Get in touch.
        </li>

        <li>
          <span className="text-terminal-amber">socials</span> - Find social
          media links.
        </li>
        <li>
          <span className="text-terminal-amber">clear</span> - Clear the
          terminal screen.
        </li>
      </ul>

      <p className="mt-4 italic text-terminal-light-gray">
        Tip: Use Arrow Up/Down to navigate command history and Tab for command
        completion.
      </p>
    </div>
  ),

  about: () => (
    <div>
      <p className="mb-4">{developerData.about}</p>
    </div>
  ),

  skills: () => {
    const skillIcons = {
      JavaScript: <SiJavascript className="inline-block text-yellow-500" />,
      TypeScript: <SiTypescript className="inline-block text-blue-500" />,
      Python: <SiPython className="inline-block text-blue-400" />,
      React: <SiReact className="inline-block text-cyan-500" />,
      "Next.js": <SiNextdotjs className="inline-block text-black" />,
      "Tailwind CSS": <SiTailwindcss className="inline-block text-teal-400" />,
      "Express.js": <SiExpress className="inline-block text-gray-500" />,
      Docker: <SiDocker className="inline-block text-blue-600" />,
      Git: <SiGit className="inline-block text-orange-500" />,
      AWS: <SiAmazon className="inline-block text-yellow-600" />,
      GCP: <SiGoogle className="inline-block text-yellow-600" />,
      Vercel: <SiVercel className="inline-block text-black" />,
      MySQL: <SiMysql className="inline-block text-blue-700" />,
      MongoDB: <SiMongodb className="inline-block text-green-500" />,
      Firebase: <SiFirebase className="inline-block text-yellow-400" />,
    };

    return (
      <div>
        {Object.entries(developerData.skills).map(([category, skillList]) => (
          <div key={category} className="mb-4">
            <span className="text-terminal-green font-bold">{category}:</span>
            <div className="ml-4 mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skillList.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  {skillIcons[skill] || null}
                  <span className="text-terminal-light-gray">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },

  echo: (args: string[]) => {
    if (args.length === 0) {
      return (
        <div>
          <p></p>
        </div>
      );
    }

    const message = args.join(" ");

    try {
      const mathRegex = /^[\d\s\+\-\*\/\(\)\.]+$/;

      if (mathRegex.test(message)) {
        const result = Function('"use strict"; return (' + message + ")")();
        return (
          <div>
            <p>{result}</p>
          </div>
        );
      }
    } catch (e) {
      <div>
        <p>{message}</p>
      </div>;
    }

    return (
      <div>
        <p>{message}</p>
      </div>
    );
  },

  // projects: () => (
  //   <div>
  //     {developerData.projects.map((project, index) => (
  //       <div key={index} className="mb-3">
  //         <p>
  //           <span className="text-terminal-green font-bold">
  //             {index + 1}. {project.name}:
  //           </span>{" "}
  //           {project.description}
  //         </p>
  //         <p>
  //           Link:{" "}
  //           <a
  //             href={project.link}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className="terminal-link"
  //           >
  //             {project.link}
  //           </a>
  //         </p>
  //       </div>
  //     ))}
  //   </div>
  // ),

  experience: () => (
    <div>
      {developerData.experience.map((exp, index) => (
        <div key={index} className="mb-3">
          <p>
            <span className="text-terminal-green font-bold">
              {index + 1}. {exp.title}, {exp.company} ({exp.period})
            </span>
          </p>
          <p className="pl-3">- {exp.description}</p>
        </div>
      ))}
    </div>
  ),

  contact: () => (
    <div>
      <p>
        <span className="text-terminal-green">
          <Mail className="inline w-5 h-5 mr-2" />
        </span>
        <a
          href={`mailto:${developerData.contact.email}`}
          className="terminal-link"
        >
          {developerData.contact.email}
        </a>
      </p>
      <p>
        <span className="text-terminal-green">
          <Phone className="inline w-5 h-5 mr-2" />
        </span>
        <a
          href={developerData.contact.phone}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link"
        >
          {developerData.contact.phone}
        </a>
      </p>
    </div>
  ),

  socials: () => (
    <div>
      <p className="flex items-center">
        <BsTwitterX className="text-terminal-green mr-2" />
        <a
          href={developerData.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link ml-2"
        >
          {developerData.socials.twitter}
        </a>
      </p>
      <p className="flex items-center mt-2">
        <FaLinkedin className="text-terminal-green mr-2" />
        <a
          href={developerData.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link ml-2"
        >
          {developerData.socials.linkedin}
        </a>
      </p>
      <p className="flex items-center mt-2">
        <FaGithub className="text-terminal-green mr-2" />
        <a
          href={developerData.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="terminal-link ml-2"
        >
          {developerData.socials.github}
        </a>
      </p>
    </div>
  ),

  clear: () => {
    window.location.reload();
    return <div></div>;
  },
};
