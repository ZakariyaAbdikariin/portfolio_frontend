// Profile.tsx
import React, { useEffect, useState } from "react";
import ZakImage from "../assets/Zak.jpg";
import { fetchProfileById, UserProfile } from "../api/profileApi";

interface ProfileProps {
  id: number;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProfileById(id);
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!profile) return <p className="text-center mt-10">Profile not found</p>;

  // Helper function to safely split strings into arrays
  const renderArray = (str?: string) =>
    str
      ? str
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const languages = renderArray(profile.languages);
  const skills = renderArray(profile.skills);
  const referees = renderArray(profile.referees);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 mb-10">
        <img
          src={ZakImage}
          alt={profile.name}
          className="w-36 h-36 rounded-full border-4 border-gray-800 shadow-md object-cover"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-600 mt-2 text-lg">{profile.bio}</p>

          {/* Social Links */}
          <div className="flex gap-6 justify-center md:justify-start mt-5 text-sm font-medium">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 hover:text-black transition"
              >
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 hover:text-blue-900 transition"
              >
                LinkedIn
              </a>
            )}
            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 hover:text-sky-700 transition"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Personal Info */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Personal Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Location:</strong> {profile.location}
            </p>
            <p>
              <strong>Nationality:</strong> {profile.nationality}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profile.dateOfBirth}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>
            <p>
              <strong>Address:</strong> {profile.address}
            </p>
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Professional Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Availability:</strong> {profile.availability}
            </p>
            <p>
              <strong>Expected Salary:</strong> ${profile.expectedSalary}
            </p>
            <p>
              <strong>Notice Period:</strong> {profile.noticePeriod}
            </p>
            <p>
              <strong>Immigration Status:</strong> {profile.immigrationStatus}
            </p>
            <p>
              <strong>Own a Car:</strong> {profile.ownACar ? "Yes" : "No"}
            </p>
            <p>
              <strong>Driving License:</strong>{" "}
              {profile.haveDrivingLicense ? "Yes" : "No"}
            </p>
            <p>
              <strong>Willing to Relocate:</strong>{" "}
              {profile.willingToRelocate ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {languages.length > 0 ? (
              languages.map((lang) => (
                <span
                  key={lang}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No languages listed</p>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills listed</p>
            )}
          </div>
        </div>

        {/* Referees */}
        <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Referees
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {referees.length > 0 ? (
              referees.map((ref) => (
                <div key={ref} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{ref}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No referees listed</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
