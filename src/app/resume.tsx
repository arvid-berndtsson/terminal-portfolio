import Head from 'next/head';

const Resume = () => (
  <>
    <Head>
      <title>Resume - My Portfolio</title>
      <meta name="description" content="My professional resume." />
    </Head>
    <div className="p-4 text-[#cdd6f4]">
      <h1 className="text-2xl font-bold">Resume</h1>
      <p>This is where my resume content will go.</p>
    </div>
  </>
);

export default Resume;
