import { PushPin } from '@mui/icons-material';
import { Grid, Card, CardContent, Typography, Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoIcon from '@mui/icons-material/Photo';

export default function NotesGrid() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:8080/notes');
                if (!response.ok) throw new Error('Could not fetch notes');
                const data = await response.json();
                const sortedNotes = data.sort((a, b) => {
                    if (a.pinned && !b.pinned) return -1;
                    if (!a.pinned && b.pinned) return 1;

                    return a.id - b.id;
                });
                setNotes(sortedNotes);
            }
            catch (error) {
                console.log('Could not fetch notes', error)
            }
        };

        fetchNotes();
    }, [])


    const handleNoteClick = (id) => {
        navigate(`/note/${id}`);
    };

    return (
        <Container maxWidth='xl' sx={{ mt: 4 }} >
            <Grid container spacing={3} justifyContent='center'>
                {notes.map((note) => (
                    <Grid key={note.id} >
                        <Card
                            sx={{
                                height: 275,
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                                position: 'relative',
                            }}
                            onClick={() => handleNoteClick(note.id)}
                        >
                            <CardContent
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    width: '400px',
                                }}
                            >
                                {note.pinned && (
                                    <PushPin
                                        sx={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 8,
                                            transform: 'rotate(45deg)',
                                            color: 'primary.main',
                                        }}
                                    />
                                )}

                                <Typography variant="h4">
                                    {note.title.length > 20
                                        ? `${note.title.slice(0, 18)}…`
                                        : note.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        mb: 1,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: 'vertical',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {note.description}
                                </Typography>

                                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                                    <PhotoIcon fontSize='medium' />
                                    <Typography variant="caption">
                                        {note.images ? note.images.length : 0} image(s)
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
