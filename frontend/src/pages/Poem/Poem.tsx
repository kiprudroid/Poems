
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { poetryService, type Poem as PoemType } from '../../data/poetryService';
import styles from './Poem.module.css';
import { Share2, Clock, User } from 'lucide-react';

const Poem: React.FC = () => {
    const { title } = useParams<{ title: string }>();
    const [poem, setPoem] = useState<PoemType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
             if (title) {
                try {
                    const data = await poetryService.getPoemByTitle(title);
                    setPoem(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
             }
        };
        fetch();
    }, [title]);

    if(loading) return <div className={styles.loading}>Loading...</div>;
    if(!poem) return <div className={styles.error}>Poem not found</div>;

    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>{poem.title}</h1>
                <div className={styles.meta}>
                    <span className={styles.author}>
                        <User size={16} /> 
                        <Link to={`/author/${encodeURIComponent(poem.author)}`}>{poem.author}</Link>
                    </span>
                    {poem.linecount && (
                        <span className={styles.lines}>
                            <Clock size={16} /> {poem.linecount} lines
                        </span>
                    )}
                </div>
            </header>

            <div className={styles.content}>
                {poem.lines.map((line, i) => (
                    <p key={i} className={styles.line}>{line || '\u00A0'}</p>
                ))}
            </div>

            <footer className={styles.footer}>
                <button className={styles.shareBtn} onClick={() => navigator.share?.({ title: poem.title, text: `Check out "${poem.title}" by ${poem.author}`, url: window.location.href })}>
                    <Share2 size={16} /> Share Poem
                </button>
            </footer>
        </article>
    );
};

export default Poem;
