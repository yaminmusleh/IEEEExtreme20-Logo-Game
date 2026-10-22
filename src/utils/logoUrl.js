// LOGO DATABASE (answer key).
// WARNING: in a frontend-only app this file ships to the browser, so anyone
// can read the answers. For a real campaign, move it to a server (see README).
//
// Entry shape: { id, name, image, aliases, category, difficulty }
// - id is the Simple Icons slug AND the filename in /public/logos/ (local mode)
// - difficulty: 1 very recognizable ... 5 niche/advanced

import { getLogoUrl } from "../utils/logoUrl.js";

const VC = "Version Control";
const OS = "Operating Systems";
const LANG = "Programming Languages";
const EDIT = "Editors & IDEs";
const DEVOPS = "DevOps & Infrastructure";
const DB = "Databases & Data Systems";
const SEC = "Networking & Security";
const CLOUD = "Cloud & Hosting";
const HW = "Hardware & Embedded";
const LOW = "Compilers & Low-Level";
const AI = "AI & Scientific Computing";
const BUILD = "Build Tools & Package Managers";
const WEB = "Web Development";
const GFX = "Graphics, Messaging & Observability";
const TOOLS = "Developer Tools & Community";

const entry = (slug, name, category, difficulty, aliases = []) => ({
  id: slug,
  name,
  image: getLogoUrl(slug),
  aliases,
  category,
  difficulty,
});

export const logoDatabase = [
  // Version control
  entry("github", "GitHub", VC, 1, ["github.com"]),
  entry("gitlab", "GitLab", VC, 2, ["gitlab.com"]),
  entry("bitbucket", "Bitbucket", VC, 3, ["atlassian bitbucket"]),
  entry("git", "Git", VC, 1, ["git scm"]),
  entry("gitea", "Gitea", VC, 4),
  entry("forgejo", "Forgejo", VC, 5),

  // Operating systems
  entry("linux", "Linux", OS, 1, ["gnu/linux", "gnu linux", "tux"]),
  entry("ubuntu", "Ubuntu", OS, 1, ["ubuntu linux"]),
  entry("debian", "Debian", OS, 2, ["debian linux", "debian gnu/linux"]),
  entry("archlinux", "Arch Linux", OS, 2, ["arch"]),
  entry("fedora", "Fedora", OS, 2, ["fedora linux"]),
  entry("freebsd", "FreeBSD", OS, 3, ["free bsd"]),
  entry("openbsd", "OpenBSD", OS, 4, ["open bsd"]),
  entry("alpinelinux", "Alpine Linux", OS, 4, ["alpine"]),
  entry("android", "Android", OS, 1),
  entry("macos", "macOS", OS, 2, ["mac os", "os x", "mac os x", "osx"]),
  entry("kalilinux", "Kali Linux", OS, 2, ["kali"]),
  entry("nixos", "NixOS", OS, 4, ["nix", "nix os"]),
  entry("redhat", "Red Hat", OS, 3, ["redhat linux", "red hat linux", "rhel", "red hat enterprise linux"]),

  // Programming languages
  entry("python", "Python", LANG, 1, ["python3", "python 3"]),
  entry("javascript", "JavaScript", LANG, 1, ["js", "ecmascript"]),
  entry("typescript", "TypeScript", LANG, 1, ["ts"]),
  entry("c", "C", LANG, 2, ["c language", "c programming language", "the c programming language"]),
  entry("cplusplus", "C++", LANG, 2, ["cpp", "c plus plus"]),
  entry("csharp", "C#", LANG, 2, ["c sharp", "c-sharp"]),
  entry("rust", "Rust", LANG, 1, ["rust lang", "rustlang"]),
  entry("go", "Go", LANG, 1, ["golang", "go lang", "go language"]),
  entry("kotlin", "Kotlin", LANG, 2),
  entry("swift", "Swift", LANG, 2, ["swift lang"]),
  entry("ruby", "Ruby", LANG, 2, ["ruby lang"]),
  entry("php", "PHP", LANG, 1),
  entry("haskell", "Haskell", LANG, 3),
  entry("lua", "Lua", LANG, 3),
  entry("elixir", "Elixir", LANG, 3),
  entry("erlang", "Erlang", LANG, 4),
  entry("dart", "Dart", LANG, 2),
  entry("julia", "Julia", LANG, 3, ["julia lang", "julialang"]),
  entry("zig", "Zig", LANG, 4, ["ziglang", "zig lang"]),
  entry("perl", "Perl", LANG, 3),
  entry("scala", "Scala", LANG, 3),
  entry("r", "R", LANG, 3, ["r language", "r programming language", "r project"]),
  entry("clojure", "Clojure", LANG, 4),

  // Editors and IDEs
  entry("vim", "Vim", EDIT, 2),
  entry("neovim", "Neovim", EDIT, 3, ["nvim"]),
  entry("gnuemacs", "GNU Emacs", EDIT, 3, ["emacs"]),
  entry("intellijidea", "IntelliJ IDEA", EDIT, 2, ["intellij", "idea", "jetbrains intellij idea"]),
  entry("eclipseide", "Eclipse IDE", EDIT, 3, ["eclipse"]),
  entry("androidstudio", "Android Studio", EDIT, 2),
  entry("xcode", "Xcode", EDIT, 3),
  entry("visualstudiocode", "Visual Studio Code", EDIT, 1, ["vscode", "vs code"]),
  entry("sublimetext", "Sublime Text", EDIT, 3, ["sublime"]),

  // DevOps and infrastructure
  entry("docker", "Docker", DEVOPS, 1),
  entry("kubernetes", "Kubernetes", DEVOPS, 1, ["k8s"]),
  entry("terraform", "Terraform", DEVOPS, 2, ["hashicorp terraform"]),
  entry("ansible", "Ansible", DEVOPS, 3, ["red hat ansible"]),
  entry("jenkins", "Jenkins", DEVOPS, 3),
  entry("prometheus", "Prometheus", DEVOPS, 3),
  entry("grafana", "Grafana", DEVOPS, 3),
  entry("helm", "Helm", DEVOPS, 4),
  entry("argo", "Argo", DEVOPS, 5, ["argo cd", "argocd", "argo project"]),
  entry("vagrant", "Vagrant", DEVOPS, 4, ["hashicorp vagrant"]),
  entry("podman", "Podman", DEVOPS, 4),
  entry("githubactions", "GitHub Actions", DEVOPS, 3, ["gh actions"]),
  entry("circleci", "CircleCI", DEVOPS, 3, ["circle ci"]),
  entry("nginx", "NGINX", DEVOPS, 2, ["engine x", "engine-x"]),
  entry("apache", "Apache", DEVOPS, 3, ["apache software foundation", "apache http server", "apache httpd", "asf"]),

  // Databases and data systems
  entry("postgresql", "PostgreSQL", DB, 2, ["postgres", "postgre sql"]),
  entry("mysql", "MySQL", DB, 2),
  entry("mongodb", "MongoDB", DB, 2, ["mongo"]),
  entry("redis", "Redis", DB, 2),
  entry("sqlite", "SQLite", DB, 2, ["sqlite3", "sql lite"]),
  entry("mariadb", "MariaDB", DB, 3),
  entry("elasticsearch", "Elasticsearch", DB, 3, ["elastic search"]),
  entry("apachecassandra", "Apache Cassandra", DB, 4, ["cassandra"]),
  entry("neo4j", "Neo4j", DB, 4),
  entry("influxdb", "InfluxDB", DB, 4, ["influx db", "influx"]),
  entry("apachekafka", "Apache Kafka", DB, 3, ["kafka"]),
  entry("apachespark", "Apache Spark", DB, 3, ["spark"]),
  entry("clickhouse", "ClickHouse", DB, 4, ["click house"]),

  // Networking and security
  entry("wireshark", "Wireshark", SEC, 3),
  entry("openssl", "OpenSSL", SEC, 3, ["open ssl"]),
  entry("wireguard", "WireGuard", SEC, 4, ["wire guard"]),
  entry("openvpn", "OpenVPN", SEC, 4, ["open vpn"]),
  entry("pfsense", "pfSense", SEC, 4, ["pf sense"]),
  entry("tailscale", "Tailscale", SEC, 3),
  entry("torproject", "Tor Project", SEC, 3, ["tor", "tor browser", "the onion router"]),
  entry("letsencrypt", "Let's Encrypt", SEC, 4, ["lets encrypt"]),

  // Cloud and hosting
  entry("cloudflare", "Cloudflare", CLOUD, 2),
  entry("vercel", "Vercel", CLOUD, 2),
  entry("netlify", "Netlify", CLOUD, 3),
  entry("digitalocean", "DigitalOcean", CLOUD, 2, ["digital ocean"]),
  entry("openstack", "OpenStack", CLOUD, 4, ["open stack"]),
  entry("heroku", "Heroku", CLOUD, 3),
  entry("flydotio", "Fly.io", CLOUD, 4, ["fly", "flyio", "fly io"]),
  entry("googlecloud", "Google Cloud", CLOUD, 2, ["gcp", "google cloud platform"]),
  entry("firebase", "Firebase", CLOUD, 2, ["google firebase"]),
  entry("supabase", "Supabase", CLOUD, 3),

  // Hardware and embedded
  entry("arduino", "Arduino", HW, 1),
  entry("raspberrypi", "Raspberry Pi", HW, 1, ["raspberry", "rpi"]),
  entry("espressif", "Espressif", HW, 3, ["esp32", "esp 32", "espressif systems"]),
  entry("riscv", "RISC-V", HW, 3, ["risc v", "risc five"]),
  entry("kicad", "KiCad", HW, 4, ["ki cad"]),
  entry("platformio", "PlatformIO", HW, 4, ["platform io"]),
  entry("zephyrproject", "Zephyr", HW, 5, ["zephyr project", "zephyr rtos"]),

  // Compilers and low-level
  entry("llvm", "LLVM", LOW, 4),
  entry("qemu", "QEMU", LOW, 4),
  entry("webassembly", "WebAssembly", LOW, 3, ["wasm", "web assembly"]),
  entry("gnu", "GNU", LOW, 3, ["gnu project", "gnus not unix"]),

  // AI and scientific computing
  entry("tensorflow", "TensorFlow", AI, 2, ["tensor flow"]),
  entry("pytorch", "PyTorch", AI, 2, ["py torch"]),
  entry("scikitlearn", "scikit-learn", AI, 3, ["scikit learn", "sklearn", "scikit"]),
  entry("jupyter", "Jupyter", AI, 2, ["jupyter notebook", "project jupyter", "jupyterlab"]),
  entry("numpy", "NumPy", AI, 3, ["num py"]),
  entry("pandas", "pandas", AI, 3),
  entry("opencv", "OpenCV", AI, 3, ["open cv"]),
  entry("huggingface", "Hugging Face", AI, 3, ["hf"]),
  entry("apacheairflow", "Apache Airflow", AI, 4, ["airflow"]),
  entry("mlflow", "MLflow", AI, 5, ["ml flow"]),
  entry("keras", "Keras", AI, 3),
  entry("anaconda", "Anaconda", AI, 4),

  // Build tools and package managers
  entry("cmake", "CMake", BUILD, 3, ["c make"]),
  entry("gradle", "Gradle", BUILD, 3),
  entry("apachemaven", "Apache Maven", BUILD, 3, ["maven"]),
  entry("npm", "npm", BUILD, 1, ["node package manager"]),
  entry("pnpm", "pnpm", BUILD, 3),
  entry("yarn", "Yarn", BUILD, 3),
  entry("bun", "Bun", BUILD, 3, ["bun.sh", "bun js", "bunjs"]),
  entry("bazel", "Bazel", BUILD, 4),

  // Web development
  entry("react", "React", WEB, 1, ["reactjs", "react.js"]),
  entry("vuedotjs", "Vue.js", WEB, 2, ["vue", "vuejs", "vue js"]),
  entry("angular", "Angular", WEB, 2),
  entry("nextdotjs", "Next.js", WEB, 2, ["next", "nextjs", "next js"]),
  entry("nodedotjs", "Node.js", WEB, 1, ["node", "nodejs", "node js"]),
  entry("deno", "Deno", WEB, 3),
  entry("svelte", "Svelte", WEB, 3, ["sveltejs", "svelte js"]),
  entry("astro", "Astro", WEB, 3, ["astro build"]),
  entry("express", "Express", WEB, 3, ["expressjs", "express.js", "express js"]),
  entry("fastapi", "FastAPI", WEB, 3, ["fast api"]),
  entry("django", "Django", WEB, 2),
  entry("flask", "Flask", WEB, 3),
  entry("laravel", "Laravel", WEB, 2),
  entry("rubyonrails", "Ruby on Rails", WEB, 3, ["rails", "ror"]),
  entry("spring", "Spring", WEB, 3, ["spring framework", "spring boot", "springboot"]),
  entry("tailwindcss", "Tailwind CSS", WEB, 2, ["tailwind"]),
  entry("webpack", "webpack", WEB, 3),
  entry("vite", "Vite", WEB, 3, ["vitejs", "vite js"]),
  entry("graphql", "GraphQL", WEB, 3, ["graph ql"]),
  entry("nestjs", "NestJS", WEB, 4, ["nest", "nest js", "nest.js"]),

  // Graphics, messaging, observability
  entry("opengl", "OpenGL", GFX, 4, ["open gl"]),
  entry("vulkan", "Vulkan", GFX, 4),
  entry("opentelemetry", "OpenTelemetry", GFX, 5, ["otel", "open telemetry"]),
  entry("apacheflink", "Apache Flink", GFX, 5, ["flink"]),
  entry("rabbitmq", "RabbitMQ", GFX, 4, ["rabbit mq"]),
  entry("zigbee", "Zigbee", GFX, 5),

  // Developer tools and community
  entry("stackoverflow", "Stack Overflow", TOOLS, 1),
  entry("postman", "Postman", TOOLS, 2),
  entry("figma", "Figma", TOOLS, 1),
  entry("wordpress", "WordPress", TOOLS, 1),
  entry("mozillafirefox", "Firefox", TOOLS, 1, ["mozilla firefox"]),
  entry("godotengine", "Godot Engine", TOOLS, 3, ["godot"]),
  entry("blender", "Blender", TOOLS, 2),
];