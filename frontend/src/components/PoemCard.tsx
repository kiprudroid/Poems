
import React from 'react';
import { Link } from 'react-router-dom';
import type { Poem } from '../data/poetryService';
import { FileText, User } from 'lucide-react';
import styles from './PoemCard.module.css';

interface Props {
  poem: Poem;
}

const PoemCard: React.FC<Props> = ({ poem }) => {
  // Show first 4 lines as preview
  const previewLines = (poem.lines || []).slice(0, 4).join('\n');
  
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          <Link to={`/poem/${encodeURIComponent(poem.title)}`} className={styles.titleLink}>
            <FileText size={20} className={styles.icon} />
            {poem.title}
          </Link>
        </h3>
        <span className={styles.author}>
          <User size={16} className={styles.icon} />
          <Link to={`/author/${encodeURIComponent(poem.author)}`} className={styles.authorLink}>
            {poem.author}
          </Link>
        </span>
      </header>
      
      <div className={styles.preview}>
        {previewLines}...
      </div>

      <footer className={styles.footer}>
        <Link to={`/poem/${encodeURIComponent(poem.title)}`} className={styles.readMore}>
          Read Poem →
        </Link>
      </footer>
    </article>
  );
};

export default PoemCard;
