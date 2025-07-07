import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Note() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete note!');
            }

            navigate('/notes');
        } catch (error) {
            console.error('Error deleting note with id:${id}', error)
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:8080/notes/${id}`);
                if (!response.ok) throw new Error('Could not fetch note');
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
            } catch (error) {
                console.error(`Error fetching note with id: ${id}`, error);
            }
        };
        fetchNote();
    }, [id]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '75vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    border: '1px solid black',
                    borderRadius: 2,
                    paddingTop: 5,
                    minHeight: '600px',
                    width: '600px',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    {title || `No note with ID ${id} exists`}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        overflowWrap: 'break-word',
                        marginX: 6,
                    }}
                >
                    {description}
                </Typography>
                {title && <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 2 }}>
                    <Button variant="outlined" component="span">
                        Edit
                    </Button>
                    <Button variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </Box>}

            </Box>
        </Box>
    );
}
