import React from 'react';
import { motion } from 'framer-motion';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to SanScript
        </motion.h1>
      </header>
      <section className="about">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          About SanScript
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          SanScript is a custom language designed to make scripting tasks easier.
        </motion.p>
      </section>
      <section className="examples">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Examples
        </motion.h2>
        {/* Include some example scripts here */}
      </section>
      <section className="code-editor">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Code Editor
        </motion.h2>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          height="400px"
        />
      </section>
      <section className="contact">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Contact Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          You can reach me at example@email.com
        </motion.p>
      </section>
      <section className="buy-me-a-coffee">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          Buy Me a Coffee
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Support the development of SanScript by buying me a coffee!
        </motion.p>
        {/* Include a button to buy coffee */}
      </section>
      <footer>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          &copy; 2024 SanScript. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
