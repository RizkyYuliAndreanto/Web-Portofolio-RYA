// techStackData.js — Data with actual logo imports
import jsLogo from "../../assets/js.jpg"
import tsLogo from "../../assets/TS.jpg"
import pythonLogo from "../../assets/Stickers sur le thème Python.jpg"
import phpLogo from "../../assets/PHP.jpg"
import goLogo from "../../assets/golang.jpg"
import dartLogo from "../../assets/dart.jpg"
import vueLogo from "../../assets/Vue js Logo.jpg"
import reactLogo from "../../assets/react.jpg"
import html5Logo from "../../assets/html5.jpg"
import css3Logo from "../../assets/css3.jpg"
import tailwindLogo from "../../assets/tailwind.jpg"
import viteLogo from "../../assets/vite.jpg"
import nodejsLogo from "../../assets/nodejs.jpg"
import expressLogo from "../../assets/expressjs.jpg"
import laravelLogo from "../../assets/laravel.jpg"
import sequelizeLogo from "../../assets/Sequelize v6 _ Sequelize.jpg"
import graphqlLogo from "../../assets/GraphQL Logo Vector Files.jpg"
import mysqlLogo from "../../assets/mysql.jpg"
import postgresLogo from "../../assets/PostgreSQL Logo.jpg"
import dockerLogo from "../../assets/docker.jpg"
import gitLogo from "../../assets/Git.jpg"
import githubLogo from "../../assets/github.jpg"
import fastApiLogo from "../../assets/new/FastApi.jpg"
import firebaseLogo from "../../assets/new/firebase.jpg"
import flaskLogo from "../../assets/new/flaskpython.jpg"
import mongodbLogo from "../../assets/new/mongodb.jpg"
import nextjsLogo from "../../assets/new/nextjs.jpg"
import nuxtjsLogo from "../../assets/new/nuxtjs.jpg"
import postmanLogo from "../../assets/new/postman.jpg"
import sqliteLogo from "../../assets/new/sqlite.jpg"
import vscodeLogo from "../../assets/new/vscode.jpg"

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
    label: "Backend & API",
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
    ],
  },
  {
    id: "database",
    label: "Database",
    faceIndex: 3,
    color: "#336791",
    items: [
      { name: "PostgreSQL", short: "PG", color: "#336791", icon: postgresLogo },
      { name: "MySQL", short: "MY", color: "#4479A1", icon: mysqlLogo },
      { name: "MongoDB", short: "MG", color: "#47A248", icon: mongodbLogo },
      { name: "SQLite", short: "SL", color: "#003B57", icon: sqliteLogo },
      { name: "Firebase", short: "FB", color: "#FFCA28", icon: firebaseLogo },
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
