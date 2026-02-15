
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { poetryService, type Poem } from '../../data/poetryService';
import PoemCard from '../../components/PoemCard';
import styles from './Poems.module.css';
import { Loader2 } from 'lucide-react';

const Poems: React.FC = () => {
    const { authorName } = useParams<{ authorName: string }>();
    const [poems, setPoems] = useState<Poem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            if (authorName) {
                try {
                    const data = await poetryService.getAuthorPoems(authorName);
                    setPoems(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetch();
    }, [authorName]);

    if (loading) return <div className={styles.loader}><Loader2 className={styles.spin} /></div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link to="/authors" className={styles.backLink}>← Back to Authors</Link>
                <h1 className={styles.title}>{authorName}</h1>
                <p className={styles.meta}>{poems.length} Poems available</p>
            </header>

            <div className={styles.grid}>
                {poems.map((poem, index) => (
                    <PoemCard key={index} poem={poem} />
                ))}
            </div>
        </div>
    );
};

export default Poems;
