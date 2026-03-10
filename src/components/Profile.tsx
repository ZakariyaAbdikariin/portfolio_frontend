import React from "react";

const Profile = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        <img
          src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:1920/plain/https://attic.sh/n1aj2r6n2jupn1htuy1ky9ldzvse"
          alt="Sakariye Abdikariin"
          className="w-32 h-32 rounded-full border-4 border-gray-700 shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">Sakariye Abdikariin</h1>
          <p className="text-gray-600 mt-2">Software Developer</p>

          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-blue-700 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-sky-500 hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <p>
            <strong>Location:</strong> New York, USA
          </p>
          <p>
            <strong>Nationality:</strong> American
          </p>
          <p>
            <strong>Date of Birth:</strong> 1990-05-15
          </p>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1234567890
          </p>
          <p>
            <strong>Address:</strong> 123 Main St, New York, NY
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-2">
            Professional Information
          </h2>
          <p>
            <strong>Availability:</strong> Immediate
          </p>
          <p>
            <strong>Expected Salary:</strong> $120000
          </p>
          <p>
            <strong>Notice Period:</strong> 2 weeks
          </p>
          <p>
            <strong>Immigration Status:</strong> Citizen
          </p>
          <p>
            <strong>Own a Car:</strong> Yes
          </p>
          <p>
            <strong>Driving License:</strong> Yes
          </p>
          <p>
            <strong>Willing to Relocate:</strong> Yes
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-2">Languages</h2>
          <p>English, Spanish</p>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <p>Node.js, TypeScript, Sequelize, MySQL, Express</p>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Referees</h2>
          <p>Jane Smith, Bob Johnson</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
