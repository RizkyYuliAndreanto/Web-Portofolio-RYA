// Import all tech logos
import jsLogo from "../assets/js.jpg";
import tsLogo from "../assets/TS.jpg";
import pythonLogo from "../assets/Stickers sur le thème Python.jpg";
import phpLogo from "../assets/PHP.jpg";
import goLogo from "../assets/golang.jpg";
import dartLogo from "../assets/dart.jpg";
import vueLogo from "../assets/Vue js Logo.jpg";
import reactLogo from "../assets/react.jpg";
import html5Logo from "../assets/html5.jpg";
import css3Logo from "../assets/css3.jpg";
import tailwindLogo from "../assets/tailwind.jpg";
import viteLogo from "../assets/vite.jpg";
import nodejsLogo from "../assets/nodejs.jpg";
import expressLogo from "../assets/expressjs.jpg";
import laravelLogo from "../assets/laravel.jpg";
import sequelizeLogo from "../assets/Sequelize v6 _ Sequelize.jpg";
import graphqlLogo from "../assets/GraphQL Logo Vector Files.jpg";
import mysqlLogo from "../assets/mysql.jpg";
import postgresLogo from "../assets/PostgreSQL Logo.jpg";
import dockerLogo from "../assets/docker.jpg";
import gitLogo from "../assets/Git.jpg";
import githubLogo from "../assets/github.jpg";

// New tech logos
import fastApiLogo from "../assets/new/FastApi.jpg";
import firebaseLogo from "../assets/new/firebase.jpg";
import flaskLogo from "../assets/new/flaskpython.jpg";
import mongodbLogo from "../assets/new/mongodb.jpg";
import nextjsLogo from "../assets/new/nextjs.jpg";
import nuxtjsLogo from "../assets/new/nuxtjs.jpg";
import postmanLogo from "../assets/new/postman.jpg";
import sqliteLogo from "../assets/new/sqlite.jpg";
import vscodeLogo from "../assets/new/vscode.jpg";

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
