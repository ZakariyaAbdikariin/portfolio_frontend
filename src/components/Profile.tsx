//src/components/Profiles.tsx

import React, { useEffect, useState, useMemo } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { fetchProfileById, UserProfile } from "../api/profileApi";
import ZakImg from "../assets/Zak.jpg";
import {
  Globe,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  LucideIcon,
} from "lucide-react";

interface ProfileProps {
  id: number;
}

interface FlipCardProps {
  front: React.ReactNode;
  back?: React.ReactNode;
  borderGlow: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, borderGlow }) => {
  const [flipped, setFlipped] = useState(false);

  const { rotation } = useSpring({
    rotation: flipped ? 360 : 0,
    config: config.stiff,
  });

  return (
    <div
      className="relative w-full h-[220px] perspective-1000 cursor-pointer shadow-hover"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setFlipped(!flipped);
      }}
    >
      <animated.div
        className="relative w-full h-full preserve-3d"
        style={{ transform: rotation.to((r) => `rotateY(${r}deg)`) }}
      >
        <div
          className={`absolute inset-0 p-6 rounded-2xl flex flex-col items-center justify-center text-center
          bg-white/5 backdrop-blur-lg border ${borderGlow} backface-hidden`}
        >
          {front}
        </div>

        <div
          className={`absolute inset-0 p-6 rounded-2xl flex items-center justify-center text-center
          bg-white/5 backdrop-blur-lg border ${borderGlow} backface-hidden`}
          style={{ transform: "rotateY(360deg)" }}
        >
          <div style={{ transform: "rotateY(360deg)" }}>{back || front}</div>
        </div>
      </animated.div>
    </div>
  );
};

interface FloatingIconProps {
  Icon: LucideIcon;
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
  const offset = useMemo(() => Math.random() * 20 + 10, []);
  const spring = useSpring({
    loop: { reverse: true },
    from: { transform: "translateY(0px)" },
    to: { transform: `translateY(${offset}px)` },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div
      style={{ position: "absolute", top, left, ...spring, zIndex: 10 }}
      className={`text-4xl opacity-80 ${color || "text-white"} drop-shadow-lg`}
    >
      <Icon />
    </animated.div>
  );
};

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nameColor = useSpring({
    loop: true,
    to: [{ color: "#06b6d4" }, { color: "#84cc16" }, { color: "#f97316" }],
  });

  const photoAnim = useSpring({
    loop: { reverse: true },
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.05)" },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileById(id);
        setProfile(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError("Failed to load profile");
      }
    };
    loadProfile();
  }, [id]);

  const parse = (str?: string) =>
    str
      ?.split(/,|and/) // splits on comma OR "and"
      .map((s) => s.trim())
      .filter(Boolean) || [];

  const languages = useMemo(
    () => parse(profile?.languages),
    [profile?.languages],
  );
  const skills = useMemo(() => parse(profile?.skills), [profile?.skills]);
  const referees = useMemo(() => parse(profile?.referees), [profile?.referees]);

  if (error) return <p className="text-red-400 text-center mt-20">{error}</p>;
  if (!profile)
    return <p className="text-center mt-20 text-white text-xl">Loading...</p>;

  const chipStyle = "px-3 py-1 rounded-full text-sm shadow-sm";

  return (
    <section className="min-h-screen relative flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {/* Floating icons */}
      <FloatingIcon Icon={Globe} top="5%" left="5%" color="text-cyan-400" />
      <FloatingIcon Icon={Mail} top="10%" left="90%" color="text-orange-400" />
      <FloatingIcon Icon={Phone} top="60%" left="10%" color="text-lime-400" />
      <FloatingIcon
        Icon={Calendar}
        top="75%"
        left="85%"
        color="text-cyan-300"
      />
      <FloatingIcon
        Icon={Briefcase}
        top="90%"
        left="20%"
        color="text-orange-400"
      />

      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <animated.div
          style={photoAnim}
          className="w-48 h-48 rounded-full border-4 border-cyan-500 shadow-[0_0_25px_rgba(34,211,238,0.7)] overflow-hidden flex items-center justify-center mb-6"
        >
          <img
            src={ZakImg}
            alt={profile.name}
            className="w-4/5 h-4/5 object-contain"
          />
        </animated.div>

        <animated.h1 style={nameColor} className="text-6xl font-extrabold">
          {profile.name}
        </animated.h1>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* Personal Info */}
        <FlipCard
          borderGlow="border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          front={
            <>
              <h2 className="text-cyan-300 text-xl font-bold mb-3">
                Personal Info
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className={`${chipStyle} bg-gray-700 text-cyan-300`}>
                  Location: {profile.location}
                </span>
                <span className={`${chipStyle} bg-gray-700 text-cyan-300`}>
                  Email: {profile.email}
                </span>
                <span className={`${chipStyle} bg-gray-700 text-cyan-300`}>
                  Phone: {profile.phone}
                </span>
              </div>
            </>
          }
        />

        {/* Professional Info */}
        <FlipCard
          borderGlow="border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
          front={
            <>
              <h2 className="text-orange-300 text-xl font-bold mb-3">
                Professional Info
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className={`${chipStyle} bg-gray-700 text-orange-300`}>
                  Availability: {profile.availability}
                </span>
                <span className={`${chipStyle} bg-gray-700 text-orange-300`}>
                  Salary: ${profile.expectedSalary}
                </span>
                <span className={`${chipStyle} bg-gray-700 text-orange-300`}>
                  Notice: {profile.noticePeriod}
                </span>
              </div>
            </>
          }
        />

        {/* Languages */}
        <FlipCard
          borderGlow="border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          front={
            <>
              <h2 className="text-cyan-300 text-xl font-bold mb-3">
                Languages
              </h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <span
                    key={l}
                    className={`${chipStyle} bg-gray-700 text-cyan-300`}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </>
          }
        />

        {/* Skills */}
        <FlipCard
          borderGlow="border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
          front={
            <>
              <h2 className="text-orange-300 text-xl font-bold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className={`${chipStyle} bg-gray-700 text-orange-300`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </>
          }
        />

        {/* Referees */}
        <div className="md:col-span-2">
          <FlipCard
            borderGlow="border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.6)]"
            front={
              <>
                <h2 className="text-lime-300 text-xl font-bold mb-3">
                  Referees
                </h2>
                <div className="flex flex-wrap gap-2">
                  {referees.map((r) => (
                    <span
                      key={r}
                      className={`${chipStyle} bg-gray-700 text-lime-300`}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;