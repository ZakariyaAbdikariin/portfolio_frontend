import React, { useEffect, useState, useMemo } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { fetchProfileById, UserProfile } from "../api/profileApi";
import ZakImg from "../assets/Zak.jpg";
import { Globe, Mail, Phone, Calendar, Briefcase, LucideIcon } from "lucide-react";

interface ProfileProps {
  id: number;
}

/* ---------------- Flip Card ---------------- */

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

  const toggleFlip = () => setFlipped((prev) => !prev);

  return (
    <div
      className="relative w-full h-[220px] perspective-1000 cursor-pointer shadow-hover"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={toggleFlip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") toggleFlip();
      }}
    >
      <animated.div
        className="relative w-full h-full preserve-3d"
        style={{ transform: rotation.to((r) => `rotateY(${r}deg)`) }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 p-6 rounded-2xl flex flex-col items-center justify-center text-center
          bg-white/5 backdrop-blur-lg border ${borderGlow} backface-hidden`}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 p-6 rounded-2xl flex items-center justify-center text-center
          bg-white/5 backdrop-blur-lg border ${borderGlow} backface-hidden`}
          style={{ transform: "rotateY(360deg)" }}
        >
          <div style={{ transform: "rotateY(360deg)" }}>
            {back || front}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

/* ---------------- Floating Icons ---------------- */

interface FloatingIconProps {
  Icon: LucideIcon;
  top: string;
  left: string;
  color?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, top, left, color }) => {
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

/* ---------------- Profile Component ---------------- */

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const nameColor = useSpring({
    loop: true,
    to: [
      { color: "#06b6d4" },
      { color: "#84cc16" },
      { color: "#f97316" },
    ],
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
        console.error(err);
        setError("Failed to load profile");
      }
    };

    loadProfile();
  }, [id]);

  const parse = (str?: string) =>
    str?.split(",").map((s) => s.trim()).filter(Boolean) || [];

  const languages = useMemo(() => parse(profile?.languages), [profile?.languages]);
  const skills = useMemo(() => parse(profile?.skills), [profile?.skills]);
  const referees = useMemo(() => parse(profile?.referees), [profile?.referees]);

  if (error) {
    return <p className="text-red-400 text-center mt-20">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center mt-20 text-white text-xl">Loading...</p>;
  }

  return (
    <section className="min-h-screen relative flex flex-col items-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">

      {/* Floating Icons */}

      <FloatingIcon Icon={Globe} top="5%" left="5%" color="text-cyan-400" />
      <FloatingIcon Icon={Mail} top="10%" left="90%" color="text-orange-400" />
      <FloatingIcon Icon={Phone} top="60%" left="10%" color="text-lime-400" />
      <FloatingIcon Icon={Calendar} top="75%" left="85%" color="text-cyan-300" />
      <FloatingIcon Icon={Briefcase} top="90%" left="20%" color="text-orange-400" />

      {/* Header */}

      <div className="flex flex-col items-center mb-12">

        <animated.div
          style={photoAnim}
          className="w-48 h-48 rounded-full border-4 border-cyan-500
          shadow-[0_0_25px_rgba(34,211,238,0.7)]
          overflow-hidden flex items-center justify-center mb-6"
        >
          <img
            src={profile.avatar || ZakImg}
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

        <FlipCard
          borderGlow="border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          front={
            <>
              <h2 className="text-cyan-300 text-xl font-bold mb-3">Personal Info</h2>
              <p>Location: {profile.location}</p>
              <p>Email: {profile.email}</p>
              <p>Phone: {profile.phone}</p>
            </>
          }
        />

        <FlipCard
          borderGlow="border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
          front={
            <>
              <h2 className="text-orange-300 text-xl font-bold mb-3">Professional Info</h2>
              <p>Availability: {profile.availability}</p>
              <p>Salary: ${profile.expectedSalary}</p>
              <p>Notice: {profile.noticePeriod}</p>
            </>
          }
        />

        <FlipCard
          borderGlow="border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          front={
            <>
              <h2 className="text-cyan-300 text-xl font-bold mb-3">Languages</h2>
              {languages.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </>
          }
        />

        <FlipCard
          borderGlow="border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
          front={
            <>
              <h2 className="text-orange-300 text-xl font-bold mb-3">Skills</h2>
              {skills.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </>
          }
        />

        <div className="md:col-span-2">
          <FlipCard
            borderGlow="border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.6)]"
            front={
              <>
                <h2 className="text-lime-300 text-xl font-bold mb-3">Referees</h2>
                {referees.map((r) => (
                  <p key={r}>{r}</p>
                ))}
              </>
            }
          />
        </div>

      </div>
    </section>
  );
};

export default Profile;