import { useState, useEffect, useRef } from 'react';
import { AbcEditor, type Theme } from '@ovnonvo/abc-editor';
import abcjs from 'abcjs';
import 'abcjs/abcjs-audio.css';
import './App.css';

function App() {
  const [abcCode, setAbcCode] = useState(`X:1
T:Twinkle Twinkle Little Star
M:4/4
L:1/4
K:C
C C G G | A A G2 | F F E E | D D C2 |
G G F F | E E D2 | G G F F | E E D2 |
C C G G | A A G2 | F F E E | D D C2 |`);
  const [theme, setTheme] = useState<Theme>('light');
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      abcjs.renderAbc(previewRef.current, abcCode, {
        responsive: 'resize',
        add_classes: true,
      });
    }
  }, [abcCode]);

  return (
    <div className={`app-container ${theme}`}>
      <header className="header">
        <h1>ABC Editor Demo</h1>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <div className="main-content">
        <div className="editor-panel">
          <h2>Editor</h2>
          <div className="editor-wrapper">
            <AbcEditor value={abcCode} onChange={setAbcCode} theme={theme} />
          </div>
        </div>

        <div className="preview-panel">
          <h2>Preview</h2>
          <div className="preview-wrapper" ref={previewRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
