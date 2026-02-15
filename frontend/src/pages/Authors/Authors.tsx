
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Search } from 'lucide-react';
import { poetryService } from '../../data/poetryService';
import styles from './Authors.module.css';

const Authors: React.FC = () => {
    const [authors, setAuthors] = useState<string[]>([]);
    const [filtered, setFiltered] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const data = await poetryService.getAuthors();
                setAuthors(data);
                setFiltered(data);
            } catch (err) {
                console.error('Failed to load authors:', err);
            }
            setLoading(false);
        };
        fetchAuthors();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearch(term);
        const results = authors.filter(a => 
            a.toLowerCase().includes(term.toLowerCase())
        );
        setFiltered(results);
    };

    if (loading) return <div className={styles.loading}>Loading Authors...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>All Authors</h1>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={20} />
                    <input 
                        type="text" 
                        placeholder="Search poets..." 
                        value={search} 
                        onChange={handleSearch}
                        className={styles.searchInput}
                    />
                </div>
            </header>

            <ul className={styles.list}>
                {filtered.map(author => (
                    <li key={author} className={styles.item}>
                        <Link to={`/author/${encodeURIComponent(author)}`} className={styles.link}>
                            <User size={16} className={styles.icon} />
                            {author}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Authors;
