import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function NoteFields() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const note = {
            title,
            description,
        };

        try {
            const response = await fetch('http://localhost:8080/api/note', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note),
            });

            if (response.ok) {
                console.log('Note created successfully');
                setTitle('');
                setDescription('');
            } else {
                console.error('Error creating note');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

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
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
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
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="standard-basic"
                    label="Note Title"
                    variant="standard"
                    sx={{ width: '25ch', mx: 'auto' }}
                />
                <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={10}
                    variant="outlined"
                    sx={{ width: '60ch', height: '20ch' }}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}
