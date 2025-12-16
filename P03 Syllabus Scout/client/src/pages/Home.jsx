import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaBookOpen, FaBrain, FaGraduationCap, FaChalkboardTeacher, FaFileUpload, FaSearch } from "react-icons/fa";
import { RiTeamLine, RiGlobalLine, RiLightbulbLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home({ onSearch }) {
  const [query, setQuery] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        if (auth && auth.user && auth.token) {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          await axios.post(
            `${API_URL}/api/user/${auth.user._id}/add-search`,
            { query },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`,
              },
            }
          );
          console.log('Search saved successfully');
        }
      } catch (err) {
        console.error('Error saving search:', err);
      }

      navigate(`/results?query=${query}`);
    }
  };

  const popularTopics = [
    "Data Structures",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Cybersecurity",
    "Probability",
    "Psychology",
    "Business Management",
    "Cloud Computing",
    "Blockchain Technology"
  ];

  const creators = [
    {
      name: "Ideathon Team",
      role: "Founding Team",
      description: "Born from an ideathon, Syllabus Scout was created by passionate students and educators with a shared vision to make learning accessible and engaging for everyone.",
      icon: <RiTeamLine className="text-4xl" />
    },
    {
      name: "Educational Experts",
      role: "Content Curators & Advisors",
      description: "Our platform is supported by experienced educators who ensure all study materials are accurate, up-to-date, and aligned with current educational standards and syllabi.",
      icon: <FaChalkboardTeacher className="text-4xl" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-24 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-500/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-secondary-500/20 blur-[100px] animate-float"></div>
      </div>

      {/* Hero Section */}
      <div 
        className={`w-full max-w-6xl mb-16 text-center relative z-10 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium backdrop-blur-sm">
          🚀 The Future of Learning is Here
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-tight">
          <span className="inline-block">Syllabus</span>{" "}
          <span className="inline-block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">Scout</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
          Your ultimate companion for <span className="font-semibold text-foreground">smarter study sessions</span>. 
          Effortlessly discover high-quality learning resources tailored to your syllabus.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-medium text-foreground/80">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Quality Resources
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-medium text-foreground/80">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Accessible Learning
          </div>
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-2 text-sm font-medium text-foreground/80">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Master Concepts
          </div>
        </div>
      </div>

      {auth ? (
        <div className="w-full max-w-5xl mb-24 relative z-10">
          {/* Search Section */}
          <div 
            className={`mb-16 w-full ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="glass dark:glass-dark p-1 rounded-[2rem] shadow-2xl shadow-primary-500/20">
              <div className="bg-white/50 dark:bg-black/50 backdrop-blur-xl p-8 md:p-12 rounded-[1.8rem]">
                <h2 className="text-3xl font-display font-bold mb-8 text-center">Find Your Perfect Learning Resources</h2>
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow group">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter a topic from your syllabus..."
                        className="w-full py-5 px-14 rounded-2xl border border-border bg-background/50 focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-lg transition-all duration-300 placeholder:text-muted-foreground shadow-inner"
                      />
                      <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" />
                    </div>
                    <button
                      type="submit"
                      className="py-5 px-10 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white rounded-2xl transition-all duration-300 font-bold text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Popular Topics */}
          <div 
            className={`text-center ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-xl font-semibold mb-6 text-muted-foreground">Popular Subject Areas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTopics.map((topic, index) => (
                <button
                  key={topic}
                  onClick={() => {
                    if (auth && auth.user && auth.token) {
                      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                      axios.post(
                        `${API_URL}/api/user/${auth.user._id}/add-search`,
                        { query: topic },
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${auth.token}`,
                          },
                        }
                      ).catch(err => console.error('Error saving search:', err));
                    }
                    navigate(`/results?query=${encodeURIComponent(topic)}`);
                  }}
                  className="px-6 py-3 glass dark:glass-dark hover:bg-primary-500/10 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:border-primary-500/30"
                  style={{ animationDelay: `${0.5 + (index * 0.05)}s` }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`glass dark:glass-dark p-12 rounded-[2.5rem] w-full max-w-4xl mb-24 text-center relative overflow-hidden group ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: "0.3s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 relative z-10">Ready to start learning?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
            Join us and make learning easy and effective with curated books, videos, and more!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <a
              href="/login"
              className="px-10 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300"
            >
              Log In
            </a>
            <a
              href="/register"
              className="px-10 py-4 glass hover:bg-white/20 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="w-full max-w-7xl mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaBookOpen className="text-4xl" />,
              title: "Quality Resources",
              description: "Access accurate, up-to-date, and easy-to-understand content across a wide range of subjects."
            },
            {
              icon: <RiGlobalLine className="text-4xl" />,
              title: "Accessible Learning",
              description: "We believe education should be accessible to everyone, everywhere with high-quality materials."
            },
            {
              icon: <RiLightbulbLine className="text-4xl" />,
              title: "Smart Matching",
              description: "We match you with the most relevant study materials based on your topic or uploaded syllabus."
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className={`p-8 rounded-3xl glass dark:glass-dark border border-white/10 hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-2 group ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.6 + (index * 0.2)}s` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-6 text-primary-500 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="w-full max-w-7xl mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">How Syllabus Scout Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple steps to boost your learning journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaGraduationCap />,
              title: "Search Topic",
              description: "Enter any topic or subject area to find materials."
            },
            {
              icon: <FaFileUpload />,
              title: "Upload Syllabus",
              description: "Upload your course syllabus for precise matching.",
              badge: "Coming soon"
            },
            {
              icon: <FaBookOpen />,
              title: "Get Resources",
              description: "Receive a handpicked list of books and videos."
            },
            {
              icon: <FaBrain />,
              title: "Join Community",
              description: "Engage in discussions with fellow students.",
              badge: "Coming soon"
            }
          ].map((item, index) => (
            <div 
              key={item.title}
              className={`relative p-8 rounded-3xl bg-background/50 border border-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.8 + (index * 0.1)}s` }}
            >
              <div className="text-4xl text-primary-500 mb-6">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>
              {item.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-accent-500/10 text-accent-500 text-xs font-bold rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Creators Section */}
      <div className="w-full max-w-6xl mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-6">Our Story</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Born from an ideathon, driven by passion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {creators.map((creator, index) => (
            <div
              key={creator.name}
              className={`glass dark:glass-dark p-8 rounded-3xl flex items-center gap-8 hover:bg-white/5 transition-colors ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${1 + (index * 0.2)}s` }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-lg shrink-0">
                {creator.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{creator.name}</h3>
                <p className="text-primary-500 font-medium mb-3">{creator.role}</p>
                <p className="text-muted-foreground text-sm">
                  {creator.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
