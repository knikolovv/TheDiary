import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoteFields() {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setTitleError(true);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        images.forEach((img) => formData.append('images', img.file));

        try {
            const response = await fetch('http://localhost:8080/notes/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setTitle('');
                setTitleError(false);
                setDescription('');
                setImages([]);
            }

            navigate('/notes')
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const filesWithPreview = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...filesWithPreview]);
};


    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        };
    }, [images]);

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
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (titleError && e.target.value.trim() !== '') {
                            setTitleError(false);
                        }
                    }}
                    label="Note Title"
                    variant="standard"
                    sx={{ width: '25ch', mx: 'auto', my: '' }}
                    required
                    error={titleError}
                    helperText={titleError ? 'Title is required' : ''}
                />
                <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    multiline
                    rows={10}
                    variant="outlined"
                    sx={{ width: '60ch', height: '20ch' }}
                    required
                />
                <input
                    accept="image/*"
                    id="upload-images"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 12 }}>
                    <label htmlFor="upload-images">
                        <Button variant="outlined" component="span">
                            Upload Images
                        </Button>
                    </label>
                    <Button type="submit" variant="contained">
                        Create
                    </Button>
                </Box>
                {images.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {images.map((img, index) => (
                            <Box key={index} sx={{ alignItems: 'center' }}>
                                <img
                                    src={img.previewUrl}
                                    alt={img.file.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}