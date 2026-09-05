// Import all tech logos
import jsLogo from "../assets/js.webp";
import tsLogo from "../assets/TS.webp";
import pythonLogo from "../assets/Stickers sur le thème Python.webp";
import phpLogo from "../assets/PHP.webp";
import goLogo from "../assets/golang.webp";
import dartLogo from "../assets/dart.webp";
import vueLogo from "../assets/Vue js Logo.webp";
import reactLogo from "../assets/react.webp";
import html5Logo from "../assets/html5.webp";
import css3Logo from "../assets/css3.webp";
import tailwindLogo from "../assets/tailwind.webp";
import viteLogo from "../assets/vite.webp";
import nodejsLogo from "../assets/nodejs.webp";
import expressLogo from "../assets/expressjs.webp";
import laravelLogo from "../assets/laravel.webp";
import sequelizeLogo from "../assets/Sequelize v6 _ Sequelize.webp";
import graphqlLogo from "../assets/GraphQL Logo Vector Files.webp";
import mysqlLogo from "../assets/mysql.webp";
import postgresLogo from "../assets/PostgreSQL Logo.webp";
import dockerLogo from "../assets/docker.webp";
import gitLogo from "../assets/Git.webp";
import githubLogo from "../assets/github.webp";

// New tech logos
import fastApiLogo from "../assets/new/FastApi.webp";
import firebaseLogo from "../assets/new/firebase.webp";
import flaskLogo from "../assets/new/flaskpython.webp";
import mongodbLogo from "../assets/new/mongodb.webp";
import nextjsLogo from "../assets/new/nextjs.webp";
import nuxtjsLogo from "../assets/new/nuxtjs.webp";
import postmanLogo from "../assets/new/postman.webp";
import sqliteLogo from "../assets/new/sqlite.webp";
import vscodeLogo from "../assets/new/vscode.webp";

// Data tech stack Rizky Yuli Andreanto - dipakai oleh TechStackFoundry.vue
export const techCategories = [
	{
		title: "Core Languages",
		desc: "The fundamental building blocks for robust logic and scripting.",
		items: [
			{ name: "JavaScript", short: "JS", icon: jsLogo },
			{ name: "TypeScript", short: "TS", icon: tsLogo },
			{ name: "Python", short: "PY", icon: pythonLogo },
			{ name: "PHP", short: "PHP", icon: phpLogo },
			{ name: "Go", short: "GO", icon: goLogo },
			{ name: "Dart", short: "DT", icon: dartLogo },
		],
	},
	{
		title: "Frontend & UI",
		desc: "Creating highly interactive and performant user interfaces.",
		items: [
			{ name: "Vue.js", short: "VU", icon: vueLogo },
			{ name: "Nuxt.js", short: "NX", icon: nuxtjsLogo },
			{ name: "React", short: "RE", icon: reactLogo },
			{ name: "Next.js", short: "NE", icon: nextjsLogo },
			{ name: "TailwindCSS", short: "TW", icon: tailwindLogo },
			{ name: "Vite", short: "VI", icon: viteLogo },
			{ name: "HTML5", short: "H5", icon: html5Logo },
			{ name: "CSS3", short: "C3", icon: css3Logo },
		],
	},
	{
		title: "Backend & API",
		desc: "Architecting scalable server logic and API services.",
		items: [
			{ name: "Node.js", short: "ND", icon: nodejsLogo },
			{ name: "Express", short: "EX", icon: expressLogo },
			{ name: "Laravel", short: "LA", icon: laravelLogo },
			{ name: "FastAPI", short: "FA", icon: fastApiLogo },
			{ name: "Flask", short: "FL", icon: flaskLogo },
			{ name: "GraphQL", short: "GQ", icon: graphqlLogo },
			{ name: "Sequelize", short: "SQ", icon: sequelizeLogo },
		],
	},
	{
		title: "Database",
		desc: "Storing and managing data at scale.",
		items: [
			{ name: "PostgreSQL", short: "PG", icon: postgresLogo },
			{ name: "MySQL", short: "MY", icon: mysqlLogo },
			{ name: "MongoDB", short: "MG", icon: mongodbLogo },
			{ name: "SQLite", short: "SL", icon: sqliteLogo },
			{ name: "Firebase", short: "FB", icon: firebaseLogo },
		],
	},
	{
		title: "Tools & DevOps",
		desc: "Streamlining development workflow and deployment.",
		shape: "square",
		items: [
			{ name: "Docker", short: "DK", icon: dockerLogo },
			{ name: "Git", short: "GIT", icon: gitLogo },
			{ name: "GitHub", short: "GH", icon: githubLogo },
			{ name: "Postman", short: "PM", icon: postmanLogo },
			{ name: "VS Code", short: "VS", icon: vscodeLogo },
		],
	},
]
