// techStackData.js — Data with actual logo imports
import jsLogo from "../../assets/js.webp"
import tsLogo from "../../assets/TS.webp"
import pythonLogo from "../../assets/Stickers sur le thème Python.webp"
import phpLogo from "../../assets/PHP.webp"
import goLogo from "../../assets/golang.webp"
import dartLogo from "../../assets/dart.webp"
import vueLogo from "../../assets/Vue js Logo.webp"
import reactLogo from "../../assets/react.webp"
import html5Logo from "../../assets/html5.webp"
import css3Logo from "../../assets/css3.webp"
import tailwindLogo from "../../assets/tailwind.webp"
import viteLogo from "../../assets/vite.webp"
import nodejsLogo from "../../assets/nodejs.webp"
import expressLogo from "../../assets/expressjs.webp"
import laravelLogo from "../../assets/laravel.webp"
import sequelizeLogo from "../../assets/Sequelize v6 _ Sequelize.webp"
import graphqlLogo from "../../assets/GraphQL Logo Vector Files.webp"
import mysqlLogo from "../../assets/mysql.webp"
import postgresLogo from "../../assets/PostgreSQL Logo.webp"
import dockerLogo from "../../assets/docker.webp"
import gitLogo from "../../assets/Git.webp"
import githubLogo from "../../assets/github.webp"
import fastApiLogo from "../../assets/new/FastApi.webp"
import firebaseLogo from "../../assets/new/firebase.webp"
import flaskLogo from "../../assets/new/flaskpython.webp"
import mongodbLogo from "../../assets/new/mongodb.webp"
import nextjsLogo from "../../assets/new/nextjs.webp"
import nuxtjsLogo from "../../assets/new/nuxtjs.webp"
import postmanLogo from "../../assets/new/postman.webp"
import sqliteLogo from "../../assets/new/sqlite.webp"
import vscodeLogo from "../../assets/new/vscode.webp"

export const categories = [
  {
    id: "core",
    label: "Core Languages",
    faceIndex: 0,
    color: "#F7DF1E",
    items: [
      { name: "JavaScript", short: "JS", color: "#F7DF1E", icon: jsLogo },
      { name: "TypeScript", short: "TS", color: "#3178C6", icon: tsLogo },
      { name: "Python", short: "PY", color: "#3776AB", icon: pythonLogo },
      { name: "PHP", short: "PHP", color: "#777BB4", icon: phpLogo },
      { name: "Go", short: "GO", color: "#00ADD8", icon: goLogo },
      { name: "Dart", short: "DT", color: "#0175C2", icon: dartLogo },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & UI",
    faceIndex: 1,
    color: "#42b883",
    items: [
      { name: "Vue.js", short: "VU", color: "#42b883", icon: vueLogo },
      { name: "Nuxt.js", short: "NX", color: "#00DC82", icon: nuxtjsLogo },
      { name: "React", short: "RE", color: "#61DAFB", icon: reactLogo },
      { name: "Next.js", short: "NE", color: "#ffffff", icon: nextjsLogo },
      { name: "TailwindCSS", short: "TW", color: "#06B6D4", icon: tailwindLogo },
      { name: "Vite", short: "VI", color: "#646CFF", icon: viteLogo },
      { name: "HTML5", short: "H5", color: "#E34F26", icon: html5Logo },
      { name: "CSS3", short: "C3", color: "#1572B6", icon: css3Logo },
    ],
  },
  {
    id: "backend",
    label: "Backend, API & Database",
    faceIndex: 2,
    color: "#68A063",
    items: [
      { name: "Node.js", short: "ND", color: "#68A063", icon: nodejsLogo },
      { name: "Express", short: "EX", color: "#ffffff", icon: expressLogo },
      { name: "Laravel", short: "LA", color: "#FF2D20", icon: laravelLogo },
      { name: "FastAPI", short: "FA", color: "#009688", icon: fastApiLogo },
      { name: "Flask", short: "FL", color: "#ffffff", icon: flaskLogo },
      { name: "GraphQL", short: "GQ", color: "#E10098", icon: graphqlLogo },
      { name: "Sequelize", short: "SQ", color: "#52B0E7", icon: sequelizeLogo },
      { name: "PostgreSQL", short: "PG", color: "#336791", icon: postgresLogo },
      { name: "MySQL", short: "MY", color: "#4479A1", icon: mysqlLogo },
      { name: "MongoDB", short: "MG", color: "#47A248", icon: mongodbLogo },
      { name: "SQLite", short: "SL", color: "#003B57", icon: sqliteLogo },
      { name: "Firebase", short: "FB", color: "#FFCA28", icon: firebaseLogo },
    ],
  },
  {
    id: "ai",
    label: "AI & Computer Vision",
    faceIndex: 3,
    color: "#00C2A8",
    items: [
      { name: "YOLO", short: "YOLO", color: "#00C2A8", icon: null },
      { name: "ArcFace", short: "ARCFACE", color: "#4E86C8", icon: null },
      { name: "MiniFASNetV2", short: "MINIFAS", color: "#8B7EC8", icon: null },
      { name: "TensorFlow/Keras", short: "TENSORFLOW", color: "#FF8F00", icon: null },
      { name: "OpenCV", short: "OPENCV", color: "#5C3EE8", icon: null },
      { name: "LLM", short: "LLM", color: "#10A37F", icon: null },
      { name: "go2rtc", short: "GO2RTC", color: "#E05263", icon: null },
      { name: "ngrok", short: "NGROK", color: "#1F66E5", icon: null },
    ],
  },
  {
    id: "devops",
    label: "Tools & DevOps",
    faceIndex: 4,
    color: "#2496ED",
    items: [
      { name: "Docker", short: "DK", color: "#2496ED", icon: dockerLogo },
      { name: "Git", short: "GT", color: "#F05032", icon: gitLogo },
      { name: "GitHub", short: "GH", color: "#ffffff", icon: githubLogo },
      { name: "Postman", short: "PM", color: "#FF6C37", icon: postmanLogo },
      { name: "VS Code", short: "VS", color: "#007ACC", icon: vscodeLogo },
    ],
  },
]

export const identityFace = {
  id: "identity",
  label: "Rizky Yuli Andreanto",
  faceIndex: 5,
  color: "#2A5FE0",
  accent: "#4E86C8",
  short: "RYA",
}

export const allTechnologies = categories.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryLabel: cat.label }))
)

export const totalTechnologies = allTechnologies.length
export const totalCategories = categories.length
