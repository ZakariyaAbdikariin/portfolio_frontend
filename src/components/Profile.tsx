import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
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
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, top, left }) => {
  const spring = useSpring({
    loop: { reverse: true },
    from: { transform: "translateY(0px)" },
    to: { transform: `translateY(${Math.random() * 20 + 10}px)` },
    config: { mass: 1, tension: 120, friction: 14 },
  });

  return (
    <animated.div
      style={{ position: "absolute", top, left, ...spring }}
      className="text-white text-3xl opacity-80"
    >
      <Icon className="inline" />
    </animated.div>
  );
};

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden p-6">
      {/* Floating Icons */}
      <FloatingIcon Icon={Globe} top="10%" left="15%" />
      <FloatingIcon Icon={Mail} top="25%" left="75%" />
      <FloatingIcon Icon={Phone} top="50%" left="35%" />
      <FloatingIcon Icon={Calendar} top="65%" left="55%" />
      <FloatingIcon Icon={Briefcase} top="80%" left="20%" />

      {/* Profile Card */}
      <div className="bg-gray-900/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-3xl w-full text-center relative z-10 border-2 border-gray-700">
        <img
          src={profile.avatar || ZakImg}
          alt={profile.name}
          className="w-44 h-44 mx-auto rounded-full border-4 border-gray-600 shadow-xl object-cover mb-6"
        />
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
          {profile.name}
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          {profile.bio || "Programmer"}
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Personal Info */}
          <div className="bg-gray-800/70 rounded-2xl p-5 shadow-md hover:shadow-lg transition border border-gray-700">
            <h2 className="font-semibold text-xl mb-3 text-white border-b pb-2">
              Personal Info
            </h2>
            <p>
              <Globe className="inline mr-2" /> <strong>Location:</strong>{" "}
              {profile.location}
            </p>
            <p>
              <Mail className="inline mr-2" /> <strong>Email:</strong>{" "}
              {profile.email}
            </p>
            <p>
              <Phone className="inline mr-2" /> <strong>Phone:</strong>{" "}
              {profile.phone}
            </p>
            <p>
              <Calendar className="inline mr-2" />{" "}
              <strong>Date of Birth:</strong>{" "}
              {new Date(profile.dateOfBirth).toLocaleDateString()}
            </p>
          </div>

          {/* Professional Info */}
          <div className="bg-gray-800/70 rounded-2xl p-5 shadow-md hover:shadow-lg transition border border-gray-700">
            <h2 className="font-semibold text-xl mb-3 text-white border-b pb-2">
              Professional Info
            </h2>
            <p>
              <Briefcase className="inline mr-2" />{" "}
              <strong>Availability:</strong> {profile.availability}
            </p>
            <p>
              <strong>Expected Salary:</strong> ${profile.expectedSalary}
            </p>
            <p>
              <strong>Notice Period:</strong> {profile.noticePeriod}
            </p>
          </div>

          {/* Languages */}
          <div className="bg-gray-800/70 rounded-2xl p-5 shadow-md hover:shadow-lg transition border border-gray-700">
            <h2 className="font-semibold text-xl mb-3 text-white border-b pb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gray-800/70 rounded-2xl p-5 shadow-md hover:shadow-lg transition border border-gray-700">
            <h2 className="font-semibold text-xl mb-3 text-white border-b pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Referees */}
          <div className="md:col-span-2 bg-gray-800/70 rounded-2xl p-5 shadow-md hover:shadow-lg transition border border-gray-700">
            <h2 className="font-semibold text-xl mb-3 text-white border-b pb-2">
              Referees
            </h2>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              {referees.map((ref) => (
                <div key={ref} className="bg-gray-900 p-3 rounded-lg shadow-sm">
                  <p className="font-medium text-white">{ref}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
