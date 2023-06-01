import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import JsonTable from "@/components/json-table";

export default function Home() {
	const jsonData = {
		name: "John Doe",
		age: 30,
		email: "johndoe@example.com",
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>
				{/* 
				<Counter />
				<Profile /> */}
				<JsonTable data={jsonData} />
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{" "}
					<span className={styles.logo}>
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							width={72}
							height={16}
						/>
					</span>
				</a>
			</footer>
		</div>
	);
}
