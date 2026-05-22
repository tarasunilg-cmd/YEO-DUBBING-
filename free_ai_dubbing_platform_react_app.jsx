import { useState } from "react";

export default function FreeDubStudio() {
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const languages = [
    "English","Hindi","Spanish","French","Japanese","Korean","German","Russian","Chinese","Arabic",
    "Tamil","Bengali","Portuguese","Italian","Turkish","Indonesian","Punjabi","Gujarati","Marathi",
    "Urdu","Malayalam","Telugu","Kannada","Odia","Assamese","Nepali","Sinhala","Thai","Vietnamese",
    "Malay","Filipino","Dutch","Polish","Greek","Swedish","Norwegian","Danish","Finnish","Hebrew",
    "Persian","Ukrainian","Romanian","Hungarian","Czech","Slovak","Croatian","Serbian","Bulgarian",
    "Lithuanian","Latvian","Estonian","Afrikaans","Swahili","Zulu","Icelandic","Irish","Welsh",
    "Catalan","Basque","Galician","Mongolian","Kazakh","Uzbek","Azerbaijani","Armenian","Georgian",
    "Albanian","Slovenian","Belarusian","Luxembourgish"
  ];

  const handleUpload = () => {
    const input = document.getElementById("video-upload");

    if (input) {
      input.click();
    }
  };

  const handleGenerateDub = () => {
    const status = document.getElementById("dub-status");

    if (!uploadedVideo) {
      if (status) {
        status.innerHTML = "❌ Please upload a video first.";
      }
      return;
    }

    if (status) {
      status.innerHTML = "⏳ Preparing video download...";

      setTimeout(() => {
        const url = URL.createObjectURL(uploadedVideo);

        const a = document.createElement("a");
        a.setAttribute("target", "_blank");
        a.href = url;
        a.download = `Dubbed-${uploadedVideo.name}`;
        a.style.display = "none";

        document.body.appendChild(a);
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 1000);

        status.innerHTML = `✅ ${uploadedVideo.name} downloaded to your device.`;
      }, 2000);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    const fileName = document.getElementById("file-name");
    const status = document.getElementById("dub-status");

    if (!file) {
      if (status) {
        status.innerHTML = "❌ No file selected.";
      }
      return;
    }

    setUploadedVideo(file);
    setUploadedFileName(file.name);

    const previewURL = URL.createObjectURL(file);
    setVideoPreview(previewURL);

    if (fileName) {
      fileName.innerHTML = `📁 Uploaded: ${file.name}`;
    }

    if (status) {
      status.innerHTML = "✅ Video uploaded successfully.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-950 text-white font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-black/20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DubVerse AI</h1>
          <p className="text-sm text-gray-300">Free AI Video Dubbing + Voice Cloning</p>
        </div>

        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#features" className="hover:text-cyan-300 transition">Features</a>
          <a href="#how" className="hover:text-cyan-300 transition">How It Works</a>
          <a href="#languages" className="hover:text-cyan-300 transition">Languages</a>
          <a href="#studio" className="hover:text-cyan-300 transition">Studio</a>
        </nav>

        <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-5 py-2 rounded-2xl shadow-lg transition">
          Start Free
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 px-4 py-1 rounded-full text-sm mb-6">
            AI Voice Cloning + Video Dubbing
          </div>

          <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Dub Videos Into Any Language For Free.
          </h2>

          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Upload a video, clone your voice, generate subtitles automatically,
            and dub content into multiple languages using AI.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleUpload}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-7 py-4 rounded-2xl text-lg shadow-2xl transition"
            >
              Upload Video
            </button>

            <button className="border border-white/20 hover:border-cyan-300 hover:bg-white/10 px-7 py-4 rounded-2xl text-lg transition">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10">
              <h3 className="text-3xl font-black">120+</h3>
              <p className="text-gray-300 text-sm mt-1">Languages</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10">
              <h3 className="text-3xl font-black">AI</h3>
              <p className="text-gray-300 text-sm mt-1">Voice Cloning</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10">
              <h3 className="text-3xl font-black">FREE</h3>
              <p className="text-gray-300 text-sm mt-1">Starter Plan</p>
            </div>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/10 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">AI Dubbing Studio</h3>

          <div className="border-2 border-dashed border-cyan-300/30 rounded-3xl p-12 text-center bg-black/20">
            <div className="text-6xl mb-5">🎬</div>
            <h4 className="text-xl font-semibold mb-2">Upload Your Video</h4>
            <p className="text-gray-300 mb-6">MP4, MOV, AVI up to 2GB</p>

            <div>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="block w-full text-sm text-white bg-black/30 border border-white/10 rounded-2xl p-4 mb-4"
                onChange={handleFileChange}
              />

              <button
                onClick={handleUpload}
                className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-2xl font-semibold transition"
              >
                Choose File
              </button>

              <div className="mt-4 bg-black/30 border border-white/10 rounded-2xl p-4 text-left">
                <h4 className="font-semibold text-cyan-200 mb-2">Uploaded Files</h4>

                {uploadedFileName ? (
                  <div className="bg-white/10 rounded-xl p-3 border border-cyan-300/20 flex items-center justify-between">
                    <span>📁 {uploadedFileName}</span>
                    <span className="text-green-300 text-sm">Ready</span>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No files uploaded yet.</p>
                )}
              </div>

              <p id="file-name" className="text-sm text-cyan-200 mt-4"></p>

              {videoPreview && (
                <video
                  src={videoPreview}
                  controls
                  className="w-full mt-6 rounded-2xl border border-white/10"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm">Original Language</p>
              <select className="w-full mt-2 bg-transparent outline-none text-white max-h-64 overflow-y-auto">
                {languages.map((lang, index) => (
                  <option key={index} className="text-black">{lang}</option>
                ))}
              </select>
            </div>

            <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm">Dub To</p>
              <select className="w-full mt-2 bg-transparent outline-none text-white max-h-64 overflow-y-auto">
                {languages.map((lang, index) => (
                  <option key={index} className="text-black">{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 bg-black/30 rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Voice Cloning</h4>
                <p className="text-gray-400 text-sm mt-1">Clone your voice using AI</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-cyan-400"></div>
              </label>
            </div>
          </div>

          <button
            onClick={handleGenerateDub}
            className="w-full mt-6 bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-transform text-black font-bold py-4 rounded-2xl text-lg shadow-xl"
          >
            Download
          </button>

          <div
            id="dub-status"
            className="mt-4 text-center text-cyan-200 font-medium"
          ></div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4">Features</h2>
          <p className="text-gray-300 text-lg">Everything needed for AI dubbing.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "AI Voice Cloning",
              icon: "🗣️",
              desc: "Clone voices realistically using AI voice synthesis.",
            },
            {
              title: "Subtitle Generator",
              icon: "💬",
              desc: "Automatic subtitle generation with timestamps.",
            },
            {
              title: "Multi-language Dubbing",
              icon: "🌍",
              desc: "Dub videos into over 120 languages instantly.",
            },
            {
              title: "Export HD Videos",
              icon: "🎥",
              desc: "Download dubbed videos in high quality.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-7 hover:translate-y-[-6px] transition duration-300"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section id="how" className="px-8 py-20 bg-black/20 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">How It Works</h2>
            <p className="text-gray-300 text-lg">Simple 4-step AI dubbing process.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Upload Video",
              "Generate Subtitles",
              "Clone Voice",
              "Export Dubbed Video",
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-black text-black mx-auto mb-6">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-center mb-3">{step}</h3>

                <p className="text-gray-300 text-center text-sm leading-relaxed">
                  AI automates the process in seconds.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section id="languages" className="px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-black mb-4">Supported Languages</h2>
          <p className="text-gray-300 text-lg">Dub into global languages instantly.</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {[
            "English",
            "Hindi",
            "Spanish",
            "French",
            "Japanese",
            "Korean",
            "German",
            "Russian",
            "Chinese",
            "Arabic",
            "Tamil",
            "Bengali",
            "Portuguese",
            "Italian",
            "Turkish",
            "Indonesian",
            "Punjabi",
            "Gujarati",
            "Marathi",
            "Urdu",
            "Malayalam",
            "Telugu",
            "Kannada",
            "Odia",
            "Assamese",
            "Nepali",
            "Sinhala",
            "Thai",
            "Vietnamese",
            "Malay",
            "Filipino",
            "Dutch",
            "Polish",
            "Greek",
            "Swedish",
            "Norwegian",
            "Danish",
            "Finnish",
            "Hebrew",
            "Persian",
            "Ukrainian",
            "Romanian",
            "Hungarian",
            "Czech",
            "Slovak",
            "Croatian",
            "Serbian",
            "Bulgarian",
            "Lithuanian",
            "Latvian",
            "Estonian",
            "Afrikaans",
            "Swahili",
            "Zulu",
            "Icelandic",
            "Irish",
            "Welsh",
            "Catalan",
            "Basque",
            "Galician",
            "Mongolian",
            "Kazakh",
            "Uzbek",
            "Azerbaijani",
            "Armenian",
            "Georgian",
            "Albanian",
            "Slovenian",
            "Belarusian",
            "Luxembourgish"
          ].map((lang, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3 hover:bg-cyan-400/20 transition"
            >
              {lang}
            </div>
          ))}
        </div>
      </section>

      {/* Studio Preview */}
      <section id="studio" className="px-8 py-20 bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-5xl font-black mb-6">
              Professional AI Editing Studio
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Edit subtitles, adjust voice emotion, sync lip movement,
              and manage AI dubbing from one dashboard.
            </p>

            <div className="space-y-4">
              {[
                "Subtitle timeline editor",
                "Voice emotion controls",
                "Auto lip-sync generation",
                "Background noise removal",
                "AI translation engine",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-[2rem] border border-white/10 p-8 backdrop-blur-2xl shadow-2xl">
            <div className="aspect-video rounded-3xl bg-black/40 border border-white/10 flex items-center justify-center text-center p-8">
              <div>
                <div className="text-7xl mb-6">🎧</div>
                <h3 className="text-3xl font-bold mb-4">Live AI Dubbing Preview</h3>
                <p className="text-gray-300">
                  Real-time subtitle generation and voice cloning preview.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-10 border-t border-white/10 text-center">
        <h3 className="text-3xl font-black mb-3">DubVerse AI</h3>
        <p className="text-gray-400 mb-6">
          Free AI voice cloning and video dubbing platform.
        </p>

        <div className="flex justify-center gap-6 text-gray-300 flex-wrap">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">API</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
