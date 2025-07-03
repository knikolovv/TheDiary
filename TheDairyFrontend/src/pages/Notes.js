import { Grid, Card, CardContent, Typography, Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';

export default function NotesGrid() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:8080/note');
                if (!response.ok) throw new Error('Could not fetch notes');
                const data = await response.json();
                setNotes(data);
            }
            catch (error) {
                console.log('Could not fetch notes', error)
            }
        };

        fetchNotes();
    }, [])


    const handleNoteClick = (id) => {
        console.log('Clicked note', id);
        // navigate(`/notes/${id}`);
    };

    return (
        <Container maxWidth='xl'>
            <Grid container spacing={5} justifyContent='center' sx={{ mt: 6}}>
                {notes.map((note) => (
                    <Grid item xs={3} key={note.id}>
                        <Card
                            sx={{
                                height: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                border: '1px solid rgba(0, 0, 0, 0.2)',
                            }}
                            onClick={() => handleNoteClick(note.id)}
                        >
                            <CardContent sx={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '100%',
                                width:'400px',

                            }}>
                                <Typography variant="h4" gutterBottom>
                                    {note.title}
                                </Typography>
                                <Typography noWrap={false} variant=""
                                    sx={{
                                        mb: 1,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 5,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                    {note.description}
                                </Typography>
                                <Box sx={{ mt: 'auto' }}>
                                    <Typography variant="caption">
                                        📷 {note.images ? note.images.length : 0} image(s)
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
