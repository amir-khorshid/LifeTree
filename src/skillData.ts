export type Status =
  | 'unexplored'
  | 'learning'
  | 'practiced'
  | 'proficient'
  | 'mastered';

export type SkillKind = 'root' | 'category' | 'skill';

export type Skill = {
  id: string;
  label: string;
  icon: string;
  kind: SkillKind;
  color: string;
  x: number;
  y: number;
  parent?: string;
};

type Entry = { id: string; label: string; icon: string };
type Branch = Entry & { leaves: Entry[] };
export type Region = Entry & { color: string; angle: number; branches: Branch[] };

// Add skills here. Keep existing IDs unchanged to preserve user progress.
// Regions are spaced every 30 degrees around YOU.
export const regions: Region[] =
[
  {
    "id": "engineering",
    "label": "Engineering",
    "icon": "⚙️",
    "color": "#38bdf8",
    "angle": -150,
    "branches": [
      {
        "id": "electronics",
        "label": "Electronics",
        "icon": "⚡",
        "leaves": [
          {
            "id": "stm32",
            "label": "Microcontrollers",
            "icon": "🔌"
          },
          {
            "id": "circuits",
            "label": "Circuit Design",
            "icon": "🔋"
          },
          {
            "id": "soldering",
            "label": "Soldering",
            "icon": "🛠️"
          },
          {
            "id": "pcb",
            "label": "PCB Design",
            "icon": "📟"
          }
        ]
      },
      {
        "id": "programming",
        "label": "Programming",
        "icon": "💻",
        "leaves": [
          {
            "id": "python",
            "label": "Python",
            "icon": "🐍"
          },
          {
            "id": "algorithms",
            "label": "Algorithms",
            "icon": "🧩"
          },
          {
            "id": "cpp",
            "label": "C++",
            "icon": "⌨️"
          },
          {
            "id": "git",
            "label": "Version Control",
            "icon": "🌿"
          }
        ]
      },
      {
        "id": "mechanical",
        "label": "Mechanical Design",
        "icon": "🔩",
        "leaves": [
          {
            "id": "mechanisms",
            "label": "Mechanisms",
            "icon": "⚙️"
          },
          {
            "id": "mechanicalcad",
            "label": "Mechanical CAD",
            "icon": "📐"
          },
          {
            "id": "machining",
            "label": "Machining",
            "icon": "🛞"
          },
          {
            "id": "prototyping",
            "label": "Prototyping",
            "icon": "🧰"
          }
        ]
      }
    ]
  },
  {
    "id": "technology",
    "label": "Technology",
    "icon": "🖥️",
    "color": "#60a5fa",
    "angle": -120,
    "branches": [
      {
        "id": "networking",
        "label": "Networking",
        "icon": "🌐",
        "leaves": [
          {
            "id": "tcpip",
            "label": "TCP/IP",
            "icon": "📡"
          },
          {
            "id": "dns",
            "label": "DNS",
            "icon": "🔎"
          },
          {
            "id": "routing",
            "label": "Routing",
            "icon": "🛜"
          },
          {
            "id": "wireshark",
            "label": "Packet Analysis",
            "icon": "🦈"
          }
        ]
      },
      {
        "id": "systems",
        "label": "Systems",
        "icon": "🖧",
        "leaves": [
          {
            "id": "linux",
            "label": "Linux",
            "icon": "🐧"
          },
          {
            "id": "docker",
            "label": "Containers",
            "icon": "📦"
          },
          {
            "id": "servers",
            "label": "Server Admin",
            "icon": "🗄️"
          },
          {
            "id": "automation",
            "label": "Scripting",
            "icon": "🧑‍💻"
          }
        ]
      },
      {
        "id": "security",
        "label": "Cybersecurity",
        "icon": "🔐",
        "leaves": [
          {
            "id": "auth",
            "label": "Authentication",
            "icon": "🔑"
          },
          {
            "id": "securitybasics",
            "label": "Security Basics",
            "icon": "🛡️"
          },
          {
            "id": "backups",
            "label": "Backups",
            "icon": "💾"
          },
          {
            "id": "websecurity",
            "label": "Web Security",
            "icon": "🔒"
          }
        ]
      }
    ]
  },
  {
    "id": "finance",
    "label": "Finance",
    "icon": "💰",
    "color": "#facc15",
    "angle": -90,
    "branches": [
      {
        "id": "budgeting",
        "label": "Budgeting",
        "icon": "📊",
        "leaves": [
          {
            "id": "expenses",
            "label": "Expense Tracking",
            "icon": "🧾"
          },
          {
            "id": "emergency",
            "label": "Emergency Fund",
            "icon": "🏦"
          },
          {
            "id": "cashflow",
            "label": "Cash Flow",
            "icon": "💵"
          },
          {
            "id": "budgetplans",
            "label": "Budget Planning",
            "icon": "📋"
          }
        ]
      },
      {
        "id": "investing",
        "label": "Investing",
        "icon": "📈",
        "leaves": [
          {
            "id": "stocks",
            "label": "Stocks",
            "icon": "📉"
          },
          {
            "id": "retirement",
            "label": "Retirement Planning",
            "icon": "🪙"
          },
          {
            "id": "indexfunds",
            "label": "Index Funds",
            "icon": "📈"
          },
          {
            "id": "riskallocation",
            "label": "Asset Allocation",
            "icon": "⚖️"
          }
        ]
      },
      {
        "id": "financialliteracy",
        "label": "Financial Literacy",
        "icon": "📚",
        "leaves": [
          {
            "id": "credit",
            "label": "Credit",
            "icon": "💳"
          },
          {
            "id": "taxes",
            "label": "Taxes",
            "icon": "🧮"
          },
          {
            "id": "insurance",
            "label": "Insurance",
            "icon": "🛡️"
          },
          {
            "id": "interest",
            "label": "Interest & Loans",
            "icon": "🏧"
          }
        ]
      }
    ]
  },
  {
    "id": "learning",
    "label": "Learning",
    "icon": "📖",
    "color": "#818cf8",
    "angle": -60,
    "branches": [
      {
        "id": "study",
        "label": "Study Methods",
        "icon": "✏️",
        "leaves": [
          {
            "id": "notetaking",
            "label": "Note-taking",
            "icon": "🗒️"
          },
          {
            "id": "spacedrep",
            "label": "Spaced Repetition",
            "icon": "🔁"
          },
          {
            "id": "memorization",
            "label": "Memory Techniques",
            "icon": "🧠"
          },
          {
            "id": "research",
            "label": "Research Skills",
            "icon": "🔬"
          }
        ]
      },
      {
        "id": "thinking",
        "label": "Thinking",
        "icon": "💡",
        "leaves": [
          {
            "id": "criticalthinking",
            "label": "Critical Thinking",
            "icon": "🔍"
          },
          {
            "id": "problemsolving",
            "label": "Problem Solving",
            "icon": "🧩"
          },
          {
            "id": "logic",
            "label": "Logic",
            "icon": "♟️"
          },
          {
            "id": "decisionmaking",
            "label": "Decision Making",
            "icon": "⚖️"
          }
        ]
      },
      {
        "id": "languages",
        "label": "Languages",
        "icon": "🗣️",
        "leaves": [
          {
            "id": "languagelearning",
            "label": "Language Learning",
            "icon": "🌍"
          },
          {
            "id": "pronunciation",
            "label": "Pronunciation",
            "icon": "🔊"
          },
          {
            "id": "readingfluency",
            "label": "Reading Fluency",
            "icon": "📖"
          },
          {
            "id": "translation",
            "label": "Translation",
            "icon": "🌐"
          }
        ]
      }
    ]
  },
  {
    "id": "physical",
    "label": "Physical",
    "icon": "💪",
    "color": "#4ade80",
    "angle": -30,
    "branches": [
      {
        "id": "strength",
        "label": "Strength",
        "icon": "🏋️",
        "leaves": [
          {
            "id": "weightlifting",
            "label": "Weightlifting",
            "icon": "🏆"
          },
          {
            "id": "calisthenics",
            "label": "Calisthenics",
            "icon": "🤸"
          },
          {
            "id": "powerlifting",
            "label": "Powerlifting",
            "icon": "🏋️"
          },
          {
            "id": "gripstrength",
            "label": "Grip Strength",
            "icon": "✊"
          }
        ]
      },
      {
        "id": "endurance",
        "label": "Endurance",
        "icon": "❤️",
        "leaves": [
          {
            "id": "running",
            "label": "Running",
            "icon": "🏃"
          },
          {
            "id": "cycling",
            "label": "Cycling",
            "icon": "🚴"
          },
          {
            "id": "swimming",
            "label": "Swimming",
            "icon": "🏊"
          },
          {
            "id": "rowing",
            "label": "Rowing",
            "icon": "🚣"
          }
        ]
      },
      {
        "id": "movement",
        "label": "Movement",
        "icon": "🤾",
        "leaves": [
          {
            "id": "mobility",
            "label": "Mobility",
            "icon": "🧘"
          },
          {
            "id": "balance",
            "label": "Balance",
            "icon": "⚖️"
          },
          {
            "id": "agility",
            "label": "Agility",
            "icon": "⚡"
          },
          {
            "id": "coordination",
            "label": "Coordination",
            "icon": "🎯"
          }
        ]
      }
    ]
  },
  {
    "id": "health",
    "label": "Health & Wellness",
    "icon": "🫀",
    "color": "#2dd4bf",
    "angle": 0,
    "branches": [
      {
        "id": "nutrition",
        "label": "Nutrition",
        "icon": "🥗",
        "leaves": [
          {
            "id": "mealplanning",
            "label": "Meal Planning",
            "icon": "🍽️"
          },
          {
            "id": "nutritionlabels",
            "label": "Food Labels",
            "icon": "🏷️"
          },
          {
            "id": "hydration",
            "label": "Hydration",
            "icon": "💧"
          },
          {
            "id": "balancedmeals",
            "label": "Balanced Meals",
            "icon": "🥙"
          }
        ]
      },
      {
        "id": "recovery",
        "label": "Recovery",
        "icon": "🌙",
        "leaves": [
          {
            "id": "sleep",
            "label": "Sleep Habits",
            "icon": "😴"
          },
          {
            "id": "stretching",
            "label": "Stretching",
            "icon": "🧘"
          },
          {
            "id": "restplanning",
            "label": "Rest Planning",
            "icon": "📅"
          },
          {
            "id": "stressskills",
            "label": "Stress Management",
            "icon": "🌿"
          }
        ]
      },
      {
        "id": "healthliteracy",
        "label": "Health Literacy",
        "icon": "🩺",
        "leaves": [
          {
            "id": "healthsources",
            "label": "Evaluating Health Sources",
            "icon": "🔎"
          },
          {
            "id": "wellnessgoals",
            "label": "Wellness Goals",
            "icon": "🎯"
          },
          {
            "id": "healthmeasurements",
            "label": "Basic Health Metrics",
            "icon": "📏"
          },
          {
            "id": "safetyawareness",
            "label": "Safety Awareness",
            "icon": "🛡️"
          }
        ]
      }
    ]
  },
  {
    "id": "creative",
    "label": "Creative",
    "icon": "🎨",
    "color": "#f472b6",
    "angle": 30,
    "branches": [
      {
        "id": "cooking",
        "label": "Cooking",
        "icon": "🍳",
        "leaves": [
          {
            "id": "baking",
            "label": "Baking",
            "icon": "🍰"
          },
          {
            "id": "knife",
            "label": "Knife Skills",
            "icon": "🔪"
          },
          {
            "id": "mealprep",
            "label": "Meal Prep",
            "icon": "🥘"
          },
          {
            "id": "sauces",
            "label": "Sauces",
            "icon": "🫕"
          }
        ]
      },
      {
        "id": "printing",
        "label": "3D Printing",
        "icon": "🖨️",
        "leaves": [
          {
            "id": "cad",
            "label": "CAD Design",
            "icon": "📐"
          },
          {
            "id": "slicing",
            "label": "Print Slicing",
            "icon": "🧱"
          },
          {
            "id": "calibration",
            "label": "Printer Calibration",
            "icon": "⚙️"
          },
          {
            "id": "materials",
            "label": "Print Materials",
            "icon": "🧵"
          }
        ]
      },
      {
        "id": "digitalcreation",
        "label": "Digital Creation",
        "icon": "🖌️",
        "leaves": [
          {
            "id": "photography",
            "label": "Photography",
            "icon": "📷"
          },
          {
            "id": "photoediting",
            "label": "Photo Editing",
            "icon": "🖼️"
          },
          {
            "id": "videoediting",
            "label": "Video Editing",
            "icon": "🎬"
          },
          {
            "id": "layoutdesign",
            "label": "Graphic Layout",
            "icon": "📏"
          }
        ]
      }
    ]
  },
  {
    "id": "arts",
    "label": "Arts & Culture",
    "icon": "🎭",
    "color": "#ec4899",
    "angle": 60,
    "branches": [
      {
        "id": "music",
        "label": "Music",
        "icon": "🎵",
        "leaves": [
          {
            "id": "musictheory",
            "label": "Music Theory",
            "icon": "🎼"
          },
          {
            "id": "guitar",
            "label": "Guitar",
            "icon": "🎸"
          },
          {
            "id": "piano",
            "label": "Piano",
            "icon": "🎹"
          },
          {
            "id": "composition",
            "label": "Composition",
            "icon": "📝"
          }
        ]
      },
      {
        "id": "visualart",
        "label": "Visual Art",
        "icon": "🖼️",
        "leaves": [
          {
            "id": "drawing",
            "label": "Drawing",
            "icon": "✏️"
          },
          {
            "id": "painting",
            "label": "Painting",
            "icon": "🖌️"
          },
          {
            "id": "digitalart",
            "label": "Digital Art",
            "icon": "🎨"
          },
          {
            "id": "sculpture",
            "label": "Sculpture",
            "icon": "🗿"
          }
        ]
      },
      {
        "id": "performance",
        "label": "Performance",
        "icon": "🎤",
        "leaves": [
          {
            "id": "acting",
            "label": "Acting",
            "icon": "🎭"
          },
          {
            "id": "dance",
            "label": "Dance",
            "icon": "💃"
          },
          {
            "id": "singing",
            "label": "Singing",
            "icon": "🎶"
          },
          {
            "id": "stagecraft",
            "label": "Stagecraft",
            "icon": "🎪"
          }
        ]
      }
    ]
  },
  {
    "id": "outdoors",
    "label": "Outdoors",
    "icon": "🏔️",
    "color": "#fb923c",
    "angle": 90,
    "branches": [
      {
        "id": "survival",
        "label": "Survival",
        "icon": "🧭",
        "leaves": [
          {
            "id": "navigation",
            "label": "Navigation",
            "icon": "🗺️"
          },
          {
            "id": "firstaid",
            "label": "First Aid",
            "icon": "🩹"
          },
          {
            "id": "shelter",
            "label": "Shelter Basics",
            "icon": "⛺"
          },
          {
            "id": "waterprep",
            "label": "Water Treatment",
            "icon": "💧"
          }
        ]
      },
      {
        "id": "adventure",
        "label": "Adventure",
        "icon": "🥾",
        "leaves": [
          {
            "id": "hiking",
            "label": "Hiking",
            "icon": "🌲"
          },
          {
            "id": "climbing",
            "label": "Climbing",
            "icon": "🧗"
          },
          {
            "id": "camping",
            "label": "Camping",
            "icon": "🏕️"
          },
          {
            "id": "backpacking",
            "label": "Backpacking",
            "icon": "🎒"
          }
        ]
      },
      {
        "id": "nature",
        "label": "Nature Knowledge",
        "icon": "🍃",
        "leaves": [
          {
            "id": "weatherreading",
            "label": "Weather Reading",
            "icon": "⛅"
          },
          {
            "id": "stargazing",
            "label": "Stargazing",
            "icon": "✨"
          },
          {
            "id": "ecology",
            "label": "Ecology",
            "icon": "🌱"
          },
          {
            "id": "geology",
            "label": "Geology",
            "icon": "🪨"
          }
        ]
      }
    ]
  },
  {
    "id": "travel",
    "label": "Travel & Mobility",
    "icon": "🛣️",
    "color": "#f97316",
    "angle": 120,
    "branches": [
      {
        "id": "driving",
        "label": "Driving",
        "icon": "🚗",
        "leaves": [
          {
            "id": "roadsafety",
            "label": "Road Safety",
            "icon": "🚦"
          },
          {
            "id": "parking",
            "label": "Parking",
            "icon": "🅿️"
          },
          {
            "id": "vehiclecare",
            "label": "Basic Vehicle Care",
            "icon": "🛠️"
          },
          {
            "id": "roadtrips",
            "label": "Road Trips",
            "icon": "🗺️"
          }
        ]
      },
      {
        "id": "motorcycling",
        "label": "Motorcycling",
        "icon": "🏍️",
        "leaves": [
          {
            "id": "bikehandling",
            "label": "Bike Handling",
            "icon": "🛞"
          },
          {
            "id": "motorcyclecare",
            "label": "Motorcycle Maintenance",
            "icon": "🔧"
          },
          {
            "id": "braking",
            "label": "Braking Techniques",
            "icon": "🛑"
          },
          {
            "id": "ridinggear",
            "label": "Riding Gear",
            "icon": "🪖"
          }
        ]
      },
      {
        "id": "travelplanning",
        "label": "Travel Planning",
        "icon": "🧳",
        "leaves": [
          {
            "id": "itineraries",
            "label": "Itineraries",
            "icon": "📍"
          },
          {
            "id": "travelbudget",
            "label": "Travel Budgeting",
            "icon": "💵"
          },
          {
            "id": "packing",
            "label": "Packing",
            "icon": "🎒"
          },
          {
            "id": "culturaletiquette",
            "label": "Cultural Etiquette",
            "icon": "🌎"
          }
        ]
      }
    ]
  },
  {
    "id": "social",
    "label": "Social",
    "icon": "💬",
    "color": "#a78bfa",
    "angle": 150,
    "branches": [
      {
        "id": "communication",
        "label": "Communication",
        "icon": "🗣️",
        "leaves": [
          {
            "id": "speaking",
            "label": "Public Speaking",
            "icon": "🎤"
          },
          {
            "id": "conversation",
            "label": "Conversation",
            "icon": "💭"
          },
          {
            "id": "persuasion",
            "label": "Persuasion",
            "icon": "🗨️"
          },
          {
            "id": "negotiation",
            "label": "Negotiation",
            "icon": "🤝"
          }
        ]
      },
      {
        "id": "emotional",
        "label": "Emotional Intelligence",
        "icon": "🧠",
        "leaves": [
          {
            "id": "listening",
            "label": "Active Listening",
            "icon": "👂"
          },
          {
            "id": "empathy",
            "label": "Empathy",
            "icon": "🤝"
          },
          {
            "id": "boundaries",
            "label": "Boundaries",
            "icon": "🧱"
          },
          {
            "id": "conflict",
            "label": "Conflict Resolution",
            "icon": "🕊️"
          }
        ]
      },
      {
        "id": "community",
        "label": "Community",
        "icon": "🫂",
        "leaves": [
          {
            "id": "teamwork",
            "label": "Teamwork",
            "icon": "🤜"
          },
          {
            "id": "networkingpeople",
            "label": "Meeting People",
            "icon": "👋"
          },
          {
            "id": "mentoring",
            "label": "Mentoring",
            "icon": "🎓"
          },
          {
            "id": "hosting",
            "label": "Hosting",
            "icon": "🏡"
          }
        ]
      }
    ]
  },
  {
    "id": "career",
    "label": "Career & Work",
    "icon": "💼",
    "color": "#c084fc",
    "angle": 180,
    "branches": [
      {
        "id": "jobsearch",
        "label": "Job Search",
        "icon": "🔎",
        "leaves": [
          {
            "id": "resume",
            "label": "Resume Writing",
            "icon": "📄"
          },
          {
            "id": "interviews",
            "label": "Interviewing",
            "icon": "🎙️"
          },
          {
            "id": "portfolio",
            "label": "Portfolio Building",
            "icon": "🧑‍💻"
          },
          {
            "id": "applications",
            "label": "Job Applications",
            "icon": "📨"
          }
        ]
      },
      {
        "id": "professional",
        "label": "Professional Skills",
        "icon": "📋",
        "leaves": [
          {
            "id": "projectmanagement",
            "label": "Project Management",
            "icon": "🗂️"
          },
          {
            "id": "timemanagement",
            "label": "Time Management",
            "icon": "⏱️"
          },
          {
            "id": "documentation",
            "label": "Technical Writing",
            "icon": "📝"
          },
          {
            "id": "leadership",
            "label": "Leadership",
            "icon": "🧭"
          }
        ]
      },
      {
        "id": "entrepreneurship",
        "label": "Entrepreneurship",
        "icon": "🚀",
        "leaves": [
          {
            "id": "marketresearch",
            "label": "Market Research",
            "icon": "📊"
          },
          {
            "id": "pricing",
            "label": "Pricing",
            "icon": "💲"
          },
          {
            "id": "customerdiscovery",
            "label": "Customer Discovery",
            "icon": "🧑‍🤝‍🧑"
          },
          {
            "id": "sales",
            "label": "Sales",
            "icon": "🤝"
          }
        ]
      }
    ]
  }
];

// v0.7: compact, staggered constellation layout.
// Coordinates are in React Flow canvas units. The outer radius is now ~1,340
// instead of 4,200. Nearby branches form short links like an RPG skill tree.
// Each region is a 30-degree wedge. The middle branch is offset radially so
// categories, branches, and labels have room without overlapping adjacent wedges.
const point = (degrees: number, radius: number, tangent = 0) => {
  const radians = degrees * Math.PI / 180;
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return { x: c * radius - s * tangent, y: s * radius + c * tangent };
};

export const skills: Skill[] = [
  { id: 'you', label: 'YOU', icon: '✦', kind: 'root', color: '#c4b5fd', x: 0, y: 0 },
];

// Related groups are connected by subtle dotted arcs, not prerequisites.
export const ringLinks: { source: string; target: string; color: string }[] = [];

// Display links connect a specialization to the next skill in its own cluster.
// The real parent metadata remains unchanged, so saved progress, searching,
// ancestry and folding continue to use the same skill relationships.
export const displayLinks: { source: string; target: string }[] = [];

for (const region of regions) {
  skills.push({
    id: region.id,
    label: region.label,
    icon: region.icon,
    kind: 'category',
    color: region.color,
    parent: 'you',
    ...point(region.angle, 350),
  });
  displayLinks.push({ source: 'you', target: region.id });

  for (const [branchIndex, branch] of region.branches.entries()) {
    const outerBranch = branchIndex !== 1;
    const branchRadial = outerBranch ? 580 : 685;
    const branchTangent = (branchIndex - 1) * 90;
    skills.push({
      id: branch.id,
      label: branch.label,
      icon: branch.icon,
      kind: 'skill',
      color: region.color,
      parent: region.id,
      ...point(region.angle, branchRadial, branchTangent),
    });
    displayLinks.push({ source: region.id, target: branch.id });

    let previousNodeId = branch.id;
    for (const [leafIndex, leaf] of branch.leaves.entries()) {
      const radius = (outerBranch ? 810 : 875) + leafIndex * 155;
      const tangent = (branchIndex - 1) * 135 + (leafIndex % 2 === 0 ? -7 : 7);
      skills.push({
        id: leaf.id,
        label: leaf.label,
        icon: leaf.icon,
        kind: 'skill',
        color: region.color,
        parent: branch.id, // important: unchanged hierarchy, not a prerequisite chain
        ...point(region.angle, radius, tangent),
      });
      displayLinks.push({ source: previousNodeId, target: leaf.id });
      previousNodeId = leaf.id;
    }

    if (branchIndex > 0) {
      ringLinks.push({
        source: region.branches[branchIndex - 1].id,
        target: branch.id,
        color: region.color,
      });
    }
  }
}
