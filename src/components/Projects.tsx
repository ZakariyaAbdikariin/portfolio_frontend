import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import api from "../api/axios";

export interface Project {
  id: number;
  name: string;
  description: string;
  github?: string;
  liveDemo?: string;
  technologies?: string; // comma-separated
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fadeAnim = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 120, friction: 20 },
  });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/projects"); // backend endpoint
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      }
    };

    loadProjects();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!projects.length)
    return (
      <p className="text-center mt-10 text-gray-700">Loading projects...</p>
    );

  return (
    <animated.section
      id="projects"
      className="w-full bg-gray-100 py-20"
      style={fadeAnim}
    >
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Projects</h2>
        <p className="text-gray-700">Here are some of my projects...</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-700 mb-3">{project.description}</p>
            {project.technologies && (
              <p className="text-sm text-gray-500 mb-2">
                Tech: {project.technologies}
              </p>
            )}
            <div className="flex justify-center gap-4 mt-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </animated.section>
  );
};

export default Projects;
