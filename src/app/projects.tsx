import Head from 'next/head';

const Projects = () => (
  <>
    <Head>
      <title>Projects - My Portfolio</title>
      <meta name="description" content="A list of my projects." />
    </Head>
    <div className="p-4 text-[#cdd6f4]">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ul>
        <li><a href="#project1" className="text-blue-400">Project 1</a></li>
        <li><a href="#project2" className="text-blue-400">Project 2</a></li>
        <li><a href="#project3" className="text-blue-400">Project 3</a></li>
      </ul>
    </div>
  </>
);

export default Projects;
