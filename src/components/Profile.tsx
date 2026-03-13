import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { fetchProfileById, UserProfile } from "../api/profileApi";
import ZakImg from "../assets/Zak.jpg";
import { Globe, Mail, Phone, Calendar, Briefcase } from "lucide-react";

interface ProfileProps {
  id: number;
}

interface FloatingIconProps {
  Icon: React.ComponentType<{ className?: string }>;
  top: string;
  left: string;
  color?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
  Icon,
  top,
  left,
  color,
}) => {
  const spring = useSpring({
    loop: { reverse: true },
    from: { transform: "translateY(0px) rotate(0deg)" },
    to: {
      transform: `translateY(${Math.random() * 25 + 10}px) rotate(${Math.random() * 20 - 10}deg)`,
    },
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <animated.div
      style={{ position: "absolute", top, left, ...spring }}
      className={`text-4xl opacity-80 ${color || "text-white"} drop-shadow-lg animate-bounce`}
    >
      <Icon className="inline" />
    </animated.div>
  );
};

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ------------------ Hooks (always called) ------------------
  const rainbowSpring = useSpring({
    loop: true,
    from: { color: "#00ffff" },
    to: async (next) => {
      while (1) {
        await next({ color: "#ff00ff" });
        await next({ color: "#00ff00" });
        await next({ color: "#00ffff" });
        await next({ color: "#ff9900" });
      }
    },
    config: config.molasses,
  });

  const pageSpring = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: config.slow,
  });

  const photoSpring = useSpring({
    loop: { reverse: true },
    from: { transform: "scale(1) rotate(0deg)" },
    to: { transform: "scale(1.05) rotate(3deg)" },
    config: { mass: 1, tension: 100, friction: 10 },
  });

  // ------------------ Load Profile ------------------
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileById(id);
        setProfile(data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl animate-pulse text-white">
        Loading...
      </p>
    );

  if (error)
    return <p className="text-center mt-20 text-xl text-red-500">{error}</p>;

  if (!profile)
    return (
      <p className="text-center mt-20 text-xl text-gray-300">
        Profile not found
      </p>
    );

  const renderArray = (str?: string) =>
    str
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) || [];

  const languages = renderArray(profile.languages);
  const skills = renderArray(profile.skills);
  const referees = renderArray(profile.referees);

  // ------------------ Render ------------------
  return (
    <animated.section
      style={pageSpring}
      className="min-h-screen relative flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
    >
      {/* Floating Neon Icons */}
      <FloatingIcon Icon={Globe} top="10%" left="15%" color="text-cyan-400" />
      <FloatingIcon Icon={Mail} top="25%" left="75%" color="text-pink-500" />
      <FloatingIcon Icon={Phone} top="50%" left="35%" color="text-lime-400" />
      <FloatingIcon
        Icon={Calendar}
        top="65%"
        left="55%"
        color="text-cyan-300"
      />
      <FloatingIcon
        Icon={Briefcase}
        top="80%"
        left="20%"
        color="text-pink-400"
      />

      {/* Profile Card */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        <animated.div
          style={photoSpring}
          className="relative w-48 h-48 mx-auto mb-6 rounded-full border-4 border-cyan-500 shadow-2xl"
        >
          <img
            src={profile.avatar || ZakImg}
            alt={profile.name}
            className="w-full h-full rounded-full object-cover"
          />
        </animated.div>

        {/* Animated Name */}
        <animated.h1
          style={rainbowSpring}
          className="text-5xl md:text-6xl font-extrabold mb-2 tracking-wide drop-shadow-lg"
        >
          {profile.name}
        </animated.h1>
        <p className="text-gray-300 text-lg mb-8">
          {profile.bio || "Programmer"}
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Personal Info Card */}
          <div className="bg-cyan-900/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform border border-cyan-500 hover:scale-105">
            <h2 className="text-white font-bold text-xl mb-3 bg-cyan-500/20 p-2 rounded text-center">
              Personal Info
            </h2>
            <p>
              <Globe className="inline mr-2 text-cyan-400" />
              <strong>Location:</strong> {profile.location}
            </p>
            <p>
              <Mail className="inline mr-2 text-pink-400" />
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <Phone className="inline mr-2 text-lime-400" />
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p>
              <Calendar className="inline mr-2 text-cyan-300" />
              <strong>DOB:</strong>{" "}
              {new Date(profile.dateOfBirth).toLocaleDateString()}
            </p>
          </div>

          {/* Professional Info Card */}
          <div className="bg-pink-900/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform border border-pink-500 hover:scale-105">
            <h2 className="text-white font-bold text-xl mb-3 bg-pink-500/20 p-2 rounded text-center">
              Professional Info
            </h2>
            <p>
              <Briefcase className="inline mr-2 text-cyan-400" />
              <strong>Availability:</strong> {profile.availability}
            </p>
            <p>
              <strong>Expected Salary:</strong> ${profile.expectedSalary}
            </p>
            <p>
              <strong>Notice Period:</strong> {profile.noticePeriod}
            </p>
          </div>

          {/* Languages Card */}
          <div className="bg-cyan-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform border border-cyan-400 hover:scale-105">
            <h2 className="text-white font-bold text-xl mb-3 bg-cyan-400/20 p-2 rounded text-center">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-cyan-500 text-gray-900 px-3 py-1 rounded-full text-sm shadow hover:scale-110 transition"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-pink-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform border border-pink-400 hover:scale-105">
            <h2 className="text-white font-bold text-xl mb-3 bg-pink-400/20 p-2 rounded text-center">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-pink-500 text-gray-900 px-3 py-1 rounded-full text-sm shadow hover:scale-110 transition"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Referees Card */}
          <div className="md:col-span-2 bg-lime-900/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-transform border border-lime-400 hover:scale-105">
            <h2 className="text-white font-bold text-xl mb-3 bg-lime-400/20 p-2 rounded text-center">
              Referees
            </h2>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              {referees.map((ref) => (
                <div
                  key={ref}
                  className="bg-lime-700 p-3 rounded-lg shadow hover:shadow-2xl transition"
                >
                  <p className="font-medium text-white">{ref}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </animated.section>
  );
};

export default Profile;
