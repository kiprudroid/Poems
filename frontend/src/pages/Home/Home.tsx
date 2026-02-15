
import React, { useEffect, useState } from 'react';
import { poetryService, type Poem } from '../../data/poetryService';
import PoemCard from '../../components/PoemCard';
import styles from './Home.module.css';
import { Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const data = await poetryService.getRandomPoems(5);
        setPoems(data);
      } catch (err) {
        setError('Failed to load poems.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandom();
  }, []);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader2 className={styles.animateSpin} size={48} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Featured Poems</h1>
        <p className={styles.subtitle}>A selection of random verses for your enjoyment.</p>
      </header>
      
      <div className={styles.grid}>
        {poems.map((poem, index) => (
          // Use index as fallback key since random poems might not have unique IDs exposed easily (API returns title/author/lines/linecount)
          // Ideally title+author is unique enough
          <PoemCard key={`${poem.title}-${index}`} poem={poem} />
        ))}
      </div>
    </div>
  );
};

export default Home;
